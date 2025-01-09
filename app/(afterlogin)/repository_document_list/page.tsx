
'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Svg from '../../(afterlogin)/repository_document_list/svg';
import AddPopup from './add_popup';
import { useRouter } from 'nextjs-toploader/app';
import Link from 'next/link';

// TypeScript types for card data
type CardItem = {
  id:string
  name: string;
  url: string;
};

type CardData = {
  name: string;
  attachments: CardItem[];
};

// Sample card data
// const cardData: CardData[] = [
//   {
//     title: "Training & Education",
//     items: [
//       { fileName: "Item 1", url: "url1" },
//       { fileName: "Item 2", url: "url2" },
//       { fileName: "Item 3", url: "url3" },
//       { fileName: "Item 4", url: "url4" },
//       { fileName: "Item 5", url: "url5" },
//     ],
//   },
//   {
//     title: "SOP,s",
//     items: [
//       { fileName: "Item A", url: "url1" },
//       { fileName: "Item B", url: "url2" },
//       { fileName: "Item C", url: "url3" },
//       { fileName: "Item D", url: "url4" },
//       { fileName: "Item E", url: "url5" },
//     ],
//   },
//   {
//     title: "HCP Services",
//     items: [
//       { fileName: "Item A", url: "url1" },
//       { fileName: "Item B", url: "url2" },
//       { fileName: "Item C", url: "url3" },
//       { fileName: "Item D", url: "url4" },
//       { fileName: "Item E", url: "url5" },
//     ],
//   },
//   {
//     title: "Closing Document",
//     items: [
//       { fileName: "Item A", url: "url1" },
//       { fileName: "Item B", url: "url2" },
//       { fileName: "Item C", url: "url3" },
//       { fileName: "Item D", url: "url4" },
//       { fileName: "Item E", url: "url5" },
//     ],
//   },
//   {
//     title: "Awareness Program",
//     items: [
//       { fileName: "Item A", url: "url1" },
//       { fileName: "Item B", url: "url2" },
//       { fileName: "Item C", url: "url3" },
//       { fileName: "Item D", url: "url4" },
//       { fileName: "Item E", url: "url5" },
//     ],
//   },
// ];

const Page: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cardData,setCardData] = useState<CardData[]>()
  const handleAdd = () => {
    setOpen(prevState => !prevState);
  };

  const handleDelete = async(name:string)=>{
    try {
      const tableData = await fetch(
        `api/documentRepositoryDelete/`,
        {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          credentials:"include",
          body:JSON.stringify({
            name:name
          })
        }
      );
      if(tableData.ok){
        const data = await tableData.json();
        router.push("/repository_document_list");
      }
     
    } catch (error) {
      console.log(error,"something went wrong");
    }
  }


  const fetchRepositoryFolder = async()=>{
    try {
      const response = await fetch(`api/documentRepositoryFolderList/`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            //'Cookie': cookies as string 
        },
        credentials:'include',
      })
      if(response.ok){
        const data = await response.json();
        setCardData(data.message.data)
      }
    } catch (error) {
      console.log(error,"this is error");
    }
  }

  const handleFileDelete = async(name:string)=>{
    try {
      const response = await fetch(`api/documentRepositoryFileDelete/`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            //'Cookie': cookies as string 
        },
        credentials:'include',
        body:JSON.stringify({
          name:name
        })
      })
      if(response.ok){
        const data = await response.json();

      }
    } catch (error) {
      console.log(error,"this is error");
    }
  }


  useEffect(()=>{
    fetchRepositoryFolder();
  },[])

  return (
    <>
      <div className="p-7 w-full relative z-20 text-black">
        <div className="flex justify-between pb-5">
          <Input
            className="w-[40%] rounded-[50px] bg-[#ecf2ff]"
            placeholder="Search"
          />
          <div className="flex gap-5">
            <Button
              className="text-black text-md font-normal bg-white hover:bg-white border rounded-[25px] px-8 py-5 shadow"
              onClick={handleAdd}
            >
              Add
            </Button>
            <Select>
              <SelectTrigger className="dropdown rounded-[25px] gap-4">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            {/* <Button className="text-black text-md font-normal bg-white hover:bg-white border rounded-[25px] px-8 py-5 shadow">
              Back
            </Button> */}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardData && cardData.map((card, index) => (
            <div key={index} className="border shadow-md rounded-2xl overflow-hidden relative group h-fit">
              <div className="flex justify-between py-14 px-6 items-center">
                <h2 className="text-2xl transition-colors duration-300 ease-in-out group-hover:text-[#988AFF] text-wrap">
                  {card.name}
                </h2>
                <div onClick={()=>handleDelete(card.name)} className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></div>
              </div>
              <div className="absolute -top-8 -left-8 transition-transform duration-500 ease-in-out group-hover:translate-x-6 group-hover:translate-y-8">
                <Svg />
              </div>
              {/* Expandable Content */}
              <div className="w-full bg-white pt-6 hidden group-hover:block transition-all duration-300 ease-in-out">
                <ul className="px-6">
                  {card.attachments?.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex justify-between text-[#606060] hover:text-black border-b py-1"
                    >
                      <Link href={item.url} target='blank'>
                      {item.name}
                      </Link>
                      <div className='cursor-pointer' onClick={()=>handleFileDelete(item.id)}>
                        
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && <AddPopup cardData={cardData} handleAdd={handleAdd}/>}
    </>
  );
};

export default Page;
