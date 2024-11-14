
import React from 'react'
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
import { cookies } from 'next/headers'
type EventTable = {
  repository_type:string;
  created_by:string;
  
};
const events: EventTable[] = [
  {
    repository_type:'Closing Document',
  created_by:'Nikita Suhasaria'
  },
  {
    repository_type:'Closing Document',
  created_by:'Nikita Suhasaria'
  },
  {
    repository_type:'Closing Document',
  created_by:'Nikita Suhasaria'
  },
  {
    repository_type:'Closing Document',
  created_by:'Nikita Suhasaria'
  },
  {
    repository_type:'Closing Document',
  created_by:'Nikita Suhasaria'
  },
  {
    repository_type:'Closing Document',
  created_by:'Nikita Suhasaria'
  }
];

// const fetchTable = async()=>{
//   try {
//     const cookie = await cookies();
//     const Cookie = cookie.toString();
//     const tableData = await fetch(
//       `http://10.10.3.26:8003/api/resource/Document Repository`,
//       {
//         method: "GET",
//         headers:{
//           "Content-Type": "application/json",
//           "Cookie":Cookie
//         },
//       }
//     );
//     if(tableData.ok){
//       const data = await tableData.json();
//       return data
//     }
   
//   } catch (error) {
//     console.log(error,"something went wrong");
//   }
// }

const table =  () => {
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
        <TableBody>
          {events &&
            events.map((data, index) => {
              return (
                <TableRow key={index} className="text-center text-nowrap text-black">
                  <TableCell>{data.repository_type}</TableCell>
                  <TableCell>{data.created_by}</TableCell>
                  
                  <TableCell className='sticky right-0 z-50 bg-white mt-2'>
                    <Button>b1</Button>
                    <Button>b1</Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  )
}

export default table
