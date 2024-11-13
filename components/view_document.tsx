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
    isViewDocument: () => void
}

const view_document = ({ ...Props }: Props) => {
    return (
        <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
            <div className="border-2 w-[700px] rounded-xl p-5 bg-white relative">
                <h1 className="text-black text-[30px] font-medium capitalize pb-4">
                    Uploaded Documents
                </h1>
                <div className="grid grid-cols-3 gap-6 items-end">
                    <div className="flex flex-col gap-2">
                        <label className="text-black text-sm font-normal capitalize">
                            Type<span className="text-[#e60000]">*</span>
                        </label>
                        <Select>
                            <SelectTrigger className="text-black shadow">
                                <SelectValue placeholder="Theme" />
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
                            Created date<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            type="text"
                            className="text-black shadow"
                            value={"Person 1"}
                        ></Input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-black text-sm font-normal capitalize">
                            Created by<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            type="button"
                            className="text-black shadow"
                            value={"Person 2"}
                        ></Input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-black text-sm font-normal capitalize">
                            Attachments<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            type="button"
                            className="text-black shadow"
                            placeholder="Type Here"
                            onClick={Props.isViewDocument}
                        ></Input>
                    </div>


                    <div className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="34" viewBox="0 0 54 34" fill="none" className='size-8'>
                            <path d="M26.9968 23.1761C30.3842 23.1761 33.1303 20.4084 33.1303 16.9943C33.1303 13.5802 30.3842 10.8125 26.9968 10.8125C23.6093 10.8125 20.8633 13.5802 20.8633 16.9943C20.8633 20.4084 23.6093 23.1761 26.9968 23.1761Z" fill="black" />

                            <path d="M49.9086 16.4745C48.1052 11.7727 44.9742 7.70659 40.9028 4.77868C36.8314 1.85077 31.998 0.189431 27 0C22.002 0.189431 17.1686 1.85077 13.0972 4.77868C9.02578 7.70659 5.89485 11.7727 4.09135 16.4745C3.96955 16.8141 3.96955 17.1859 4.09135 17.5255C5.89485 22.2273 9.02578 26.2934 13.0972 29.2213C17.1686 32.1492 22.002 33.8106 27 34C31.998 33.8106 36.8314 32.1492 40.9028 29.2213C44.9742 26.2934 48.1052 22.2273 49.9086 17.5255C50.0304 17.1859 50.0304 16.8141 49.9086 16.4745ZM27 27.0455C25.0287 27.0455 23.1017 26.4563 21.4627 25.3525C19.8236 24.2487 18.5461 22.6798 17.7917 20.8442C17.0374 19.0087 16.84 16.9889 17.2246 15.0402C17.6091 13.0916 18.5584 11.3017 19.9523 9.89679C21.3462 8.49191 23.1221 7.53517 25.0555 7.14757C26.9889 6.75996 28.993 6.95889 30.8142 7.71921C32.6354 8.47953 34.192 9.76708 35.2872 11.419C36.3824 13.071 36.9669 15.0132 36.9669 17C36.9629 19.663 35.9115 22.2157 34.0432 24.0987C32.1749 25.9817 29.6422 27.0414 27 27.0455Z" fill="black" />

                        </svg>
                    </div>
                    <div className="flex justify-end pt-5 gap-4">
                        <Button className="bg-white text-black border text-md font-normal hover:bg-white" onClick={Props.isViewDocument}>
                            Back
                        </Button>
                        <Button className="bg-[#4430bf] text-white text-md font-normal border hover:bg-[#4430bf]">
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default view_document;