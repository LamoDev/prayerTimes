import React from 'react';
import Lottie from "lottie-react";
import praying from "../assets/animation/muslim.json"



export default function Content(){
    return(
      <div className="flex flex-row justify-evenly items-center max-[550px]:flex-col">
        <p className="text-medium lg:textfont-display  text-[#d4a373] max-[1100px]:text-[2rem] max-[945px]:text-[1.5rem] max-[700px]:text-[1.3rem] "> ﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا﴾ [النساء: 103] </p>
        <div> <Lottie animationData={praying} loop={true} autoplay={true} /></div>
      </div>
    )
}