import './App.css';
import React,{Suspense,useEffect, useRef} from 'react';
import {Canvas} from "@react-three/fiber";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function LowPolyTokyo(){
  const tokyo = useLoader(GLTFLoader, "Models/LowpolyTokyo/LowPolyTokyo.gltf");
  const {camera} = useThree();

  useEffect(()=>{
    
  });

  return (
    <>
    <primitive object={tokyo.scene}/>
  </>
  );
}



function App() {



  return (
    <Canvas camera={{position:[-50,0,10]}}>
    <spotLight position={[5, 5, 0]} intensity={10} castShadow />
    <spotLight position={[-5, 5, 0]} intensity={10} castShadow />
    <spotLight position={[-5, -5, 0]} intensity={10} castShadow />
    <spotLight position={[5, -5, 0]} intensity={10} castShadow />
    <hemisphereLight args={[0xffeeb1, 0x080820, 4]} position={[5, 5, 0]} />
      <Suspense fallback={null}>
        <LowPolyTokyo/>
      </Suspense>

      
    </Canvas>
  );
}

export default App;
