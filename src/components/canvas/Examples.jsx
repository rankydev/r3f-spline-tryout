'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial, OrbitControls } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}

export const Logo = ({ route = '/blob', ...props }) => {
  const mesh = useRef(null)
  const router = useRouter()

  const [hovered, hover] = useState(false)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />
      <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </group>
  )
}

export function Duck(props) {
  const { scene } = useGLTF('/duck.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}
export function Dog(props) {
  const { scene } = useGLTF('/dog.glb')

  return <primitive object={scene} {...props} />
}
export function Cube(props) {
  const { scene } = useGLTF('/cube.glb')
  const cubeRef = useRef(null)
  const rotationSpeed = 0.01;

  // useFrame((state, delta) => {
  //   if (cubeRef.current) {
  //     cubeRef.current.rotation.y += rotationSpeed;
  //   }
  // });

  return <primitive object={scene} {...props} ref={cubeRef} />
}

export function Icon1(props) {
  const { scene } = useGLTF('/icon1.glb')
  const icon1Ref = useRef(null);

  // useFrame((state, delta) => {
  //   if(icon1Ref) {
  //     const children = icon1Ref.current.children[0].children[0].children;
  //     console.log(children)
  //     if(children[5].position.y < 50 || children[6].position.y < 100 || (children[0].position.y < 180 && children[0].scale.y < 1 && children[0].position.y < 1)) {
  //       children[5].position.y += 1;
  //       children[6].position.y += 2;
        
  //       children[0].position.y += 5;
  //       children[0].scale.y += 0.03;
  //       children[0].rotation.y += 0.03;
  //     }
  //   }
  // });

  return <primitive object={scene} {...props} ref={icon1Ref}/>
}

