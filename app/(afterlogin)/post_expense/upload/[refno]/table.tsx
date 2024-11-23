'use client'
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
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import UploadExport from "./export_popup";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import ViewDocument from '@/components/viewDocument'

type ImportFiles = {
    name: string,
    file_name: string,
    file_url: string
}

type TableData = {
  name: string;
  event_date: string;
  cost_center: string;
  cost_code: string;
  cost_desc: string;
  cost_hod: string;
  business_unit: string;
  event_name: string | null;
  sub_type_of_activity: string | null;
  event_requestor: string;
  total_compensation_expense: number;
  event_conclusion: string;
  actual_vendors: Array<any>; // Replace `any` with a specific type if needed
  import_files: ImportFiles[];
};

type Props = {
  tableData: TableData; // Props includes the tableData field
};

type dropdownData = {
  company: {
    name: string,
    company_name: "string"
  }[],
  division: {
    name: string,
    division_name: string
  }[],
  requestor: {
    full_name: string,
    email: string
  }[],
  vendor_type: {
    name: string,
    vendor_type: string
  }[],
  state: {
    name: string,
    state: string
  }[]
  currency: {
    name: string
  }[]
}

type vendorName = {
  name: string,
  vendor_name: string
}[]

type VendorData = {
  vendor_type: string;
  vendor_name: string;
  advance: number;
  file: string;
};
type DocumentRow = {
  name: string,
  file_name: string;
  createdDate: string;
  createdBy: string;
  file_url: string;
};
const table = ({ tableData }: Props) => {

  const [open, setOpen] = useState(false);
  const [exportopen, setExportOpen] = useState(false);
  const [compansationVendorName, setCompansationVendorName] = useState("");
  const [dropdownData, setDropdownData] = useState<dropdownData | null>(null);
  const [vendorName, setVendorName] = useState<vendorName | null>(null);
  const [tabledata, setTableData] = useState(tableData)
  const [vendorDetails, setVendorDetails] = useState<VendorData>({
    vendor_type: '',
    vendor_name: '',
    advance: 0,
    file: '',
  });
  const [file, setFile] = useState<FileList | null>();
  const [fileData, setFileData] = useState<DocumentRow[] | undefined>();
  const [fileList, setFileList] = useState<File[]>([]);
  const base_url = process.env.NEXT_PUBLIC_FRAPPE_URL;
  const router = useRouter();

  const handleRecordDeletion = async(name:string) => {
    try {
      const response = await fetch(
        "/api/postExpense/deleteRecord",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            name: name
          })
        }
      );
      if (response.ok) {
        console.log("SUccessfull deletion")
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  }

  const handleExport = () => {
    setExportOpen(prevState => !prevState);
};

  const handleFileUpload: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFileList(files);
  };

  const handleVendorTypeChangeApi = async (value: string) => {
    try {
      const response = await fetch(
        `/api/training_and_education/vendorName?vendor_type=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          "credentials": 'include'
        }
      );


      if (response.ok) {
        const data = await response.json();
        setVendorName(data.data)
        console.log(data, "vendor name api");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const dropdown = async () => {

    try {
      const response = await fetch("/api/training_and_education/dropdown", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setDropdownData(data.data);
      if (response.ok) {
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    dropdown();
  }, [])

  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericValue = name === 'advance' ? (value ? parseFloat(value) : 0) : value;
    setVendorDetails(prev => ({ ...prev, [name]: numericValue }));
  }
  const handleConclusionChange = (newConclusion: string) => {
    setTableData(prev => ({
      ...prev,
      event_conclusion: newConclusion,
    }));
  };

  const addVendor = async () => {
    console.log("fileList", fileList);
    if (!fileList) {
      alert('Please upload a file');
      return;
    }

    const formData = new FormData();
    if (fileList && fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        formData.append("file", fileList[i]);
      }
    } else {
      console.log("No file to upload");
      return;
    }
    try {

      const response = await fetch('/api/multipleFileUpload', { method: 'POST', body: formData });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();
      const file = data.message.files;
      console.log("response data upload add", data)
      const newVendor = { ...vendorDetails, file: file };

      setTableData(prev => ({
        ...prev,
        actual_vendors: [...prev.actual_vendors, newVendor],
      }));

      setVendorDetails({ vendor_type: '', vendor_name: '', advance: 0, file: '' });
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("formdata before submit", tabledata)
    try {
      const response = await fetch(
        "/api/postExpenseRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(tabledata)
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data, "response data");
        setTimeout(() => {
          router.push(`/event_list`);
        }, 1000)
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };

  const handleSetFileData = async (file: any) => {
    console.log(file, 'file in setfile ')
    setFileData(file);
    setOpen(true)
  };
  console.log(fileList, 'fileList------------------------------------------')

  console.log(tabledata, 'tabledata------------------------------------------')
  return (
    <>

      <div className='p-8  '>
        <div className='text-black flex justify-between items-center'>
          <div className='text-2xl font-semibold'>
            Training & Education
          </div>
          <div className='flex gap-4'>
            <Button className="border rounded-sm px-6 py-1 border-black text-black">Back</Button>
          </div>
        </div>
        <div className='border rounded-3xl mt-5 mb-7 p-2 text-black grid grid-cols-3'>
          <div className='grid-cols-1 px-6 border-r'>
            <ul className=''>
              <li className='border-b p-2'>Event Date :<span className='font-semibold px-1'>{tableData ? tableData.event_date : ''}</span></li>
              <li className='border-b p-2'>Event Name :<span className='font-semibold px-1'>{tableData ? tableData.event_name : ''}</span></li>
              <li className='border-b p-2'>Event Requester Name :<span className='font-semibold px-1'>{tableData ? tableData.event_requestor : ''}</span></li>
              <li className='p-2'>Event Requester Number :<span className='font-semibold px-1'>{tableData ? tableData.name : ''}</span></li>
            </ul>
          </div>
          <div className='grid-cols-1 px-6 border-r'>
            <ul className=''>
              <li className='border-b p-2'>Cost Center :<span className='font-semibold px-1'>{tableData ? tableData.cost_center : ''}</span></li>
              <li className='border-b p-2'>Cost Center Hod :<span className='font-semibold px-1'>{tableData ? tableData.cost_hod : ''}</span></li>
              <li className='border-b p-2'>Cost Center Description :<span className='font-semibold px-1'>{tableData ? tableData.cost_desc : ''}</span></li>
              <li className='p-2'>Reporting Head :<span className='font-semibold px-1'>{tableData ? tableData.event_date : ''}</span></li>
            </ul>
          </div>
          <div className='grid-cols-1 px-6'>
            <ul className=''>
              <li className='border-b p-2'>Business Unit :<span className='font-semibold px-1'>{tableData ? tableData.business_unit : ''}</span></li>
              <li className='border-b p-2'>Sub Type Of activity :<span className='font-semibold px-1'>{tableData ? tableData.sub_type_of_activity : ''}</span></li>
              <li className='border-b p-2'>Total Estimated Expense :<span className='font-semibold px-1'>{tableData ? tableData.total_compensation_expense : ''}</span></li>
            </ul>
          </div>

        </div>

        <div className=" grid grid-cols-3 gap-4 pb-7">
          <div className='col-span-3 space-y-2'>
            <label htmlFor="event_conclusion" className="text-black md:text-sm md:font-normal capitalize">
              Event Conclusion<span className="text-[#e60000] ">*</span>
            </label>
            <Textarea
              className="text-black shadow md:rounded-xl md:py-2"
              placeholder="Type here ..."
              id='event_conclusion'
              name='event_conclusion'
              onChange={(e) => handleConclusionChange(e.target.value)}
            ></Textarea>
          </div>

          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="vendor_type" className="text-black md:text-sm md:font-normal capitalize">
              Vendor Type<span className="text-[#e60000] ">*</span>
            </label>
            <Select
              onValueChange={(value) => {
                handleVendorTypeChangeApi(value);
                setVendorDetails((prev) => ({
                  ...prev,
                  vendor_type: value,
                }))
                  ;
              }}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {dropdownData && dropdownData.vendor_type?.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>{item.vendor_type}</SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="vendor_name" className="text-black md:text-sm md:font-normal capitalize">
              Vendor Name<span className="text-[#e60000] ">*</span>
            </label>
            <Select
              onValueChange={(value: string) => {
                setCompansationVendorName(value);
                setVendorDetails((prev) => ({
                  ...prev,
                  vendor_name: value, // Update vendor_name in the vendorDetails state
                }));
              }}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {
                  vendorName && vendorName.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>{item.vendor_name}</SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="amount" className="text-black md:text-sm md:font-normal capitalize">
              Amount<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              className="text-black shadow"
              placeholder="Type Here"
              type='number'
              name='advance'
              onChange={handlefieldChange}
            ></Input>
          </div>
        </div>

        <div className='flex justify-end gap-2 pb-7'>
        <Button className='text-[#4430BF] bg-[#F0EDFF] gap-2' onClick={handleExport}>
                        <Image src={'/svg/import.svg'} alt='importsvg' width={20} height={20} />
                        Import Document
                    </Button>
          <label className="flex items-center gap-2 px-2 bg-[#F0EDFF] rounded-md shadow-sm cursor-pointer border-[1px]">
            <Image src={'/svg/download.svg'} alt='downloadsvg' width={20} height={20} />
            <span className="font-medium text-[#4430BF]">
              {fileList.length > 0
                ? fileList.map((file) => file.name).join(", ")
                : "Receipt/Bill"}
            </span>
            <Input type="file" className="hidden" onChange={(e) => { handleFileUpload(e) }} id="file" multiple />
          </label>
          <Button className="border border-[#4430bf] text-[#4430bf] text-[18px]" onClick={addVendor} >Add</Button>
        </div>
        <div className="border bg-white h-full p-4 rounded-[18px]">
          <Table className={""}>
            <TableHeader className={"bg-[#E0E9FF]"}>
              <TableRow className={"text-nowrap rounded-r-2xl border-none"}>
                <TableHead
                  className={
                    "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  Event Request Number
                </TableHead>
                <TableHead
                  className={
                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  Vendor Type
                </TableHead>
                <TableHead
                  className={
                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  Vendor Code
                </TableHead>

                <TableHead
                  className={
                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  Vendor Name
                </TableHead>

                <TableHead
                  className={
                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  Billable Amount
                </TableHead>
                <TableHead
                  className={
                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  Status
                </TableHead>
                <TableHead
                  className={
                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  GST
                </TableHead>

                <TableHead
                  className={
                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  Invoice Amount
                </TableHead>
                <TableHead
                  className={
                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  TDS
                </TableHead>
                <TableHead
                  className={
                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  Net Amount
                </TableHead>
                <TableHead
                  className={
                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  UTR Number
                </TableHead>
                <TableHead
                  className={
                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  Payment Date
                </TableHead>
                <TableHead
                  className={
                    "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
                  }
                >Action</TableHead>
              </TableRow>
            </TableHeader>
            {
              tabledata.actual_vendors &&
              tabledata.actual_vendors.length > 0 ?
                <TableBody>
                  {tabledata &&
                    tabledata.actual_vendors.map((data, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap text-black">
                          <TableCell>{data.event_request_number}</TableCell>
                          <TableCell>{data.vendor_type}</TableCell>
                          <TableCell>{data.vendor_code}</TableCell>
                          <TableCell>{data.vendor_name}</TableCell>
                          <TableCell>{data.billable_amount}</TableCell>
                          <TableCell>{data.status}</TableCell>
                          <TableCell>{data.gst}</TableCell>
                          <TableCell>{data.invoice_amount}</TableCell>
                          <TableCell>{data.tds}</TableCell>
                          <TableCell>{data.net_amount}</TableCell>
                          <TableCell>{data.utr_number}</TableCell>
                          <TableCell>{data.payment_date}</TableCell>

                          <TableCell className='sticky right-0 z-50 gap-3 w-[120px] bg-white mt-2 flex border-l'>
                            {/* <Link
                              href={`${base_url}${data.file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            > */}
                            {/* <Image src={'/svg/view.svg'} alt='viewsvg' width={24} height={18} /> */}
                            <Button onClick={() => handleSetFileData(data.file)}>View</Button>

                            {/* </Link> */}
                            <Image src={'/svg/editIcon.svg'} alt='editsvg' width={20} height={18} />
                            <Image src={'/svg/delete.svg'} alt='deletesvg' width={20} height={18} onClick={()=>handleRecordDeletion(data.name)}/>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
                :
                <TableBody>
                  <TableRow className="text-center text-black text-nowrap ">
                    <TableCell colSpan={9}>No Results</TableCell>
                  </TableRow>
                </TableBody>
            }
          </Table>
        </div>

        <div className='flex justify-end gap-2 pt-8'>
          <Button className='bg-[#4430BF] px-10' onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
      {
        open &&
        <ViewDocument setClose={setOpen} data={fileData} />
      }
      {exportopen && <UploadExport handleExport={handleExport} data={tabledata.import_files}/>}
    </>

  )
}

export default table
