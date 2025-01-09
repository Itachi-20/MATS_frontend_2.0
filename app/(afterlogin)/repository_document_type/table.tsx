"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react";
type EventTable = {
  name: string;
  owner: string;

};

type Props = {
  handleAdd: () => void
  setName: (name: string) => void
  setType: (type: string) => void
}

const table = ({ ...Props }: Props) => {
  const [listData, setListData] = useState<EventTable[]>();
  const [loading, setLoading] = useState(true)
  const fetchTable = async () => {
    setLoading(true)
    try {
      const tableData = await fetch(
        `api/documentRepositoryTypeList/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        }
      );
      if (tableData.ok) {
        const data = await tableData.json();
        setListData(data.message);
        setLoading(false)
      }else{
        setLoading(false)
      }

    } catch (error) {
      setLoading(false)
      console.log(error, "something went wrong");
    }
  }


  const handleDelete = async (name: string) => {
    try {
      const tableData = await fetch(
        `api/documentRepositoryDelete/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: name
          })
        }
      );
      if (tableData.ok) {
        const data = await tableData.json();
        setListData(data.message);
      }

    } catch (error) {
      console.log(error, "something went wrong");
    }
  }

  useEffect(() => {
    fetchTable();
  }, [])



  // const tableData = await fetchTable();
  // console.log("tableData",tableData)
  return (
    <div className="border bg-white h-full p-4 rounded-[18px]">
      <Table className={""}>
        <TableHeader className={"bg-[#E0E9FF]"}>
          <TableRow className={"text-nowrap rounded-r-2xl border-none"}>
            <TableHead
              className={
                "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Repository Type
            </TableHead>
            <TableHead
              className={
                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Created By
            </TableHead>
            <TableHead
              className={
                "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
              }
            >Action</TableHead>
          </TableRow>
        </TableHeader>
       

        {
            loading ? <TableBody><TableRow ><TableCell colSpan={12} ><>
              <div className='flex items-center justify-center'>
                <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            </></TableCell></TableRow></TableBody> :
              listData ?
              <TableBody>
              {listData &&
                listData.map((data, index) => {
                  return (
                    <TableRow key={index} className="text-center text-nowrap text-black">
                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.owner}</TableCell>
    
                      <TableCell className='sticky right-0 z-50 bg-white mt-2'>
                        <Button onClick={() => { Props.setName(data.name); Props.setType("edit"); Props.handleAdd(); }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                        </Button>
                        <Button onClick={() => { handleDelete(data.name) }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
                :
                <TableBody>
                  <TableRow ><TableCell colSpan={12} className='text-center'>No Results.</TableCell></TableRow>
                </TableBody>
          }
      </Table>
    </div>
  )
}

export default table
