import React, { useState,useEffect } from 'react'
  import { Button } from "@/components/ui/button";
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Input } from '@/components/ui/input';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Item } from '@radix-ui/react-select';
import Documents from "@/components/documents"

  type activityDropdown = {
    activity:{
      name:string,
      activity_name:string
    }[],
    document:{
      name:string,
      activity_type:string,
      document_name:string
    }[]
  }

  type Props = {
    activityDropdown:activityDropdown| null
    handleSubmit:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}
const form4 = ({...Props}:Props) => {
  const [file,setFile] = useState<FileList | null>();
  const [activityType,setActivityType] = useState("");
  const [refno,setRefno] = useState(localStorage.getItem("refno")?localStorage.getItem("refno"):"");
  const [documentType,setDocumentType] = useState("");
  const [preview_data, setPreviewData] = useState<any>(null);
  
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
      formdata.append("docname",refno as string)
      formdata.append("activity_type",activityType);
      formdata.append("document_type",documentType)
    try {
      const response = await fetch(
        `/api/training_and_education/fileUpload`,
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


  const handleActivityTypeChange = (value:string)=>{
    setActivityType(value);
  }


  const PreviewData = async () => {
    try {
      const response = await fetch("/api/previewData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          name :refno
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewData(data.data);
        console.log(data, "PreviewData")
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  useEffect(() => {
    PreviewData();
  }, [])

  console.log(file,"this is files");
  return (
    // </div>
    (<div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Documents
      </h1>
      <div className="grid grid-cols-3 gap-12 pb-7 text-black">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Document Type <span className="text-[#e60000]">*</span>
          </label>
          <Select
          onValueChange={(value)=>handleActivityTypeChange(value)}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {
                  Props.activityDropdown && Props.activityDropdown.activity.map((item,index)=>{
                    return (
                      <SelectItem value={item.name}>
                        {item.activity_name}
                      </SelectItem>
                    )
                  })
                }
                    
              </SelectContent>
            </Select>
        </div>
        <div className="flex flex-col gap-2 col-span-1">
          <label className="text-black text-sm font-normal capitalize">
            Supporting Documents<span className="text-[#e60000]">*</span>
          </label>
          <Select
           onValueChange={(value)=>setDocumentType(value)}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {
                  Props.activityDropdown && Props.activityDropdown.document.filter((item,index)=>{
                    if(item.activity_type == activityType){
                      return item
                    }
                  }).map((item,index)=>{
                    return (
                      <SelectItem value={item.name}>{item.document_name}</SelectItem>
                    )
                  })
                }
                    
              </SelectContent>
            </Select>
        </div>
        <div className="flex justify-around col-span-1 text-nowrap">
          <label
            htmlFor="file"
            className="lable hover:cursor-pointer "
          >
            Do you have filled document?
            <span className="font-semibold"> Upload here</span>
            <div className="bg-[#efedff] mt-2 py-[7px] flex gap-5 pl-5 rounded-md shadow-md mr-10">
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
            <Input type="file" onChange={(e)=>{handleFileUpload(e)}} id="file" className="hidden" multiple></Input>
          </label>
          <Button className="bg-white text-black border text-md font-normal" onClick={()=>FileUpload()}>
          Add
        </Button>
        </div>
      </div>
      <Documents
      eventData={preview_data}
      PageName={''}
      />
      <div className="flex justify-end pt-5 gap-4">
        <Button className="bg-white text-black border text-md font-normal">
          {" "}
          Save as Draft
        </Button>
        <Button className="bg-white text-black border text-md font-normal">
          Back
        </Button>
        <Button className="bg-[#4430bf] text-white text-md font-normal border" onClick={(e)=>Props.handleSubmit(e)}>
          Next
        </Button>
      </div>
    </div>)
  );
}

export default form4