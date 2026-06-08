"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { useRef, useState } from "react"
import * as THREE from "three"

type StateType = "idle" | "thinking" | "listening"

function CatModel({ state }: { state: StateType }) {
  const { scene } = useGLTF("/models/cartoon_cat.glb")
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!ref.current) return

    // idle float
    if (state === "idle") {
      ref.current.position.y = -1.4 + Math.sin(Date.now() * 0.002) * 0.05
      ref.current.rotation.y = 0
    }

    // thinking rotate
    if (state === "thinking") {
      ref.current.rotation.y += 0.01
      ref.current.position.y = -1.4
    }

    // listening pulse
    if (state === "listening") {
      const scale = 0.6 + Math.sin(Date.now() * 0.01) * 0.02
      ref.current.scale.setScalar(scale)
      ref.current.position.y = -1.4
    }
  })

  return (
    <group ref={ref} position={[0, -1.4, 0]} scale={0.6}>
      <primitive object={scene} />
    </group>
  )
}

export default function FloatingAssistant() {
  const [state, setState] = useState<StateType>("idle")

  // drag state
  const [pos, setPos] = useState({ x: 20, y: 20 })
  const [dragging, setDragging] = useState(false)
  const offset = useRef({ x: 0, y: 0 })

  const cycleState = () => {
    setState((prev) =>
      prev === "idle"
        ? "listening"
        : prev === "listening"
        ? "thinking"
        : "idle"
    )
  }

  // drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true)

    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return

    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    })
  }

  const onMouseUp = () => {
    setDragging(false)
  }

  return (
    <div
      onClick={cycleState}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 170,
        height: 170,
        zIndex: 999999,
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
        background: "transparent",
      }}
    >
      <Canvas camera={{ position: [0, 1.5, 5.5], fov: 65 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 3, 2]} intensity={1} />

        <CatModel state={state} />
      </Canvas>
    </div>
  )
}
