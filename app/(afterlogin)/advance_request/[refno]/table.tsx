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
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import { useState, useEffect } from 'react'
import { useRouter } from 'nextjs-toploader/app';
import { useParams } from 'next/navigation';
import ViewDocument from '@/components/view_document';
import DeletePopup from '@/components/deleteDialog';
import { Toaster, toast } from 'sonner';
import SubmitPopup from '@/components/successProp';
import SimpleFileUpload from '@/components/multiple_file_upload';
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
  total_balance_amount: number;
  total_advance_amount: number;
  total_estimated_expense: number;
  total_logistics_expense: number;
  event_conclusion: string;
  is_declared: boolean;
  actual_vendors: Array<any>; // Replace `any` with a specific type if needed
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
};

type vendorName = {
  name: string,
  vendor_name: string
}[];

type VendorData = {
  vendor_type: string;
  vendor_name: string;
  advance: number;
  amount: number;
  file: File | null;
};
type DocumentRow = {
  file_name: string;
  name: string;
  file_url: string;
  creation: string;
  owner: string;
};
type Errors = {
  vendor_type: string,
  vendor_name: string,
  advance: string,
}


const table = ({ tableData }: Props) => {

  const [open, setOpen] = useState(false);
  const [eventconclusion, setEventConclusion] = useState("");
  const [loading, setLoading] = useState(false)
  const [dropdownData, setDropdownData] = useState<dropdownData | null>(null);
  const [vendorName, setVendorName] = useState<vendorName | null>(null);
  // const [advance_amount, setAdvanceAmount] = useState<number | null>(null);
  const [tabledata, setTableData] = useState<TableData>()
  const [vendorDetails, setVendorDetails] = useState<VendorData>({
    vendor_type: '',
    vendor_name: '',
    advance: 0,
    amount: 0,
    file: null,
  });
  const [fileData, setFileData] = useState<DocumentRow[] | undefined>();
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null)
  const [files, setFiles] = useState<File[]>([]);
  const base_url = process.env.NEXT_PUBLIC_FRAPPE_URL;
  const router = useRouter();
  const [deletename, setDeleteName] = useState<string | null>();
  const [deletepopup, setDeletePopup] = useState(false);
  const [submitpop, setSubmitPopup] = useState(false);
  const req_no = useParams()
  const [errors, setErrors] = useState<Errors>();
  const handleVendorTypeChangeApi = async (value: string) => {
    setVendorDetails({ ...vendorDetails, vendor_name: "", advance: 0 } as VendorData);

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

  const EventData = async () => {
    try {
      const response = await fetch("/api/getAdvanceRequestData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          name: req_no.refno
        })
      });

      const data = await response.json();
      console.log("data respomse event data", data)
      setTableData(data.data);
      if (response.ok) {
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    EventData();
  }, [])

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
    const numericValue = name === 'advance' ? (value ? parseFloat(value) : '') : value;
    setVendorDetails(prev => ({ ...prev, [name]: numericValue }));
    setErrors({ ...errors, advance: "" } as Errors);
  };
  const handleConclusionChange = (newConclusion: string) => {
    setEventConclusion(
      newConclusion,
    );
  };


  const validate = () => {
    const errors = {} as Errors;
    if (!vendorDetails.vendor_type) errors.vendor_type = "Vendor Type is required";
    if (!vendorDetails.vendor_name) errors.vendor_name = "Vendor Name is required";
    if (!vendorDetails.advance) errors.advance = "Amount is required";
    return errors;
  };

  const addVendor = async () => {

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors as Errors);
      return;
    }
    setErrors({} as Errors);
    const formData = new FormData();
    formData.append("vendor_type", vendorDetails.vendor_type);
    formData.append("vendor_name", vendorDetails.vendor_name);
    formData.append("advance", vendorDetails.advance as any);
    formData.append("name", req_no.refno as any);
    if (uploadedFiles && uploadedFiles.length > 0) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        formData.append("file", uploadedFiles[i]);
      }
    } else {
      toast.warning("No file to Upload");
      console.log("No file to upload");
      return;
    }

    const apiCallPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/advanceRequest', {
          method: "POST",
          credentials: 'include',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Advance request failed');
        }

        const data = await response.json();
        resolve(data); // Resolve with the response data
      } catch (error) {
        reject(error); // Reject with the error
      }
    });
    toast.promise(apiCallPromise, {
      loading: 'Submitting vendor details...',
      success: (data) => {
        setTimeout(() => {
          EventData();
        }, 500);
        setVendorDetails({ vendor_type: '', vendor_name: '', advance: 0, amount: 0, file: null });
        setUploadedFiles(null);
        setFiles([]);
        setErrors({} as Errors);
        return 'Vendor has been added successfully!';
      },
      error: (error) => `Failed to add vendor: ${error.message || error}`,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const names = tabledata?.actual_vendors.map(item => ({ name: item.name }));
    try {
      const response = await fetch(
        "/api/advanceRequest/finalSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            name: tableData.name,
            event_conclusion: eventconclusion,
            vendor: names
          }
          )
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

  const handleDeleteDialog = async (name: string) => {
    console.log('indise delete ')
    setDeleteName(name);
    setDeletePopup(true)
  };

  const handleDeleteVendor = async () => {
    setLoading(true)
    console.log("deletename", deletename)
    try {
      const response = await fetch(
        "/api/deleteVendor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            name: deletename
          })
        }
      );
      if (response.ok) {
        setLoading(false)
        // const data = await response.json();
        setDeletePopup(false)
        console.log(" Successful Delete response data");
        setTimeout(() => {
          toast.success("Vendor Deleted Successfully");
        }, 1000)
        EventData();

      } else {
        console.log("submission failed");
      }
    } catch (error) {
      setLoading(false)
      console.error("Error during Submission:", error);
    }
  };

  const handleNext = () => {

  };

  const handleAdvanceAmountApi = async (value: string) => {
    console.log("inside amount api venser name ")
    try {
      const response = await fetch(
        `/api/postExpense/getExpenseAmount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          "credentials": 'include',
          body: JSON.stringify({
            name: tableData?.name,
            vendor_name: value
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setVendorDetails((prev) => ({
          ...prev,
          advance: data.data?.est_amount,
        }))
        setErrors({ ...errors, advance: "", vendor_name: "" } as Errors);
        console.log(data, "-----------vendor name api------------------");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <>

      <div className='p-8  '>
        <div className='text-black flex justify-between items-center'>
          <div className='text-2xl font-semibold'>
            Training & Education
          </div>
          <div className='flex gap-4'>
            <Button className="border rounded-sm px-6 py-1 border-black text-black" onClick={() => router.push(`/event_list`)}>Back</Button>
          </div>
        </div>
        <div className='border rounded-3xl mt-5 mb-7 p-2 text-black grid grid-cols-3'>
          <div className='grid-cols-1 px-6 border-r'>
            <ul className=''>
              <li className='border-b p-2'>Event Date :<span className='font-semibold px-1'>{tableData ? tableData.event_date : ''}</span></li>
              <li className='border-b p-2'>Event Name :<span className='font-semibold px-1'>{tableData ? tableData.event_name : ''}</span></li>
              <li className='border-b p-2'>Event Requester Name :<span className='font-semibold px-1'>{tableData ? tableData.event_requestor : ''}</span></li>
              <li className='border-b p-2'>Event Requester Number :<span className='font-semibold px-1'>{tableData ? tableData.name : ''}</span></li>
              <li className=' p-2'>Business Unit :<span className='font-semibold px-1'>{tableData ? tableData.business_unit : ''}</span></li>
            </ul>
          </div>
          <div className='grid-cols-1 px-6 border-r'>
            <ul className=''>
              <li className='border-b p-2'>Cost Center :<span className='font-semibold px-1'>{tableData ? tableData.cost_center : ''}</span></li>
              <li className='border-b p-2'>Cost Center Hod :<span className='font-semibold px-1'>{tableData ? tableData.cost_hod : ''}</span></li>
              <li className='border-b p-2'>Cost Center Description :<span className='font-semibold px-1'>{tableData ? tableData.cost_desc : ''}</span></li>
              <li className='border-b p-2'>Reporting Head :<span className='font-semibold px-1'>{tableData ? tableData.event_date : ''}</span></li>
              <li className=' p-2'>Sub Type Of activity :<span className='font-semibold px-1'>{tableData ? tableData.sub_type_of_activity : ''}</span></li>
            </ul>
          </div>
          <div className='grid-cols-1 px-6'>
            <ul className=''>
              <li className='border-b p-2'>Total logistics Expense :<span className='font-semibold px-1'>{tableData ? tableData.total_logistics_expense : ''}</span></li>
              <li className='border-b p-2'>Total Compensation Expense :<span className='font-semibold px-1'>{tableData ? tableData.total_compensation_expense : ''}</span></li>
              <li className='border-b p-2'>Total Estimated Expense :<span className='font-semibold px-1'>{tableData ? tableData.total_estimated_expense : ''}</span></li>
              <li className='border-b p-2'>Total Advance Expense :<span className='font-semibold px-1'>{tableData ? tableData.total_advance_amount : ''}</span></li>
              <li className=' p-2'>Total Remaining Expense :<span className='font-semibold px-1'>{tableData ? tableData.total_balance_amount : ''}</span></li>
            </ul>
          </div>

        </div>
        {!tableData?.is_declared &&
          <>
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
                  defaultValue={tableData?.event_conclusion ?tableData?.event_conclusion:''}
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
                    setErrors({ ...errors, vendor_type: "" } as Errors);
                  }}
                  value={vendorDetails.vendor_type ?? ''}
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
                {errors?.vendor_type && <p className="text-red-500 text-xs">{errors.vendor_type}</p>}
              </div>
              <div className='grid-cols-1 space-y-2'>
                <label htmlFor="vendor_name" className="text-black md:text-sm md:font-normal capitalize">
                  Vendor Name<span className="text-[#e60000] ">*</span>
                </label>
                <Select
                  onValueChange={(value: string) => {
                    handleAdvanceAmountApi(value);
                    setVendorDetails((prev) => ({
                      ...prev,
                      vendor_name: value, // Update vendor_name in the vendorDetails state
                    }));
                    setErrors({ ...errors, vendor_name: "" } as Errors);
                  }}
                  value={vendorDetails.vendor_name ?? ''}
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
                {errors?.vendor_name && <p className="text-red-500 text-xs">{errors.vendor_name}</p>}
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
                  value={vendorDetails.advance ?? ''}

                ></Input>
                {errors?.advance && <p className="text-red-500 text-xs">{errors.advance}</p>}
              </div>
            </div>

            <div className='flex justify-end gap-2 pb-7'>
              {/* <SimpleFileUpload onNext={handleNext} buttonText={'Receipts/Bills'} /> */}
              <SimpleFileUpload files={files} setFiles={setFiles} setUploadedFiles={setUploadedFiles} onNext={handleNext} buttonText={'Receipts/Bills'} />

              <Button className="border border-[#4430bf] text-[#4430bf] text-[18px]" onClick={() => addVendor()}>Add</Button>
            </div>
          </>
        }
        <div className="border bg-white h-full p-4 rounded-[18px]">
          <Table className={""}>
            <TableHeader className={"bg-[#E0E9FF]"}>
              <TableRow className={"text-nowrap rounded-r-2xl border-none"}>
                <TableHead
                  className={
                    "text-center rounded-l-2xl  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
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
                    "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-20 bg-[#E0E9FF]"
                  }
                >Action</TableHead>
              </TableRow>
            </TableHeader>
            {tabledata &&
              tabledata?.actual_vendors?.length > 0 ?
              <TableBody>
                {tabledata &&
                  tabledata?.actual_vendors.map((data, index) => {
                    return (
                      <TableRow key={index} className="text-center text-nowrap text-black">
                        <TableCell>{data.parent}</TableCell>
                        <TableCell>{data.vendor_type}</TableCell>
                        <TableCell>{data.vendor_code}</TableCell>
                        <TableCell>{data.vendor_name}</TableCell>
                        <TableCell>{data.advance}</TableCell>
                        <TableCell>{data.status}</TableCell>
                        <TableCell>{data.gst}</TableCell>
                        <TableCell>{data.invoice_amount}</TableCell>
                        <TableCell>{data.tds}</TableCell>
                        <TableCell>{data.net_amount}</TableCell>
                        <TableCell>{data.utr_number}</TableCell>
                        <TableCell>{data.payment_date}</TableCell>

                        <TableCell className='sticky right-0 z-20 gap-3 w-[120px] bg-white mt-2 flex justify-center border-l'>
                          {/* <Link
                              href={`${base_url}${data.file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            > */}
                          {/* <Image src={'/svg/view.svg'} alt='viewsvg' width={24} height={18} /> */}
                          <button onClick={() => handleSetFileData(data.files)}><Image src={'/svg/view.svg'} alt='viewsvg' width={24} height={18} /></button>
                          {/* </Link> */}
                          {/* <Image src={'/svg/editIcon.svg'} alt='editsvg' width={20} height={18} /> */}
                          {
                            !tableData.is_declared &&
                            <button onClick={() => handleDeleteDialog(data.name)} ><Image src={'/svg/delete.svg'} alt='deletesvg' width={20} height={18} /></button>
                          }
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              :
              <TableBody>
                <TableRow key={''} className="text-center text-black text-nowrap ">
                  <TableCell colSpan={9}>No Results</TableCell>
                </TableRow>
              </TableBody>
            }
          </Table>
        </div>

        {!tableData?.is_declared &&
          <div className='flex justify-end gap-2 pt-8'>
            <Button className='bg-[#4430BF] px-10 text-white' onClick={handleSubmit}>Submit</Button>
          </div>
        }
      </div>
      <Toaster richColors position="top-right" />
      {
        open &&
        <ViewDocument setClose={setOpen} data={fileData} />
      }
      {
        deletepopup && <DeletePopup setClose={setDeletePopup} handleSubmit={handleDeleteVendor} Loading={loading} text={'Are You Sure Want To Delete ?'} />
      }

      {
        submitpop && <SubmitPopup title={'Event'} />
      }

    </>

  )
}

export default table
