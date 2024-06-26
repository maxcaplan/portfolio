import { useCallback, useState } from "react"

export type UseUniformHook = {
	/** Sets values of the uniform */
	setValues: UniformValueSetter
	/** Sets location state to uniforms state in a program */
	setLocation: UniformLocationSetter,
	/** Sets uniform value to set values */
	setUniform: UniformSetter,
}

type UniformLocationSetter = (gl: WebGLRenderingContext, program: WebGLProgram) => void;
type UniformSetter = (gl: WebGLRenderingContext) => void;
type UniformValueSetter = {
	(x: number): void,
	(x: number, y: number): void,
	(x: number, y: number, z: number): void,
	(x: number, y: number, z: number, w: number): void,
	(v: Float32List | Int32List | number[]): void,
}

/** WebGL uniform helper hook */
export function useUniform(name: string, x: number): UseUniformHook
export function useUniform(name: string, x: number, y: number): UseUniformHook
export function useUniform(name: string, x: number, y: number): UseUniformHook
export function useUniform(name: string, x: number, y: number, z: number): UseUniformHook
export function useUniform(name: string, x: number, y: number, z: number, w: number): UseUniformHook
export function useUniform(name: string, v: Float32List | Int32List | number[]): UseUniformHook
export function useUniform(
	name: string,
	x: number | Float32List | Int32List | number[],
	y?: number,
	z?: number,
	w?: number,
): UseUniformHook {
	// Uniform name
	const [u_name, set_u_name] = useState<string>(name)
	// Determins whether uniform is an int
	const [is_int, set_is_int] = useState<Boolean>(false)
	// Location of uniform
	const [u_location, set_u_location] = useState<WebGLUniformLocation | null>(null)

	// Value(s)
	const [u_x, set_u_x] = useState<number | undefined>(typeof x === "number" ? x : undefined)
	const [u_y, set_u_y] = useState<number | undefined>(y)
	const [u_z, set_u_z] = useState<number | undefined>(z)
	const [u_w, set_u_w] = useState<number | undefined>(w)
	const [u_v, set_u_v] = useState<Float32List | Int32List | number[] | undefined>(
		typeof x === "number" ? undefined : x
	)

	const setValues: UniformValueSetter = (
		x: number | Float32List | Int32List | number[],
		y?: number,
		z?: number,
		w?: number,
	) => {
		if (typeof x !== "number") {
			set_u_v(x)
			return
		}

		set_u_x(x)
		set_u_y(y)
		set_u_z(z)
		set_u_w(w)
	}

	const setLocation: UniformLocationSetter = (gl, program) => {
		const location = gl.getUniformLocation(program, u_name)

		if (location === null) {
			set_u_location(null)
			throw `unable to get location for uniform ${u_name}`
		}

		set_u_location(location)
	}

	/** Set uniform in a webgl rendering context to values */
	const setUniform: UniformSetter = useCallback((gl) => {
		console.log(u_x, u_y)
		// Values supplied as iterable
		if (u_v !== undefined) {
			// Int values
			if (u_v instanceof Int32Array) {
				switch (u_v.length) {
					case 1:
						gl.uniform1iv(u_location, u_v)
						break;
					case 2:
						gl.uniform2iv(u_location, u_v)
						break;
					case 3:
						gl.uniform3iv(u_location, u_v)
						break;
					default:
						gl.uniform4iv(u_location, u_v)
						break;
				}

				return

				// Float values
			} else {
				switch (u_v.length) {
					case 1:
						gl.uniform1fv(u_location, u_v)
						break;
					case 2:
						gl.uniform2fv(u_location, u_v)
						break;
					case 3:
						gl.uniform3fv(u_location, u_v)
						break;
					default:
						gl.uniform4fv(u_location, u_v)
						break;
				}

				return
			}

		} else {
			if (u_x !== undefined && u_y !== undefined && u_z !== undefined && u_w !== undefined) {
				is_int ?
					gl.uniform4i(u_location, u_x, u_y, u_z, u_w) :
					gl.uniform4f(u_location, u_x, u_y, u_z, u_w)
				return
			}

			if (u_x !== undefined && u_y !== undefined && u_z !== undefined) {
				is_int ?
					gl.uniform3i(u_location, u_x, u_y, u_z) :
					gl.uniform3f(u_location, u_x, u_y, u_z)
				return
			}

			if (u_x !== undefined && u_y !== undefined) {
				is_int ? gl.uniform2i(u_location, u_x, u_y) : gl.uniform2f(u_location, u_x, u_y)
				return
			}

			if (u_x !== undefined) {
				is_int ? gl.uniform1i(u_location, u_x) : gl.uniform1f(u_location, u_x)
				return
			}
		}
	}, [u_location, u_x, u_y, u_z, u_w, u_v])

	return {
		setValues,
		setLocation,
		setUniform,
	}
}
