"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import styles from "./GlobeSection.module.css";

// Same node network used in the standalone demo — swap these for real
// campus / partner coordinates whenever you have them.
const NODES = [
  { name: "Coimbatore", lat: 11.0, lon: 76.9 },
  { name: "Bengaluru", lat: 12.9, lon: 77.6 },
  { name: "Chennai", lat: 13.0, lon: 80.2 },
  { name: "Mumbai", lat: 19.0, lon: 72.8 },
  { name: "Delhi NCR", lat: 28.6, lon: 77.2 },
  { name: "Singapore", lat: 1.35, lon: 103.8 },
];
const ARC_PAIRS = [[0, 1], [1, 2], [1, 3], [3, 4], [1, 5]];

function latLongToVec3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Procedural granular blue texture — no image asset, no licensing concerns.
function useBlueTexture() {
  return useMemo(() => {
    if (typeof window === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 512;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#030712"; // Deep dark blue-black base
    ctx.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < 9000; i++) {
      const x = Math.random() * c.width;
      const y = Math.random() * c.height;
      const r = Math.random() * 2.2 + 0.4;
      const shade = 140 + Math.random() * 100;
      // Blue/Indigo shades
      ctx.fillStyle = `rgba(${(shade * 0.2) | 0},${(shade * 0.5) | 0},${shade},${Math.random() * 0.5 + 0.15})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    return new THREE.CanvasTexture(c);
  }, []);
}

function Arc({ start, end }) {
  const curve = useMemo(() => {
    const mid = start.clone().add(end).multiplyScalar(0.5);
    mid.setLength(2.34 + start.distanceTo(end) * 0.35);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(60), [curve]);
  const pulseRef = useRef();
  const t = useRef(Math.random());

  useFrame(() => {
    t.current = (t.current + 0.004) % 1;
    if (pulseRef.current) pulseRef.current.position.copy(curve.getPointAt(t.current));
  });

  return (
    <>
      <line>
        <bufferGeometry setFromPoints={points} />
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.35} />
      </line>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </>
  );
}

function Globe() {
  const groupRef = useRef();
  const texture = useBlueTexture();
  const nodePositions = useMemo(
    () => NODES.map((n) => latLongToVec3(n.lat, n.lon, 2.34)),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2.3, 96, 96]} />
        {texture && (
          <meshStandardMaterial
            map={texture}
            metalness={0.75}
            roughness={0.38}
            emissive={new THREE.Color(0x0a163a)}
            emissiveIntensity={0.12}
          />
        )}
      </mesh>

      <mesh>
        <sphereGeometry args={[2.34, 64, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      {nodePositions.map((pos, i) => (
        <mesh key={NODES[i].name} position={pos}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#a5b4fc" />
        </mesh>
      ))}

      {ARC_PAIRS.map(([i, j]) => (
        <Arc key={`${i}-${j}`} start={nodePositions[i]} end={nodePositions[j]} />
      ))}
    </group>
  );
}

export default function GlobeSection() {
  return (
    <section className={styles.globeSection}>
      <div className={styles.label}>
        <span className={styles.eyebrow}>Placement network</span>
        <h2>Reaching where the offers are.</h2>
      </div>
      <div className={styles.canvasWrap}>
        <Canvas camera={{ position: [0, 0.4, 7.2], fov: 45 }}>
          <ambientLight color="#0f172a" intensity={0.6} />
          <pointLight color="#60a5fa" intensity={2.2} position={[4, 3, 4]} />
          <pointLight color="#3b82f6" intensity={0.5} position={[-4, -2, -3]} />
          <Globe />
        </Canvas>
      </div>
    </section>
  );
}
