import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
type props = {
  setClose: React.Dispatch<React.SetStateAction<boolean>>
  pathname: string;
}
const SuccessProp = ({ ...Props }: props) => {
    const router = useRouter();
  return (
    <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl border p-7 md:max-w-[600px] md:max-h-[350px] h-full w-full gap-8 text-black md:text-md font-light flex flex-col items-center">
        <h1 className="text-2xl font-poppins">SucessFull</h1>
        <div className="flex justify-end pt-5 gap-4 w-full">
              <Button className="bg-white text-black border text-md font-normal px-12 rounded-md hover:bg-white" onClick={()=>{Props.setClose(false); router.push(Props.pathname)}}>
                Done
              </Button>
             
            </div>
        </div>
        </div >
  );
};

export default SuccessProp;
