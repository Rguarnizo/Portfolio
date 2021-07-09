import "./App.css";

import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { Canvas, useFrame} from "@react-three/fiber";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


function LowPolyTokyo() {
  const tokyo = useLoader(GLTFLoader, "Models/LowpolyTokyo/Test/LowPolyTokyo.gltf");
  const { camera, scene } = useThree();
  const light = useRef();

  const textureLoader = new THREE.TextureLoader();

			


  useEffect(() => {
 
    tokyo.scene.position.set(0,0,0);
    tokyo.scene.traverse( function( node ) { if ( node instanceof THREE.Object3D ) { node.castShadow = true; node.receiveShadow=true; } } );

    // tokyo.scene.rotation.y = Math.PI;

    tokyo.scene.castShadow = true;
    tokyo.scene.receiveShadow = true;
    // tokyo.materials["water.003"].visible= false;
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
      .to(camera.position, { x: 0, y: 10, z: 5 })
      .to(camera.rotation, { y: -(Math.PI / 2) * 2 }, "<")
      .to(camera.position, { x: 1.5, y: 11, z: 8 })
      .to(camera.rotation, { y: -(Math.PI / 2) * 2.2 }, "<");

      tl.fromTo(light.current.position,{x:50,y:50,z:50},{x:20,y:20,z:0},0);
      
      
  }, []);


  return (
    <>
      <primitive object={tokyo.scene} />
      <spotLight
          ref={light}
          args={[0xffa95c,5]}
          position={[20,20,0]}
          castShadow
        />
    </>
  );
}

function App() {
  gsap.registerPlugin(ScrollTrigger);



  return (
    <>
      <Canvas camera={{ position: [-50, 0, 10] }} id={"scene"} shadows>
        {/* <ambientLight/> */}
        <OrbitControls/>
        <Suspense fallback={null}>
          <LowPolyTokyo />
        </Suspense>
      </Canvas>
      <div className="main">
        <h1 className="font-olegos">A Regular<br/> portfolio of <br/>Rubén Darío</h1>
      </div>
    </>
  );
}

export default App;
