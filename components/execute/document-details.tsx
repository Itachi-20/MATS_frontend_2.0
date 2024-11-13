'use client';
import React from "react";
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

const DocumentDetails = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [fileName, setFileName] = useState();
    const [open, setClose] = useState(false)

    const handleFileChange: any = (e: any) => {
        setFileName(e.target.files[0]?.name)
    };

    const handleClick = () => {
        //   router.push("/event_list/${id}")
    }

    const handleFileClick = () => {
      setIsPopupOpen(true);
    };
  
    // const closePopup = () => {
    //   setIsPopupOpen(false);
    // }
   

  return (
    <div className="px-6 pt-10">
      
      <div className="grid grid-cols-3 gap-12 pb-8">
      
        <div className="flex flex-col gap-2">
          <label htmlFor="doc_type" className="lable">
            document type<span className="text-[#e60000]">*</span>
         </label>
          <Select>
            <SelectTrigger className="dropdown bg-[#F6F6F6]">
              <SelectValue placeholder="Execute" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="finance-team">Execute</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="lable">
           supporting documents <span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown bg-[#FFF]">
              <SelectValue placeholder="-Select-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fully-off-agreement-letter">Fully signed off Agreement letter</SelectItem>
              <SelectItem value="doc1">Documnet-1</SelectItem>
              <SelectItem value="doc2">Document-2</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
                  <label className="lable">
                      Do you have filled document?<strong> Upload here</strong>
                  </label>
                  <div className="flex items-center space-x-4">
                      <label className="flex py-1/2 px-8 space-x-[15px] bg-[#F0EDFF] rounded-md shadow-sm cursor-pointer border-[1px] items-center">
                          <svg width="25" height="26" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path id="Vector" d="M17.5143 0.500028C16.4161 0.49724 15.3281 0.700933 14.3134 1.09934C13.2986 1.49774 12.3771 2.08295 11.6022 2.82116L1.36236 12.537C1.04822 12.8344 0.871512 13.238 0.871094 13.659C0.870677 14.0801 1.04659 14.484 1.36013 14.782C1.67367 15.08 2.09915 15.2476 2.54298 15.248C2.98681 15.2484 3.41263 15.0815 3.72676 14.7841L13.971 5.06408C14.924 4.23299 16.1787 3.78337 17.4729 3.80915C18.7671 3.83494 20.0008 4.33414 20.9161 5.20247C21.8315 6.07079 22.3577 7.24106 22.3849 8.46879C22.4121 9.69651 21.9381 10.8867 21.062 11.7907L9.24445 23.0011C8.92762 23.2812 8.50856 23.4336 8.07557 23.4264C7.64258 23.4191 7.22945 23.2527 6.92323 22.9622C6.61701 22.6718 6.4416 22.2799 6.43396 21.8691C6.42632 21.4584 6.58705 21.0608 6.88227 20.7603L18.6999 9.54992C19.014 9.25221 19.1906 8.84832 19.1908 8.4271C19.191 8.00587 19.0148 7.60182 18.701 7.30383C18.3871 7.00584 17.9614 6.83832 17.5173 6.83812C17.0733 6.83793 16.6473 7.00507 16.3332 7.30278L4.51341 18.5174C3.6373 19.4214 3.16332 20.6116 3.19051 21.8393C3.21769 23.067 3.74393 24.2373 4.65929 25.1056C5.57465 25.974 6.8083 26.4732 8.10253 26.4989C9.39675 26.5247 10.6514 26.0751 11.6044 25.244L23.422 14.0337C24.2007 13.2992 24.8181 12.4256 25.2385 11.4633C25.6589 10.5009 25.8739 9.46908 25.8711 8.42741C25.8687 6.32562 24.9875 4.31056 23.4208 2.82438C21.8541 1.33819 19.7299 0.502267 17.5143 0.500028Z" fill="#4430BF" />
                          </svg>
                          <button className="" onClick={handleFileClick}>
                            <Popup button={"Upload Document"} uplaodmsg={"Upload Document"} />
                          </button>
                      </label>                      
                  </div>
        </div>
      </div>

      <div className="md:pb-8">
        <div className="flex gap-5">
          <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          documents UPLOADED 
        </h1>
        </div>

        <div className='border border-[#848484] p-4 rounded-2xl w-full'>
          <div className="border-b border-[#848484] pb-6">
            <h1 className="text-black pl-4 pb-4">
              Document type:
              <span className="font-semibold"> Execute</span>
            </h1>
            <div className="grid grid-cols-2 bg-white divide-x-2">
              <div className="col-span-1 flex flex-col mr-2">
                <Table>
                  <TableHeader>
                    <TableRow className="text-black">
                      <TableHead className={"bg-[#E0E9FF] rounded-2xl text-[15px] w-full"}
                      >
                        <span>Supporting Document</span>                      
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="text-black">
                      <TableCell>Fully Signed Off Agreement Letter</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="col-span-1 flex flex-col gap-3 pl-2">
                <Table>
                  <TableHeader>
                    <TableRow className="text-black">
                      <TableHead
                        className={"bg-[#E0E9FF] rounded-2xl text-[15px]"}
                      >
                        Uploded Documents
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="text-black flex justify-between items-center">
                      <TableCell>FullySignedOffAgreementLetter.docx</TableCell>
                        <TableCell className="flex space-x-6">
                          <Image src="/svg/editIcon.svg" width={20} height={20}  alt='view-document' className='cursor-pointer' />
                          <Image src="/svg/delete.svg" width={18} height={20}  alt='view-document' className='cursor-pointer' />
                        </TableCell>            
                    </TableRow>
                  </TableBody>
                </Table>
              </div> 
            </div>
          </div>

          <div className="pt-6">
            <h1 className="text-black pl-4 pb-4">
              Document type:{" "}
              <span className="font-semibold">Pre-Activity</span>
            </h1>
            <div className="grid grid-cols-2 bg-white divide-x-2">
              <div className="col-span-1 flex flex-col mr-2">
                <Table className=''>
                  <TableHeader>
                    <TableRow className="text-black">
                      <TableHead className={"bg-[#E0E9FF] rounded-2xl text-[15px] w-full"}
                      >
                        <span>Supporting Document</span>
                        
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="text-black">
                      <TableCell>Letter of understanding joint event</TableCell>
                    </TableRow>
                    <TableRow className="text-black">
                      <TableCell>Letter of understanding joint event</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="col-span-1 flex flex-col gap-3 pl-2">
                <Table>
                  <TableHeader>
                    <TableRow className="text-black">
                      <TableHead
                        className={"bg-[#E0E9FF] rounded-2xl text-[15px]"}
                      >
                        Uploded Documents
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="text-black flex justify-between items-center">
                      <TableCell>Stationary.cSV</TableCell>
                      <TableCell className="flex space-x-6">
                          <Image src="/svg/editIcon.svg" width={20} height={20}  alt='view-document' className='cursor-pointer' />
                          <Image src="/svg/delete.svg" width={18} height={20}  alt='view-document' className='cursor-pointer' />
                        </TableCell>                 
                    </TableRow>
                    <TableRow className="text-black flex justify-between items-center">
                      <TableCell>Stationary.cSV</TableCell>
                      <TableCell className="flex space-x-6">
                          <Image src="/svg/editIcon.svg" width={20} height={20}  alt='view-document' className='cursor-pointer' />
                          <Image src="/svg/delete.svg" width={18} height={20}  alt='view-document' className='cursor-pointer' />
                        </TableCell>                
                    </TableRow>
                  </TableBody>
                </Table>
              </div> 
            </div>
          </div>
        </div>

      </div>

    </div>
    )
}

export default DocumentDetails