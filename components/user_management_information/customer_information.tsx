"use client";
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import Image from 'next/image';

type CompanyTable = {
  communication: string;
  contact: string;
  details: string;
  isDefault: boolean;
};

const CustomerInformation = () => {
  const [companyDetails, setCompanyDetails] = useState<CompanyTable[]>([]);

  const handleAddRow = () => {
    setCompanyDetails([
      ...companyDetails,
      { communication: '', contact: '', details: '', isDefault: false },
    ]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedDetails = companyDetails.filter((_, i) => i !== index);
    setCompanyDetails(updatedDetails);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <h1 className="text-[25px] text-black font-normal leading-normal">
          Customer Information
        </h1>
        <Button
          onClick={handleAddRow}
          className="text-[17px] bg-blue-400 px-8 py-3 rounded-[10px] text-white"
        >
          Add
        </Button>
      </div>
      <div className="border bg-white h-full p-4 rounded-[18px]">
        <Table className="">
          <TableHeader className="bg-[#E0E9FF]">
            <TableRow className="text-nowrap rounded-r-2xl">
              <TableHead className="text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Communication
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Contact
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Details
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Default
              </TableHead>
              <TableHead className="text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companyDetails.map((detail, index) => (
              <TableRow key={index} className="text-center text-nowrap">
                <TableCell className="border-r-[1px] border-slate-300">
                  <Select>
                    <SelectTrigger className="dropdown">
                      <SelectValue placeholder="Select any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mr">Mr.</SelectItem>
                      <SelectItem value="miss">Miss.</SelectItem>
                      <SelectItem value="dr">Dr.</SelectItem>
                      <SelectItem value="mrs">Mrs.</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="border-r-[1px] border-slate-300">
                  <Select>
                    <SelectTrigger className="dropdown">
                      <SelectValue placeholder="Select any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mr">Mr.</SelectItem>
                      <SelectItem value="miss">Miss.</SelectItem>
                      <SelectItem value="dr">Dr.</SelectItem>
                      <SelectItem value="mrs">Mrs.</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="border-r-[1px] border-slate-300">
                  <Input
                    type="text"
                    placeholder="Details"
                    id={`details-${index}`}
                    name={`details-${index}`}
                  />
                </TableCell>
                <TableCell className='border-r-[1px] border-slate-300'>
                  <input
                    type="checkbox"
                    name={`default-${index}`}
                    id={`default-${index}`}
                    className="w-6 h-6"
                  />
                </TableCell>
                <TableCell className="sticky right-0 bg-[white] z-50 flex space-x-5 items-center justify-center">
                  <Image
                    src="/svg/delete.svg"
                    width={15}
                    height={20}
                    alt="delete-svg"
                    className="cursor-pointer"
                    onClick={() => handleDeleteRow(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerInformation;
