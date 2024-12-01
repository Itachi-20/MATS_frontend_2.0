'use client';
import React, { useEffect } from "react";
import Image from 'next/image';
import { useState } from 'react';
import Popup from '@/components/popup';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SimpleFileUpload from "@/components/multiple_file_upload";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import Addvendor from "../add_vendor";

type document = {
  name: string;
  activity_type: string;
  document_name: string;
};

type DocumentData = {
  activity: Activity[];
  document: document[];
};



type Activity = {
  name: string;
  activity_name: string;
};

type Document = {
  name: string;
  activity_type: string;
  document_name: string;
};

type activityDropdown = {
  activity: Activity[];
  document: Document[];
};

type EventEntry = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  event_type: string;
  company: string;
  event_cost_center: string;
  state: string;
  sub_type_of_activity: string;
  business_unit: string;
  division_category: string;
  therapy: string;
  event_requestor: string;
  division_sub_category: string;
  status: string;
  current_stage: string;
  event_name: string;
  event_start_date: string;
  any_govt_hcp: string;
  comments: string;
  faculty: string;
  event_venue: string;
  event_end_date: string;
  no_of_hcp: number;
  bu_rational: string;
  participants: string;
  total_compensation_expense: number;
  has_advance_expense: number;
  total_logistics_expense: number;
  total_estimated_expense: number;
  currency: string;
  preactivity_status: string;
  advance_status: string;
  post_activity_status: string;
  post_expense_status: string;
  post_expense_check: number;
  travel_expense_status: string;
  travel_expense_check: number;
  invoice_amount: number;
  basic_amount: number;
  tds: number;
  gst: number;
  net_amount: number;
  doctype: string;
  compensation: Compensation[];
  travel_expense_approvers: any[]; // Empty array, can be customized later
  post_expense_approvers: any[]; // Empty array, can be customized later
  preactivity_approvers: ApproverStatus[];
  post_activity_approvers: any[]; // Empty array, can be customized later
  occurrence_status: OccurrenceStatus[];
  logistics: Logistics[];
  documents: ActivityDocument[];
  advance_approvers: any[]; // Empty array, can be customized later
  city:string
  reporting_head:string
}

type Compensation = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  vendor_type: string;
  actual_amount: number;
  status: string;
  vendor_name: string;
  advance: number;
  budget_category: string;
  est_amount: number;
  gst_included: number;
  gst: string;
  occurrence_no: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type ApproverStatus = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  approver_level: string;
  action_date: string;
  approver: string;
  remarks: string;
  approver_status: string;
  occurrence_no: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type OccurrenceStatus = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  occurrence_no: number;
  status: string;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type Logistics = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  vendor_type: string;
  actual_amount: number;
  status: string;
  advance: number;
  budget_category: string;
  est_amount: number;
  gst_included: number;
  gst: string;
  occurrence_no: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type File = {
  url: string;
  name: string;
  file_name:string
};

type DocumentDetails = {
  type: string;
  file: File[];
};

type ActivityDocument = {
  activity_type: string;
  document: DocumentDetails[];
};




type Props = {
  pathname:string
  data: EventEntry | undefined
  refno:string
  eventType:string
}

const DocumentDetails = ({...Props}:Props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fileName, setFileName] = useState();
  const [activityType,setActivityType] = useState<string>();
  const [file,setFile] = useState<FileList | null>()
  const [activitydropdown,setActivityDropdown] = useState<activityDropdown>();
  const [preview_data, setPreviewData] = useState<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(); //added state 1
  const [fileList, setFileList] = useState<File[]>([]); //added state 2
  console.log(file,"this multi file")
  const handleFileChange: any = (e: any) => {
    setFileName(e.target.files[0]?.name)
  };

  const handleActivityChange = (value:string)=>{
    setActivityType(value);
  }


  const handleFileClick = () => {
    setIsPopupOpen(true);
  };
  const FileUpload = async()=>{
    const formdata = new FormData();

    if (uploadedFiles && uploadedFiles.length > 0) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        formdata.append("file", uploadedFiles[i]); 
      }
    } else {
      console.log("No file to upload");
      return;  
    }
      formdata.append("docname",Props.refno)
      formdata.append("document_type",activityType as string);
      formdata.append("activity_type",Props.eventType)
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
        PreviewData();
       
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  const [isChecked,setIsChecked] = useState<boolean>();
  const [isAddVendor,setIsAddVendor] = useState<boolean>();


  const PreviewData = async () => {
    try {
      const response = await fetch("/api/previewData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: Props.refno,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewData(data.data);
        console.log(data, "PreviewData");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    PreviewData();
  }, []);
  useEffect(()=>{
  },[preview_data])

  const handleNext = (fileList: FileList | null) => {
    setUploadedFiles(fileList);
  };
  

  const fetchDropdown = async()=>{
    try {
      const response = await fetch("/api/training_and_education/activityList", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          credentials:'include'
      });

      if (response.ok) {
        const data = await response.json();
        setActivityDropdown(data.data);
      } else {
          console.log('Login failed');
      }
  } catch (error) {
      console.error("Error during login:", error);
  }
  }

  useEffect(()=>{
    fetchDropdown();
  },[])

console.log(Props.data,"this is data")
  return (
    <div className="px-6 pt-10">

      <div className="grid grid-cols-4 gap-12 pb-8 items-center">

        <div className="flex flex-col gap-2 col-span-1">
          <label htmlFor="doc_type" className="lable">
            document type<span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown bg-[#F6F6F6]">
              <SelectValue placeholder={Props.eventType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Props.eventType}>{Props.eventType}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 col-span-1">
          <label className="lable">
            supporting documents <span className="text-[#e60000]">*</span>
          </label>
          <Select
          onValueChange={(value)=>handleActivityChange(value)}
          >
            <SelectTrigger className="dropdown bg-[#FFF]">
              <SelectValue placeholder="-Select-" />
            </SelectTrigger>
            <SelectContent>
            {
                  activitydropdown && activitydropdown.document.filter((item,index)=>{
                    if(item.activity_type == "Post Activity"){
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

        <div className="flex flex-col gap-2 col-span-1">
          <label className="lable w-[300px]">
            Do you have filled document?<strong> Upload here</strong>
          </label>
          <div className="flex items-center space-x-4 gap-4">
          
            {/* <h1 className="text-2xl font-bold">
              {fileList.length > 0
                ? `${fileList.length} file${
                    fileList.length !== 1 ? "s" : ""
                  } selected`
                : ""}
            </h1> */}
             
          <SimpleFileUpload files={files} setFiles={setFiles} onNext={handleNext} buttonText={'Upload Here'} />
          
          <button
            className="bg-white text-black border text-md font-normal px-4 py-2 rounded-xl"
            onClick={() => FileUpload()}
          >
            Add
          </button>
          </div>
        </div>
       
        <div className="flex col-span-1 justify-center">
          <button className='flex space-x-[10px] border-[1px] border-[#E5E5E5] rounded-[8px] items-center py-[7px] px-6 mt-6'>
                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M12.5394 9.64286H8.06739V15.3571C8.06739 15.6602 7.97316 15.9509 7.80542 16.1653C7.63769 16.3796 7.41019 16.5 7.17298 16.5C6.93577 16.5 6.70827 16.3796 6.54054 16.1653C6.3728 15.9509 6.27857 15.6602 6.27857 15.3571V9.64286H1.80652C1.56931 9.64286 1.34181 9.52245 1.17408 9.30812C1.00634 9.09379 0.912109 8.8031 0.912109 8.5C0.912109 8.1969 1.00634 7.90621 1.17408 7.69188C1.34181 7.47755 1.56931 7.35714 1.80652 7.35714H6.27857V1.64286C6.27857 1.33975 6.3728 1.04906 6.54054 0.834735C6.70827 0.620407 6.93577 0.5 7.17298 0.5C7.41019 0.5 7.63769 0.620407 7.80542 0.834735C7.97316 1.04906 8.06739 1.33975 8.06739 1.64286V7.35714H12.5394C12.7767 7.35714 13.0041 7.47755 13.1719 7.69188C13.3396 7.90621 13.4338 8.1969 13.4338 8.5C13.4338 8.8031 13.3396 9.09379 13.1719 9.30812C13.0041 9.52245 12.7767 9.64286 12.5394 9.64286Z" fill="#635E5E" />
                        </svg>
                        <span className='text-[18px] font-normal leading-normal text-[#000]'>
                            Add vendor
                        </span>
          </button>
        </div>
      </div>

      <div className="md:pb-8">
        <div className="flex gap-5">
          <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
            documents UPLOADED
          </h1>
        </div>

        {
        Props.data && Props.data.documents?.map((item,index)=>{
          return (
      <div className='border border-[#848484] p-4 rounded-2xl w-full'>
        <h1 className="text-black pl-4 pb-4">
          Document type:{" "}
          <span className="font-semibold">{item.activity_type}</span>
        </h1>
        <div className="bg-white">
          <div className="flex flex-col">
            <Table>
              <TableHeader>
                <TableRow className="text-black">
                  <TableHead className={"bg-[#E0E9FF] rounded-2xl text-[15px] w-[50%]"}
                  >
                    Supporting Document
                  </TableHead>
                  <TableHead className={"bg-[#E0E9FF] rounded-2xl text-[15px] w-[50%]"}
                  >
                    Supporting Document
                    
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  item && item.document?.map((item2,index)=>{
                    return (
                <TableRow className="text-black">
                  <TableCell>{item2.type}</TableCell>
                  <TableCell>{item2.file?.map((item3,index)=>{
                    return (
                      <div className='flex justify-between'>
                      <div className='pb-2'>{item3.file_name}</div>
                      <div>
                        <Link rel="stylesheet" href={item3.url}>
                      <Image src={"/svg/view.svg"} width={20} height={20}  alt='view-document' className='cursor-pointer' />
                        </Link>
                      
                      </div>
                      </div>
                    )
                  })}</TableCell>
                </TableRow>
                    )
                  })
                }
                <TableRow className="text-black">
                  
                </TableRow>
              </TableBody>
            </Table>
          </div>

        </div>
      </div>
      )
    })
  }


    </div>
      </div>
  )
}

export default DocumentDetails