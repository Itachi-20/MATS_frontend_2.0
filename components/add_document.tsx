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

type Props = {
  isAddDocument: () => void
}

const add_document = ({ ...Props }: Props) => {
  return (
    <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
      <div className="border-2 w-[700px] rounded-xl p-5 bg-white relative">
        <h1 className="text-black text-[30px] font-medium capitalize pb-4">
          Attach Documents
        </h1>
        <div className="grid grid-cols-7 gap-6 items-end">
                <div className="flex flex-col gap-2 col-span-3">
                    <label className="text-black text-sm font-normal capitalize">
                    Type<span className="text-[#e60000]">*</span>
                    </label>
                    <Select>
                    <SelectTrigger className="text-black shadow">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2 col-span-3">
                    <label className="text-black text-sm font-normal capitalize">
                    Attachments<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                    type="button"
                    className="text-black shadow"
                    placeholder="Type Here"
                    onClick={Props.isAddDocument}
                    ></Input>
                </div>
            <div className='col-span-1'>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="34" viewBox="0 0 54 34" fill="none" className='size-8'>
                        <path d="M26.9968 23.1761C30.3842 23.1761 33.1303 20.4084 33.1303 16.9943C33.1303 13.5802 30.3842 10.8125 26.9968 10.8125C23.6093 10.8125 20.8633 13.5802 20.8633 16.9943C20.8633 20.4084 23.6093 23.1761 26.9968 23.1761Z" fill="black"/>
                        
                        <path d="M49.9086 16.4745C48.1052 11.7727 44.9742 7.70659 40.9028 4.77868C36.8314 1.85077 31.998 0.189431 27 0C22.002 0.189431 17.1686 1.85077 13.0972 4.77868C9.02578 7.70659 5.89485 11.7727 4.09135 16.4745C3.96955 16.8141 3.96955 17.1859 4.09135 17.5255C5.89485 22.2273 9.02578 26.2934 13.0972 29.2213C17.1686 32.1492 22.002 33.8106 27 34C31.998 33.8106 36.8314 32.1492 40.9028 29.2213C44.9742 26.2934 48.1052 22.2273 49.9086 17.5255C50.0304 17.1859 50.0304 16.8141 49.9086 16.4745ZM27 27.0455C25.0287 27.0455 23.1017 26.4563 21.4627 25.3525C19.8236 24.2487 18.5461 22.6798 17.7917 20.8442C17.0374 19.0087 16.84 16.9889 17.2246 15.0402C17.6091 13.0916 18.5584 11.3017 19.9523 9.89679C21.3462 8.49191 23.1221 7.53517 25.0555 7.14757C26.9889 6.75996 28.993 6.95889 30.8142 7.71921C32.6354 8.47953 34.192 9.76708 35.2872 11.419C36.3824 13.071 36.9669 15.0132 36.9669 17C36.9629 19.663 35.9115 22.2157 34.0432 24.0987C32.1749 25.9817 29.6422 27.0414 27 27.0455Z" fill="black"/>
                
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="36" viewBox="0 0 32 36" fill="none" className='size-6'>
                        <path d="M26.0006 35.5H26H6C5.03354 35.5 4.21911 35.162 3.52955 34.4724C2.84007 33.783 2.50126 32.9678 2.5 31.9998V7C2.5 6.17157 1.82843 5.5 1 5.5C0.723857 5.5 0.5 5.27614 0.5 5V4C0.5 3.17157 1.17157 2.5 2 2.5H9C9.82843 2.5 10.5 1.82843 10.5 1C10.5 0.723857 10.7239 0.5 11 0.5H21C21.2761 0.5 21.5 0.723858 21.5 1C21.5 1.82843 22.1716 2.5 23 2.5H30C30.8284 2.5 31.5 3.17157 31.5 4V5C31.5 5.27614 31.2761 5.5 31 5.5C30.1716 5.5 29.5 6.17157 29.5 7V32C29.5 32.9665 29.162 33.7817 28.4721 34.4727C27.7828 35.1633 26.9681 35.5012 26.0006 35.5ZM9.5 26C9.5 27.3807 10.6193 28.5 12 28.5C13.3807 28.5 14.5 27.3807 14.5 26V12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12V26ZM17.5 26C17.5 27.3807 18.6193 28.5 20 28.5C21.3807 28.5 22.5 27.3807 22.5 26V12C22.5 10.6193 21.3807 9.5 20 9.5C18.6193 9.5 17.5 10.6193 17.5 12V26Z" fill="#E60000" stroke="#E60000"/>
                    </svg>
                </div>          
            </div>
        </div>
        <div className="flex justify-end pt-5 gap-4">
          <Button className="bg-white text-black border text-md font-normal hover:bg-white" onClick={Props.isAddDocument}>
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

export default add_document;