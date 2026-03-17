"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  swingAmount: number;
  swingSpeed: number;
  phase: number;
}

export default function PetalAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const petalCount = isMobile ? 20 : 35;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createPetal = (startFromTop = false): Petal => ({
      x: Math.random() * canvas.width,
      y: startFromTop ? -20 : Math.random() * canvas.height,
      size: Math.random() * 10 + 6,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      swingAmount: Math.random() * 40 + 20,
      swingSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    });

    petalsRef.current = Array.from({ length: petalCount }, () =>
      createPetal(false)
    );

    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.globalAlpha = petal.opacity;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        petal.size * 0.3,
        -petal.size * 0.5,
        petal.size,
        -petal.size * 0.3,
        petal.size,
        0
      );
      ctx.bezierCurveTo(
        petal.size,
        petal.size * 0.3,
        petal.size * 0.3,
        petal.size * 0.5,
        0,
        0
      );

      const gradient = ctx.createRadialGradient(
        petal.size * 0.4,
        0,
        0,
        petal.size * 0.4,
        0,
        petal.size
      );
      gradient.addColorStop(0, "#fbb6ce");
      gradient.addColorStop(0.5, "#f9a8d4");
      gradient.addColorStop(1, "#f472b6");

      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach((petal) => {
        petal.y += petal.speed;
        petal.x +=
          Math.sin(petal.y * petal.swingSpeed + petal.phase) *
          petal.swingAmount *
          0.02;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > canvas.height + 20) {
          Object.assign(petal, createPetal(true));
        }

        drawPetal(petal);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
