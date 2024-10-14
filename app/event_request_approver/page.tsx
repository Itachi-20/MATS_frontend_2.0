import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import BasicDetails from "@/components/basic_Details"
import EventDetails from "@/components/event_Details"
import VendorDetails from "@/components/vendor_Details"
import TotalExpense from "@/components/total_Expense"
import Documents from "@/components/documents"
const Index = () => {
  return (
    <div className="h-screen bg-[#EBEBF6] grid grid-cols-6 relative overflow-hidden">
      <Image
        className=" w-full absolute z-10 -top-96 -right-[500px] -rotate-6"
        src={"/Lines.png"}
        alt=""
        width={1500}
        height={100}
      ></Image>

      <div className="col-span-1 px-11">
        <Sidebar />
      </div>
      <div className="col-span-5 border-2 rounded-l-[60px] w-full h-screen bg-white overflow-scroll overflow-x-hidden relative">
        <div className="sticky top-0 z-30 bg-white">
          <Navbar />
        </div>
        <div className="md:px-7 md:pb-7 md:pt-4 w-full relative z-20 text-black">
          <div className="pb-5">
            <div className="flex justify-between">
            <h1 className=" md:text-[30px] md:font-medium capitalize md:pb-4"> Training and Education</h1>
            <div className="flex gap-4 bg-white">
            <Button className="border border-[#4430bf] text-[#4430bf] px-6">Audit Trail</Button>
              <Button className="bg-white text-black border px-8 hover:bg-white">Back</Button>
            </div>
              </div>
            <div className="flex border rounded-xl justify-between p-3 bg-white gap-4">
              <div className="grid grid-cols-2 w-full gap-4">
              <div className="col-span-1">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Number</h1>
                <h1 className="text-center">1234567</h1>
                </div>
              <div className="col-span-1">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Date</h1>
                <h1 className="text-center">11/11/24</h1>
                </div>
              </div>
              <div className="flex gap-4 text-white items-center">
              <Button className="bg-[#5dbe74] hover:bg-[#5dbe74] px-6">Approve</Button>
              <Button className="bg-[#ff5757] hover:bg-[#ff5757] px-6">Reject</Button>
              <Button className="bg-[#4430bf] hover:bg-[#4430bf] px-6">Send Back</Button>
              </div>
            </div>
          </div>
        <BasicDetails/>

        <EventDetails/>

        <VendorDetails/>

        <TotalExpense/>
            
        <Documents/>
        
            <div className="flex md:pb-8 gap-3">
            <Checkbox />
            <label className="text-black md:text-sm md:font-normal capitalize">
            I hereby declare that all details filled by me are correct and genuine.<span className="text-[#e60000]">*</span>
                </label>
            </div>

            <div className="flex justify-end pt-5 gap-4">
              <Button className="bg-white text-black border text-md font-normal">
                {" "}
                Save as Draft
              </Button>
              <Button className="bg-white text-black border text-md font-normal">
                Back
              </Button>
              <Button className="bg-[#4430bf] text-white text-md font-normal border">
                Next
              </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Index