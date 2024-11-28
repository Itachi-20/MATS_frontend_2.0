import React, { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Item } from "@radix-ui/react-select";
import Documents from "@/components/documents";
import SimpleFileUpload from "@/components/multiple_file_upload";
import { useRouter } from "next/navigation";
type activityDropdown = {
  activity: {
    name: string;
    activity_name: string;
  }[];
  document: {
    name: string;
    activity_type: string;
    document_name: string;
  }[];
};

type Props = {
  activityDropdown: activityDropdown | null;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
const form4 = ({ ...Props }: Props) => {
  const router = useRouter();
  const [file, setFile] = useState<FileList | null>();
  const [activityType, setActivityType] = useState("");
  const [refno, setRefno] = useState(
    localStorage.getItem("refno") ? localStorage.getItem("refno") : ""
  );
  const [documentType, setDocumentType] = useState("");
  const [preview_data, setPreviewData] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(); //added state 1
  const [fileList, setFileList] = useState<File[]>([]); //added state 2
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    setFile(files);
  };

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
    formdata.append("docname", refno as string);
    formdata.append("activity_type", "Pre Activity");
    formdata.append("document_type", documentType);
    try {
      const response = await fetch(`/api/training_and_education/fileUpload`, {
        method: "POST",
        headers: {
          //"Content-Type": "multipart/form-data",
        },
        body: formdata,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleActivityTypeChange = (value: string) => {
    setActivityType(value);
  };

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
  useEffect(() => {
    PreviewData();
  }, []);
  useEffect(()=>{

  },[preview_data])

  const handleNext = (fileList: FileList | null) => {
    setUploadedFiles(fileList);
    const filelists = Array.from(fileList || []);
    setFileList(filelists);
  };

  console.log(file, "this is files");
  return (
    // </div>
    <div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Documents
      </h1>
      <div className="grid grid-cols-3 gap-12 pb-7 text-black">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Document Type <span className="text-[#e60000]">*</span>
          </label>
          <Select onValueChange={(value) => handleActivityTypeChange(value)} disabled>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Pre Activity" />
            </SelectTrigger>
            <SelectContent>
              {Props.activityDropdown &&
                Props.activityDropdown.activity.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.activity_name}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 col-span-1">
          <label className="text-black text-sm font-normal capitalize">
            Supporting Documents<span className="text-[#e60000]">*</span>
          </label>
          <Select onValueChange={(value) => setDocumentType(value)}>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Props.activityDropdown &&
                Props.activityDropdown.document
                  .filter((item, index) => {
                    if (item.activity_type == "Pre Activity") {
                      return item;
                    }
                  })
                  .map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.document_name}
                      </SelectItem>
                    );
                  })}
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
            <SimpleFileUpload onNext={handleNext} buttonText="Upload Here" />
          </div>
          <Button
            className="bg-white text-black border text-md font-normal"
            onClick={() => FileUpload()}
          >
            Add
          </Button>
        </div>
      </div>
      <Documents eventData={preview_data} PageName={""} fetchFile = {PreviewData} />
      <div className="flex justify-end pt-5 gap-4">
        <Button className="bg-white text-black border text-md font-normal">
          {" "}
          Save as Draft
        </Button>
        <Button className="bg-white text-black border text-md font-normal">
          Back
        </Button>
        <Button
          className="bg-[#4430bf] text-white text-md font-normal border"
          onClick={(e) => Props.handleSubmit(e)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default form4;
