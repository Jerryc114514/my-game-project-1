"use client"

import { forwardRef, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface BalloonProps {
  balloon: {
    id: number
    position: THREE.Vector3
    color: string
    scale: number
  }
}

const BalloonObject = forwardRef<THREE.Mesh, BalloonProps>(({ balloon }, ref) => {
  const [hovered, setHovered] = useState(false)
  const localRef = useRef<THREE.Mesh>(null)

  // Combine refs
  const setRefs = (mesh: THREE.Mesh | null) => {
    // @ts-ignore - This is a valid pattern for forwarded refs
    if (typeof ref === "function") ref(mesh)
    else if (ref) ref.current = mesh
    localRef.current = mesh
  }

  // Balloon hover effect
  useFrame(() => {
    if (localRef.current) {
      if (hovered) {
        localRef.current.scale.lerp(
          new THREE.Vector3(balloon.scale * 1.1, balloon.scale * 1.1, balloon.scale * 1.1),
          0.1,
        )
      } else {
        localRef.current.scale.lerp(new THREE.Vector3(balloon.scale, balloon.scale, balloon.scale), 0.1)
      }
    }
  })

  return (
    <mesh
      ref={setRefs}
      position={balloon.position}
      userData={{ id: balloon.id.toString() }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={balloon.color}
        roughness={0.2}
        metalness={0.1}
        emissive={hovered ? balloon.color : "#000000"}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
    </mesh>
  )
})

BalloonObject.displayName = "BalloonObject"

export default BalloonObject

