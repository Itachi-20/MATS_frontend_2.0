'use client'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useState, useEffect } from 'react';
  import { Button } from "@/components/ui/button";
  import { Toaster, toast } from 'sonner'
  import { useRouter } from 'next/navigation';
  import Documents from "@/components/documents"
  import SimpleFileUpload from "@/components/multiple_file_upload";

  type activityDropdown = {
    activity: {
      name: string,
      activity_name: string
    }[],
    document: {
      name: string,
      activity_type: string,
      document_name: string
    }[]
  }
  
  type Props = {
    activityDropdown: activityDropdown | null
    refno: string | null
  }
const form4 = ({...Props}:Props) => {
  const router = useRouter();
  const [activityType, setActivityType] = useState('Pre Activity');
  const [refno, setRefno] = useState(Props.refno);
  const [documentType,setDocumentType] = useState("");
  const [preview_data, setPreviewData] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    router.replace(`/monetary_grant?forms=5&refno=${Props.refno}`)
  };



  const FileUpload = async()=>{
    const formdata = new FormData();

    if (uploadedFiles && uploadedFiles.length > 0 ) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        formdata.append("file", uploadedFiles[i]); 
      }
    } else {
      console.log("No file to upload");
      toast.warning("No file to Upload");
      return;  
    }
      formdata.append("docname",refno as string)
      formdata.append("activity_type",activityType);
      formdata.append("document_type",documentType)

    const apiCallPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`/api/monetary_grant/fileUpload`, {
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
          PreviewData();
        }, 500);
        setDocumentType('')
        setFiles([])
        setUploadedFiles(null);
        return 'Documents added successfully!';
      },
      error: (error) => `Failed : ${error.message || error}`,
    });
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
        credentials: "include",
        body: JSON.stringify({
          name: refno,
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

  const handleNext = () => {
    
  }


  useEffect(() => {
    PreviewData();
  }, []);
  useEffect(()=>{

  },[preview_data])


  return (
    // </div>
    (<div>
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
            value={'Pre Activity'}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Pre Activity" />
            </SelectTrigger>
            <SelectContent>
              {
                Props.activityDropdown && Props.activityDropdown.activity.map((item, index) => {
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
                Props.activityDropdown && Props.activityDropdown.document.filter((item, index) => {
                  if (item.activity_type == activityType) {
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
      </div>
      <Documents
        eventData={preview_data}
        PageName={''}
        fetchFile={PreviewData}
      />
      <div className="flex justify-end pt-5 gap-4">
        {/* <Button className="bg-white text-black border text-md font-normal">
          {" "}
          Save as Draft
        </Button> */}
        <Button className="bg-white text-black border text-md font-normal" onClick={() => router.push(`/monetary_grant?forms=3&refno=${Props.refno}`)}>
          Back
        </Button>
        <Button className="bg-[#4430bf] text-white text-md font-normal border" onClick={(e) => handleSubmit(e)}>
          Next
        </Button>

        <Toaster richColors position="top-right" />

      </div>
    </div>)
  );
}

export default form4