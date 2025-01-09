import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAuth } from "../app/context/AuthContext";
type props = {
  handleClose: (value: string) => void;
  handleSubmit: (value: string) => void;
  ButtonText:string;
}
const Comment_box = ({ handleClose, handleSubmit,ButtonText}: props) => {
  const {role,userid,name} = useAuth();
  const [remarks, setRemarks] = useState<string>("");
  const buttonColor:{ [key: string]: string } = {
    "Approve":"bg-[#5DBE74] hover:bg-[#5DBE74]",
    "Reject":"bg-[#ff5757] hover:bg-[#ff5757]",
    "Send Back":"bg-[#4430bf] hover:bg-[#4430bf]",
    'Submit':"bg-[#5DBE74] hover:bg-[#5DBE74]"
  }
  return (
    <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl border  md:max-w-[600px] md:max-h-[350px] h-full w-full gap-8 text-black md:text-md font-light ">
        <h1 className="text-2xl flex justify-start font-poppins p-7">Remark</h1>
        <div className="flex flex-col items-center h-full w-full px-7">
        <Textarea
          className="h-full md:max-h-40"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <div className="flex justify-end pt-5 gap-4 w-full">
          <Button className="bg-white text-black border text-md font-normal px-12 rounded-md hover:bg-white" onClick={() => handleClose('')}>
            Back
          </Button>
          <Button className={`text-white text-md font-normal border px-8 ${buttonColor[ButtonText]}`} onClick={() => handleSubmit(remarks)}>
            {/* {role == "Event Approver"?"Approve":"Submit"} */}
            {ButtonText ? ButtonText : "Submit"}
          </Button>
        </div>

        </div>
      </div>
    </div >
  );
};

export default Comment_box;
