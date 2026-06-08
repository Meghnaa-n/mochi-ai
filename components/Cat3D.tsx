"use client"

import { Canvas } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { useState } from "react"

function CatModel() {
  const { scene } = useGLTF("/models/cartoon_cat.glb")
  return <primitive object={scene} scale={0.8} />
}

export default function Cat3D() {
  const [state, setState] = useState("idle")

  return (
    <div
      onClick={() =>
        setState((s) =>
          s === "idle" ? "thinking" : s === "thinking" ? "listening" : "idle"
        )
      }
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 140,
        height: 140,
        zIndex: 999999,
        cursor: "pointer"
      }}
    >
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 2]} />

        <CatModel />
      </Canvas>
    </div>
  )
}