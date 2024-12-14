"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DialogBox from '@/components/dialogbox';
import { Button } from '@/components/ui/button';
import { useRouter } from 'nextjs-toploader/app';

import DocumentDetails from '@/components/commonPreviewComponents/documents';
import { useParams } from 'next/navigation'
import SimpleFileUpload from "@/components/multiple_file_upload";
import { Toaster, toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExecuteDialog from '@/components/executeDialog';

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
};
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
};
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
};
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
};
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
};
type File = {
  url: string;
  name: string;
  file_name:string
};
type DocumentDetail = {
  type: string;
  file: File[];
};
type ActivityDocument = {
  activity_type: string;
  document: DocumentDetail[];
};


const page = () => {
    const param = useParams();
    const refno = param.refno as string;
    const [document,setDocument] = useState<DocumentData>();
    const [files, setFiles] = useState<File[]>([]);
    const [data,setData] = useState<EventEntry>();
    const [isDialog,setIsDialog] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null)
    const [fileList, setFileList] = useState<File[]>([]); //added state 2
    const [documentType, setDocumentType] = useState("");
    const [activityType, setActivityType] = useState('Pre Activity');
    const [preview_data, setPreviewData] = useState<any>(null);
    const [activityDropdown,setActivityDropdown]  = useState<activityDropdown>();


    const handleDialog = ()=>{
      setIsDialog(prev =>!prev);
    }

    const executeFiles =preview_data && preview_data.documents.filter((item,index)=>{
      if(item.activity_type == "Executed"){
        return item;
      }
    })
    console.log(executeFiles,"this is execute files")
    const activityList = async ()=>{
      try {
          const response = await fetch(`/api/training_and_education/activityList/`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
              credentials:'include',
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log(data.data ,"tjis is api");
            setActivityDropdown(data.data);
          } else {
              console.log('Login failed');
          }
      } catch (error) {
          console.error("Error during login:", error);
      }
  }


    const fetchDocument = async()=>{
        try {
            const tableData = await fetch(
              `/api/fetchDocument`,
              {
                method: "POST",
                headers:{
                  "Content-Type": "application/json",
                },
                credentials:"include",
                body:JSON.stringify({
                name: refno
                })
              }
            );
            if(tableData.ok){
              const data = await tableData.json();
              setDocument(data.data)
            }
            
          } catch (error) {
            console.log(error,"something went wrong");
          }
    }

    const FileUpload = async () => {
      const formdata = new FormData();
  
      if (uploadedFiles && uploadedFiles.length > 0) {
        for (let i = 0; i < uploadedFiles.length; i++) {
          formdata.append("file", uploadedFiles[i]);
        }
      } else {
        console.log("No file to upload");
        return;
      }
      formdata.append("docname", refno as string)
      formdata.append("activity_type", "Executed");
      formdata.append("document_type", documentType)
      const apiCallPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`/api/training_and_education/fileUpload`, {
            method: "POST",
            credentials: 'include',
            body: formdata,
          });
  
          if (!response.ok) {
            throw new Error('file upload request failed');
          }
  
          const data = await response.json();
          resolve(data); // Resolve with the response data
        } catch (error) {
          reject(error); // Reject with the error
        }
      });
      toast.promise(apiCallPromise, {
        loading: 'Submitting  details...',
        success: (data) => {
          setTimeout(() => {
                 fetchData();
          }, 500);
          setDocumentType('')
          setFiles([])
          setUploadedFiles(null);
      
          return 'Documents added successfully!';
        },
        error: (error) => `Failed : ${error.message || error}`,
      });
    }
    const fetchData = async()=>{
      try {
          const tableData = await fetch(
            `/api/previewData`,
            {
              method: "POST",
              headers:{
                "Content-Type": "application/json",
              },
              credentials:"include",
              body:JSON.stringify({
              name: refno
              })
            }
          );
          if(tableData.ok){
            const data = await tableData.json();
            console.log(data.data)
            setPreviewData(data.data)
          }
          
        } catch (error) {
          console.log(error,"something went wrong");
        }
  }

  const handleExecute = async()=>{
    try {
        const tableData = await fetch(
          `/api/eventExecute/execute`,
          {
            method: "POST",
            headers:{
              "Content-Type": "application/json",
            },
            credentials:"include",
            body:JSON.stringify({
            name: refno
            })
          }
        );
        if(tableData.ok){
          router.push("/event_list");
        }
        
      } catch (error) {
        console.log(error,"something went wrong");
      }
}

    useEffect(()=>{
        fetchDocument();
    },[])

    useEffect(()=>{
        fetchData();
    },[])

    const handleNext = () => {
      
    }
  

    const handleActivityTypeChange = (value: string) => {
      setActivityType(value);
    }

    useEffect(()=>{
      activityList();
    },[])
    const router = useRouter()

    return (
      <>
        <div className="md:px-7 md:pb-7 md:pt-[35px] w-full z-20 text-black">
            <div className="pb-5">
                <div className="flex justify-between">
                    <h1 className=" md:text-[30px] md:font-medium capitalize md:pb-4"> {preview_data?.name}</h1>
                    <div className="flex gap-4 bg-white leading-normal">
                        <Button className="border border-[#4430bf] text-[#4430bf] px-6 text-[18px]" onClick={()=>router.push(`/audit_trail/${preview_data.name}`)}>Audit Trail</Button>
                        <Link href={"/"}>
                            <Button className="bg-white text-black border px-9 hover:bg-white text-[18px]" onClick={()=>{router.back()}}>Back</Button>
                        </Link>
                    </div>
                </div>
                <div className="flex border rounded-xl justify-between p-3 bg-white gap-4">
                    <div className="grid grid-cols-5 w-full gap-4">
                        <div className="col-span-2 border-r-[1px] border-slate-300 pr-2">
                            <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Number</h1>
                            <h1 className="text-center">{preview_data?.name}</h1>
                        </div>
                        <div className="col-span-2  border-r-[1px] border-slate-300 pr-2">
                            <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Date</h1>
                            <h1 className="text-center">{preview_data?.modified.substring(0,10)}</h1>
                        </div>
                        <div className="col-span-1 flex justify-center pt-1">
                            <Button className={`px-10 bg-[#4430bf] text-white ${executeFiles && executeFiles.length>0?"":"hidden"}`} onClick={()=>{handleDialog()}}>
                                Execute
                                </Button>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Documents
      </h1>
      <div className="grid grid-cols-3 gap-6 pb-7 text-black">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Document Type <span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => handleActivityTypeChange(value)}
            disabled
            value={'Executed'}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Executed" />
            </SelectTrigger>
            <SelectContent>
              {
                activityDropdown && activityDropdown.activity.map((item, index) => {
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
            onValueChange={(value) => setDocumentType(value)}
            value={documentType??''}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {
                activityDropdown && activityDropdown.document.filter((item, index) => {
                  if (item.activity_type == "Executed") {
                    return item
                  }
                }).map((item, index) => {
                  return (
                    <SelectItem value={item.name}>{item.document_name}</SelectItem>
                  )
                })
              }

            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end gap-6 col-span-1 text-nowrap">
          <div className="flex flex-col gap-3">
            {/* <h1 className="text-2xl font-bold">
              {fileList.length > 0
                ? `${fileList.length} file${
                    fileList.length !== 1 ? "s" : ""
                  } selected`
                : ""}
            </h1> */}
            <label className="text-black text-sm font-normal capitalize">
              Upload Files<span className="text-[#e60000]">*</span>
            </label>
            <SimpleFileUpload files={files} setFiles={setFiles} setUploadedFiles={setUploadedFiles}  onNext={handleNext}buttonText={'Upload Here'} />
          </div>
          <Button
            className="bg-white text-black border text-md font-normal"
            onClick={() => FileUpload()}
          >
            Add
          </Button>
        </div>
        <Toaster richColors position="top-right" />
      </div>
            <DocumentDetails 
            // eventType='Post Activity'
            PageName=""
            // refno={refno}
            fetchFile={fetchData}
            eventData={preview_data}
            />
        </div>
        {
        isDialog &&
       <ExecuteDialog
       handleDialog={handleDialog}
       handleExecute={handleExecute}
       />
      }
        </>
    )
}

export default page