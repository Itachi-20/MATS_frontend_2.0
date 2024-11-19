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
    file_name: string;
    createdDate: string;
    createdBy: string;
    file_url: string;
  };

type Props = {
//   onSubmit: (document: DocumentRow[]) => void;
data:DocumentRow[] | undefined;
setClose: React.Dispatch<React.SetStateAction<boolean>>
};

const AddDocument = ({ ...Props }: Props) => {
//   const base_url = process.env.NEXT_PUBLIC_FRAPPE_URL;

  return (
    <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
      <div className="border-2 w-[850px] rounded-xl p-10 bg-white relative">
        <h1 className="text-black text-[30px] font-medium capitalize pb-4">
          View Documents
        </h1>

        {/* Document Table */}
        <Table className="mt-4">
          <TableHeader className="bg-[#E0E9FF]">
            <TableRow className="text-nowrap text-[#625d5d] text-[15px] font-normal">
              {/* <TableHead className="text-center rounded-l-2xl">Type</TableHead> */}
              <TableHead className="text-center rounded-l-2xl">Document Name</TableHead>
              {/* <TableHead className="text-center">Created Date</TableHead>
              <TableHead className="text-center">Created By</TableHead> */}
              <TableHead className="text-center rounded-r-2xl">Download</TableHead>
            </TableRow>
          </TableHeader>
          {Props.data && Props.data.length > 0 ?
            <TableBody className="text-black">
              {Props.data && Props.data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{row.file_name}</TableCell>
                  {/* <TableCell className="text-center">{row.createdDate}</TableCell>
                  <TableCell className="text-center">{row.createdBy}</TableCell> */}
                  <TableCell className="text-center">

                    {/* <Link href={row.downloadLink} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                  </Link> */}

                    <Link
                      href={`${row.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Download
                    </Link>
                  </TableCell>
                </TableRow>
              ))
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
          <Button className="bg-white text-black border text-md font-normal hover:bg-white" onClick={() => Props.setClose((prev) => !prev)}>
            Back
          </Button>
          {/* <Button onClick={handleNext} className="bg-blue-600 text-white">
            Next
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
