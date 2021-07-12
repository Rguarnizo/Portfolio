import * as THREE from 'three'
import React, { useMemo, useRef, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'

export default function Text({ children, vAlign = 'center', hAlign = 'center', size = 1.5, color = '#000000', ...props }) {
  const font = useLoader(THREE.FontLoader, '/Olegos_Regular.json');
  const config = useMemo(
    () => ({ font, size: 40, height: 30, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
    [font]
  )
  const mesh = useRef()

  useEffect(()=>{
      console.log(mesh);
  })

  return (
    <group ref={mesh} {...props} scale={[0.1 * size, 0.1 * size, 0.1*size]}>
      <mesh >
        <textGeometry args={[children, config]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  )
}
