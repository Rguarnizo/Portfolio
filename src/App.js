import "./App.css";

import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { Canvas, useFrame} from "@react-three/fiber";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Sakura from "./3DComponents/sakura";
import Lamp from "./3DComponents/lamp";
import Text from "./3DComponents/text";

function LowPolyTokyo() {
  const tokyo = useLoader(GLTFLoader, "Models/LowpolyTokyo/Test/Test/LowPolyTokyo.gltf");
  const { camera, scene } = useThree();
  const light = useRef();


  useEffect(() => {
 
    tokyo.scene.position.set(0,1,0);
    tokyo.scene.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; node.receiveShadow=true; } } );

    tokyo.scene.rotation.y = -Math.PI -0.5;

    tokyo.scene.castShadow = true;
    tokyo.scene.receiveShadow = true;

    scene.background = new THREE.Color("#000000");
    
    console.log(light);
    console.log(tokyo);

    let tl = gsap.timeline({
      scrollTrigger: {
        pin: "#scene",
        trigger: "#scene",
        scrub: 2,
        start: "top top",
        end: "500%",
      },
    });
    
    tl.fromTo(
      camera.position,
      { x: -15, y: 5, z: 2.5, duration: 3 },
      { x: -8, z: 0, y: 6 },
      "<"
    )
      .to(camera.position, { x: -4, y: 7, z: 0 })
      .to(camera.rotation, { y: -(Math.PI / 2) * 1.5 }, "<")
      .to(camera.position, { x: -0.5, y: 9, z: 2.5 })
      .to(camera.rotation, { y: -(Math.PI / 2) * 1.8 }, "<")
      // .to(camera.position, { x: 0, y: 10, z: 5 })
      // .to(camera.rotation, { y: -(Math.PI / 2) * 2 }, "<")
      .to(camera.position, { x: 1.5, y: 11, z: 8 })
      .to(camera.rotation, { y: -(Math.PI / 2) * 2.2 }, "<");

      
      
      
  }, []);



  return (
    <>
      <primitive object={tokyo.scene} />
      <spotLight
          ref={light}
          args={[0xffa95c,5]}
          position={[-30,30,-20]}
          castShadow
          visible
        />
      <spotLight          
          args={[0xffa95c,0.5]}
          position={[-30,30,20]}
          castShadow
          visible
        />        
        <Sakura position={[-4,0,-5]}  rotation={[0,0,0]}/>
        <Sakura position={[-12,0,-8]}  rotation={[0,Math.PI/2,0]}/>
        <Sakura position={[10,0,-11]} rotation={[0,Math.PI/2,0]}/>
        <Lamp   position={[-4,7,-4]}/>
        <Lamp   position={[-4,9,-2]}/>
        <Lamp   position={[-5,8,-6]}/>
        <Lamp   position={[-0.7,13,9.5]} intensity={1.5}/>
        <Lamp   position={[2.9,13,9.5]} intensity={1.5}/>
        
    </>
  );
}

function App() {
  gsap.registerPlugin(ScrollTrigger);



  return (
    <>
      <Canvas camera={{ position: [-50, 0, 10] }} id={"scene"} shadows>
        {/* <ambientLight intensity={0.3}/> */}
        <OrbitControls/>
        <Suspense fallback={null}>
          <LowPolyTokyo />
          <Text children={"ruben"} size={0.1} position={[-15,6,0]} rotation={[0,-Math.PI/2,0]}/>
          <Text children={"portfolio"} size={0.1} position={[-15,5,0]} rotation={[0,-Math.PI/2,0]}/>
          <Text children={"rudevio"} size={0.1} position={[-15,4,0]} rotation={[0,-Math.PI/2,0]}/>
        </Suspense>
        <axesHelper />
      </Canvas>
      <div className="main">
        {/* <h1 className="font-olegos">A Regular<br/> portfolio of <br/>Rubén Darío</h1> */}
      </div>
    </>
  );
}

export default App;
