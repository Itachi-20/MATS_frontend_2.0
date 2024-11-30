import React from 'react';
import { Button } from "@/components/ui/button";
type props = {
    setClose: React.Dispatch<React.SetStateAction<boolean>>
    Loading: boolean;
    handleSubmit: () => void;
    text:string;
  }

  const DeleteDialog = ({...Props }: props) => {

  return (
    <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl border p-7 md:max-w-[400px] md:max-h-[200px] h-full w-full gap-8 text-black md:text-md font-light flex flex-col items-center">
    <h1 className="text-lg font-poppins">{Props.text}</h1>
    <div className="flex justify-center pt-5 gap-4 w-full">
          <Button className={`bg-white text-black border  font-normal px-8 rounded-md hover:bg-white ${Props.Loading ? `disabled opacity-50`:``} `} onClick={() => Props.setClose((prev) => !prev)}>
            No
          </Button>
          <Button className={`bg-[#E60000] text-white  font-normal border px-8 hover:bg-[#E60000] ${Props.Loading ? `disabled opacity-50`:``}`} onClick={()=>Props.handleSubmit()}>
           {Props.Loading ? 'Delete....':'Yes' }
          </Button>
        </div>
    </div>
    </div >
  )
}
export default DeleteDialog;



