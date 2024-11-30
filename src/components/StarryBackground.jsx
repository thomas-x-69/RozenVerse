import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

function RotatingStars() {
  const starsRef = useRef();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.00005;
      starsRef.current.rotation.y += 0.00005;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={50}
      depth={300}
      count={50000 * 4}
      factor={6}
      saturation={10}
      fade
    />
  );
}

const StarryBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas>
        <RotatingStars />
      </Canvas>
    </div>
  );
};

export default StarryBackground;
