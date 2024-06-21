import { useEffect, useRef, useState } from "react"
import { ImageSource, get_image_src } from "../../../utils/webgl/images"
import {
	create_program_from_strings,
	get_gl_context,
	load_texture,
	set_rect_texcoords,
	set_rect_vertices,
	UniformProp
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
	uniforms?: UniformProp | UniformProp[],
	animate?: boolean,
	frameRate?: number,
	className?: string,
	wrapperClassName?: string,
}


export default function ImageShader(props: ImageShaderProps) {
	// WebGl Context
	let [gl, set_gl] = useState<WebGLRenderingContext | null>(null)

	// Shader state
	let [shader_prog, set_shader_prog] = useState<WebGLProgram | null>(null) // Shader program

	// Attribute location state
	let [pos_location, set_pos_location] = useState(0) // Position attribute location
	let [tex_coord_location, set_tex_coord_location] = useState(0) // Texcoord attribute location

	// Uniform location state
	let [res_location, set_res_location] = useState<WebGLUniformLocation | null>(null) // Resolution uniform
	let [sampler_location, set_sampler_location] = useState<WebGLUniformLocation | null>(null) // Sampler uniform

	// Buffer state
	let [pos_buffer, set_pos_buffer] = useState<WebGLBuffer | null>(null) // Position buffer
	let [tex_coord_buffer, set_tex_coord_buffer] = useState<WebGLBuffer | null>(null) // Texcoord buffer

	// Texture state
	let [texture, set_texture] = useState<WebGLTexture | null>(null)

	// Renderer state
	let [can_render, set_can_render] = useState(false) // Enables webgl rendering

	// Canvas dimensions
	let [canvas_width, set_canvas_width] = useState<number | null>(null)
	let [canvas_height, set_canvas_height] = useState<number | null>(null)

	// Animation interval id
	let [anim_interval_id, set_anim_interval_id] = useState<NodeJS.Timeout | null>(null)

	// Canvas element reference
	let canvas_ref = useRef<HTMLCanvasElement>(null)
	// Component wrapper element refrence
	let wrapper_ref = useRef<HTMLDivElement>(null)

	const vert_source = `
	attribute vec2 a_position;
	attribute vec2 a_texcoord;

  	uniform vec2 u_resolution;

	varying vec2 v_texcoord;

	void main() {
		// convert the position from pixels to 0.0 to 1.0
		vec2 zeroToOne = a_position.xy / u_resolution;

		// convert from 0->1 to 0->2
		vec2 zeroToTwo = zeroToOne * 2.0;

		// convert from 0->2 to -1->+1 (clipspace)
		vec2 clipSpace = zeroToTwo - 1.0;

		gl_Position = vec4(clipSpace, 0, 1);
		v_texcoord = vec2(a_texcoord.x, 1. - a_texcoord.y);	
	}`

	/** Set the locations for shader uniforms */
	let set_uniform_locations = (
		gl: WebGLRenderingContext,
		program: WebGLProgram,
		uniform_props?: UniformProp | UniformProp[]
	) => {
		// Set resolution uniform location
		const resolution_unif_location = gl.getUniformLocation(program, "u_resolution")
		if (resolution_unif_location === null) throw "can't get u_resolution uniform location"
		set_res_location(resolution_unif_location)

		// Set texture sampler uniform location
		const sampler_unif_location = gl.getUniformLocation(program, "u_texture")
		if (sampler_unif_location === null) throw "can't get u_texture uniform location"
		set_sampler_location(sampler_unif_location)

		if (uniform_props === undefined) return

		// Set locations of component prop uniforms
		if (uniform_props instanceof UniformProp) {
			uniform_props.set_location(gl, program)
		} else {
			uniform_props.forEach((prop) => {
				prop.set_location(gl, program)
			})
		}
	}

	/** Set the values for shader uniforms */
	let set_uniform_values = (
		gl: WebGLRenderingContext,
		uniform_props?: UniformProp | UniformProp[]
	) => {
		// Set resolution uniform value
		gl.uniform2f(res_location, gl.canvas.width, gl.canvas.height)

		// Set sampler uniform value
		gl.uniform1i(sampler_location, 0)

		if (uniform_props === undefined) return

		// Set uniform prop values
		if (uniform_props instanceof UniformProp) {
			uniform_props.set_value(gl)
		} else {
			uniform_props.forEach((prop) => {
				prop.set_value(gl)
			})
		}
	}

	/** Initializes webgl and shaders */
	let init = async (
		canvas_ref: React.RefObject<HTMLCanvasElement>,
		vert_source: string,
		frag_source: string,
		width?: number,
		height?: number,
		uniforms?: UniformProp | UniformProp[],
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

			// Get texcoord attribute location
			set_tex_coord_location(ctx.getAttribLocation(program, "a_texcoord"))

			//
			// Set uniform locations
			//

			set_uniform_locations(ctx, program, uniforms)

			//
			// Bind buffers
			//

			// Bind position buffer
			const position_buffer = ctx.createBuffer();
			if (position_buffer === null) throw "can't create position buffer"
			set_pos_buffer(position_buffer)

			// Create verticeis
			set_rect_vertices(
				ctx,
				position_buffer,
				0,
				0,
				width || ctx.canvas.width,
				height || ctx.canvas.height
			)

			// Bind texcoord buffer
			var coord_buffer = ctx.createBuffer();
			if (coord_buffer === null) throw "can't create texcoord buffer"
			set_tex_coord_buffer(coord_buffer)

			// Create texcoord 
			set_rect_texcoords(ctx, coord_buffer)

			// Load texture
			let img_src = await get_image_src(props.src, props.srcSet)
			let { texture: tex, aspect_ratio } = await load_texture(ctx, img_src)
			set_texture(tex)

		} catch (err) {
			console.error(err)
			set_can_render(false)
		}
	}

	/** Whether webgl is initialized */
	let initialized = () => {
		if (gl === null) return false
		if (shader_prog === null) return false
		if (sampler_location === null) return false
		if (tex_coord_buffer === null) return false
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
			2, // 2 components per iteration
			gl.FLOAT, // 32bit float data
			false, // don't normalize data
			0, // move by size * sizeof(type) each iteration
			0 // offset
		)

		//
		// Texcoord attribute
		//

		// Enable attribute
		gl?.enableVertexAttribArray(tex_coord_location);

		// Bind the texcoord buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, tex_coord_buffer);


		// Set texcoord data pointer
		gl.vertexAttribPointer(
			tex_coord_location,
			2, // 2 components per iteration
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

		set_uniform_values(gl, props.uniforms)

		//
		// Draw
		//

		gl?.drawArrays(gl.TRIANGLES, 0, 6);
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

	/** If canvas has a width and height, return it's aspect ratio */
	let canvas_aspect_ratio = (): number | undefined => {
		let width = canvas_width || props.width
		let height = canvas_height || props.height

		if (width === undefined) return
		if (height === undefined) return

		return width / height
	}

	let start_animation = (frame_rate: number = 60): NodeJS.Timeout => {
		// Calculate frame delay in milliseconds
		let delay = Math.round((1 / frame_rate) * 1000)

		return setInterval(() => render(), delay)
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

	// Updated can render state
	useEffect(() => {
		set_can_render(initialized())
	}, [
		gl,
		shader_prog,
		sampler_location,
		pos_location,
		pos_buffer,
		texture
	])

	// Rerender when canvas state changes
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
		set_rect_vertices(
			gl,
			pos_buffer,
			0,
			0,
			canvas_width || gl.canvas.width,
			canvas_height || gl.canvas.height
		)

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
		let { width, height } = handle_resize()
		init(canvas_ref, vert_source, props.fragSource, width, height, props.uniforms)

		return () => {
			window.removeEventListener("resize", handle_resize)

			if (anim_interval_id !== null) clearInterval(anim_interval_id)
		}
	}, [])

	return (
		<div ref={wrapper_ref} className={`${props.wrapperClassName || ""}`}>
			<canvas
				ref={canvas_ref}
				width={canvas_width || props.width || undefined}
				height={canvas_height || props.height || undefined}
				title={props.alt}
				className={`h-full ${props.className || ""} ${gl === null ? "hidden" : ""}`}
			>
			</canvas>

			<Image
				src={props.src}
				width={props.width}
				height={props.height}
				alt={props.alt}
				srcSet={props.srcSet}
				className={`w-full h-full ${props.className || ""} ${gl === null ? "" : "hidden"}`}
			/>
		</div>
	)
}
