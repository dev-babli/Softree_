"use client";

import React, { useEffect, useRef } from "react";

export interface ShaderBackgroundProps {
  className?: string;
  theme?: "orange" | "purple" | "blue";
  animate?: boolean;
  staticTime?: number;
}

const ShaderBackground: React.FC<ShaderBackgroundProps> = ({
  className,
  theme = "orange",
  animate = false,
  staticTime = 14.2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Vertex shader source code
  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `;

  // Fragment shader source code with intense neon orange lines
  const fsSource = `
    precision highp float;
    uniform vec2 iResolution;
    uniform float iTime;
    uniform int uTheme; // 0 = orange, 1 = purple, 2 = blue

    const float gridSmoothWidth = 0.015;
    const float axisWidth = 0.035;
    const float majorLineWidth = 0.015;
    const float minorLineWidth = 0.008;
    const float majorLineFrequency = 3.0;
    const float minorLineFrequency = 0.75;
    const float scale = 4.2;
    const int linesPerGroup = 6;

    #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
    #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
    #define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

    float drawGridLines(float axis) {
      return drawCrispLine(0.0, axisWidth, axis)
            + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
            + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
    }

    float drawGrid(vec2 space) {
      return min(1.0, drawGridLines(space.x) + drawGridLines(space.y));
    }

    void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      vec4 fragColor;
      vec2 uv = fragCoord.xy / iResolution.xy;
      vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

      float horizontalFade = 1.0 - (cos(uv.x * 3.14159) * 0.5 + 0.5);
      float verticalFade = 1.0 - (cos(uv.y * 3.14159) * 0.5 + 0.5);

      vec4 lineColor;
      vec4 gridColor;
      vec4 bgColor1;
      vec4 bgColor2;

      if (uTheme == 0) {
        // Pure Softree Orange (#FF5812 / #FF6B2C)
        lineColor = vec4(1.0, 0.38, 0.08, 1.0);
        gridColor = vec4(1.0, 0.38, 0.08, 0.16);
        bgColor1 = vec4(0.03, 0.01, 0.003, 1.0);
        bgColor2 = vec4(0.11, 0.038, 0.008, 1.0);
      } else if (uTheme == 1) {
        // Purple Theme
        lineColor = vec4(0.45, 0.25, 0.85, 1.0);
        gridColor = vec4(0.45, 0.25, 0.85, 0.16);
        bgColor1 = vec4(0.08, 0.08, 0.2, 1.0);
        bgColor2 = vec4(0.2, 0.08, 0.4, 1.0);
      } else {
        // Blue Theme
        lineColor = vec4(0.12, 0.62, 1.0, 1.0);
        gridColor = vec4(0.12, 0.62, 1.0, 0.16);
        bgColor1 = vec4(0.02, 0.06, 0.14, 1.0);
        bgColor2 = vec4(0.04, 0.15, 0.30, 1.0);
      }

      vec4 lines = vec4(0.0);

      // Clean, elegant, untwisted smooth parallel laser beams
      for(int l = 0; l < linesPerGroup; l++) {
        float fl = float(l);
        // Smooth calm horizontal glide (no warping, no twisting, no knots)
        float yPos = sin(space.x * 0.26 + fl * 0.14 + iTime * 0.18) * 0.32 + (fl - float(linesPerGroup) * 0.5 + 0.5) * 0.24;
        
        float dist = abs(space.y - yPos);
        // Core crisp laser + smooth soft neon bloom
        float beam = smoothstep(0.012, 0.0, dist) * 1.8 
                   + smoothstep(0.10, 0.0, dist) * 0.65
                   + smoothstep(0.40, 0.0, dist) * 0.18;

        float alpha = (1.0 - abs(fl - float(linesPerGroup) * 0.5) / float(linesPerGroup)) * 0.75 + 0.45;
        lines += beam * lineColor * alpha * horizontalFade;
      }

      // Background gradient
      fragColor = mix(bgColor1, bgColor2, uv.x);
      fragColor *= (0.6 + verticalFade * 0.4);
      fragColor.a = 1.0;

      // Clean straight geometric grid
      float gridVal = drawGrid(space) * horizontalFade * verticalFade;
      fragColor += gridColor * gridVal;

      // Vibrant smooth neon lines
      fragColor += lines;

      gl_FragColor = fragColor;
    }
  `;

  // Helper function to compile shader
  const loadShader = (
    gl: WebGLRenderingContext,
    type: number,
    source: string
  ): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error: ", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  // Initialize shader program
  const initShaderProgram = (
    gl: WebGLRenderingContext,
    vs: string,
    fs: string
  ): WebGLProgram | null => {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vs);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return null;

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) return null;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error(
        "Shader program link error: ",
        gl.getProgramInfoLog(shaderProgram)
      );
      return null;
    }

    return shaderProgram;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported.");
      return;
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (!shaderProgram) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const themeCode = theme === "purple" ? 1 : theme === "blue" ? 2 : 0;

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, "iResolution"),
        time: gl.getUniformLocation(shaderProgram, "iTime"),
        theme: gl.getUniformLocation(shaderProgram, "uTheme"),
      },
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();

    const render = (time: number) => {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(programInfo.program);

      gl.uniform2f(
        programInfo.uniformLocations.resolution,
        canvas.width,
        canvas.height
      );
      gl.uniform1f(programInfo.uniformLocations.time, time);
      if (programInfo.uniformLocations.theme) {
        gl.uniform1i(programInfo.uniformLocations.theme, themeCode);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    if (!animate) {
      // Constant / Static Mode: Render once at fixed time
      render(staticTime);

      const handleResize = () => {
        resizeCanvas();
        render(staticTime);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        if (shaderProgram) gl.deleteProgram(shaderProgram);
      };
    }

    // Animated mode
    window.addEventListener("resize", resizeCanvas);
    let animationFrameId: number;
    const startTime = Date.now();
    const loop = () => {
      const currentTime = (Date.now() - startTime) / 1000;
      render(currentTime);
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (shaderProgram) gl.deleteProgram(shaderProgram);
    };
  }, [theme, animate, staticTime]);

  return (
    <canvas
      ref={canvasRef}
      className={className || "fixed top-0 left-0 w-full h-full -z-10"}
    />
  );
};

export default ShaderBackground;
export { ShaderBackground };
