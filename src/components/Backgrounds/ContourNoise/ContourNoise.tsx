import { useState, useEffect, useRef } from "react";

import "./ContourNoise.css"

type ContourNoiseProps = {}

const VertexShaderSource = `
attribute vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;

const FragmentShaderSource = `
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting

    gl_FragColor = vec4(fract((gl_FragCoord.xy - iMouse) / iResolution), fract(iTime), 1);
}
`;

function ContourNoise(props: ContourNoiseProps) {
    // Refrence to canvas element
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Canvas size state to set canvas element size properties
    const [canvasWidth, setCanvasWidth] = useState<number>()
    const [canvasHeight, setCanvasHeight] = useState<number>()

    // State for wether the initial canvas size has been set
    const [initCanvasSizeSet, setInitCanvasSizeSet] = useState(false)

    // WebGL State
    const [gl, setGl] = useState<WebGLRenderingContext>()
    const [webGLvertexShader, setWebGLVertexShader] = useState<WebGLShader>()
    const [webGLfragmentShader, setWebGLFragmentShader] = useState<WebGLShader>()
    const [webGLProgram, setWebGLProgram] = useState<WebGLProgram>()
    const [webGLPositionAttributeLocation, setWebGLPositionAttributeLocation] = useState<number>()
    const [webGLPositionBuffer, setWebGLPositionBuffer] = useState<WebGLBuffer>()
    const [webGLResolutionLocation, setWebGLResolutionLocation] = useState<WebGLUniformLocation>();
    const [webGLTimeLocation, setWebGLTimeLocation] = useState<WebGLUniformLocation>();
    const [webGLMouseLocation, setWebGLMouseLocation] = useState<WebGLUniformLocation>();

    // Elapsed time state
    const [timeDelta, setTimeDelta] = useState(0);

    // Mouse state
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    // WebGL initializing state
    const [webGLInitialized, setWebGLInitialized] = useState(false)

    // Sets canvas size state to size of canvas element
    function updateCanvasSize() {
        if (canvasRef.current) {
            setCanvasWidth(canvasRef.current.clientWidth)
            setCanvasHeight(canvasRef.current.clientHeight)
        }
    }

    /** 
     * Creates a WebGL shader from a source string
     * @param {WebGLRenderingContext} gl - WebGL context
     * @param {number} type - Determins type of shader to be created. Either `gl.VERTEX_SHADER` or `gl.FRAGMENT_SHADER`
     * @param {string} source - The source code of the shader represented as a string
    */
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
        console.log("Creating shader")
        var shader = gl.createShader(type);

        if (shader) {
            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (success) {
                console.log("Shader created")
                return shader;
            } else {
                // Delete shader if there is an error compiling 
                console.log(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader)
            }
        } else {
            // Delete shader if there's an error creating
            gl.deleteShader(shader);
        }

        return null;
    }

    /** 
     * Creates a GLSL program from a vertex shader and a fragment shader
     * @param {WebGLRenderingContext} gl - WebGL context
     * @param {WebGLShader} vertexShader - A vertex shader
     * @param {WebGLShader} fragmentShader - A fragment shader
    */
    function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        console.log("Creating program")
        var program = gl.createProgram();

        if (program) {
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            var success = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (success) {
                console.log("Program created")
                return program;
            } else {
                // Delete program if there is an error linking 
                console.log(gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
            }
        } else {
            // Delete program if there's an error creating
            gl.deleteProgram(program);
        }

        return null
    }

    /** Initializes WebGL and sets all relevent state */
    function initWebGL() {
        console.log("===== Starting WebGL Init =====")
        let context = null
        if (canvasRef.current) {
            context = canvasRef.current.getContext("webgl")
            if (context) {
                setGl(context)
            }
        }

        if (!context) {
            console.error("WebGL is not supported :(")
            return;
        }

        // Create shaders
        const vertexShader = createShader(context, context.VERTEX_SHADER, VertexShaderSource);
        const fragmentShader = createShader(context, context.FRAGMENT_SHADER, FragmentShaderSource);
        if (!vertexShader || !fragmentShader) return
        setWebGLVertexShader(vertexShader)
        setWebGLFragmentShader(fragmentShader)

        // Create shader program
        const program = createProgram(context, vertexShader, fragmentShader);
        if (!program) return;
        setWebGLProgram(program)

        // look up where the vertex data needs to go.
        const positionAttributeLocation = context.getAttribLocation(program, "a_position");
        setWebGLPositionAttributeLocation(positionAttributeLocation)

        // look up uniform locations
        const resolutionLocation = context.getUniformLocation(program, "iResolution");
        const timeLocation = context.getUniformLocation(program, "iTime");
        const mouseLocation = context.getUniformLocation(program, "iMouse");

        if (!resolutionLocation || !timeLocation || !mouseLocation) return;
        setWebGLResolutionLocation(resolutionLocation)
        setWebGLTimeLocation(timeLocation)
        setWebGLMouseLocation(mouseLocation)

        // Create a buffer to put three 2d clip space points in
        const positionBuffer = context.createBuffer();
        if (!positionBuffer) return;
        setWebGLPositionBuffer(positionBuffer)

        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

        // fill it with a 2 triangles that cover clip space
        context.bufferData(context.ARRAY_BUFFER, new Float32Array([
            -1, -1,  // first triangle
            1, -1,
            -1, 1,
            -1, 1,  // second triangle
            1, -1,
            1, 1,
        ]), context.STATIC_DRAW);

        console.log("===== WebGL Init Done =====")

        draw(
            context,
            program,
            positionAttributeLocation,
            positionBuffer,
            resolutionLocation,
            timeLocation,
            mouseLocation,
            timeDelta,
            mouseX,
            mouseY
        )
    }

    /** 
     * Draws shaded rectangle to canvas using WebGL 
     * @param {WebGLRenderingContext} context - WebGL rendering context
     * @param {WebGLProgram} program - Shader program used to render rectangle
     * @param {number} positionAttributeLocation - Location of vertex data
     * @param {WebGLBuffer} positionBuffer - Buffer for 2d clip space points
     * @param {WebGLUniformLocation} resolutionLocation - Location for resolution
     * * @param {WebGLUniformLocation} timeLocation - Location for time
     * * @param {WebGLUniformLocation} mouseLocation - Location for mouse
    */
    function draw(
        context?: WebGLRenderingContext,
        program?: WebGLProgram,
        positionAttributeLocation?: number,
        positionBuffer?: WebGLBuffer,
        resolutionLocation?: WebGLUniformLocation,
        timeLocation?: WebGLUniformLocation,
        mouseLocation?: WebGLUniformLocation,
        t?: number,
        mX?: number,
        mY?: number,
    ) {
        if (
            context == null ||
            program == null ||
            positionAttributeLocation == null ||
            positionBuffer == null ||
            resolutionLocation == null ||
            timeLocation == null ||
            mouseLocation == null
        ) {
            return
        }
        // Tell WebGL how to convert from clip space to pixels
        context.viewport(0, 0, context.canvas.width, context.canvas.height);

        // Tell it to use our program (pair of shaders)
        context.useProgram(program);

        // Turn on the attribute
        context.enableVertexAttribArray(positionAttributeLocation);

        // Bind the position buffer.
        context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        context.vertexAttribPointer(
            positionAttributeLocation,
            2,          // 2 components per iteration
            context.FLOAT,   // the data is 32bit floats
            false,      // don't normalize the data
            0,          // 0 = move forward size * sizeof(type) each iteration to get the next position
            0,          // start at the beginning of the buffer
        );

        // Set uniforms
        context.uniform2f(resolutionLocation, context.canvas.width, context.canvas.height);
        context.uniform1f(timeLocation, t || 0);
        context.uniform2f(mouseLocation, mX || 0, mY || 0);

        context.drawArrays(
            context.TRIANGLES,
            0,     // offset
            6,     // num vertices to process
        );
    }

    // Set canvas size on component mount
    useEffect(() => updateCanvasSize(), [])

    // Update canvas initial size state when canvas size state is updated
    useEffect(() => {
        if (canvasWidth && canvasHeight && !initCanvasSizeSet) {
            // Initial canvas size has been set if both canvas width and height have been set
            setInitCanvasSizeSet(true)
        }
    }, [canvasWidth, canvasHeight])

    // Initialize WebGL after initial canvas size is set
    useEffect(() => {
        if (initCanvasSizeSet) {
            initWebGL()
        }
    }, [initCanvasSizeSet])

    // Update WebGL initialized state when WebGL state is updated
    useEffect(() => {
        if (
            gl != null &&
            webGLvertexShader != null &&
            webGLfragmentShader != null &&
            webGLProgram != null &&
            webGLPositionAttributeLocation != null &&
            webGLPositionBuffer != null &&
            webGLResolutionLocation != null &&
            webGLTimeLocation != null &&
            webGLMouseLocation != null &&
            !webGLInitialized
        ) {
            // WebGL is Initialized if all WebGL state is truthy
            setWebGLInitialized(true)
        }
    }, [
        gl,
        webGLvertexShader,
        webGLfragmentShader,
        webGLProgram,
        webGLPositionAttributeLocation,
        webGLPositionBuffer,
        webGLResolutionLocation,
        webGLTimeLocation,
        webGLMouseLocation,
    ])

    // On webGl initialized
    useEffect(() => {
        let intervalId: number
        if (webGLInitialized) {
            window.addEventListener("resize", updateCanvasSize)

            // Start updating time every 100 milliseconds
            console.log("Start render loop")
            let count = 0
            intervalId = setInterval(() => {
                count += 0.01;
                setTimeDelta(count)
            }, 10)
        }

        // Clean up
        return () => {
            if (intervalId != null) clearInterval(intervalId)
        }
    }, [webGLInitialized])

    // Redraw canvas every time update
    useEffect(() => {
        if (
            initCanvasSizeSet &&
            webGLInitialized
        ) {
            draw(
                gl,
                webGLProgram,
                webGLPositionAttributeLocation,
                webGLPositionBuffer,
                webGLResolutionLocation,
                webGLTimeLocation,
                webGLMouseLocation,
                timeDelta,
                mouseX,
                mouseY
            )
        }
    }, [timeDelta])

    // Redraw canvas on canvas size change
    useEffect(() => {
        if (
            initCanvasSizeSet &&
            webGLInitialized
        ) {
            draw(
                gl,
                webGLProgram,
                webGLPositionAttributeLocation,
                webGLPositionBuffer,
                webGLResolutionLocation,
                webGLTimeLocation,
                webGLMouseLocation,
                timeDelta,
                mouseX,
                mouseY
            )
        }
    }, [canvasWidth, canvasHeight])

    return (
        <div id="contour-noise-wrapper">
            <canvas ref={canvasRef} id="contour-noise-canvas" width={canvasWidth} height={canvasHeight}></canvas>
        </div>
    );
}

export default ContourNoise;