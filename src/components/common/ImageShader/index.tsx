import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ImageSource, get_image_src } from "../../../utils/webgl/images"
import { create_program_from_strings, get_gl_context, load_texture, set_rect_texcoords, set_rect_vertices } from "../../../utils/webgl/webgl"

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
	className?: string,
	wrapperClassName?: string,
}


export default function ImageShader(props: ImageShaderProps) {
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

	let [gl, set_gl] = useState<WebGLRenderingContext | null>(null) // WebGL context

	// Shader state
	let [shader_prog, set_shader_prog] = useState<WebGLProgram | null>(null) // Shader program

	// Attribute location state
	let [pos_location, set_pos_location] = useState(0) // Position attribute location
	let [tex_coord_location, set_tex_coord_location] = useState(0) // Texcoord attribute location
	// let [matrix_location, set_matrix_location] = useState<WebGLUniformLocation | null>(null) // Matrix attriubute location

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

	// Canvas element reference
	let canvas_ref = useRef<HTMLCanvasElement>(null)

	/** Initializes webgl and shaders */
	let init = async (canvas_ref: React.RefObject<HTMLCanvasElement>, vert_source: string, frag_source: string) => {
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
			// Get uniform locations
			//

			const resolution_unif_location = ctx.getUniformLocation(program, "u_resolution")
			if (resolution_unif_location === null) throw "can't get u_resolution uniform location"
			set_res_location(resolution_unif_location)

			const sampler_unif_location = ctx.getUniformLocation(program, "u_texture")
			if (sampler_unif_location === null) throw "can't get u_texture uniform location"
			set_sampler_location(sampler_unif_location)

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
				canvas_width || ctx.canvas.width,
				canvas_height || ctx.canvas.height
			)

			// Bind texcoord buffer
			var coord_buffer = ctx.createBuffer();
			if (coord_buffer === null) throw "can't create texcoord buffer"
			set_tex_coord_buffer(coord_buffer)

			// Create texcoord 
			set_rect_texcoords(ctx, coord_buffer)

			// Load texture
			let img_src = await get_image_src(props.src, props.srcSet)
			console.log(img_src)
			let tex = await load_texture(ctx, img_src)
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
		if (!initialized()) return

		gl?.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		// Clear the canvas
		gl?.clearColor(0.1, 0, 0, 0);
		gl?.clear(gl.COLOR_BUFFER_BIT);

		// Use shader program
		gl?.useProgram(shader_prog);

		//
		// Position attribute
		//

		// Enable attribute
		gl?.enableVertexAttribArray(pos_location);

		// Bind the position buffer.
		gl?.bindBuffer(gl.ARRAY_BUFFER, pos_buffer);

		// Set position data pointer
		gl?.vertexAttribPointer(
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
		gl?.bindBuffer(gl.ARRAY_BUFFER, tex_coord_buffer);


		// Set texcoord data pointer
		gl?.vertexAttribPointer(
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
		gl?.activeTexture(gl.TEXTURE0)

		// Bind texture
		gl?.bindTexture(gl.TEXTURE_2D, texture)

		//
		// Uniforms
		//

		// Update resolution uniform
		gl?.uniform2f(res_location, gl.canvas.width, gl.canvas.height)

		// Update sampler uniform
		gl?.uniform1i(sampler_location, 0)

		//
		// Draw
		//

		gl?.drawArrays(gl.TRIANGLES, 0, 6);
	}

	/** Handles window resize event */
	let handle_resize = () => {
		if (canvas_ref.current === null) return

		set_canvas_width(canvas_ref.current.clientWidth)
		set_canvas_height(canvas_ref.current.clientHeight)
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
	}, [can_render])

	// Reset position buffer and rerender when canvas dimensions change
	useEffect(() => {
		if (!can_render) {
			init(canvas_ref, vert_source, props.fragSource)

		}
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

	// Component did mount
	useEffect(() => {
		if (props.width !== undefined) set_canvas_width(props.width)
		if (props.height !== undefined) set_canvas_height(props.height)

		window.addEventListener("resize", handle_resize)
		window.requestAnimationFrame(() => handle_resize())

		return () => {
			window.removeEventListener("resize", handle_resize)
		}
	}, [])

	return (
		<div className={`${props.wrapperClassName || ""}`}>
			<canvas
				ref={canvas_ref}
				width={canvas_width || props.width || undefined}
				height={canvas_height || props.height || undefined}
				title={props.alt}
				className={`w-full h-full ${props.className || ""} ${gl === null ? "hidden" : ""}`}
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
