import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StartButton from "../assets/images/StartButton.png";

const WormholeAnimation = ({ onAnimationComplete }) => {
  const canvasRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const wormholeRef = useRef(null);

  useEffect(() => {
    let wormhole;

    const initAnimation = () => {
      wormhole = new WormholeEffect(canvasRef.current, onAnimationComplete);
      wormholeRef.current = wormhole;
      wormhole.initialize();
      animate();
    };

    const animate = () => {
      if (wormhole) {
        wormhole.render();
        requestAnimationFrame(animate);
      }
    };

    if (canvasRef.current) {
      initAnimation();
    }

    return () => {
      if (wormhole) {
        wormhole.destroy();
      }
    };
  }, [onAnimationComplete]);

  const handleStart = () => {
    setIsStarted(true);
    if (wormholeRef.current) {
      wormholeRef.current.startJourney();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
      {!isStarted && (
        // <button
        //   className=""

        // >
        <img
          src={StartButton}
          onClick={handleStart}
          className=" w-[8rem] h-[8rem] absolute cursor-pointer  text-lg font-bold text-white "
        />
        // </button>
      )}
    </div>
  );
};

class WormholeEffect {
  constructor(canvas, onAnimationComplete) {
    this.canvas = canvas;
    this.onAnimationComplete = onAnimationComplete;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.hue = 0;
    this.hue2 = 0.05;
    this.loadedTextures = 0;
    this.totalTextures = 2;
    this.tunnel = [];
    this.texture = [];
    this.baseSpeed = 0.0001;
    this.rotationSpeed = 0.002;
    this.textureSpeed = 0.001;
    this.journeyStartTime = 0;
    this.journeyDuration = 5000; // 10 seconds
    this.zoomDuration = 3000; // 2 seconds
    this.isJourneyStarted = false;
    this.isZooming = false;
  }

  initialize() {
    this.camera.position.set(0, 0, 50);
    this.scene.add(this.camera);
    this.loadTextures();
  }

  loadTextures() {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "";
    loader.load(
      "https://cdn.rawgit.com/devildrey33/devildrey33/ddb01d71/Web/Graficos/Banner_WormHole11.jpg",
      this.onTextureLoaded.bind(this, 0)
    );
    loader.load(
      "https://cdn.rawgit.com/devildrey33/devildrey33/ddb01d71/Web/Graficos/Banner_WormHole1.2.jpg",
      this.onTextureLoaded.bind(this, 1)
    );
  }

  onTextureLoaded(index, texture) {
    texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set(1, 2);
    this.tunnel[index] = new THREE.Mesh(
      new THREE.CylinderGeometry(
        index * 10 + 50,
        index * 10 + 50,
        1000,
        16,
        32,
        true
      ),
      new THREE.MeshBasicMaterial({
        color: 0x666666,
        transparent: true,
        alphaMap: texture,
        side: THREE.BackSide,
        opacity: index === 0 ? 0.3 : 1,
      })
    );
    this.tunnel[index].rotation.x = 90 * (Math.PI / 180);
    this.tunnel[index].position.z = 128 - index;
    this.scene.add(this.tunnel[index]);
    this.texture[index] = texture;

    this.loadedTextures++;
    if (this.loadedTextures === this.totalTextures) {
      this.onLoadingComplete();
    }
  }

  onLoadingComplete() {
    // Implement loading complete logic if needed
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  startJourney() {
    this.isJourneyStarted = true;
    this.journeyStartTime = Date.now();
  }

  updateJourney() {
    if (!this.isJourneyStarted) return;

    const elapsedTime = Date.now() - this.journeyStartTime;

    if (elapsedTime < this.journeyDuration) {
      const progress = elapsedTime / this.journeyDuration;
      const easedProgress = this.easeInOutCubic(progress);

      // Update speeds based on progress
      this.baseSpeed = 0.0001 + easedProgress * 0.01;
      this.rotationSpeed = 0.002 + easedProgress * 0.1;
      this.textureSpeed = 0.001 + easedProgress * 0.05;

      // Move camera through the tunnel
      this.camera.position.z = 50 - easedProgress * 200;
    } else if (elapsedTime < this.journeyDuration + this.zoomDuration) {
      // Start zooming
      this.isZooming = true;
      const zoomProgress =
        (elapsedTime - this.journeyDuration) / this.zoomDuration;
      const easedZoomProgress = this.easeInOutCubic(zoomProgress);

      // Zoom the camera
      this.camera.position.z = -150 - easedZoomProgress * 300;

      // Increase tunnel rotation and texture speed for zoom effect
      this.rotationSpeed = 0.1 + easedZoomProgress * 0.3;
      this.textureSpeed = 0.05 + easedZoomProgress * 0.15;

      // Fade out
      this.tunnel.forEach((t) => {
        t.material.opacity = 1 - easedZoomProgress;
      });
    } else {
      // Journey and zoom complete, transition to landing page
      this.isJourneyStarted = false;
      this.isZooming = false;
      this.onAnimationComplete();
    }
  }

  render() {
    this.updateJourney();

    if (this.tunnel[0]) {
      this.hue += this.baseSpeed;
      if (this.hue > 1) {
        this.hue = 0;
      }
      this.tunnel[0].material.color.setHSL(this.hue, 0.7, 0.7);
      this.tunnel[0].rotation.y += this.rotationSpeed;
      this.texture[0].offset.y -= this.textureSpeed;
    }

    if (this.tunnel[1]) {
      this.hue2 += this.baseSpeed;
      if (this.hue2 > 1) {
        this.hue2 = 0;
      }
      this.tunnel[1].material.color.setHSL(this.hue2, 0.7, 0.7);
      this.tunnel[1].rotation.y -= this.rotationSpeed;
      this.texture[1].offset.y -= this.textureSpeed;
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
    this.renderer.dispose();
  }
}

export default WormholeAnimation;
