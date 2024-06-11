import { useEffect, useRef, useState } from "react"

interface ImageSource {
	media?: string,
	srcSet: string,
	type?: string,
}

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
		v_texcoord = a_texcoord;	
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
	let [canvas_width, set_canvas_width] = useState(0)
	let [canvas_height, set_canvas_height] = useState(0)

	// Canvas element reference
	let canvas_ref = useRef<HTMLCanvasElement>(null)

	/** Get a webgl context for a canvas ref */
	let get_gl_context = (canvas: React.RefObject<HTMLCanvasElement>): WebGLRenderingContext | null => {
		if (canvas.current === null) {
			return null
		}

		let ctx = canvas.current.getContext("webgl")

		if (ctx === null) {
			return null
		}

		return ctx
	}

	/** 
	 * Creates a webgl shader. 
	 * Adapted from https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html 
	*/
	let create_shader = (gl: WebGLRenderingContext, type: number, source: string) => {
		const shader = gl.createShader(type);

		if (shader === null) {
			return null
		}

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (!success) {
			console.error(gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);

			return null
		}

		return shader;
	}

	/** 
	 * Creates a shader program.
	 * Adapted from https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
	 */
	let create_program = (
		gl: WebGLRenderingContext,
		vertexShader: WebGLShader,
		fragmentShader: WebGLShader
	) => {
		const program = gl.createProgram();

		if (program === null) {
			return null
		}

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		const success = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (!success) {
			console.error(gl.getProgramInfoLog(program));
			gl.deleteProgram(program);

			return null
		}

		return program;
	}

	/** Fill a buffer with position data for a rectangle */
	let set_rect_vertices = (
		gl: WebGLRenderingContext,
		x: number,
		y: number,
		width: number,
		height: number
	) => {
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([
				x, y,			// top left
				x + width, y,		// top right
				x + width, y + height,	// bottom right
				x + width, y + height,	// bottom right
				x, y + height,		// bottom left
				x, y			// top left
			]),
			gl.STATIC_DRAW
		);
	}

	/** Fill a buffer with texture coordinates for a rectangle */
	let set_rect_texcoords = (gl: WebGLRenderingContext) => {
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([
				0, 0, // top left
				1, 0, // top right
				1, 1, // bottom right
				1, 1, // bottom right
				0, 1, // bottom left
				0, 0 // top left
			]),
			gl.STATIC_DRAW)
	}

	/** Is a number of 2 */
	let is_power_of_2 = (value: number): boolean => {
		return (value & (value - 1)) === 0;
	}

	/** Loads an image from a src and binds it to a webgl texture */
	let load_texture = (gl: WebGLRenderingContext, src: string): Promise<WebGLTexture> => {
		return new Promise<WebGLTexture>((resolve, reject) => {
			// Create image element
			const image = document.createElement("img")

			// On image loaded
			image.addEventListener("load", () => {
				// Create texture.
				const texture = gl.createTexture()

				if (texture === null) {
					reject("Failed to create texture")
					return
				}

				gl.bindTexture(gl.TEXTURE_2D, texture)

				// Fill texture with a 1x1 blue pixel
				gl.texImage2D(
					gl.TEXTURE_2D,
					0,
					gl.RGBA,
					1,
					1,
					0,
					gl.RGBA,
					gl.UNSIGNED_BYTE,
					new Uint8Array([0, 0, 255, 255])
				)

				gl.bindTexture(gl.TEXTURE_2D, texture)
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

				// Handle power of 2 images and non power of 2 images
				if (is_power_of_2(image.width) && is_power_of_2(image.height)) {
					// Generate mip maps
					gl.generateMipmap(gl.TEXTURE_2D);
				} else {
					// Turn off mipmaps clamp image to edge
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				}

				resolve(texture)
			})

			// On image load failed
			image.addEventListener("error", (e) => {
				reject(e.message)
			})

			// Set image source
			image.src = src
		})
	}

	/** Initializes webgl and shaders */
	let init = async (canvas: React.RefObject<HTMLCanvasElement>, vert_source: string, frag_source: string) => {
		try {
			// Get webgl context
			const ctx = get_gl_context(canvas)
			if (ctx === null) throw "can't get webgl context"
			set_gl(ctx)

			// Flip image unpack direction
			ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, true);

			//
			// Create Shaders
			//

			// Create vertex shader
			const vert = create_shader(ctx, ctx.VERTEX_SHADER, vert_source)
			if (vert === null) throw "can't create vertex shader"

			// Create fragment shader
			const frag = create_shader(ctx, ctx.FRAGMENT_SHADER, frag_source)
			if (frag === null) throw "can't create fragment shader"

			// Create shader program
			const program = create_program(ctx, frag, vert)
			if (program === null) throw "can't create shader program"
			set_shader_prog(program)

			//
			// Get attribute locations
			//

			// Get position attribute location
			const pos_attr_location = ctx.getAttribLocation(program, "a_position");
			set_pos_location(pos_attr_location)

			// Get texcoord attribute location
			const tex_coord_attr_location = ctx.getAttribLocation(program, "a_texcoord");
			set_tex_coord_location(tex_coord_attr_location)

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
			ctx.bindBuffer(ctx.ARRAY_BUFFER, position_buffer)

			// Create verticeis
			set_rect_vertices(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height)

			// Bind texcoord buffer
			var coord_buffer = ctx.createBuffer();
			if (coord_buffer === null) throw "can't create texcoord buffer"
			set_tex_coord_buffer(coord_buffer)
			ctx.bindBuffer(ctx.ARRAY_BUFFER, coord_buffer);

			// Create texcoord 
			set_rect_texcoords(ctx)

			// Load texture
			let tex = await load_texture(ctx, props.src)
			set_texture(tex)

			// Bind matrix uniform
			// const matrix_unif_location = ctx.getUniformLocation(program, "u_matrix")
			// if (matrix_unif_location === null) throw "can't get matrix uniform location"
			// set_matrix_location(matrix_unif_location)

		} catch (err) {
			console.error(err)
			set_can_render(false)
		}
	}

	/** Handles window resize event */
	let handle_resize = () => {
		if (canvas_ref.current === null) {
			return
		}

		set_canvas_width(canvas_ref.current.clientWidth)
		set_canvas_height(canvas_ref.current.clientHeight)
	}


	/** Render webgl canvas */
	let render = () => {
		if (gl === null) return
		if (shader_prog === null) return
		if (sampler_location === null) return
		if (tex_coord_buffer === null) return
		if (pos_buffer === null) return
		if (texture === null) return

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
		gl.enableVertexAttribArray(tex_coord_location);

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

		// Update resolution uniform
		gl.uniform2f(res_location, gl.canvas.width, gl.canvas.height)

		// Update sampler uniform
		gl.uniform1i(sampler_location, 0)

		// Compute the camera matrix
		// const projectionMatrix = projection(gl.canvas.width, gl.canvas.height);
		// gl.uniformMatrix3fv(matrix_location, false, projectionMatrix);

		//
		// Draw
		//
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}

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
		let initialized = () => {
			if (gl === null) return false
			if (shader_prog === null) return false
			if (sampler_location === null) return false
			if (pos_location === null) return false
			if (pos_buffer === null) return false
			if (texture === null) return false
			return true
		}
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
		if (gl === null || pos_buffer === null) {
			return
		}

		// Rebind position buffer to canvas dimensions
		gl.bindBuffer(gl.ARRAY_BUFFER, pos_buffer)
		set_rect_vertices(gl, 0, 0, canvas_width, canvas_height)

		// rerender
		render()

	}, [canvas_width, canvas_height])

	// Component did mount
	useEffect(() => {
		if (props.width !== undefined) {
			set_canvas_width(props.width)
		}
		if (props.height !== undefined) {
			set_canvas_height(props.height)
		}

		handle_resize()
		init(canvas_ref, vert_source, props.fragSource)

		window.addEventListener("resize", handle_resize)

		return () => {
			window.removeEventListener("resize", handle_resize)
		}
	}, [])

	return (
		<div className={`${props.wrapperClassName || ""}`}>
			<canvas
				ref={canvas_ref}
				width={canvas_width}
				height={canvas_height}
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
