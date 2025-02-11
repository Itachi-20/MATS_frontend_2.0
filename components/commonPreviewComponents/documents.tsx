import React, { useState } from 'react'
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import { toast,Toaster } from 'sonner';
import DeleteDialog from '../deleteDialog';

import { PreviewDataType } from '@/app/Types/EventData';

type Props = {
  eventData: PreviewDataType | null
  PageName: string,
  fetchFile?: () => void 
}

const Documents = ({ PageName, ...Props }: Props) => {
  const [isDeleteDialog,setIsDeleteDialog] = useState<boolean>(false);
  const [deleteName,setDeleteName] = useState<string>("");
  console.log(Props.eventData?.documents, "this is documents")
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/training_and_education/fileDelete/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          //'Cookie': cookies as string 
        },
        credentials: 'include',
        body: JSON.stringify({
          name: deleteName
        })
      })
      if (response.ok) {
        console.log("successfully deleted");
        toast.success("File Deleted Successfully");
        if(Props.fetchFile){
          Props.fetchFile();
        }
      }
    } catch (error) {
      console.log(error, "this is error");
    }
  }

  return (
    <div className="md:pb-8">
      <div className="flex gap-5">
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          Documents
        </h1>
      </div>


      {
        Props.eventData && Props.eventData.documents?.map((item, index) => {
          return (
            <div className='border border-[#848484] p-4 rounded-2xl w-full mb-8'>
              <h1 className="text-black pl-4 pb-4">
                Document type:{" "}
                <span className="font-semibold">{item.activity_type}</span>
              </h1>
              <div className="bg-white">
                <div className="flex flex-col">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-black">
                        <TableHead className={"bg-[#E0E9FF] rounded-l-2xl text-[15px] w-[50%] pr-10"}
                        >
                          Supporting Document
                        </TableHead>
                        <TableHead className={"bg-[#E0E9FF] text-[15px] rounded-r-2xl w-[50%] divide-x-2"}
                        >
                          Documents

                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        item && item.document?.map((item2, index) => {
                          return (
                            <TableRow className="text-black divide-x-2">
                              <TableCell>{item2.type}</TableCell>
                              <TableCell>{item2.file?.map((item3, index) => {
                                return (
                                  <div className='flex justify-between'>
                                    <div className=''>{item3.file_name}</div>
                                    <div className='flex gap-5 items-center'>
                                      <Link rel="stylesheet" href={item3.url}>
                                        <Image src={"/svg/view.svg"} width={20} height={20} alt='view-document' className='cursor-pointer' />
                                      </Link>
                                      {
                                        item.activity_type == "Pre Activity" && Props.eventData?.preactivity_submitted != 1 &&
                                        <div onClick={async () => { setDeleteName(item3.name); setIsDeleteDialog(prev => !prev) }}>
                                        <Image src={"/svg/delete.svg"} width={20} height={20} alt='view-document' className='cursor-pointer' />
                                      </div>
                                      }
                                      {
                                        item.activity_type == "Executed" && Props.eventData?.executed != 1 &&
                                        <div onClick={async () => { setDeleteName(item3.name); setIsDeleteDialog(prev => !prev) }}>
                                        <Image src={"/svg/delete.svg"} width={20} height={20} alt='view-document' className='cursor-pointer' />
                                      </div>
                                      }
                                      {
                                        item.activity_type == "Post Activity" && Props.eventData?.post_activity_submitted != 1 &&
                                        <div onClick={() => {setDeleteName(item3.name); setIsDeleteDialog(prev => !prev) }}>
                                        <Image src={"/svg/delete.svg"} width={20} height={20} alt='view-document' className='cursor-pointer' />
                                      </div>
                                      }
                                      {/* <div className={`${Props.eventData && Props.eventData.preactivity_submitted == 1 ? "hidden" : ""}`} onClick={async () => { await handleDelete(item3.name) }}>
                                        <Image src={"/svg/delete.svg"} width={20} height={20} alt='view-document' className='cursor-pointer' />
                                      </div> */}
                                    </div>
                                  </div>
                                )
                              })}</TableCell>
                            </TableRow>
                          )
                        })
                      }
                      <TableRow className="text-black">

                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              {
                  isDeleteDialog && 
                  <DeleteDialog
                  text='Are You Sure You Want To Delete This Document?'
                  setClose={setIsDeleteDialog}
                  handleSubmit={handleDelete}
                  />
              }
              <Toaster richColors position="top-right" />
            </div>
            
          )
        })
      }
    </div>
  )
}

export default Documents