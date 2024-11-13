'use client'
import React from 'react'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Table from "@/app/(afterlogin)/event_vendor_list/table";
import { useState } from 'react';
import Viewvendor from '@/components/view_vendor';
import ViewDocument from '@/components/view_document';
import Adddocument from '@/components/add_document';
import { View } from 'lucide-react';

const page = () => {
  const [viewVendor, setViewVendor] = useState(false);
  const [addDocument, setAddDocument] = useState(false);
  const [viewDocument, setViewDocument] = useState(false);
  const [vendorData, setVendorData] = useState();
  
  const isViewVendor = () => {
    setViewVendor(prev => !prev)
  }

  const isAddDocument = () => {
    setAddDocument(prev => !prev)
  }

  const isViewDocument = () => {
    setViewDocument(prev => !prev)
  }
  return (
    <>
      <div className='p-7 w-full relative z-20 text-black'>
        <div className="flex justify-between pb-5">
          <Input
            className="w-[40%] rounded-[50px] bg-[#ecf2ff]"
            placeholder="Search"
          />
          <div className="flex gap-5">
            <Select>
              <SelectTrigger className="dropdown rounded-[25px] gap-4">
                <SelectValue className="text-nowrap" placeholder="Vendor Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="dropdown rounded-[25px] gap-4">
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
        <Table isViewVendor={isViewVendor} />
      </div>
      {
        viewVendor &&
        <Viewvendor isViewVendor={isViewVendor} isAddDocument={isAddDocument} isViewDocument={isViewDocument} />
      }
      {
        addDocument &&
        <Adddocument isAddDocument={isAddDocument} />
      }
      {
        viewDocument &&
        <ViewDocument isViewDocument={isViewDocument}/>
      }
    </>
  )
}

export default page