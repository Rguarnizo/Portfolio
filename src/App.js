import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./App.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

function Torus(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;
    
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={0.2}
      onPointerOver={(event) => hover(!hovered)}
      onPointerOut={(event) => hover(!hovered)}
    >
      <torusGeometry args={[5, 2,16,30]}  />
      <meshStandardMaterial wireframe color={hovered ? "hotpink" : "cyan"} />
    </mesh>
  );
}

function App() {
  useEffect(animate);

  return (
    <>
      <div className="h-[120vh] w-screen absolute top-0 left-0 font-magilio hover:z-10">
        <Canvas className="h-full w-full">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Torus ></Torus>
          <Torus position={[-3,-1,0]}></Torus>
          <Torus position={[3,1,0]}></Torus>
          {/* Limites del canvas x: -6/6  y: -3/3*/}
        </Canvas>
      </div>
      <div>
        <div className=" text-[10vw] h-screen w-screen text-black font-magilio bg-[#fac9c3]">
          <div className="h-full w-full mx-auto flex flex-row items-center">
            <div className="name mx-auto flex flex-col ">
              <p className="up z-20">Ruben</p>
              <p className="down z-0">Dario</p>
            </div>
          </div>
        </div>
        
        <div className="section2 h-screen w-screen relative">
          <div className="w-[120vw] absolute top-0 -left-10 bg-blue-500 h-[10%] -rotate-[15deg]"></div>
        </div>
      </div>
    </>
  );
}

function animate() {
  let tl = gsap.timeline();

  tl.to(".up", { yPercent: -50 })
    .to(".down", { yPercent: 50 }, "<")
    .to(".up", { xPercent: -25 })
    .to(".down", { xPercent: 25 }, "<");

  gsap.to(".name", {
    yPercent: -200,
    scrollTrigger: { trigger: ".section2", scrub: true },
  });
}

export default App;
