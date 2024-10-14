import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
const Comment_box = () => {
  return (
        <div className="bg-white rounded-xl border p-7 md:max-w-[600px] md:max-h-[350px] h-full w-full gap-8 text-black md:text-md font-light flex flex-col items-center">
        <h1 className="text-2xl font-poppins">Comments</h1>
        <Textarea className="h-full md:max-h-40"
        />
        <div className="flex justify-end pt-5 gap-4 w-full">
              <Button className="bg-white text-black border text-md font-normal px-12 rounded-md hover:bg-white">
                Back
              </Button>
              <Button className="bg-[#4430bf] text-white text-md font-normal border px-8 hover:bg-[#4430bf]">
                Approve
              </Button>
            </div>
        </div>
  );
};

export default Comment_box;
