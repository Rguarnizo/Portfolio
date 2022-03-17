import React, { Children, useEffect, useRef } from "react";
import gsap from "gsap";

export default function SplitLetters(props) {
  const children = props.children.split("");
  const l = useRef();
  

  useEffect(()=>{
    const word = gsap.utils.selector(l);
    const letters = gsap.utils.toArray(word(".letter"));
    console.log(word);
    gsap.from(letters,{yPercent:100,alpha:0,rotateY:6, stagger:0.05 ,scrollTrigger:{trigger: "word",toggleActions:"restart"}})
  },[])

  return (
    <div className="word flex" ref={l}>
      {children.map((element, index) => {
        return <div className="letter">{element}</div>;
      })}
    </div>
  );
}
