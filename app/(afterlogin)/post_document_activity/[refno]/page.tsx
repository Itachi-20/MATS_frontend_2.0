"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DialogBox from '@/components/dialogbox';
import { Button } from '@/components/ui/button';
import { useRouter } from 'nextjs-toploader/app';
import { Input } from '@/components/ui/input';
import DocumentDetails from '@/components/commonPreviewComponents/documents';
import { useParams } from 'next/navigation'
import SimpleFileUpload from "@/components/multiple_file_upload";
import { Toaster, toast } from 'sonner'
import { Value } from '@radix-ui/react-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  city: string
  reporting_head: string
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

type DocumentDetail = {
  type: string;
  file: File[];
};

type ActivityDocument = {
  activity_type: string;
  document: DocumentDetail[];
};

type activityDropdown = {
  name: string,
  document_name: string
}[]

const page = () => {
  const param = useParams();
  const refno = param.refno as string;
  //const [document,setDocument] = useState<DocumentData>();
  const [data, setData] = useState<EventEntry>();
  const [isDialog, setIsDialog] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>();
  const [isOccurance, setIsOccurance] = useState<boolean>(false);
  const [occuranceDate, setOcccuranceDate] = useState<string>();
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null)
  const [fileList, setFileList] = useState<File[]>([]); //added state 2
  const [documentType, setDocumentType] = useState("");
  const [activityType, setActivityType] = useState('Post Activity');
  const [preview_data, setPreviewData] = useState<any>(null);
  const [activityDropdown, setActivityDropdown] = useState<activityDropdown>();
  const [checkedValue, setCheckedValue] = useState<boolean>();
  const router = useRouter();

  const handleOccurance = () => {
    setIsOccurance(true);
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
    formdata.append("activity_type", "Post Activity");
    formdata.append("document_type", documentType)
    // try {
    //   const response = await fetch(
    //     `/api/training_and_education/fileUpload`,
    //     {
    //       method: "POST",
    //       headers: {
    //         //"Content-Type": "multipart/form-data",
    //       },
    //       body: formdata,
    //       credentials: 'include'
    //     }
    //   );


    //   if (response.ok) {
    //     setDocumentType('')
    //     setFiles([]);
    //     setUploadedFiles(null);
    //     fetchData();

    //   } else {
    //     console.log("Login failed");
    //   }
    // } catch (error) {
    //   console.error("Error during login:", error);
    // }
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
        setUploadedFiles(null)
        return 'Documents added successfully!';
      },
      error: (error) => `Failed : ${error.message || error}`,
    });
  }

  const fetchData = async () => {
    try {
      const tableData = await fetch(
        `/api/previewData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: refno
          })
        }
      );
      if (tableData.ok) {
        const data = await tableData.json();
        console.log(data.data)
        setPreviewData(data.data)
      }

    } catch (error) {
      console.log(error, "something went wrong");
    }
  }

  console.log(preview_data, "this is preveiew data")

  const handlePostDocument = async () => {
    try {
      const tableData = await fetch(
        `/api/postActivitySubmit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: refno,
            date: occuranceDate
          })
        }
      );
      if (tableData.ok) {
        const data = await tableData.json();
        router.push("/event_list");
      }

    } catch (error) {
      console.log(error, "something went wrong");
    }
  }
  const activityList = async () => {
    try {
      const response = await fetch(`/api/execute/activityList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          activity_type: activityType,
          event_type: preview_data?.event_type
        })
      });
      console.log(response, 'response 323456789')
      if (response.ok) {
        const data = await response.json();
        console.log(data,'data')
        setActivityDropdown(data.data);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  const handleNext = () => {

  }

  const handleOccuranceDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOcccuranceDate(e.target.value);
  }


  useEffect(() => {
    fetchData();
  }, [])


  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(prev => !prev);
  };

  const handleActivityTypeChange = (value: string) => {
    setActivityType(value);
  }

  useEffect(() => {
    activityList();
  }, [preview_data?.event_type])
console.log(activityDropdown,'activityDropdown')
  return (
    <>
      <div className="md:px-7 md:pb-7 md:pt-[35px] w-full relz-20 text-black">
        <div className="pb-5">
          <div className="flex justify-between">
            <h1 className=" md:text-[30px] md:font-medium capitalize md:pb-4">{preview_data?.event_type}</h1>
            <div className="flex gap-4 bg-white leading-normal">
              <Button className="border border-[#4430bf] text-[#4430bf] px-6 text-[18px]" onClick={() => router.push(`/audit_trail/${preview_data?.name}`)}>Audit Trail</Button>
              <Link href={"/"}>
                <Button className="bg-white text-black border px-9 hover:bg-white text-[18px]">Back</Button>
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
                <h1 className="text-center">{preview_data?.modified.substring(0, 10)}</h1>
              </div>
              <div className="col-span-1 flex justify-center pt-1">
                {/* <Button className="px-10 text-white bg-[#4430bf]"> */}
                {/* <DialogBox button={"Execute"} msg={"Next Occurrence date"}/> */}
                {/* <DialogBox button={"Submit"} msg={"Are you sure you wanted to execute the event?"} refno={refno}/> */}
                {/* Submit
                                </Button> */}
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
              value={'Post Activity'}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Post Activity" />
              </SelectTrigger>
              <SelectContent>
                {/* {
                activityDropdown && activityDropdown.activity.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.activity_name}
                    </SelectItem>
                  )
                })
              } */}
                <SelectItem value={activityType}>
                  {activityType}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 col-span-1">
            <label className="text-black text-sm font-normal capitalize">
              Supporting Documents<span className="text-[#e60000]">*</span>
            </label>
            <Select
              onValueChange={(value) => setDocumentType(value)}
              value={documentType ?? ''}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {/* {
                  activityDropdown && activityDropdown.document.filter((item, index) => {
                    if (item.activity_type == "Post Activity") {
                      return item
                    }
                  }).map((item, index) => {
                    return (
                      <SelectItem value={item.name}>{item.document_name}</SelectItem>
                    )
                  })
                } */}
{
                  activityDropdown ? activityDropdown.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.document_name}
                      </SelectItem>
                    )
                  }) : <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
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
              <SimpleFileUpload files={files} setFiles={setFiles} setUploadedFiles={setUploadedFiles} onNext={handleNext} buttonText={'Upload Here'} />
            </div>
            <Button
              className="bg-white text-black border text-md font-normal"
              onClick={() => FileUpload()}
            >
              Add
            </Button>
          </div>
        </div>
        <Toaster richColors position="top-right" />
        <DocumentDetails
          // eventType='Post Activity'
          PageName=""
          // refno={refno}
          fetchFile={fetchData}
          eventData={preview_data}
        />

        <div className={`flex md:pb-8 gap-3 ${preview_data?.post_activity_submitted == 1 ? "hidden" : ""}`}>
          <input
            type="checkbox"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCheck(e); setCheckedValue(e.target.checked) }}
            checked={checkedValue ? checkedValue : false}
          />
          <label className="text-black md:text-sm md:font-normal capitalize">
            I hereby declare that all details filled by me are correct and genuine.<span className="text-[#e60000]">*</span>
          </label>
        </div>
      </div>
      {
        isChecked && data?.event_type != "HCP Services" &&
        <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
          <div className="border-2 rounded-xl p-5 bg-white relative">
            <h1 className='text-black pb-8 font-semibold text-lg'>Are you sure you want to declare this event?</h1>
            <div className='flex justify-center gap-4'>
              <Button className='bg-orange-600 px-12 border-none py-1' onClick={() => { setIsChecked(false); setCheckedValue(prev => !prev) }}>No</Button>
              <Button className='bg-green-600 px-12 border-none py-1' onClick={() => handlePostDocument()}>Yes</Button>
            </div>
          </div>
        </div>
      }
      {
        isChecked && data?.event_type == "HCP Services" &&
        <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50 w-full">
          <div className="border-2 rounded-xl p-10 px-20 bg-white relative">
            <h1 className='text-black pb-8 font-semibold text-lg'>Occurance Date</h1>
            <Input className='pb-4 text-black' type='date' onChange={(e) => handleOccuranceDate(e)}></Input>
            <div className='flex justify-center gap-4 pt-4'>
              <Button className='bg-green-600 px-12 border-none py-1' onClick={() => handlePostDocument()}>Submit</Button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default page