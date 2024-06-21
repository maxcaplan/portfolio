/** WebGL helper functions */

/** Uniform prop class */
export class UniformProp {
  /** Uniform name */
  name: string
  /** Determins if uniform is an int */
  is_int: Boolean = false
  /** Location of uniform */
  location?: WebGLUniformLocation

  // Value(s)
  x?: number
  y?: number
  z?: number
  w?: number
  v?: Float32List | Int32List | number[]

  constructor(name: string, x: number)
  constructor(name: string, x: number, y: number)
  constructor(name: string, x: number, y: number)
  constructor(name: string, x: number, y: number, z: number)
  constructor(name: string, x: number, y: number, z: number, w: number)
  constructor(name: string, v: Float32List | Int32List | number[])
  constructor(
    name: string,
    x: number | Float32List | Int32List | number[],
    y?: number,
    z?: number,
    w?: number,
  ) {
    this.name = name

    if (typeof x === 'number') {
      this.x = x
      this.y = y
      this.z = z
      this.w = w
    } else {
      this.v = x
    }
  }

  /** Returns self with is_int param set to value */
  with_is_int(value: boolean = true): UniformProp {
    this.is_int = value
    return this
  }

  /** Sets uniform location in a program */
  set_location(gl: WebGLRenderingContext, program: WebGLProgram): void {
    const location = gl.getUniformLocation(program, this.name)
    if (location === null) throw `unable to get location for uniform ${this.name}`
    this.location = location
  }

  /** Set uniform to prop value */
  set_value(gl: WebGLRenderingContext): void {
    let location = this.location || null
    let x = this.x
    let y = this.y
    let z = this.z
    let w = this.w
    let v = this.v
    let is_int = this.is_int

    // Values supplied as iterable
    if (v !== undefined) {
      // Int values
      if (v instanceof Int32Array) {
        switch (v.length) {
          case 1:
            gl.uniform1iv(location, v)
            break;
          case 2:
            gl.uniform2iv(location, v)
            break;
          case 3:
            gl.uniform3iv(location, v)
            break;
          default:
            gl.uniform4iv(location, v)
            break;
        }

        return

        // Float values
      } else {
        switch (v.length) {
          case 1:
            gl.uniform1fv(location, v)
            break;
          case 2:
            gl.uniform2fv(location, v)
            break;
          case 3:
            gl.uniform3fv(location, v)
            break;
          default:
            gl.uniform4fv(location, v)
            break;
        }

        return
      }

      // Values supplied as props
    } else {
      if (x !== undefined && y !== undefined && z !== undefined && w !== undefined) {
        is_int ? gl.uniform4i(location, x, y, z, w) : gl.uniform4f(location, x, y, z, w)
        return
      }

      if (x !== undefined && y !== undefined && z !== undefined) {
        is_int ? gl.uniform3i(location, x, y, z) : gl.uniform3f(location, x, y, z)
        return
      }

      if (x !== undefined && y !== undefined) {
        is_int ? gl.uniform2i(location, x, y) : gl.uniform2f(location, x, y)
        return
      }

      if (x !== undefined) {
        is_int ? gl.uniform1i(location, x) : gl.uniform1f(location, x)
        return
      }
    }
  }
}

/** Get a webgl context for a canvas ref */
export function get_gl_context(
  canvas: React.RefObject<HTMLCanvasElement>
): WebGLRenderingContext {
  if (canvas.current === null) throw "canvas element is null"

  const ctx = canvas.current.getContext("webgl")

  if (ctx === null) throw "failed to get webgl context"

  return ctx
}

/** 
 * Creates a webgl shader from a source string 
 * Adapted from https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
*/
export function create_shader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type);

  if (shader === null) {
    throw "failed to create shader"
  }

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!success) {
    let err = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw err || "failed to compile shader"
  }

  return shader;
}

/** 
 * Creates a shader program from a vertex shader and a fragment shader
 * Adapted from https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
 */
export function create_program(
  gl: WebGLRenderingContext,
  vertex_shader: WebGLShader,
  fragment_shader: WebGLShader
): WebGLProgram {
  const program = gl.createProgram();

  if (program === null) {
    throw "failed to create shader program"
  }

  gl.attachShader(program, vertex_shader)
  gl.attachShader(program, fragment_shader)
  gl.linkProgram(program)

  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!success) {
    let err = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw err || "failed to link shader program"
  }

  return program;
}

/** Creates a shader program from a vertex shader source string and a fragment shader source string */
export function create_program_from_strings(
  gl: WebGLRenderingContext,
  vertex_shader_src: string,
  fragment_shader_src: string
): WebGLProgram {
  // Create shaders from sources
  const vert_shader = create_shader(gl, gl.VERTEX_SHADER, vertex_shader_src)
  const frag_shader = create_shader(gl, gl.FRAGMENT_SHADER, fragment_shader_src)

  // Create program from shaders
  const program = create_program(gl, vert_shader, frag_shader)

  return program
}

/** Bind and fill a buffer with position data for a rectangle */
export function set_rect_vertices(
  gl: WebGLRenderingContext,
  buffer: WebGLBuffer,
  x: number,
  y: number,
  width: number,
  height: number
) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
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

/** Bind and fill a buffer with texture coordinates for a rectangle */
export function set_rect_texcoords(gl: WebGLRenderingContext, buffer: WebGLBuffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
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

/** Loads an image from a src and binds it to a webgl texture */
export function load_texture(
  gl: WebGLRenderingContext,
  src: string
): Promise<{ texture: WebGLTexture, aspect_ratio: number }> {
  return new Promise<{ texture: WebGLTexture, aspect_ratio: number }>((resolve, reject) => {
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

      resolve({ texture, aspect_ratio: image.width / image.height })
    })

    // On image load failed
    image.addEventListener("error", (e) => {
      reject(e.message)
    })

    // Set image source
    image.src = src
  })
}

/** Is a number of 2 */
function is_power_of_2(value: number): boolean {
  return (value & (value - 1)) === 0;
}
