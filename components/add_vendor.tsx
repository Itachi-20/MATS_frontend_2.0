import React from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import AttachmentSvg from '@/public/svg/attachment.svg';
type formData = {
  name: string;
  vendor_type: string;
  vendor_name: string;
  remark: string;
  pan_number: string;
  vendor_code: string;
  email: string;
  contact_number: string;
  document:Document[];
};

type Props = {
  isAddVendor: () => void
  isAddDocument: () => void
  vendorType: {
    name: string,
    vendor_type: string
  }[] | null,
  formdata:{} | formData ,
  handlefieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
  // setFormData: (value: any) => void
}
const add_vendor = ({ ...Props }: Props) => {
  return (
    <div className="absolute z-30 flex inset-0  items-center justify-center bg-black bg-opacity-50">
      <div className="border-2 rounded-xl p-10 w-[850px] bg-white relative">
        <h1 className="text-black text-[30px] font-medium capitalize pb-4">
          Add New Vendor
        </h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              vendor type<span className="text-[#e60000]">*</span>
            </label>
            <Select
              onValueChange={(value) => Props.handleSelectChange(value, "vendor_type")}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {Props && Props.vendorType?.filter((item, index) => {
                  if (item.vendor_type == "Hotel" || item.vendor_type == "Travel" || item.vendor_type == "Food") {
                    return item
                  }
                })
                  .map((item) => {
                    return (
                      <SelectItem value={item.name}>{item.vendor_type}</SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              Vendor Code<span className="text-[#e60000]">*</span>
            </label>
            <Input className='dropdown' placeholder='Type Here'
              name='vendor_code'
              onChange={(e) => Props.handlefieldChange(e)}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              Vendor Name<span className="text-[#e60000]">*</span>
            </label>
            <Input className='dropdown' placeholder='Type Here'
              name='vendor_name'
              onChange={(e) => Props.handlefieldChange(e)}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              Contact Number<span className="text-[#e60000]">*</span>
            </label>
            <Input className='dropdown' placeholder='Type Here'
              name='contact_number'
              // type='number'
              onChange={(e) => Props.handlefieldChange(e)}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              PAN Number<span className="text-[#e60000]">*</span>
            </label>
            <Input className='dropdown' placeholder='Type Here'
              name='pan_number'
              onChange={(e) => Props.handlefieldChange(e)}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-normal capitalize">
              Email<span className="text-[#e60000]">*</span>
            </label>
            <Input className='dropdown' placeholder='Type Here'
              name='email'
              onChange={(e) => Props.handlefieldChange(e)}
            ></Input>
          </div>

          <div className="flex flex-col gap-2 ">
            <label className="text-black text-sm font-normal capitalize">
              Attachments<span className="text-[#e60000]">*</span>
            </label>
            <div className='relative '>
              <div className='flex absolute bottom-2 right-3'>
                {/* <div className='text-[#A3A3A3] h-[24px] w-2'></div> */}
                <Image src={'/svg/attachment.svg'} alt='viewsvg' width={20}  height={22} className=''/>
              </div>
            <Input
              type="button"
              className="text-black shadow"
              placeholder="Type Here"
              onClick={Props.isAddDocument}
            ></Input>
            </div>
          </div>
          <div className="flex flex-col col-span-2 gap-2">
            <label className="text-black text-sm font-normal capitalize">
              Remark<span className="text-[#e60000]">*</span>
            </label>
            <Textarea className='text-black shadow-md' placeholder='Type Here'
            name='remark'
            onChange={(e) => { Props.handlefieldChange(e) }}
          />
          </div>
        </div>
        <div className="flex justify-end pt-5 gap-4">
          <Button className="bg-white text-black border text-md font-normal hover:bg-white" onClick={Props.isAddVendor}>
            Back
          </Button>
          <Button className="bg-[#4430bf] text-white text-md font-normal border hover:bg-[#4430bf]" onClick={Props.handleSubmit}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default add_vendor