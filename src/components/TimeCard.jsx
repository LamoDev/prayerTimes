import { useState } from "react";

export default function TimeCard({name , time}) {
  
  
 
  return (
        <div  className="bg-[#faedcd] w-full max-w-[250px] h-50 rounded-xl shadow-xl flex flex-col justify hover:bg-[#fefae0] text-tiny">
          <div className="bg-[#a98467] py-3 text-center rounded-t-xl">
            <h1 className="font-display text-lg text-white">{name}</h1>
          </div>
       
          <div className="flex justify-center items-center text-center mt-10">
            <h1 className="font-display text-medium ">{time}</h1>
          </div>
        </div>
   
  );
}

