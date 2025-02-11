import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useAuth } from "../../app/context/AuthContext";

type props = {
  handleClose: () => void;
  handleComment:(value:string)=>void;
  Submitbutton:(isRequestor?:Number)=>void;
  ButtonText:string
}

const Comment_box = ({ handleClose,handleComment,Submitbutton,ButtonText }: props) => {
  const {role,userid,name} = useAuth();
  
  const buttonColor:{ [key: string]: string } = {
    "Approve":"bg-[#5DBE74] hover:bg-[#5DBE74]",
    "Reject":"bg-[#ff5757] hover:bg-[#ff5757]",
    "Send Back":"bg-[#4430bf] hover:bg-[#4430bf]"
  }
  return (
    // <div className="absolute z-50 flex pt-10 items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl border p-7 md:max-w-[650px] md:max-h-[350px] h-full w-full gap-8 text-black md:text-md font-light flex flex-col items-center justify-center">
        <h1 className="text-2xl font-poppins">Comments</h1>
        <Textarea onChange={(e)=>handleComment(e.target.value)} className="h-full md:max-h-40"
        />
        <div className="flex justify-end pt-5 gap-4 w-full">
              <Button className="bg-white text-black border text-md font-normal px-12 rounded-md hover:bg-white" onClick={handleClose}>
                Back
              </Button>
              <Button className={`text-white text-md font-normal border px-8 ${buttonColor[ButtonText]}`} onClick={()=>Submitbutton(0)}>
                {ButtonText == "Send Back"?"To Approver":ButtonText}
              </Button>
              {
                ButtonText == "Send Back" && 
                <Button className={`text-white text-md font-normal border px-8 ${buttonColor[ButtonText]}`} onClick={()=>Submitbutton(1)}>
                {"To Requestor"}
              </Button>
              }
            </div>
        </div>
        // </div >
  );
};

export default Comment_box;
