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
      <torusGeometry args={[5, 2, 16, 30]} />
      <meshStandardMaterial wireframe color={hovered ? "hotpink" : "cyan"} />
    </mesh>
  );
}

function App() {
  useEffect(animate);

  return (
    <div className="h-auto bg-[#fac9c3] body">
      <div className="h-screen w-screen absolute top-0 left-0 font-magilio hover:z-10">
        <Canvas className="h-full w-full">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Torus></Torus>
          <Torus position={[-3, -1, 0]}></Torus>
          <Torus position={[3, 1, 0]}></Torus>
          {/* Limites del canvas x: -6/6  y: -3/3*/}
        </Canvas>
      </div>

      <div className=" text-[10vw] h-screen w-screen text-black font-magilio bg-[#fac9c3]">
        <div className="h-full w-full mx-auto flex flex-row items-center">
          <div className="name mx-auto flex flex-col ">
            <p className="up z-20">Ruben</p>
            <p className="down z-0">Dario</p>
          </div>
        </div>
      </div>

      <div className="section2 w-screen h-auto ">
        <div className="wrapper -translate-x-10 -left-10 w-[140vw] -rotate-[10deg]  flex flex-col">
          <div className="lines h-[10%] bg-gray-800 flex align-middle shadow-lg -z-10">
            <div className="lineup flex">
              {new Array(30).fill({ start: 0, end: 10 }).map((value) => (
                <div
                  id={value}
                  className="text-[#d8e2dc] text-2xl my-auto overflow-y-hidden mx-2 font-bold whitespace-nowrap"
                >
                  ABOUT ME
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white h-[20vw] w-full self-center flex flex-col"></div>
          <div className="absolute top-1/2 bg-[#e6d7c9] h-[10vw] w-full -left-10 rotate-[30deg]  z-0 flex flex-col ">
            <div className="aboutme text-black text-[5vw] my-auto font-bold whitespace-nowrap">
              ABOUT ME
            </div>
          </div>
          <div className=" lines h-[10%] bg-gray-800 shadow-lg flex z-10">
            <div className="linedown flex w-[120vw] -translate-x-44">
              {new Array(30).fill({ start: 0, end: 10 }).map((value) => (
                <div
                  id={value}
                  className="text-[#d8e2dc] text-2xl my-auto mx-2 font-bold whitespace-nowrap rotate-180"
                >
                  EM TUOBA
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="my-auto flex justify-center">
        <div className="rounded-lg  w-[80%]  my-auto bg-white shadow-lg">
          <div className="-translate-y-20 mx-auto h-[250px] w-[250px] rounded-full bg-black shadow-xl "></div>
          
            <div className="font-magilio mx-10 text-2xl my-10 text-center">Hi, I'am <b className="text-4xl">Rubén Darío </b> a Developer resident in Colombia 🇨🇴</div>
            <div className="font-magilio mx-10 text-2xl my-10 text-center">I like to build whatever kind of anything.</div>
            

          
        </div>
      </div>
      <div className="h-screen w-screen"></div>
    </div>
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

  gsap.to(".lineup", {
    xPercent: -20,
    scrollTrigger: { trigger: ".section2", scrub: 0.5 },
  });
  
  gsap.to(".linedown", {
    xPercent: 20,
    scrollTrigger: { trigger: ".section2", scrub: 0.5 },
  });

  gsap.to(".aboutme", {
    xPercent: 50,
    scrollTrigger: { trigger: ".section2", scrub: 0.5 },
  });

}

export default App;
