import React,{useState} from 'react'
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"

import { Input } from '@/components/ui/input';

type CardItem = {
    name: string;
    url: string;
  };
  
  type CardData = {
    name: string;
    attachments: CardItem[];
  };

type props = {
    cardData : CardData[] | undefined;
    handleAdd:()=> void;
  }

const add_popup = ({ cardData,handleAdd }: props) => {
    console.log("cardData",cardData)

    const [file,setFile] = useState<FileList | null>();
    const [documentType,setDocumentType] = useState<string>();


    const handleFileUpload = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const files = (e.target as HTMLInputElement).files;
        setFile(files);
      }


    const FileUpload = async()=>{
        const formdata = new FormData();
    
        if (file && file.length > 0) {
          for (let i = 0; i < file.length; i++) {
            formdata.append("file", file[i]); 
          }
        } else {
          console.log("No file to upload");
          return;  
        }
          formdata.append("repository_type",documentType as string)
        try {
          const response = await fetch(
            `/api/documentRepositoryFileUpload/`,
            {
              method: "POST",
              headers: {
                //"Content-Type": "multipart/form-data",
              },
              body:formdata,
              credentials:'include'
            }
          );
    
          
          if (response.ok) {
            const data = await response.json();
           
          } else {
            console.log("Login failed");
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      }
    

    return (
        <>
            <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
                <div className="border-2 rounded-xl p-6 max-w-lg w-full bg-white relative">
                    <h1 className='text-2xl text-black pb-4'>Attach Documents</h1>
                    {/* <div className="flex flex-col gap-2">
                            <label className="text-black text-sm font-normal capitalize">
                                Attachments<span className="text-[#e60000]">*</span>
                            </label>
                            <Input
                                type="button"
                                className="text-black shadow"
                                placeholder="Type Here"

                            ></Input>
                        </div> */}
                    <div className='grid grid-cols-2 gap-10 w-full items-center'>
                        <div>
                            <Label className='text-black'>Type <span className='text-red-500'>*</span></Label>
                            <Select
                            onValueChange={(value)=>setDocumentType(value)}
                            >
                                <SelectTrigger className="dropdown gap-4 mt-2 ">
                                    <SelectValue placeholder="-Select-" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cardData && cardData.map((card, index) => (
                                        <SelectItem key={index} value={card.name}>
                                            {card.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-around  text-nowrap">
                            <label
                                htmlFor="file"
                                className="lable  text-black font-semibold hover:cursor-pointer "
                            >
                                Attachments
                                <div className="bg-[#efedff] mt-2 py-[7px] w-full flex gap-5 px-5 rounded-md shadow-md mr-10">
                                    <svg
                                        width="25"
                                        height="26"
                                        viewBox="0 0 25 26"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            id="Vector"
                                            d="M16.6432 2.82358e-05C15.545 -0.00275969 14.457 0.200933 13.4423 0.599335C12.4275 0.997738 11.506 1.58295 10.7311 2.32116L0.491261 12.037C0.177131 12.3344 0.000418662 12.738 7.42955e-07 13.159C-0.000417176 13.5801 0.175493 13.984 0.489033 14.282C0.802572 14.58 1.22806 14.7476 1.67189 14.748C2.11572 14.7484 2.54154 14.5815 2.85567 14.2841L13.0999 4.56408C14.0529 3.73299 15.3076 3.28337 16.6018 3.30915C17.896 3.33494 19.1297 3.83414 20.0451 4.70247C20.9604 5.57079 21.4867 6.74106 21.5138 7.96879C21.541 9.19651 21.067 10.3867 20.1909 11.2907L8.37336 22.5011C8.05653 22.7812 7.63747 22.9336 7.20448 22.9264C6.77148 22.9191 6.35836 22.7527 6.05214 22.4622C5.74592 22.1718 5.57051 21.7799 5.56287 21.3691C5.55523 20.9584 5.71595 20.5608 6.01118 20.2603L17.8288 9.04992C18.1429 8.75221 18.3195 8.34832 18.3197 7.9271C18.3199 7.50587 18.1437 7.10182 17.8299 6.80383C17.516 6.50584 17.0903 6.33832 16.6462 6.33812C16.2022 6.33793 15.7763 6.50507 15.4621 6.80278L3.64232 18.0174C2.76621 18.9214 2.29223 20.1116 2.31941 21.3393C2.3466 22.567 2.87284 23.7373 3.7882 24.6056C4.70355 25.474 5.93721 25.9732 7.23143 25.9989C8.52566 26.0247 9.78032 25.5751 10.7333 24.744L22.5509 13.5337C23.3296 12.7992 23.947 11.9256 24.3674 10.9633C24.7878 10.0009 25.0028 8.96908 25 7.92741C24.9976 5.82562 24.1164 3.81056 22.5497 2.32438C20.983 0.838189 18.8588 0.00226656 16.6432 2.82358e-05Z"
                                            fill="#4430BF"
                                        />
                                    </svg>
                                    <h1 className="mt-[2px]">{"Upload File"}</h1>
                                </div>
                                <Input type="file" id="file" className="hidden" onChange={(e)=>handleFileUpload(e)}></Input>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end pt-6 gap-4 w-full">
                        <Button className="bg-white text-black border text-md font-normal px-12 rounded-md hover:bg-white" onClick={handleAdd}>
                            Back
                        </Button>
                        <Button className="bg-[#4430bf] text-white text-md font-normal border px-8 hover:bg-[#4430bf]" onClick={()=>FileUpload()}>
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </>



    )
}

export default add_popup
