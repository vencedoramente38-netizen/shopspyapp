"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.5;
      case "fast":
        return 1.2;
      default:
        return 0.8;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let w = (ctx.canvas.width = canvas.offsetWidth || window.innerWidth);
    let h = (ctx.canvas.height = canvas.offsetHeight || 500);
    ctx.filter = `blur(${blur}px)`;

    const waveColors = colors ?? [
      "#D0011B", // Brand Red
      "#f43f5e", // Rose
      "#fb923c", // Orange peach
      "#9f1239", // Deep Red
      "#fda4af", // Light pink
    ];

    let nt = 0;
    const speedFactor = getSpeed();

    const drawWaves = () => {
      nt += speedFactor * 0.01;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = backgroundFill || "transparent";
      ctx.fillRect(0, 0, w, h);

      const numWaves = 5;
      for (let i = 0; i < numWaves; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || (window.innerWidth < 768 ? 20 : 40);
        ctx.strokeStyle = waveColors[i % waveColors.length];
        ctx.globalAlpha = waveOpacity;

        for (let x = 0; x < w; x += 10) {
          // Combined multi-frequency sine wave to simulate organic noise
          const angle1 = (x * 0.003) + (nt * (1 + i * 0.1));
          const angle2 = (x * 0.007) - (nt * (0.8 + i * 0.15));
          const angle3 = (x * 0.001) + (nt * 0.5);
          
          const y = (Math.sin(angle1) * 30) + 
                    (Math.cos(angle2) * 20) + 
                    (Math.sin(angle3) * 15);
          
          if (x === 0) {
            ctx.moveTo(x, y + h * 0.5);
          } else {
            ctx.lineTo(x, y + h * 0.5);
          }
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      drawWaves();
      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      w = ctx.canvas.width = canvas.offsetWidth || window.innerWidth;
      h = ctx.canvas.height = canvas.offsetHeight || 500;
      ctx.filter = `blur(${blur}px)`;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [blur, speed, colors, waveWidth, backgroundFill, waveOpacity]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 w-full h-full z-0 block"
        ref={canvasRef}
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      <div className={cn("relative z-10 w-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
