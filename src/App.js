import "./App.css";

import React, { Suspense, useEffect, useRef } from "react";

import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function LowPolyTokyo() {
  const tokyo = useLoader(GLTFLoader, "Models/LowpolyTokyo/LowPolyTokyo.gltf");
  const { camera, scene } = useThree();

  useEffect(() => {

    scene.background = new THREE.Color('#c19dc7');

    tokyo.scene.rotation.y = Math.PI;
    tokyo.scene.castShadow = false;
    tokyo.scene.receiveShadow = false;

    let tl = gsap.timeline({scrollTrigger: {
      pin: "#scene",
      trigger:"#scene",
      scrub: 2,
      start: "top top",
      end: "500%",
    }});

    tl.fromTo(camera.position,{ x: -15, y: 5, z: 2.5 ,duration:3},{ x: -8, z: 0,y:6 })
      .to(camera.position, {x:-4,y:7,z:0})
      .to(camera.rotation, {y:-(Math.PI/2)*1.5},"<")
      .to(camera.position, {x:-0.5,y:9,z:2.5})
      .to(camera.rotation, {y:-(Math.PI/2)*1.8},"<")
      .to(camera.position,{x:0,y:10,z:5})
      .to(camera.rotation,{y:-(Math.PI / 2)*2},"<")
      .to(camera.position,{x:1.5,y:11,z:8})
      .to(camera.rotation,{y:-(Math.PI / 2)*2.2},"<");        
  },[]);

  useEffect(()=>{
    gsap.to(camera.position, { x: -15, y: 5, z: 2.5 ,duration:3});
  },[]);

  return (
    <>
      <primitive object={tokyo.scene} />
    </>
  );
}

function App() {
  gsap.registerPlugin(ScrollTrigger);


  return (
    <Canvas camera={{ position: [-50, 0, 10] }} id={"scene"} onCreated={({ gl, scene }) => {    
      
      
    }}>
      <hemisphereLight args={[0xffeeb1, 0x080820, 1]} castShadow/>
      <OrbitControls/>
      <spotLight position={[-50, 50, 50]} args={[0xffa95c, 1]} castShadow />
      <Suspense fallback={null}>
        <LowPolyTokyo />
      </Suspense>
    </Canvas>
  );
}

export default App;
