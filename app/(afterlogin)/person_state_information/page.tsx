import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PersonStateInformationPopup from '@/components/person_state_popup'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PersonStateTable = {
  person_name: string;
  state_name: string;
};


const PersonStateInformation = () => {

  const PersonInfo: PersonStateTable[] = [
    {
      person_name: "2346",
      state_name: "Lorem ipsum",

    },
    {
    person_name: "2346",
    state_name: "Lorem ipsum",

  },
  {
    person_name: "2346",
    state_name: "Lorem ipsum",

  },
  {
    person_name: "2346",
    state_name: "Lorem ipsum",

  },  {
    person_name: "2346",
    state_name: "Lorem ipsum",

  },
  {
    person_name: "2346",
    state_name: "Lorem ipsum",

  },
  ];

  return (
    <>
        <div className="p-7 w-full relative z-20 text-black">
          <div className="flex justify-between pb-5 relative">           
                <Input
                    className="w-[40%] rounded-[50px] bg-[#ecf2ff] placeholder:text-black"
                    placeholder="Search"
                />
                <Image src="svg/search.svg"  alt="search-icon" width={23} height={23} className="absolute right-[63%] top-[15%]"/> 
                
            <div className="flex gap-5">
                <div className="rounded-[25px] border-[.2px] border-slate-400 bg-[#FFF] text-[12px] flex space-x-3 px-[19px]">
                    <PersonStateInformationPopup />
                </div>
              <Select>
                <SelectTrigger className="text-black shadow focus-visible:ring-transparent rounded-[25px] gap-4 border border-slate-400 !important">
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Button className="text-black text-md font-normal bg-white hover:bg-white border rounded-[25px] px-8 py-5 shadow">
                Back
              </Button>
           
            </div>
          </div>
          
          <div className="border bg-white h-full p-4 rounded-[18px]">
            <Table className={""}>
              <TableHeader className={"bg-[#E0E9FF]"}>
                <TableRow className={"text-nowrap rounded-r-2xl"}>
                  <TableHead
                    className={
                      "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                  Person Name            
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                  State Name
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                   
                  </TableHead>

                  <TableHead
                    className={
                      "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    
                  </TableHead>

                  <TableHead
                    className={
                      "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                  
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                   
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                   
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                   
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                   
                  </TableHead>
            
                  <TableHead
                    className={
                      "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
                    }
                  >
                    {/* Action */}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {PersonInfo &&
                    PersonInfo.map((person, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap">
                          <TableCell>{person.person_name}</TableCell>
                          <TableCell>{person.state_name}</TableCell>  
                          <TableCell></TableCell>                     
                          <TableCell></TableCell>                     
                          <TableCell></TableCell>                     
                          <TableCell></TableCell>    
                          <TableCell></TableCell>    
                          <TableCell></TableCell>   
                          <TableCell></TableCell>                 
                          <TableCell className="sticky right-0 bg-[white] z-50 flex space-x-5 border-l justify-center border-slate-200">                          
                              <Image src={"/svg/editIcon.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer"/>
                              <Image src={"/svg/delete.svg"} width={15} height={20} alt="delete-svg" className="cursor-pointer"/>
                          </TableCell>
                </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </div>
        </div>
    </>
  );
};

export default PersonStateInformation;