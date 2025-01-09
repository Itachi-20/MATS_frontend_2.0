'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import Documents from "@/components/documents"
import SimpleFileUpload from "@/components/multiple_file_upload";
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
import { useRouter } from 'nextjs-toploader/app';
import { Toaster, toast } from 'sonner'
import AddPassangerDialog from '@/components/addPassangerDialog';
type Compensation = {
  vendor_type: string;
  vendor_name: string;
  est_amount: number;
  gst_included?: number;
};

type Logistics = {
  vendor_type: string;
  est_amount: number;
};

// type formData = {
//   name: string | null;
//   event_type: string;
//   company: string;
//   event_cost_center: string;
//   state: string;
//   city: string;
//   event_start_date: string;
//   event_end_date: string;
//   bu_rational: string;
//   faculty: string;
//   participants: string;
//   therapy: string;
//   event_name: string;
//   event_venue: string;
//   comments: string;
//   compensation: Compensation[];
//   logistics: Logistics[];
//   total_compensation_expense: number;
//   total_logistics_expense: number;
//   event_requestor: string;
//   business_unit: string;
//   division_category: string;
//   division_sub_category: string;
//   sub_type_of_activity: string;
//   any_govt_hcp: string,
//   no_of_hcp: number
// };

type activityDropdown = {
  name: string,
  document_name: string
}[]

type Props = {
  refNo: string | null
  activityDropdown: activityDropdown | null
}
const form4 = ({ ...Props }: Props) => {
  console.log("++++++++++++++++", Props.activityDropdown, "---------------");
  const router = useRouter();
  // const [formdata, setFormData] = useState<formData>();
  const [refNo, setRefNo] = useState<string | null>(Props.refNo ?? "");

  const [activityType, setActivityType] = useState("Pre Activity");

  const [documentType, setDocumentType] = useState("");
  const [preview_data, setPreviewData] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null)
  const [fileList, setFileList] = useState<File[]>([]); //added state 2
  const [files, setFiles] = useState<File[]>([]);
  const [addpassemgerdialog, setAddPassengerDialog] = useState<Boolean>(false);
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/training_and_education?forms=5&refno=${Props.refNo}`)
  };
  const FileUpload = async () => {
    const formdata = new FormData();

    if (uploadedFiles && uploadedFiles.length > 0) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        formdata.append("file", uploadedFiles[i]);
      }
    } else {
      toast.warning("No file to Upload");
      console.log("No file to upload");
      return;
    }
    formdata.append("docname", refNo as string);
    // if(uploadedFiles.length > 0) {
    formdata.append("activity_type", "Pre Activity");
    formdata.append("document_type", documentType);
    // }
    const apiCallPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`/api/training_and_education/fileUpload`, {
          method: "POST",
          credentials: 'include',
          body: formdata,
        });

        if (!response.ok) {
          setDocumentType('');
          setFiles([]);
          setUploadedFiles(null);
          throw new Error('file upload request failed');
        }

        const data = await response.json();
        resolve(data); // Resolve with the response data
      } catch (error) {
        setDocumentType('');
        setFiles([]);
        setUploadedFiles(null);
        reject(error); // Reject with the error
      }
    });
    toast.promise(apiCallPromise, {
      loading: 'Submitting  details...',
      success: (data) => {
        setTimeout(() => {
          PreviewData();
        }, 500);
        setDocumentType('')
        setFiles([])
        setUploadedFiles(null)
        return 'Documents added successfully!';
      },
      error: (error) => `Failed : ${error.message || error}`,
    });
  }
  const handleActivityTypeChange = (value: string) => {
    setActivityType(value);
  }
  const handleNext = () => {

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
          name: refNo
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewData(data.data);
        // console.log(data, "PreviewData")
      } else {
        console.log('Response was not OKAY');
      }
    } catch (error) {
      console.error("Error during Previewing data:", error);
    }
  };
  useEffect(() => {
    PreviewData();
  }, [])

  useEffect(() => {
  }, [preview_data])

  const handleDialog = () => {
    setAddPassengerDialog(prev => !prev)
  }
  return (
    <div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Documents
      </h1>
      <div className="flex justify-end pt-5 gap-4 pb-4">
        <div className="relative">
          <svg
            className="absolute top-3 left-4"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M14.8571 9.14286H9.14286V14.8571C9.14286 15.1602 9.02245 15.4509 8.80812 15.6653C8.59379 15.8796 8.30311 16 8 16C7.6969 16 7.40621 15.8796 7.19188 15.6653C6.97755 15.4509 6.85714 15.1602 6.85714 14.8571V9.14286H1.14286C0.839753 9.14286 0.549063 9.02245 0.334735 8.80812C0.120408 8.59379 0 8.3031 0 8C0 7.6969 0.120408 7.40621 0.334735 7.19188C0.549063 6.97755 0.839753 6.85714 1.14286 6.85714H6.85714V1.14286C6.85714 0.839752 6.97755 0.549062 7.19188 0.334735C7.40621 0.120407 7.6969 0 8 0C8.30311 0 8.59379 0.120407 8.80812 0.334735C9.02245 0.549062 9.14286 0.839752 9.14286 1.14286V6.85714H14.8571C15.1602 6.85714 15.4509 6.97755 15.6653 7.19188C15.8796 7.40621 16 7.6969 16 8C16 8.3031 15.8796 8.59379 15.6653 8.80812C15.4509 9.02245 15.1602 9.14286 14.8571 9.14286Z"
              fill="#635E5E"
            />
          </svg>
          <Button className="bg-white text-black border text-md font-normal rounded-xl pl-10 py-2 hover:bg-white" onClick={() => handleDialog()}>
            Add Passenger
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 pb-7 text-black">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Document Type <span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => handleActivityTypeChange(value)}
            disabled
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Pre Activity" />
            </SelectTrigger>
            <SelectContent>
              {/* {
                Props.activityDropdown ? Props.activityDropdown.activity.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.activity_name}
                    </SelectItem>
                  )
                }) :
                <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
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
            value={documentType}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {/* {
                Props.activityDropdown ? Props.activityDropdown.document.filter((item, index) => {
                  if (item.activity_type == activityType) {
                    return item
                  }
                }).map((item, index) => {
                  return (
                    <SelectItem value={item.name}>{item.document_name}</SelectItem>
                  )
                }) :
                  <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
              } */}
              {
                Props.activityDropdown && Props.activityDropdown.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.document_name}
                    </SelectItem>
                  )
                })
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end gap-6 col-span-1 text-nowrap">
          <div className="flex flex-col gap-3">
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

      <Documents
        eventData={preview_data}
        PageName={''}
        fetchFile={PreviewData}
      />
      <Toaster richColors position="top-right" />
      <div className="flex justify-end pt-5 gap-4">
        {/* <Button className="bg-white text-black border text-md font-normal">
          {" "}
          Save as Draft
        </Button>*/}
        <Button className="bg-white text-black border text-md font-normal hover:text-white hover:bg-black" onClick={() => router.push(`/training_and_education?forms=3&refno=${refNo}`)}>
          Back
        </Button>
        <Button className="bg-[#4430bf] text-white text-md font-normal border" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)} >
          Next
        </Button>
      </div>
      {addpassemgerdialog && <AddPassangerDialog handleDialog={handleDialog} refno={refNo} />}
    </div>
  );
}

export default form4