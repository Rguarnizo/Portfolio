import { useEffect } from "react";
import gsap from "gsap";
import "./App.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(animate);

  return (
    <>
    <div className="h-screen w-screen absolute top-0 left-0 font-magilio">
      Esto es un div encima
    </div>
    <div>
      <div className=" text-[10vw] h-screen w-screen text-black font-magilio bg-[#fac9c3]">
        <div className="h-full w-full mx-auto flex flex-row items-center">
          <div className="name mx-auto flex flex-col ">
            <p className="up">Ruben</p>
            <p className="down ">Dario</p>
            
          </div>
        </div>
      </div>
      <div className="section2 h-screen w-screen "></div>
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

  gsap.to(".name",{yPercent:-100,scrollTrigger:{trigger:".section2",scrub:true},})
}

export default App;
