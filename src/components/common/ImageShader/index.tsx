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

	uniform mat3 u_matrix;

	void main() {
  		gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
	}`

	let [gl, set_gl] = useState<WebGLRenderingContext | null>(null) // WebGL context
	let [vert_shader, set_vert_shader] = useState<WebGLShader | null>(null) // Image vertex shader
	let [frag_shader, set_frag_shader] = useState<WebGLShader | null>(null) // Image fragment shader
	let [shader_prog, set_shader_prog] = useState<WebGLProgram | null>(null) // Shader program
	let [pos_location, set_pos_location] = useState(0) // Position attribute location
	let [matrix_location, set_matrix_location] = useState<WebGLUniformLocation | null>(null) // Matrix attriubute location
	let [pos_buffer, set_pos_buffer] = useState<WebGLBuffer | null>(null) // Position buffer
	let [can_render, set_can_render] = useState(false) // Enables webgl rendering
	let [canvas_width, set_canvas_width] = useState(0)
	let [canvas_height, set_canvas_height] = useState(0)

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

	let projection = (width: number, height: number) => {
		let dst = new Float32Array(9);

		dst[0] = 2 / width;
		dst[1] = 0;
		dst[2] = 0;
		dst[3] = 0;
		dst[4] = -2 / height;
		dst[5] = 0;
		dst[6] = -1;
		dst[7] = 1;
		dst[8] = 1;

		return dst;
	}

	/** Initializes webgl and shaders */
	let init = (canvas: React.RefObject<HTMLCanvasElement>, frag_source: string) => {
		try {
			// Get webgl context
			const ctx = get_gl_context(canvas)
			if (ctx === null) throw "can't get webgl context"
			set_gl(ctx)

			// Create vertex shader
			const vert = create_shader(ctx, ctx.VERTEX_SHADER, vert_source)
			if (vert === null) throw "can't create vertex shader"
			set_vert_shader(vert)

			// Create fragment shader
			const frag = create_shader(ctx, ctx.FRAGMENT_SHADER, frag_source)
			if (frag === null) throw "can't create fragment shader"
			set_frag_shader(frag)

			// Create shader program
			const program = create_program(ctx, frag, vert)
			if (program === null) throw "can't create shader program"
			set_shader_prog(program)

			// Get position attribute location
			const pos_attr_location = ctx.getAttribLocation(program, "a_position");
			set_pos_location(pos_attr_location)

			// Bind position buffer
			const buffer = ctx.createBuffer();
			if (buffer === null) throw "can't create position buffer"
			set_pos_buffer(buffer)
			ctx.bindBuffer(ctx.ARRAY_BUFFER, pos_buffer)

			// Create vertices
			set_vertices(ctx)

			// Bind matrix uniform
			const matrix_unif_location = ctx.getUniformLocation(program, "u_matrix")
			if (matrix_unif_location === null) throw "can't get matrix uniform location"
			set_matrix_location(matrix_unif_location)

		} catch (err) {
			console.error(err)
			set_gl(null)
		}
	}

	let set_vertices = (gl: WebGLRenderingContext) => {
		let width = gl.canvas.width
		let height = gl.canvas.height

		// Create vertices
		let positions = [
			0, 0,
			width, 0,
			width, height,
			width, height,
			0, height,
			0, 0
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
	}

	let handle_resize = () => {
		if (canvas_ref.current === null) {
			return
		}

		set_canvas_width(canvas_ref.current.clientWidth)
		set_canvas_height(canvas_ref.current.clientHeight)

		if (gl !== null) {
			set_vertices(gl)
		}
	}


	/** Render webgl canvas */
	let render = () => {
		if (gl === null) return
		if (shader_prog === null) return
		if (pos_location === null) return
		if (pos_buffer === null) return

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		// Clear the canvas
		gl.clearColor(0.1, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		gl.useProgram(shader_prog);

		gl.enableVertexAttribArray(pos_location);

		// Bind the position buffer.
		gl.bindBuffer(gl.ARRAY_BUFFER, pos_buffer);

		// Set geometry
		gl.vertexAttribPointer(
			pos_location,
			2,          // 2 components per iteration
			gl.FLOAT,   // the data is 32bit floats
			false, // don't normalize the data
			0,        // 0 = move forward size * sizeof(type) each iteration to get the next position
			0,        // start at the beginning of the buffer
		)

		// Compute the matrices
		const projectionMatrix = projection(gl.canvas.width, gl.canvas.height);

		// Set the matrix.
		gl.uniformMatrix3fv(matrix_location, false, projectionMatrix);

		// Draw
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

	// Updated can render state
	useEffect(() => {
		let initialized = () => {
			if (gl === null) return false
			if (shader_prog === null) return false
			if (pos_location === null) return false
			if (pos_buffer === null) return false
			return true
		}
		set_can_render(initialized())
	}, [
		gl,
		shader_prog,
		pos_location,
		pos_buffer,
	])

	// Render when can render is true
	useEffect(() => {
		if (!can_render) return
		render()
	}, [can_render])

	// Render when canvas dimensions change
	useEffect(() => {
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
		init(canvas_ref, props.fragSource)

		let interval = window.setInterval(render, 100);

		window.addEventListener("resize", handle_resize)

		return () => {
			window.clearInterval(interval)
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
