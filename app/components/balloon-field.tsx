"use client"

import { useState, useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import BalloonObject from "./balloon-object"

interface BalloonFieldProps {
  settings: {
    balloonCount: number
    spawnInterval: number
    balloonLifetime: number
  }
  onBalloonPop: () => void
  clickPosition?: { x: number; y: number }
}

interface Balloon {
  id: number
  position: THREE.Vector3
  color: string
  scale: number
  createdAt: number
}

// Random color generator
const getRandomColor = () => {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
  return colors[Math.floor(Math.random() * colors.length)]
}

export default function BalloonField({ settings, onBalloonPop, clickPosition }: BalloonFieldProps) {
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [nextId, setNextId] = useState(1)
  const { camera } = useThree()
  const raycaster = useRef(new THREE.Raycaster())
  const balloonRefs = useRef<{ [key: number]: THREE.Mesh | null }>({})
  const clickTime = useRef(0)

  // Handle mouse click
  useEffect(() => {
    const handleClick = () => {
      // Set raycaster from camera center (for FPS style)
      raycaster.current.setFromCamera(new THREE.Vector2(0, 0), camera)

      // Get all balloon meshes
      const meshes = Object.values(balloonRefs.current).filter(Boolean) as THREE.Mesh[]

      // Check for intersections
      const intersects = raycaster.current.intersectObjects(meshes)

      if (intersects.length > 0) {
        const hitObject = intersects[0].object as THREE.Mesh
        const balloonId = Number.parseInt(hitObject.userData.id)

        // Remove the hit balloon
        setBalloons((prev) => prev.filter((b) => b.id !== balloonId))

        // Trigger balloon pop callback
        onBalloonPop()

        // Record click time for visual feedback
        clickTime.current = Date.now()
      }
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [camera, onBalloonPop])

  // Spawn balloons
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (balloons.length < settings.balloonCount) {
        const newBalloon: Balloon = {
          id: nextId,
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            Math.random() * 5 - 2,
            (Math.random() - 0.5) * 20 - 10,
          ),
          color: getRandomColor(),
          scale: Math.random() * 0.5 + 0.5,
          createdAt: Date.now(),
        }

        setBalloons((prev) => [...prev, newBalloon])
        setNextId((prev) => prev + 1)
      }
    }, settings.spawnInterval)

    return () => clearInterval(spawnInterval)
  }, [balloons.length, nextId, settings.balloonCount, settings.spawnInterval])

  // Remove expired balloons
  useEffect(() => {
    const checkExpired = setInterval(() => {
      const now = Date.now()
      setBalloons((prev) => prev.filter((balloon) => now - balloon.createdAt < settings.balloonLifetime))
    }, 500)

    return () => clearInterval(checkExpired)
  }, [settings.balloonLifetime])

  // Animate balloons (slight floating motion)
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    Object.entries(balloonRefs.current).forEach(([id, mesh]) => {
      if (mesh) {
        // Add gentle floating motion
        mesh.position.y += Math.sin(elapsedTime * 2 + Number.parseInt(id)) * 0.003
      }
    })
  })

  // Debug info
  useEffect(() => {
    console.log(`Balloons in scene: ${balloons.length}`)
  }, [balloons.length])

  return (
    <group>
      {balloons.map((balloon) => (
        <BalloonObject
          key={balloon.id}
          balloon={balloon}
          ref={(mesh) => {
            balloonRefs.current[balloon.id] = mesh
          }}
        />
      ))}

      {/* Visual feedback for clicks */}
      <mesh position={[0, 0, -1]} scale={0.02}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="white" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

