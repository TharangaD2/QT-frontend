"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, animate, easeOut } from "framer-motion";
import { useRouter } from "next/navigation";

export interface ThreeDImageRingProps {
  images: { url: string; label: string; href: string }[];
  width?: number;
  perspective?: number;
  imageDistance?: number;
  initialRotation?: number;
  animationDuration?: number;
  staggerDelay?: number;
  hoverOpacity?: number;
  containerClassName?: string;
  ringClassName?: string;
  imageClassName?: string;
  backgroundColor?: string;
  backgroundImage?: string; 
  draggable?: boolean;
  mobileBreakpoint?: number;
  mobileScaleFactor?: number;
  inertiaPower?: number;
  inertiaTimeConstant?: number;
  inertiaVelocityMultiplier?: number;
 
  
}

export default function ThreeDImageRing({
  images,
  width = 300,
  perspective = 2000,
  imageDistance = 500,
  initialRotation = 180,
  animationDuration = 1.5,
  staggerDelay = 0.1,
  hoverOpacity = 0.5,
  containerClassName,
  ringClassName,
  imageClassName,
  backgroundColor,
  backgroundImage,
  draggable = true,
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.8,
  inertiaPower = 0.8,
  inertiaTimeConstant = 300,
  inertiaVelocityMultiplier = 20,
  
}: ThreeDImageRingProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef(0);
  const currentRotationY = useRef(initialRotation);
  const isDragging = useRef(false);
  const velocity = useRef(0);

  const [currentScale, setCurrentScale] = useState(1);
  const [showImages, setShowImages] = useState(false);

  const angle = useMemo(() => 360 / images.length, [images.length]);

  const getBgPos = (i: number, rot: number, scale: number) => {
    const dist = imageDistance * scale;
    const effective = rot - 180 - i * angle;
    const offset = ((effective % 360 + 360) % 360) / 360;
    return `${-(offset * (dist / 1.5))}px 0px`;
  };

  // Update parallax backgrounds
  useEffect(() => {
    const unsub = rotationY.on("change", (rot) => {
      if (!ringRef.current) return;
      Array.from(ringRef.current.children).forEach((img, i) => {
        (img as HTMLElement).style.backgroundPosition = getBgPos(i, rot, currentScale);
      });
      currentRotationY.current = rot;
    });
    return () => unsub();
  }, [rotationY, currentScale, angle, imageDistance]);

  // Resize scaling
  useEffect(() => {
    const resize = () => {
      const vw = window.innerWidth;
      setCurrentScale(vw <= mobileBreakpoint ? mobileScaleFactor : 1);
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, [mobileBreakpoint, mobileScaleFactor]);

  useEffect(() => {
    setShowImages(true);
  }, []);

  // DRAG HANDLERS
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!draggable) return;
    isDragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    startX.current = clientX;
    rotationY.stop();
    velocity.current = 0;
    if (ringRef.current) ringRef.current.style.cursor = "grabbing";
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!draggable || !isDragging.current) return;
    const clientX =
      "touches" in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const deltaX = clientX - startX.current;
    velocity.current = -deltaX * 0.5;
    rotationY.set(currentRotationY.current + velocity.current);
    startX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (ringRef.current) ringRef.current.style.cursor = "grab";
    currentRotationY.current = rotationY.get();
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    const initial = rotationY.get();
    const boost = velocity.current * inertiaVelocityMultiplier;
    const target = initial + boost;

    animate(initial, target, {
      type: "inertia",
      velocity: boost,
      power: inertiaPower,
      timeConstant: inertiaTimeConstant,
      restDelta: 0.5,
      modifyTarget: (t) => Math.round(t / angle) * angle,
      onUpdate: (v) => rotationY.set(v),
    });

    velocity.current = 0;
  };

  const imageVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden relative select-none ${containerClassName || ""}`}
      style={{
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transform: `scale(${currentScale})`,
        transformOrigin: "center",
      }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >
      <div
        style={{
          perspective: `${perspective}px`,
          width: `450px`,
          height: `600px`,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
      >
        <motion.div
          ref={ringRef}
          className={`absolute w-full h-full ${ringClassName || ""}`}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: draggable ? "grab" : "default",
          }}
        >
          <AnimatePresence>
            {showImages &&
              images.map((item, i) => (
                <motion.div
  key={i}
  className={`absolute w-full h-full group cursor-pointer ${imageClassName || ""}`}
  style={{
    transformStyle: "preserve-3d",
    backgroundImage: `url(${item.url})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backfaceVisibility: "hidden",
    rotateY: i * -angle,
    z: -imageDistance * currentScale,
    transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
    backgroundPosition: getBgPos(i, currentRotationY.current, currentScale),
  }}
  initial="hidden"
  animate="visible"
  exit="hidden"
  variants={imageVariants}
  transition={{
    delay: i * staggerDelay,
    duration: animationDuration,
    ease: easeOut,
  }}
  onClick={() => router.push(item.href)}
  whileHover={{
    scale: 1.08,                 // ⭐ Image zoom
    transition: { duration: 0.4, ease: "easeOut" },
  }}
  onHoverStart={() => {
    if (isDragging.current) return;
    if (!ringRef.current) return;
    Array.from(ringRef.current.children).forEach((el, idx) => {
      if (idx !== i) (el as HTMLElement).style.opacity = `${hoverOpacity}`;
    });
  }}
  onHoverEnd={() => {
    if (!ringRef.current) return;
    Array.from(ringRef.current.children).forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
    });
  }}
>
  {/* ⭐ Hover Label (Centered with smooth fade + scale animation) */}

</motion.div>

              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
