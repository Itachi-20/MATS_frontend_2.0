import React from 'react'
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Documents:React.FC = () => {
  return (
    <div className="md:pb-8">
      <div className="flex gap-5">
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          Documents
        </h1>
      </div>

      <div className='border border-[#848484] p-4 rounded-2xl w-full'>
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
                    <TableCell><Image src="/svg/view.svg" width={20} height={20}  alt='view-document' className='cursor-pointer' /></TableCell>                
                </TableRow>
                <TableRow className="text-black flex justify-between items-center">
                  <TableCell>Stationary.cSV</TableCell>
                    <TableCell><Image src="/svg/view.svg" width={20} height={20}  alt='view-document' className='cursor-pointer' /></TableCell>                
                </TableRow>
              </TableBody>
            </Table>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Documents