
'use client';
import React, { useState } from 'react';
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

// TypeScript types for card data
type CardItem = {
  fileName: string;
  url: string;
};

type CardData = {
  title: string;
  items: CardItem[];
};

// Sample card data
const cardData: CardData[] = [
  {
    title: "Training & Education",
    items: [
      { fileName: "Item 1", url: "url1" },
      { fileName: "Item 2", url: "url2" },
      { fileName: "Item 3", url: "url3" },
      { fileName: "Item 4", url: "url4" },
      { fileName: "Item 5", url: "url5" },
    ],
  },
  {
    title: "SOP,s",
    items: [
      { fileName: "Item A", url: "url1" },
      { fileName: "Item B", url: "url2" },
      { fileName: "Item C", url: "url3" },
      { fileName: "Item D", url: "url4" },
      { fileName: "Item E", url: "url5" },
    ],
  },
  {
    title: "HCP Services",
    items: [
      { fileName: "Item A", url: "url1" },
      { fileName: "Item B", url: "url2" },
      { fileName: "Item C", url: "url3" },
      { fileName: "Item D", url: "url4" },
      { fileName: "Item E", url: "url5" },
    ],
  },
  {
    title: "Closing Document",
    items: [
      { fileName: "Item A", url: "url1" },
      { fileName: "Item B", url: "url2" },
      { fileName: "Item C", url: "url3" },
      { fileName: "Item D", url: "url4" },
      { fileName: "Item E", url: "url5" },
    ],
  },
  {
    title: "Awareness Program",
    items: [
      { fileName: "Item A", url: "url1" },
      { fileName: "Item B", url: "url2" },
      { fileName: "Item C", url: "url3" },
      { fileName: "Item D", url: "url4" },
      { fileName: "Item E", url: "url5" },
    ],
  },
];

const Page: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    setOpen(prevState => !prevState);
  };

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
            <Button className="text-md font-normal text-[#E60000] bg-white hover:bg-white border border-[#E60000] rounded-[25px] px-8 py-5 shadow">
              Delete
            </Button>
            <Button className="text-black text-md font-normal bg-white hover:bg-white border rounded-[25px] px-8 py-5 shadow">
              Back
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <div key={index} className="border shadow-md rounded-2xl overflow-hidden relative group h-fit">
              <div className="flex justify-between py-14 px-6 items-center">
                <h2 className="text-2xl transition-colors duration-300 ease-in-out group-hover:text-[#988AFF] text-wrap">
                  {card.title}
                </h2>
                <div>svg</div>
              </div>
              <div className="absolute -top-8 -left-8 transition-transform duration-500 ease-in-out group-hover:translate-x-6 group-hover:translate-y-8">
                <Svg />
              </div>
              {/* Expandable Content */}
              <div className="w-full bg-white pt-6 hidden group-hover:block transition-all duration-300 ease-in-out">
                <ul className="px-6">
                  {card.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex justify-between text-[#606060] hover:text-black border-b py-1"
                    >
                      {item.fileName}
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        svg
                      </a>
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
