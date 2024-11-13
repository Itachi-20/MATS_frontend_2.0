"use client";
import React from "react";
import {useEffect,useState} from "react"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Table, TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";

type EventTable = {
  name: string;
  event_name: string;
  event_type: string;
  event_start_date: string;
  event_end_date:string;
  event_requestor: string;
  event_venue:string;
  advance:string;
  event_status:string;
  post_activity_status:string;
};

export default function EventList () {

  const router = useRouter();
  const handleClick = (refno:string) => {

    //  yadi new tab mein open kerna hai tab isko use karenge 
    // const url = "/event_list/${id}"
    // window.open(url, '_blank')
    // agar same tab mein open kerna hai  to isko use krenge 
    router.push(`/event_list/${refno}`)
  }

  const [tableData,setTableData] = useState<EventTable[]>()

  const fetchTableData = async()=>{
    try {
      const Data = await fetch(
        `/api/eventList`,
        {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          credentials:'include',
          body:JSON.stringify({
            activity:"Pre Activity"
          })
        }
      );
      if(Data.ok){
        const data = await Data.json();
        setTableData(data.message)
      }
      
    } catch (error) {
      console.log(error,"something went wrong");
    }
  }

   useEffect(()=>{
  fetchTableData();
  },[])

  console.log(tableData,"this is state data")

  return (
        <div className="p-7 w-full relative z-20 text-black">
          <div className="flex justify-between pb-5 relative">           
            <Input className="w-[40%] rounded-[50px] bg-[#ecf2ff] placeholder:text-black"  placeholder="Search" />
            <Image src="svg/search.svg"  alt="search-icon" width={23} height={23} className="absolute right-[63%] top-[15%]"/>      
            <div className="flex gap-5">
              <Select>
                <SelectTrigger className="text-black shadow focus-visible:ring-transparent rounded-[25px] gap-4 border border-slate-400 !important">
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">Pdf</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="print">Print</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="text-black shadow focus-visible:ring-transparent rounded-[25px] gap-4 border border-slate-400 !important">
                  <SelectValue placeholder="Filter" />
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
                  <TableHead className={"text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"}>
                   Request No.
                  </TableHead>
                  <TableHead  className={ "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"} >
                    Event Name 
                  </TableHead>
                  <TableHead className={"text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']" } >
                    Event Type
                  </TableHead>
                  <TableHead className={"text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"} >
                    Event Date
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event End date
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event Requestor
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event Venue
                  </TableHead>
                 
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Advance 
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                   Event Status
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Post Activity Status
                  </TableHead>
                
                  <TableHead
                    className={
                      "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
                    }
                  >Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {tableData &&
                    tableData.map((data, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap">
                          <TableCell>{data.name}</TableCell>
                          <TableCell>{data.event_type}</TableCell>
                          <TableCell>{data.event_name}</TableCell>
                          <TableCell>{data.event_start_date}</TableCell>
                          <TableCell>{data.event_end_date}</TableCell>
                          <TableCell>{data.event_requestor}</TableCell>
                          <TableCell>{data.event_venue}</TableCell>
                          <TableCell>{data.advance}</TableCell>
                          <TableCell >{data.event_status}</TableCell>
                          <TableCell >{data.post_activity_status}</TableCell>                        
                          <TableCell className="sticky right-0 bg-[white] z-50 flex space-x-8 border-l border-slate-200 "> 
                              <Image src={"/svg/view.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer" onClick={()=>handleClick(data.name)} />                        
                          </TableCell>
                </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </div>
        </div>
  );
};