import * as THREE from 'three'
import React, { useMemo, useRef, useEffect } from 'react'
import { useLoader, useFrame} from '@react-three/fiber'

export default function Text({ children, vAlign = 'center', hAlign = 'center', size = 1.5, color = '#ffffff', ...props }) {
  const font = useLoader(THREE.FontLoader, '/Quinke.json');
  const config = useMemo(
    () => ({ font, size: 160, height: 10, curveSegments: 32, bevelEnabled: true, bevelThickness: 0.2, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 16 }),
    [font]
  )
  const mesh = useRef()

  useEffect(()=>{
      console.log(mesh);
  })

  useFrame(() =>{
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  })

  return (
    <group ref={mesh} {...props} scale={[0.1 * size, 0.1 * size, 0.1*size]}>
      <mesh>
        <textGeometry args={[children, config]}/>
        <meshMatcapMaterial color={color}/>
      </mesh>
    </group>
  )
}
