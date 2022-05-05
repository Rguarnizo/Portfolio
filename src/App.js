
import gsap from "gsap";
import "./App.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import {useRef, useState, useEffect} from "react";
import { BsGithub, BsLinkedin, BsMedium } from "react-icons/bs";
import SplitLetters from "./components/SplitLetters"

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(animate);

  useEffect(oneTime, []);

  return (
    <div className="h-auto bg-[#fac9c3] body">
      <div className="circle fixed w-8 h-8 border-zinc-700 border-2 rounded-full pointer-events-none"></div>
      <FloatingIcons/>
      <ThreeScene/>
      <Name/>
      <AboutMe/>
      <InfoAboutMe/>
      <div className="w-full  p-10 font-magilio text-8xl justify-center">       
        <SplitLetters>Projects</SplitLetters>
        <SplitLetters>Internet</SplitLetters>
      </div>
      <div className="h-screen w-screen"></div>
    </div>
  );
}

function InfoAboutMe(){
  return <div className="my-auto flex justify-center">
  <div className="rounded-lg  w-[80%]  my-auto bg-white shadow-lg">
    <div className="-translate-y-20 mx-auto h-[250px] w-[250px] object-cover overflow-hidden rounded-full  shadow-xl  ">
      <img src="Me.jpg" alt="" className="h-full w-auto" />
    </div>

    <div className="font-magilio mx-10 text-2xl my-10 text-center space-y-4">
      <div className="">
        Hi, I'am <b className="text-4xl">Rubén Darío </b> a Developer
        resident in Colombia 🇨🇴
      </div>
      <div className="">I like to build whatever kind of anything.</div>

      <div>Maybe we can build something together</div>
      <div className="flex justify-around">
        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/rudevio/">
          <p className="Contacts">.Linkedin</p>
        </a>
        <a target="_blank" rel="noreferrer" href="https://www.github.com/rguarnizo">
          <p className="Contacts ">.Github</p>
        </a>
        <a target="_blank" rel="noreferrer" href="https://medium.com/@rguarnizo">
          <p className="Contacts ">.Medium</p>
        </a>
      </div>
    </div>
  </div>
</div>
}


function AboutMe() {
  return <div className="section2 w-screen h-auto ">
    <div className="wrapper -translate-x-10 -left-10 w-[140vw] -rotate-[10deg]  flex flex-col">
      <div className="lines h-[10%] bg-gray-800 flex align-middle shadow-lg -z-10">
        <div className="lineup flex">
          {new Array(30).fill({ start: 0, end: 10 }).map((value) => (
            <div className="text-[#d8e2dc] text-2xl my-auto overflow-y-hidden mx-2 font-bold whitespace-nowrap">
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
          {new Array(30).fill({ start: 10, end: 20 }).map((value) => (
            <div className="text-[#d8e2dc] text-2xl my-auto mx-2 font-bold whitespace-nowrap rotate-180">
              EM TUOBA
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>;
}




function Name() {
  return <div className=" text-[10vw] h-screen w-screen text-black font-magilio bg-[#fac9c3]">
    <div className="h-full w-full mx-auto flex flex-row items-center">
      <div className="name mx-auto flex flex-col ">
        <p className="up z-20">Ruben</p>
        <p className="down z-0">Dario</p>
      </div>
    </div>
  </div>;
}


function ThreeScene() {
  return <div className="h-screen w-screen absolute top-0 left-0 font-magilio hover:z-10">
    <Canvas className="h-full w-full">
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Torus></Torus>
      <Torus position={[-3, -1, 0]}></Torus>
      <Torus position={[3, 1, 0]}></Torus>
      {/* Limites del canvas x: -6/6  y: -3/3*/}
    </Canvas>
  </div>;
}

function FloatingIcons() {
  return <div>
    <BsGithub
      size={50}
      data-value="Github"
      className={"fixed pointer-events-none Github  z-20 opacity-0"} />
    <BsLinkedin
      size={50}
      data-value="Linkedin"
      className={"fixed pointer-events-none Linkedin z-20 opacity-0"} />
    <BsMedium
      size={50}
      data-value="Medium"
      className={"fixed pointer-events-none Medium z-20 opacity-0"} />
  </div>;
}

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

function oneTime() {
  const ball = document.querySelector(".circle");
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };

  const xSet = gsap.quickSetter(ball, "x", "px");
  const ySet = gsap.quickSetter(ball, "y", "px");

  const speed = 0.5;

  gsap.set(".circle", { xPercent: -50, yPercent: -50 });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  gsap.ticker.add(() => {
    //  adjust speed for higher refresh monietors

    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
  });

  const contacts = gsap.utils.toArray(".Contacts");

  contacts.forEach((value, index) => {
    value.addEventListener("mouseenter", (value) => {
      const element = document.querySelector(value.target.textContent);

      const xSetE = gsap.quickSetter(element, "x", "px");
      const ySetE = gsap.quickSetter(element, "y", "px");
      console.log(value.target.textContent);
      gsap.to(value.target.textContent, { alpha: 1 });

      gsap.ticker.add(() => {
        //  adjust speed for higher refresh monietors

        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        xSetE(pos.x);
        ySetE(pos.y);
      });
    });
    value.addEventListener("mouseleave", (value) => {
      console.log(value.target.textContent);
      gsap.to(value.target.textContent, { alpha: 0 });
    });
  });
}

export default App;
