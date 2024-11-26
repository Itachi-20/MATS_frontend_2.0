import React, { useState } from 'react'

import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type props = {
  handleAdd:()=> void;
  type:string | undefined
  setType:(type:string)=>void
  name:string | undefined
  handleSave:()=>void
  setDocumentName:(documentName:string)=>void
}
const popup = ({...Props}: props) => {
  // const [documentName,setDocumentName] = useState<string>();

  // const handleSave = async()=>{
  //   try {
  //     let body = {};
  //     if(Props.type == "edit"){
  //       body = {
  //         repository_type:documentName,
  //         name:Props.name
  //       }
  //     }else{
  //       body = {
  //         repository_type:documentName
  //       }
  //     }

  //     const response = await fetch("api/documentRepository/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: 'include',
  //         body: JSON.stringify(body)
  //       }
  //     )

  //     if(response.ok){
  //       console.log("successfully submited");
  //     }else{
  //       console.log("failed");
  //     }
  //   } catch (error) {
  //     console.log("error in submission")
  //   }
  // }

  return (

    <>
      <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
        <div className="border-2 rounded-xl p-6 max-w-lg w-full bg-white relative text-black">
          <h1 className="text-2xl font-poppins py-4">Add Document</h1>
          <div className='space-y-2'>
            <Label className='text-black'>Type <span className='text-red-500'>*</span></Label>
            <Input className='text-black' name='type' placeholder="Type here..." 
            onChange={(e)=>Props.setDocumentName(e.target.value)}
            />
          </div>
          <div className="flex justify-end pt-5 gap-4 w-full">
            <Button className="bg-white text-black border text-md font-normal px-12 rounded-md hover:bg-white" onClick={Props.handleAdd}>
              Back
            </Button>
            <Button className="bg-[#4430bf] text-white text-md font-normal border px-8 hover:bg-[#4430bf]" onClick={()=>{Props.handleSave()}}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </>

  )
}

export default popup
