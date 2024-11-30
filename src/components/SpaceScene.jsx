import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Mercury from "../textures/8k_mercury.jpg";
import sunTexture from "../textures/8k_sun.jpg";
import Venus from "../textures/venus/8k_venus_surface.jpg";
import Earth from "../textures/8k_earth_daymap.jpg";
import Mars from "../textures/8k_mars.jpg";
import Jupiter from "../textures/8k_jupiter.jpg";
import Saturn from "../textures/8k_saturn.jpg";
import Uranus from "../textures/2k_uranus.jpg";
import Neptune from "../textures/2k_neptune.jpg";

const SpaceScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      50000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Orbital controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    let cameraMoveSpeed = 50;

    // Camera movement with arrow keys
    const handleKeyDown = (event) => {
      switch (event.code) {
        case "ArrowUp":
          camera.position.z -= cameraMoveSpeed;
          break;
        case "ArrowDown":
          camera.position.z += cameraMoveSpeed;
          break;
        case "ArrowLeft":
          camera.position.x -= cameraMoveSpeed;
          break;
        case "ArrowRight":
          camera.position.x += cameraMoveSpeed;
          break;
        default:
          break;
      }
      controls.update();
    };

    window.addEventListener("keydown", handleKeyDown);

    // Starfield
    function getStarfield({ numStars = 500 } = {}) {
      function randomSpherePoint() {
        const radius = Math.random() * 20000 + 20000;
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        let x = radius * Math.sin(phi) * Math.cos(theta);
        let y = radius * Math.sin(phi) * Math.sin(theta);
        let z = radius * Math.cos(phi);

        return {
          pos: new THREE.Vector3(x, y, z),
          hue: 0.6,
          minDist: radius,
        };
      }

      const verts = [];
      const colors = [];
      const positions = [];
      let col;

      for (let i = 0; i < numStars; i++) {
        let p = randomSpherePoint();
        const { pos, hue } = p;
        positions.push(p);
        col = new THREE.Color().setHSL(hue, 0.2, Math.random());
        verts.push(pos.x, pos.y, pos.z);
        colors.push(col.r, col.g, col.b);
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
      geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 30,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        color: 0xffffff,
      });

      const points = new THREE.Points(geo, mat);
      return points;
    }

    const stars = getStarfield({ numStars: 6000 });
    scene.add(stars);

    // Improved lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffffff, 2, 0, 0);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Helper function for degrees to radians conversion
    function degToRad(degrees) {
      return (degrees * Math.PI) / 180;
    }

    // Orbital velocity factor
    let velocityFactor = 0.002;
    const scaleFactor = 100000;

    // Keplerian elements for planets (distances and sizes scaled down for visualization)
    const planets = [
      {
        name: "Mercury",
        a: 0.39,
        e: 0.205,
        period: 88,
        radius: 4879,
        photo: Mercury,
        axisTilt: 0.034,
        rotationSpeed: 58.6,
      },
      {
        name: "Venus",
        a: 0.72,
        e: 0.007,
        period: 225,
        radius: 12104,
        photo: Venus,
        axisTilt: 177.36,
        rotationSpeed: 243,
      },
      {
        name: "Earth",
        a: 1.0,
        e: 0.0167,
        period: 365,
        radius: 12756,
        photo: Earth,
        axisTilt: 23.44,
        rotationSpeed: 1,
      },
      {
        name: "Mars",
        a: 1.52,
        e: 0.093,
        period: 687,
        radius: 6792,
        photo: Mars,
        axisTilt: 25.19,
        rotationSpeed: 1.03,
      },
      {
        name: "Jupiter",
        a: 5.2,
        e: 0.048,
        period: 4333,
        radius: 142984,
        photo: Jupiter,
        axisTilt: 3.13,
        rotationSpeed: 0.41,
      },
      {
        name: "Saturn",
        a: 9.58,
        e: 0.054,
        period: 10759,
        radius: 120536,
        photo: Saturn,
        axisTilt: 26.73,
        rotationSpeed: 0.45,
      },
      {
        name: "Uranus",
        a: 19.22,
        e: 0.047,
        period: 30687,
        radius: 51118,
        photo: Uranus,
        axisTilt: 97.77,
        rotationSpeed: 0.72,
      },
      {
        name: "Neptune",
        a: 30.05,
        e: 0.009,
        period: 60190,
        radius: 49528,
        photo: Neptune,
        axisTilt: 28.32,
        rotationSpeed: 0.67,
      },
    ];

    // Create the Sun
    const sunGeometry = new THREE.SphereGeometry(
      (1391400 / scaleFactor) * 6,
      64,
      64
    );
    const sunMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(sunTexture),
      emissive: 0xffff00,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, 0);
    scene.add(sun);

    // Solve Kepler's equation
    function solveKepler(M, e, tolerance = 1e-6) {
      let E = M;
      let deltaE = 1;
      while (deltaE > tolerance) {
        let newE = M + e * Math.sin(E);
        deltaE = Math.abs(newE - E);
        E = newE;
      }
      return E;
    }

    const distanceScaleFactor = 100;
    const orbitOffset = 150;

    // Calculate position function
    function calculatePosition(a, e, period, time) {
      const M = ((2 * Math.PI) / period) * time;
      const E = solveKepler(M, e);
      const nu =
        2 *
        Math.atan2(
          Math.sqrt(1 + e) * Math.sin(E / 2),
          Math.sqrt(1 - e) * Math.cos(E / 2)
        );
      const r = a * distanceScaleFactor * (1 - e * Math.cos(E)) + orbitOffset;

      const x = r * Math.cos(nu);
      const y = r * Math.sin(nu);
      return { x, y, z: 0 };
    }

    // Create planet meshes
    const planetMeshes = planets.map((planet) => {
      const geometry = new THREE.SphereGeometry(
        (planet.radius * 30) / scaleFactor,
        64,
        64
      );
      const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(planet.photo),
        metalness: 0,
        roughness: 0.8,
      });

      const mesh = new THREE.Mesh(geometry, material);

      const initialPosition = calculatePosition(
        planet.a,
        planet.e,
        planet.period,
        0
      );
      mesh.rotation.z = degToRad(planet.axisTilt);
      mesh.position.set(initialPosition.x, 0, initialPosition.y);

      scene.add(mesh);
      return { ...planet, mesh };
    });

    // Create orbits
    const orbits = planets.map((planet) => {
      const points = [];
      const segments = 1000;
      for (let i = 0; i <= segments; i++) {
        const angle = degToRad((i / segments) * 360);
        const r =
          (planet.a * distanceScaleFactor * (1 - planet.e * planet.e)) /
            (1 + planet.e * Math.cos(angle)) +
          orbitOffset;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        points.push(new THREE.Vector3(x, 0, y));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0xffffff });
      const orbit = new THREE.Line(geometry, material);
      scene.add(orbit);
      return orbit;
    });

    // Position camera
    camera.position.set(0, 100, 500);
    camera.lookAt(scene.position);

    // Animation loop
    let time = 0;
    function animate() {
      requestAnimationFrame(animate);

      // Update planet positions
      planetMeshes.forEach((planet) => {
        const position = calculatePosition(
          planet.a,
          planet.e,
          planet.period,
          time * velocityFactor
        );
        planet.mesh.position.set(position.x, 0, position.y);
        planet.mesh.rotation.y += velocityFactor * (1 / planet.rotationSpeed);
      });

      stars.rotation.y -= 0.0002;

      time += 1;
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default SpaceScene;
