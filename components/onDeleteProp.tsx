import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
type props = {
  setClose: React.Dispatch<React.SetStateAction<boolean>>
  handleDelete: ()=>void
}
const Ondeleteprop = ({ ...Props }: props) => {
  return (
    <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl border p-7 md:max-w-[600px] md:max-h-fit h-full w-full text-black md:text-md font-light flex flex-col items-center">
        <div className="flex flex-col items-center w-full">
          <h1 className="text-[20px] font-light leading-normal font-poppins ">Are you sure you want to delete this record?</h1>
          <svg width="100" height="100" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <path id="tickPath" d="M15 25 L22 32 L35 18" stroke="#f0f0f0" stroke-width="5" fill="none" />

            <rect width="5" height="5" fill="#8A2BE2" transform="translate(-2.5, -2.5)">
              <animateMotion repeatCount="indefinite" dur="3s" keyPoints="0;0.5;1;0.5;0" keyTimes="0;0.25;0.5;0.75;1" rotate="auto">
                <mpath href="#tickPath" />
              </animateMotion>
            </rect>

            <animate
              attributeName="stroke-dasharray"
              values="0, 50; 50, 50; 0, 50; 50, 50; 0, 50"
              dur="6s"
              repeatCount="indefinite" />
          </svg>
          <div className="space-x-4">
            <Button className="bg-white text-black border text-md font-normal px-12 rounded-md" onClick={() => { Props.setClose(false);}}>
                No
            </Button>
            <Button className="bg-white text-black border text-md font-normal px-12 rounded-md hover:bg-red-500 hover:text-white" onClick={() => { Props.handleDelete()}}>
                Yes, I'm sure
            </Button>
          </div>
        
        </div>
      </div>
    </div >
  );
};

export default Ondeleteprop;
