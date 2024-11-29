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
    name:string;
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
        <div className="border rounded-lg">
          <Table>
            <TableHeader className="bg-[#E0E9FF] sticky top-0 z-10">
              <TableRow className="text-nowrap text-[#625d5d] text-[15px] font-normal">
                <TableHead className="text-center rounded-l-2xl py-3">Document Name</TableHead>
                <TableHead className="text-center rounded-r-2xl py-3">Download</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <div className="max-h-[300px] overflow-y-auto">
            <Table>
              {Props.data && Props.data.length > 0 ? (
                <TableBody className="text-black">
                  {Props.data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">{row.file_name}</TableCell>
                      <TableCell className="text-center">
                        <Link
                          href={row.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Download
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-black py-4">
                      No Results.
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </div>
        </div>

        {/* Action Buttons */}
        <div data-state="close" className="flex justify-end mt-4 gap-4">
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
