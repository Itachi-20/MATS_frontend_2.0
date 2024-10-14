import React from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Details from '@/app/dashboard/details'
const Index = () => {
  return (
    <div className="h-screen bg-[#EBEBF6] grid grid-cols-6 relative overflow-hidden">
       
            
      <div className="col-span-1 px-11">
        <Sidebar />
      </div>
    <Image
            className=" w-full absolute z-10 -top-96 -right-[500px] -rotate-6"
            src={"/Lines.png"}
            alt=""
            width={1500}
            height={100}
            ></Image>
      <div className="col-span-5 border-2 rounded-l-[60px] w-full h-screen bg-white overflow-scroll overflow-x-hidden">
        <div className="sticky top-0 z-30 bg-white">
          <Navbar />
        </div>
      <Details/>
    </div>
    </div>
  );
};

export default Index;
