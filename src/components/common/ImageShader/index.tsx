import { forwardRef, useEffect, useRef, useState } from "react"
import { ImageSource, get_image_src } from "../../../utils/webgl/images"
import {
	UniformProp,
	create_program_from_strings,
	get_gl_context,
	get_uniform_location,
	load_texture,
	set_rect_vertices,
	set_uniform_value,
} from "../../../utils/webgl/webgl"

interface ImageProps {
	src: string,
	width?: number,
	height?: number,
	alt?: string,
	srcSet?: ImageSource[],
	className?: string,
}

interface ImageShaderProps {
	src: string,
	fragSource: string,
	width?: number,
	height?: number,
	alt?: string,
	srcSet?: ImageSource[],
	customUniforms?: UniformProp | UniformProp[],
	animate?: boolean,
	frameRate?: number,
	className?: string,
	onMouseOver?: React.MouseEventHandler,
	wrapperClassName?: string,
}

interface CustomUniform {
	name: string,
	location: WebGLUniformLocation | null,
	x: number,
	y?: number,
	z?: number,
	w?: number,
	is_int?: Boolean,
}


const ImageShader = forwardRef<HTMLDivElement, ImageShaderProps>((props, ref) => {
	// WebGl Context
	let [gl, set_gl] = useState<WebGLRenderingContext | null>(null)

	// Shader state
	let [shader_prog, set_shader_prog] = useState<WebGLProgram | null>(null) // Shader program

	// Attribute location state
	let [pos_location, set_pos_location] = useState(0) // Position attribute location

	// Uniform location state
	let [res_location, set_res_location] = useState<WebGLUniformLocation | null>(null) // Resolution uniform
	let [sampler_location, set_sampler_location] = useState<WebGLUniformLocation | null>(null) // Sampler uniform
	let [custom_uniforms, set_custom_uniforms] = useState<CustomUniform[]>([])

	// Buffer state
	let [pos_buffer, set_pos_buffer] = useState<WebGLBuffer | null>(null) // Position buffer

	// Texture state
	let [texture, set_texture] = useState<WebGLTexture | null>(null)
	let [texture_width, set_texture_width] = useState(0)
	let [texture_height, set_texture_height] = useState(0)

	// Renderer state
	let [can_render, set_can_render] = useState(false) // Enables webgl rendering

	// Canvas dimensions
	let [canvas_width, set_canvas_width] = useState<number | null>(null)
	let [canvas_height, set_canvas_height] = useState<number | null>(null)

	// Animation interval id
	let [anim_interval_id, set_anim_interval_id] = useState<NodeJS.Timeout | null>(null)
	// Animataion tick
	let [tick, set_tick] = useState(0)

	// Canvas element reference
	let canvas_ref = useRef<HTMLCanvasElement>(null)
	// Component wrapper element refrence
	let wrapper_ref = useRef<HTMLDivElement>(null)

	const vert_source = `
	attribute vec3 a_position;

	varying vec2 v_texcoord;

	void main() {
		gl_Position = vec4(a_position, 1.);
	}
	`

	/** Set the locations for shader uniforms */
	let set_uniform_locations = (
		gl: WebGLRenderingContext,
		program: WebGLProgram,
	) => {
		// Set resolution uniform location
		const resolution_unif_location = gl.getUniformLocation(program, "u_resolution")
		if (resolution_unif_location === null) console.error("can't get u_resolution uniform location")
		set_res_location(resolution_unif_location)

		// Set texture sampler uniform location
		const sampler_unif_location = gl.getUniformLocation(program, "u_texture")
		if (sampler_unif_location === null) console.error("can't get u_texture uniform location")
		set_sampler_location(sampler_unif_location)
	}

	/** Sets the location for custom shader uniforms */
	let set_custom_uniform_locations = (
		gl: WebGLRenderingContext,
		program: WebGLProgram,
	) => {
		const updated_uniforms = custom_uniforms.map((uniform) => {
			uniform.location = get_uniform_location(gl, program, uniform.name)
			return uniform
		})

		set_custom_uniforms(updated_uniforms)
	}

	/** Set the values for shader uniforms */
	let set_uniform_values = (
		gl: WebGLRenderingContext,
	) => {
		// Set resolution uniform value
		gl.uniform2f(res_location, gl.canvas.width, gl.canvas.height)

		// Set sampler uniform value
		gl.uniform1i(sampler_location, 0)

		// Set uniform prop values
		custom_uniforms.forEach(({ location, x, y, z, w }) => {
			set_uniform_value(gl, location, x, y, z, w)
		})
	}

	let update_custom_uniforms = (uniforms?: UniformProp | UniformProp[]) => {
		if (uniforms === undefined) {
			set_custom_uniforms([])
			return
		}

		if (!(uniforms instanceof Array)) {
			uniforms = [uniforms]
		}

		let updated_uniforms: CustomUniform[] = [...custom_uniforms]

		uniforms.forEach(({ name, x, y, z, w, is_int }) => {
			const u_idx = updated_uniforms.findIndex(
				(u_uniform) => u_uniform.name === name
			)

			if (u_idx < 0) {
				updated_uniforms.push({
					name,
					x,
					y,
					z,
					w,
					is_int,
					location: null
				})
			} else {
				updated_uniforms[u_idx].x = x
				updated_uniforms[u_idx].y = y
				updated_uniforms[u_idx].z = z
				updated_uniforms[u_idx].w = w
				updated_uniforms[u_idx].is_int = is_int
			}
		})

		set_custom_uniforms(updated_uniforms)
	}

	/** Initializes webgl and shaders */
	let init = async (
		canvas_ref: React.RefObject<HTMLCanvasElement>,
		vert_source: string,
		frag_source: string,
	) => {
		try {
			if (canvas_ref.current === null) throw "can't get canvas element"

			// Get webgl context
			const ctx = get_gl_context(canvas_ref)
			set_gl(ctx)

			// Create shader program
			const program = create_program_from_strings(ctx, vert_source, frag_source)
			set_shader_prog(program)

			//
			// Get attribute locations
			//

			// Get position attribute location
			set_pos_location(ctx.getAttribLocation(program, "a_position"))

			//
			// Set uniform locations
			//

			set_uniform_locations(ctx, program)
			set_custom_uniform_locations(ctx, program)

			//
			// Bind buffers
			//

			// Bind position buffer
			const position_buffer = ctx.createBuffer();
			if (position_buffer === null) throw "can't create position buffer"
			set_pos_buffer(position_buffer)

			// Create verticeis
			set_rect_vertices(ctx, position_buffer)

			// Load texture
			let img_src = await get_image_src(props.src, props.srcSet)
			let { texture: tex, dimensions } = await load_texture(ctx, img_src)

			// Set texture state
			set_texture(tex)
			set_texture_width(dimensions.width)
			set_texture_height(dimensions.height)

		} catch (err) {
			console.error(err)
			set_can_render(false)
		}
	}

	/** Whether webgl is initialized */
	let initialized = () => {
		if (gl === null) return false
		if (shader_prog === null) return false
		if (pos_buffer === null) return false
		if (texture === null) return false
		return true
	}

	/** Render webgl canvas */
	let render = () => {
		if (gl === null) return
		if (!initialized()) return

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		// Clear the canvas
		gl.clearColor(0.1, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		// Use shader program
		gl.useProgram(shader_prog);

		//
		// Position attribute
		//

		// Enable attribute
		gl.enableVertexAttribArray(pos_location);

		// Bind the position buffer.
		gl.bindBuffer(gl.ARRAY_BUFFER, pos_buffer);

		// Set position data pointer
		gl.vertexAttribPointer(
			pos_location,
			3, // 2 components per iteration
			gl.FLOAT, // 32bit float data
			false, // don't normalize data
			0, // move by size * sizeof(type) each iteration
			0 // offset
		)

		//
		// Texture
		//

		// Use texture unit 0
		gl.activeTexture(gl.TEXTURE0)

		// Bind texture
		gl.bindTexture(gl.TEXTURE_2D, texture)

		//
		// Uniforms
		//

		set_uniform_values(gl)

		//
		// Draw
		//

		gl?.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}

	/** Handles window resize event */
	let handle_resize = (): { width?: number, height?: number } => {
		if (wrapper_ref.current === null) return {}

		let canvas_size = {
			width: wrapper_ref.current.clientWidth,
			height: wrapper_ref.current.clientHeight
		}

		set_canvas_width(canvas_size.width)
		set_canvas_height(canvas_size.height)

		return canvas_size
	}

	let start_animation = (frame_rate: number = 60): NodeJS.Timeout => {
		// Calculate frame delay in milliseconds
		let delay = Math.round((1 / frame_rate) * 1000)
		return setInterval(() => set_tick((t) => t + 1), delay)
	}

	let set_animated = (animate: boolean, frame_rate?: number) => {
		if (anim_interval_id !== null) {
			clearInterval(anim_interval_id)
			set_anim_interval_id(null)
		}

		if (animate) {
			const interval_id = start_animation(frame_rate)
			set_anim_interval_id(interval_id)
		}

	}

	/** Image fallback component */
	let Image = (props: ImageProps) => {
		if (props.srcSet === undefined) {
			return (
				<img
					src={props.src}
					width={props.width}
					height={props.height}
					alt={props.alt}
					className={props.className}
				/>
			)
		} else {
			return (
				<picture>
					{props.srcSet.map((source, idx) => (
						<source
							key={idx}
							media={source.media}
							srcSet={source.srcSet}
							type={source.type}
						/>
					))}

					<img
						src={props.src}
						width={props.width}
						height={props.height}
						alt={props.alt}
						className={props.className}
					/>
				</picture>
			)
		}
	}

	//
	// Hooks
	//

	// Render when tick changes
	useEffect(() => {
		if (!can_render) return
		render()
	}, [tick])

	// Update custom uniforms when props change
	useEffect(() => {
		update_custom_uniforms(props.customUniforms)
	}, [props.customUniforms])

	// Get any custom uniform locations that are null when custom uniforms changes
	useEffect(() => {
		if (gl === null || shader_prog === null) return

		let updated = false
		const updated_uniforms = custom_uniforms.map((uniform) => {
			if (uniform.location === null && gl !== null && shader_prog !== null) {
				uniform.location = get_uniform_location(gl, shader_prog, uniform.name)
				updated = true
			}

			return uniform
		})

		if (updated) set_custom_uniforms(updated_uniforms)
	}, [custom_uniforms, gl, shader_prog])


	// Updated can render state
	useEffect(() => {
		set_can_render(initialized())
	}, [
		gl,
		shader_prog,
		pos_location,
		pos_buffer,
		texture
	])

	// Rerender when can_render state changes
	useEffect(() => {
		if (!can_render) return
		render()
		set_animated(props.animate || false, props.frameRate)
	}, [can_render])

	// Reset position buffer and rerender when canvas dimensions change
	useEffect(() => {
		if (gl === null || pos_buffer === null) {
			return
		}

		// Rebind position buffer to canvas dimensions
		set_rect_vertices(gl, pos_buffer)

		// rerender
		render()

	}, [canvas_width, canvas_height])

	// Start or stop animation interval for animated prop change
	useEffect(() => {
		set_animated(props.animate || false, props.frameRate)
	}, [props.animate, props.frameRate])

	// Component did mount
	useEffect(() => {
		if (props.width !== undefined) set_canvas_width(props.width)
		if (props.height !== undefined) set_canvas_height(props.height)

		window.addEventListener("resize", handle_resize)
		handle_resize()
		init(canvas_ref, vert_source, props.fragSource)

		return () => {
			window.removeEventListener("resize", handle_resize)

			if (anim_interval_id !== null) clearInterval(anim_interval_id)
		}
	}, [])

	return (
		<div ref={ref} className={`${props.wrapperClassName || ""}`}>
			<div ref={wrapper_ref} className={`${props.wrapperClassName || ""}`} >
				<canvas
					onMouseOver={props.onMouseOver}
					ref={canvas_ref}
					width={canvas_width || props.width || undefined}
					height={canvas_height || props.height || undefined}
					title={props.alt}
					className={`h-full ${props.className || ""} ${(gl === null || !can_render) ? "hidden" : ""}`}
				>
				</canvas>

				<Image
					src={props.src}
					width={props.width}
					height={props.height}
					alt={props.alt}
					srcSet={props.srcSet}
					className={`w-full h-full ${props.className || ""} ${(gl === null || !can_render) ? "" : "hidden"}`}
				/>
			</div>
		</div>
	)
})

export default ImageShader
