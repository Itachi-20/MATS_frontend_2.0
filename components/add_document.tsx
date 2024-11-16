import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
type DocumentRow = {
  document_type: string;
  fileName: string;
  createdDate: string;
  createdBy: string;
  downloadLink: string;
};

type Props = {
  onSubmit: (document: DocumentRow[]) => void;
  isAddDocument: () => void
};

const AddDocument = ({ ...Props }: Props) => {
  const [file, setFile] = useState<FileList | null>(null);
  const [document_type, setDocumentType] = useState<string | null>(null);
  const [documentRows, setDocumentRows] = useState<DocumentRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const base_url = process.env.NEXT_PUBLIC_FRAPPE_URL;
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileName(e.target.files[0]?.name)
    setFile(files);
  };

  const handleTypeChange = (value: string) => {
    setDocumentType(value);
  };

  const uploadFile = async () => {
    if (!file || !document_type) {
      alert("Please select a file and a type before uploading.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
      formData.append("is_private", '1');
    }
    formData.append("type", document_type);
    console.log("formdate before uolaod", formData)
    try {
      const response = await fetch(`/api/fileUpload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Upload successful:", data.message.file_name);
        const newRow: DocumentRow = {
          document_type,
          fileName: data.message.file_name,
          createdDate: data.message.creation,
          createdBy: data.message.modified_by,
          downloadLink: data.message.file_url,
        };

        setDocumentRows([...documentRows, newRow]);
        setFile(null);
        setDocumentType(null);
        setFileName(null);
      } else {
        alert("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  console.log("documentRows , type", documentRows, document_type)
  const handleNext = () => {
    Props.onSubmit(documentRows);
  };

  return (
    <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
      <div className="border-2 w-[850px] rounded-xl p-10 bg-white relative">
        <h1 className="text-black text-[30px] font-medium capitalize pb-4">
          Attach Documents
        </h1>
        <div className="grid grid-cols-2 gap-6 items-end">
          {/* Type Selection */}
          <div className="flex flex-col grid-cols-1 gap-2">
            <label className="text-black text-sm font-normal capitalize">
              Type<span className="text-[#e60000]">*</span>
            </label>
            <Select onValueChange={handleTypeChange}>
              <SelectTrigger className="text-black shadow">
                <SelectValue placeholder={document_type ? document_type : 'Select'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cancelled Cheque">Cancelled Cheque</SelectItem>
                <SelectItem value="GST Copy">GST Copy</SelectItem>
                <SelectItem value="Non GST Declaration">Non GST Declaration</SelectItem>
                <SelectItem value="Pan Card">Pan Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="flex grid-cols-1 text-nowrap relative">


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
                <h1 className="mt-[2px]">{fileName ? fileName : ' Receipt/Bill'}</h1>
              </div>
              <Input type="file" onChange={(e) => { handleFileUpload(e) }} id="file" className="hidden" multiple></Input>
            </label>
            <Button
              className="bg-white absolute right-0 bottom-0 text-black border font-normal"
              onClick={uploadFile}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Document Table */}
        <Table className="mt-4">
          <TableHeader className="bg-[#E0E9FF]">
            <TableRow className="text-nowrap text-[#625d5d] text-[15px] font-normal">
              <TableHead className="text-center rounded-l-2xl">Type</TableHead>
              <TableHead className="text-center">Document Name</TableHead>
              <TableHead className="text-center">Created Date</TableHead>
              <TableHead className="text-center">Created By</TableHead>
              <TableHead className="text-center rounded-r-2xl">Download</TableHead>
            </TableRow>
          </TableHeader>
          {documentRows.length > 0 ?
            <TableBody className="text-black">
              {documentRows && documentRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center ">{row.document_type}</TableCell>
                  <TableCell className="text-center">{row.fileName}</TableCell>
                  <TableCell className="text-center">{row.createdDate}</TableCell>
                  <TableCell className="text-center">{row.createdBy}</TableCell>
                  <TableCell className="text-center flex gap-2">

                    {/* <Link href={row.downloadLink} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                  </Link> */}

                    <Link
                      href={`${base_url}${row.downloadLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Download
                    </Link>
                  </TableCell>
                </TableRow>
              ))
                // <TableRow className="text-black flex w-full items-center justify-center">No Result.</TableRow>
              }
            </TableBody>
            :
            <TableBody className="text-black">
              <TableCell colSpan={5} className="text-center text-black">No Results.</TableCell>
              
            </TableBody>
          }
        </Table>

        {/* Action Buttons */}
        <div className="flex justify-end mt-4 gap-4">
          <Button className="bg-white text-black border text-md font-normal hover:bg-white" onClick={Props.isAddDocument}>
            Back
          </Button>
          <Button onClick={handleNext} className="bg-blue-600 text-white">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
