import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export  default function DialogDemo({button,uplaodmsg}) {
  const [fileNames, setFileNames] = useState([]);

  const handleFileChange: any = (e: any) => {
    const files = Array.from(e.target.files);
    setFileNames(files.map(file => file.name));
};

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-[#4430BF] text-[18px]">{button}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-[30px] font-normal font-['Poppins']">{uplaodmsg}</DialogTitle>
          </DialogHeader>
          <div className="">
            <div className="flex justify-center items-center">                
              <label className="items-center justify-items-center py-2 px-10 rounded-md cursor-pointer space-x-2 space-y-1 w-fit">

                        <span className="flex gap-3 items-center">
                          {fileNames.length === 0 ? 
                            (<Image
                              src="/svg/uploadFileIcon.svg"
                              alt="uploadIcon"
                              width={150}
                              height={50}
                            />
                            )
                            :
                            (
                              fileNames.map((fileName, index) => (
                              <Image
                                key={index}
                                src="/svg/uploadedFileIcon.svg"
                                alt="uploadedIcon"
                                width={120}
                                height={30}
                              />
                            )))                  
                          }                  
                          <Input type="file" className="hidden" onChange={handleFileChange} multiple/>
                        </span>

                        <span className="flex flex-wrap gap-5 items-center">
                          {fileNames.length === 0 ?
                          (
                            <span className="text-[18px] font-medium leading-normal flex  justify-end ">Upload files</span>    

                          ):
                          (
                            fileNames.map((fileName, index) => {
                              return(  
                                <span className="text-[18px] font-medium leading-normal flex  justify-end ">{fileName ? fileName: ''}</span>    
                              )})
                          )}
                            
                        </span>

                        <span className="flex gap-12 items-center justify-center px-4">
                            {fileNames.map((fileName,index)=>{
                              return (
                                <span className="flex justify-center">{fileName ? 'Remove file':'' }</span>
                              )
                          })}
                        </span>

                </label>
            </div>
          </div>        
          <DialogFooter>
                <div className="flex gap-4 bg-white leading-normal">
                   <Button className="bg-white text-black border px-6 hover:bg-white text-[18px]">Back</Button>
                   <Button className="border border-[#4430bf] text-[#FFF] px-6 bg-[#4430BF] text-[16px]">Next</Button>
                </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )}
