import React from 'react'
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

type EventTable  = {
  name: string;
  vendor_type: string;
  vendor_name: string;
  remark: string;
  pan_number: string;
  vendor_code: string;
  email: string;
  contact_number: string;
};

type Props = {
  isViewVendor: () => void
  isAddDocument: () => void
  isViewDocument: () => void
  vendorInfo: EventTable | undefined
}

const view_vendor = ({ ...Props }: Props) => {

  const handleSelectField = (value:string):void => {
    console.log("Here is your selected value:",value);
  }

  return (
    <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
      <div className="border-2 rounded-xl p-5 bg-white relative">
        <h1 className="text-black text-[30px] font-medium capitalize pb-4">
          Entry Details
        </h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              vendor type<span className="text-[#e60000]">*</span>
            </label>
            <Select onValueChange={handleSelectField}>
              <SelectTrigger className="text-black shadow">
                <SelectValue placeholder={Props.vendorInfo ? Props.vendorInfo.vendor_type:""} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              Vendor Code<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow"
              placeholder="Type Here"
              value={Props.vendorInfo ? Props.vendorInfo.vendor_code:""}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              Vendor Name<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow"
              placeholder="Type Here"
              value={Props.vendorInfo ? Props.vendorInfo.vendor_name:""}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              Contact Number<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow"
              placeholder="Type Here"
              value={Props.vendorInfo ? Props.vendorInfo.contact_number:""}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              PAN Number<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow"
              placeholder="Type Here"
              value={Props.vendorInfo ? Props.vendorInfo.pan_number:""}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              Email<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow"
              placeholder="Type Here"
              value={Props.vendorInfo ? Props.vendorInfo.email:""}
            ></Input>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              Attachments<span className="text-[#e60000]">*</span>
            </label>
            <Input
              type="button"
              className="text-black border-dotted cursor-pointer"
              placeholder="Type Here"
              onClick={Props.isAddDocument}
            ></Input>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              View Document<span className="text-[#e60000]">*</span>
            </label>
            <Input
              type="button"
              className="text-black border-dotted cursor-pointer"
              placeholder="Type Here"
              onClick={Props.isViewDocument}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              Remark<span className="text-[#e60000]">*</span>
            </label>
            <Textarea
              className="text-black shadow"
              placeholder="Type Here"
              value={Props.vendorInfo ? Props.vendorInfo.remark:""}
            ></Textarea>
          </div>
          
          
        </div>
        <div className="flex justify-end pt-5 gap-4">
          <Button className="bg-white text-black border text-md font-normal hover:bg-white" onClick={Props.isViewVendor}>
            Back
          </Button>
          <Button className="bg-[#4430bf] text-white text-md font-normal border hover:bg-[#4430bf]">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default view_vendor