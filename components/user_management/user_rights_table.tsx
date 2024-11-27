"use client"
import React from 'react';
import { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Menu = {
  menu_name: string;
  sub_module_name: string;
};

type Module = {
  module_name: string;
  menus: Menu[];
};

type ModulesData = {
  modules: Module[];
};

const UserRightsTable = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false); 

  const [options] = useState([
    { value: "sundar", label: "Sundar Ganesh" },
    { value: "mukesh", label: "Mukesh Rao" },
    { value: "anish", label: "Dr Anish Patel" },
    { value: "deepak", label: "Deepak Mathur" },
  ]);

  // Filtered options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const UserRightsDetails: ModulesData = {
    modules: [
      {
        module_name: "Area",
        menus: [
          {
            menu_name: "Dashboard",
            sub_module_name: "Admin Panel",
             },
          {
            menu_name: "User Management",
            sub_module_name: "Role Assignment",
          },
        ],
      },
      {
        module_name: "Finance",
        menus: [
          {
            menu_name: "Reports",
            sub_module_name: "Invoice Summary",
          },
        ],
      },
      {
        module_name: "Channel",
        menus: [
          {
            menu_name: " ",
            sub_module_name: "Channel/Class",
          },
        ],
      },
      {
        module_name: "City",
        menus: [
          {
            menu_name: "",
            sub_module_name: "City",
          },
        ],
      },
      {
        module_name: "Client",
        menus: [
          {
            menu_name: "",
            sub_module_name: "All",
             },
          {
            menu_name: "",
            sub_module_name: "ClientWindowGrid",

          },
          {
            menu_name: "",
            sub_module_name: "ClientAssignee",
          },
          {
            menu_name: "",
            sub_module_name: "Client Contact Detail",

          },
          {
            menu_name: "",
            sub_module_name: "Client Contact Detail",
          },
          {
            menu_name: "",
            sub_module_name: "Client Contact Detail",

          },
        ],
      },
    ],
  };

  return (
    <div className="py-5 w-full relative z-20 text-black space-y-4">

      <div className='space-y-1 w-80'>
        <Label>Replicate User</Label>
        <Select
          open={isOpen}
          onOpenChange={(open) => setIsOpen(open)} // Control dropdown open/close
        >
          <SelectTrigger className="dropdown" onClick={() => setIsOpen(true)}>
            <SelectValue placeholder="-Select-" />
          </SelectTrigger>
          <SelectContent>
            {/* Search Bar */}
            <div className="p-2">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                autoFocus // Automatically focus input when dropdown opens
              />
            </div>
            {/* Filtered Options */}
            {filteredOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                onClick={() => setIsOpen(false)} // Close dropdown on option select
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border bg-white h-full p-4 rounded-[18px]">
        <Table>
          <TableHeader className={"bg-[#E0E9FF]"}>
            <TableRow className={"text-nowrap rounded-r-2xl"}>

              <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                Menu Name
              </TableHead>
              <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                Sub Module Name
              </TableHead>
              <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                Add
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                }
              >
                Edit
              </TableHead>

              <TableHead
                className={
                  "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                }
              >
                View
              </TableHead>

              <TableHead
                className={
                  "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                }
              >
                Delete
              </TableHead>

              <TableHead
                className={
                  "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                }
              >
                Export
              </TableHead>

              <TableHead
                className={
                  "text-center rounded-r-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat'] sticky right-0 bg-[#E0E9FF]"
                } >
                All
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {UserRightsDetails.modules &&
              UserRightsDetails.modules.map((UserRightsDetail, index) => {
                return (
                  <>
                    <TableRow className='w-full' key={index}>
                      <TableCell className='text-[16px] font-normal leading-normal'><span> Module Name : </span> <span className='font-medium'>{UserRightsDetail.module_name}</span></TableCell>
                    </TableRow>

                    {UserRightsDetail.menus && UserRightsDetail.menus.map((info, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap">
                          <TableCell key={index} className='border-r-[1px] border-slate-300'>{info.menu_name}</TableCell>
                          <TableCell key={index} className='border-r-[1px] border-slate-300'>{info.sub_module_name}</TableCell>
                          <TableCell key={index} className='border-r-[1px] border-slate-300'><input type="checkbox" className='w-5 h-5' id='add' name='add'/></TableCell>
                          <TableCell key={index} className='border-r-[1px] border-slate-300'><input type="checkbox" className='w-5 h-5' id='edit' name='edit'/></TableCell>
                          <TableCell key={index} className='border-r-[1px] border-slate-300'><input type="checkbox" className='w-5 h-5' id='view' name='view'/></TableCell>
                          <TableCell key={index} className='border-r-[1px] border-slate-300'><input type="checkbox" className='w-5 h-5' id='delete' name='delte'/></TableCell>
                          <TableCell key={index} className='border-r-[1px] border-slate-300'><input type="checkbox" className='w-5 h-5' id='export' name='export'/></TableCell>
                          <TableCell key={index} className='border-r-[1px] border-slate-300'><input type="checkbox" className='w-5 h-5' id='all' name='all'/></TableCell>
                        </TableRow>
                      )
                    })}
                  </>
                );
              })}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}

export default UserRightsTable;