"use client";

import Image from "next/image";
import { useState } from "react";

interface FallbackImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function FallbackImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc || "/placeholder-exercise.png"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized={true}
      onError={() => setImgSrc("/placeholder-exercise.png")}
    />
  );
}
