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
import { useRouter } from 'nextjs-toploader/app';
import ViewDocument from '@/components/viewDocument';
import { useParams } from 'next/navigation';
import Ondeleteprop from '@/components/deleteDialog';
import Successprop from '@/components/success_prop';
import SimpleFileUpload from '@/components/multiple_file_upload';
import { Toaster, toast } from 'sonner'
import SuccessProp from '@/components/success_prop';
import { useAuth } from "@/app/context/AuthContext";
import ExecuteDialog from '@/components/executeDialog';

type ImportFiles = {
  name: string,
  file_name: string,
  file_url: string
}

type Actual_vendors = {
  actual_amount: number,
  advance: number,
  // advance_expense_check: boolean,
  // attachment: null,
  basic_amount: number,
  budget_category: string,
  cc_name: string,
  city: string,
  company_code: string,
  company_name: string,
  cost_center: string,
  cost_centre: string,
  creation: string,
  division: string,
  docstatus: number,
  document_no: string,
  est_amount: number,
  event_conclusion: string,
  file: string,
  files: ImportFiles[],
  finance_gst: string,
  finance_remark: string,
  gl_code: string,
  gl_name: string,
  gst: string,
  gst_included: number,
  idx: number,
  invoice_amount: number,
  invoice_date: string,
  invoice_number: string,
  name: string,
  narration: string,
  nature: string,
  net_amount: number,
  occurrence_no: number,
  parent: string,
  payment_date: string,
  post_expense_check: boolean,
  posting_date: string,
  state: string,
  state_code: string,
  status: string,
  tds: number,
  travel_expense_check: boolean,
  utr_number: string,
  vendor_name: string,
  vendor_code: string,
  vendor_type: string,
  zone: string,
  brief_status:string
}

type TravelVendors = {
  actual_amount: number,
  advance: number,
  advance_expense_check: boolean,
  basic_amount: number,
  budget_category: string,
  est_amount: number,
  event_conclusion: string,
  gst: string,
  gst_included: boolean,
  idx: number,
  invoice_amount: number,
  modified: string,
  modified_by: string,
  name: string,
  net_amount: number,
  occurrence_no: number,
  owner: string,
  parent: string,
  parentfield: string,
  parenttype: string,
  post_expense_check: boolean,
  status: string,
  brief_status: string,
  tds: number,
  travel_expense_check: boolean,
  vendor_name: string,
  vendor_type: string
  vendor_code: string
  files: File;
}

type TableData = {
  actual_vendors: Actual_vendors[],
  business_unit: string,
  cost_center: string,
  cost_code: string,
  cost_desc: string,
  cost_hod: string,
  event_date: string,
  event_name: string,
  event_requestor: string,
  event_type: string,
  import_files: ImportFiles[],
  name: string,
  reporting_head: string,
  sub_type_of_activity: string,
  total_compensation_expense: number;
  total_balance_amount: number;
  total_advance_amount: number;
  total_estimated_expense: number;
  total_logistics_expense: number;
  occurrence_no: boolean,
  preactivity_submitted: boolean,
  preactivity_approved: boolean,
  advance_request_submitted: boolean,
  advance_request_approved: boolean,
  post_activity_submitted: boolean,
  post_activity_approved: boolean,
  post_expense_submitted: boolean,
  post_expense_approved: boolean,
  travel_expense_submitted: boolean,
  travel_expense_approved: boolean,
  travel_vendors: TravelVendors[];
  event_conclusion: string;
  brief_status: string;
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
  amount: number;
  file: File | null;
};
type DocumentRow = {
  name: string,
  file_name: string;
  createdDate: string;
  createdBy: string;
  file_url: string;
};
const table = ({ ...Props }: Props) => {
  const { role, name, userid, clearAuthData } = useAuth();
  const param = useParams();
  const refno = param.refno as string;
  const [open, setOpen] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successProp, setSuccessProp] = useState(false);
  const [exportopen, setExportOpen] = useState(false);
  const [isDeletePropOpen, setIsDeletePropOpen] = useState(false);
  const [deleteRecordname, setDeleteRecordname] = useState('');
  const [compansationVendorName, setCompansationVendorName] = useState("");
  const [dropdownData, setDropdownData] = useState<dropdownData | null>(null);
  const [vendorName, setVendorName] = useState<vendorName | null>(null);
  const [tabledata, setTableData] = useState(Props.tableData);
  const [submitted, setSubmitted] = useState(0);
  const [approved, setApproved] = useState(0);
  const [eventConclusion, setEventConclusion] = useState<string>('');
  const [vendorDetails, setVendorDetails] = useState<VendorData>({
    vendor_type: '',
    vendor_name: '',
    amount: 0,
    file: null,
  });
  const [file, setFile] = useState<FileList | null>();
  const [fileData, setFileData] = useState<DocumentRow[] | undefined>();
  const [fileList, setFileList] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const base_url = process.env.NEXT_PUBLIC_FRAPPE_URL;
  const router = useRouter();
  const params = useParams();
  const showButton = (tabledata.actual_vendors.every(item => item.status !== "Draft")) && !(submitted) && !(approved) && (tabledata.actual_vendors.length>0);

  const fetchData = async () => {
    console.log("inside fetchData")
    try {
      const cookie = document.cookie;
      const Cookie = cookie.toString();
      const tableData = await fetch(
        `/api/postExpense/fetchData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cookie": Cookie
          },
          body: JSON.stringify({ name: params.refno })
        }
      );
      if (tableData.ok) {
        const data = await tableData.json();
        console.log("data ", data)
        setTableData(data.data)
        setSubmitted(data.data.post_expense_submitted);
        setApproved(data.data.post_expense_approved);
        return data.data
      }

    } catch (error) {
      console.log(error, "something went wrong");
    }
  }
  const handleRecordDeletion = async () => {
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
            name: deleteRecordname
          })
        }
      );
      if (response.ok) {
        setIsDeletePropOpen(false);
        console.log("respoonse ok delete")
        fetchData()
        console.log("Successfull deletion")
      } else {
        setIsDeletePropOpen(false)
        console.log("submission failed");
      }
    } catch (error) {
      setIsDeletePropOpen(false)
      console.error("Error during Submission:", error);
    }
  }
  const handleExport = () => {
    setExportOpen(prevState => !prevState);
  };
  const handleFileUpload: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    setFile(files);
    const filelist = Array.from(e.target.files || []);
    setFileList(filelist);


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
  // const handleAdvaneAmountApi = async (value: string) => {
  //   console.log("inside amount api venser name ")
  //   try {
  //     const response = await fetch(
  //       `/api/postExpense/getExpenseAmount`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         "credentials": 'include',
  //         body: JSON.stringify({
  //           name: tableData.name,
  //           vendor_name: value
  //         }),
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
        // setVendorDetails((prev) => ({
        //   ...prev,
        //   amount: data.data?.est_amount, // Update vendor_name in the vendorDetails state
        // }))
  //       console.log(data, "-----------vendor name api------------------");
  //     } else {
  //       console.log("Login failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   }
  // };
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
    fetchData()
  }, [])

  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericValue = name === 'amount' ? (value ? parseFloat(value) : 0) : value;
    setVendorDetails(prev => ({ ...prev, [name]: numericValue }));
  }
  const handleConclusionChange = (newConclusion: string) => {
    setEventConclusion(() => newConclusion);
  };
  const addVendor = async () => {
    console.log("fileList", fileList);
    if (!fileList) {
      alert('Please upload a file');
      return;
    }

    const formData = new FormData();
    formData.append("vendor_type", vendorDetails.vendor_type)
    formData.append("vendor_name", vendorDetails.vendor_name)
    formData.append("amount", vendorDetails.amount as any)
    formData.append("name", params.refno as any)

    if (uploadedFiles && uploadedFiles.length > 0) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        formData.append("file", uploadedFiles[i]);
      }
    } else {
      toast.warning("No file to Upload");
      console.log("No file to upload");
      return;
    }
    setIsLoading(true);

    const apiCallPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/postExpense/postExpenseRequest', {
          method: "POST",
          credentials: 'include',
          body: formData,
        });

        if (!response.ok) {
          setIsLoading(false);
          throw new Error('Post Expense request failed');
        }

        const data = await response.json();
        resolve(data); // Resolve with the response data
      } catch (error) {
        reject(error); // Reject with the error
      }
    });
    toast.promise(apiCallPromise, {
      loading: 'Submitting vendor details...',
      success: () => {
        setVendorDetails({ vendor_type: '', vendor_name: '', amount: 0, file: null });
        setTimeout(() => {
          fetchData();
        }, 500);
        setUploadedFiles(null);
        setFileList([]);
        setFiles([]);
        setIsLoading(false);
        return 'Vendor has been added successfully!';
      },
      error: (error) => `Failed to add vendor: ${error.message || error}`,
    });
  };
  const handleIndividualExpense = async (value:string) => {
    try{
      setLoading(true);
      const apiCallPromise = new Promise(async (resolve, reject) => {
        try {
          setLoading(true);
          const tableData = await fetch(
            `/api/postExpense/submitIndividualExpense`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                parent: refno,
                name:value
              })
            }
          );
  
          if (!tableData.ok) {
            throw new Error(`Can't Submit ${value} expense`);
          }
  
          const data = await tableData.json();
            resolve(data);
        } catch (error) {
          reject(error);
        }
      });
        toast.promise(apiCallPromise, {
              loading: `Submitting Expense ...${value}`,
              success: (data) => {
                setTimeout(() => {
                  fetchData();
                }, 500);
                console.log("data reponse ", data)
                setLoading(false);
                fetchData();
                return 'Post Expense submitted successfully!';
              },
          error: (error) => {setLoading(false); return`Failed to submit expense: ${error.message || error}`},
        });
      } catch (error) {
        setLoading(false);
        console.log(error, "something went wrong");
      }
  };
  console.log("Event Conclusion", eventConclusion);

  const handleExecute = async () => {
    try{
      setLoading(true);
      const apiCallPromise = new Promise(async (resolve, reject) => {
        try {
          setLoading(true);
          const tableData = await fetch(
            `/api/postExpense/finalSubmission`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                parent: refno,
                event_conclusion: eventConclusion
              })
            }
          );
  
          if (!tableData.ok) {
            throw new Error(`Can't Submit final Post Expense: ${refno}`);
          }
  
          const data = await tableData.json();
            resolve(data);
        } catch (error) {
          reject(error);
        }
      });
        toast.promise(apiCallPromise, {
              loading: `Submitting Post Expense ${refno}...`,
              success: (data) => {
                setTimeout(() => {
                  fetchData();
                }, 500);
                router.push(`/event_list`);
                setSuccessProp(true);
                setTimeout(() => {
                  setSuccessProp(false);
                }, 1000);
                setLoading(false);
                fetchData();
                return 'Post Expense Submitted Successfully!';
              },
          error: (error) => {setLoading(false); setIsDialog(false); return`Failed to submit final expense: ${error.message || error}`},
        });
      } catch (error) {
        setLoading(false);
        console.log(error, "something went wrong");
      }
  };
  const handleSetFileData = async (file: any) => {
    console.log(file, 'file in setfile ')
    setFileData(file);
    setOpen(true)
  };
  const handleNext = () => {

  }
  const handleDeletePopup = async (name: any) => {
    setDeleteRecordname(name)
    setIsDeletePropOpen(true)
  }
  const handleDialog = () => {
    setIsDialog(prev => !prev);
  }

  console.log(vendorDetails, 'vendorDetails')
  return (
    <>
      <div className='p-8'>
        <div className='text-black flex justify-between items-center'>
          <div className='text-2xl font-semibold'>
            {Props.tableData.event_type?Props.tableData.event_type:''}
          </div>
          <div className='flex gap-4'>
            <Button className="border rounded-sm px-6 py-1 border-black text-black hover:opacity-60" onClick={() => { router.push("/event_list") }}>Back</Button>
          </div>
        </div>

        <div className='border rounded-3xl mt-5 mb-7 p-2 text-black grid grid-cols-3'>
          <div className='grid-cols-1 px-6 border-r'>
            <ul className=''>
              <li className='border-b p-2'>Event Date :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.event_date : ''}</span></li>
              <li className='border-b p-2'>Event Name :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.event_name : ''}</span></li>
              <li className='border-b p-2'>Event Requester Name :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.event_requestor : ''}</span></li>
              <li className='border-b p-2'>Event Requester Number :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.name : ''}</span></li>
              <li className=' p-2'>Business Unit :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.business_unit : ''}</span></li>
            </ul>
          </div>
          <div className='grid-cols-1 px-6 border-r'>
            <ul className=''>
              <li className='border-b p-2'>Cost Center :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.cost_center : ''}</span></li>
              <li className='border-b p-2'>Cost Center Hod :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.cost_hod : ''}</span></li>
              <li className='border-b p-2'>Cost Center Description :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.cost_desc : ''}</span></li>
              <li className='border-b p-2'>Reporting Head :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.event_date : ''}</span></li>
              <li className=' p-2'>Sub Type Of activity :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.sub_type_of_activity : ''}</span></li>
            </ul>
          </div>
          <div className='grid-cols-1 px-6'>
            <ul className=''>
              <li className='border-b p-2'>Total logistics Expense :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.total_logistics_expense : ''}</span></li>
              <li className='border-b p-2'>Total Compensation Expense :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.total_compensation_expense : ''}</span></li>
              <li className='border-b p-2'>Total Estimated Expense :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.total_estimated_expense : ''}</span></li>
              <li className='border-b p-2'>Total Advance Expense :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.total_advance_amount : ''}</span></li>
              <li className=' p-2'>Total Remaining Expense :<span className='font-semibold px-1'>{Props.tableData ? Props.tableData.total_balance_amount : ''}</span></li>
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
                disabled={tabledata?.post_expense_submitted}
                value={tabledata.event_conclusion ? tabledata.event_conclusion : eventConclusion}
              ></Textarea>
            </div>
            </div>
            {!tabledata?.post_expense_submitted &&
            <div className=" grid grid-cols-3 gap-4 pb-7">
              
              <div className='grid-cols-1 space-y-2'>
                <label htmlFor="vendor_type" className="text-black md:text-sm md:font-normal capitalize">
                  Vendor Type<span className="text-[#e60000] ">*</span>
                </label>
                <Select
                  value={vendorDetails.vendor_type ?? ''}
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
                  value={vendorDetails.vendor_name ?? ''}
                  onValueChange={(value: string) => {
                    // handleAdvaneAmountApi(value);
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
                          <SelectItem value={item.name}>{item.vendor_name ?? "name not defined"}</SelectItem>
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
                  name='amount'
                  value={vendorDetails.amount == 0 ? "" : vendorDetails.amount}
                  onChange={handlefieldChange}
                ></Input>
              </div>
            </div>
            }
            {!tabledata?.post_expense_submitted &&
          <div className='flex justify-end gap-2 pb-7'>
            <SimpleFileUpload files={files} setFiles={setFiles} setUploadedFiles={setUploadedFiles} onNext={handleNext} buttonText={'Receipts/Bills'} />
            <Button className="border border-[#4430bf] text-[#4430bf] text-[18px]" disabled={isLoading ? true : false} onClick={addVendor} >{isLoading ? 'Adding...' : 'Add'}</Button>
          </div>
        
        }


        <h3 className='text-2xl font-semibold'>Compensation</h3>
        <div className="border bg-white h-full p-4 rounded-[18px] my-6">
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
                  Post Expense Status
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
                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat'] border-l border-r sticky right-[115px] z-20 bg-[#E0E9FF] min-w-[80px]"
                  }
                >View</TableHead>
                <TableHead
                  className={
                    "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-20 bg-[#E0E9FF] min-w-[120px]"
                  }
                >Action</TableHead>
              </TableRow>
            </TableHeader>
            {
              tabledata?.actual_vendors &&
                tabledata.actual_vendors.length > 0 ?
                <TableBody>
                  {tabledata &&
                    tabledata.actual_vendors.map((data, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap text-black">
                          <TableCell>{data.parent ?? "-"}</TableCell>
                          <TableCell>{data.vendor_type ?? "-"}</TableCell>
                          <TableCell>{data.vendor_code ?? "-"}</TableCell>
                          <TableCell>{data.vendor_name ?? "-"}</TableCell>
                          <TableCell>{data.actual_amount ?? "-"}</TableCell>
                          <TableCell>{data.status ?? "-"}</TableCell>
                          <TableCell>{data.brief_status ?? "-"}</TableCell>
                          <TableCell>{data.finance_gst ?? "-"}</TableCell>
                          <TableCell>{data.invoice_amount ?? "-"}</TableCell>
                          <TableCell>{data.tds ?? "-"}</TableCell>
                          <TableCell>{data.net_amount ?? "-"}</TableCell>
                          <TableCell>{data.utr_number ?? "-"}</TableCell>
                          <TableCell>{data.payment_date ?? "-"}</TableCell>

                          {/* <TableCell className='z-20 gap-4 w-[120px] bg-white mt-2 flex border-l justify-center mb-2'> */}
                          <TableCell className={`sticky right-[120px] z-20 min-w-[80px] border-l border-r bg-white flex ${((data.status == 'Draft') && (role == "Event Requestor"))?'space-x-2 items-center':'justify-center'}`}>
                            <div className='p-0 cursor-pointer hover:opacity-60' onClick={() => handleSetFileData(data.files)}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              {
                                ((data?.status == "Draft") && (role == "Event Requestor")) &&
                                <Image className='hover:cursor-pointer hover:opacity-60' src={'/svg/delete.svg'} alt='deletesvg' width={20} height={18} onClick={() => { handleDeletePopup(data.name) }} />
                              }
                            </div>
                          </TableCell>
                          <TableCell className='sticky right-0 z-20 gap-4 min-w-[120px] mt-2 mb-2 bg-white'>
                            <div className=''>
                              <button className='bg-green-500 hover:opacity-60 disabled:hover:none  text-white disabled:cursor-not-allowed disabled:bg-gray-400 w-[87.5px] rounded-md py-2' disabled={(data.status == "Draft" && isLoading != true) ? false:true} onClick={() => { handleIndividualExpense(data.name) }}>{data.status == "Draft" ? "Submit" :"Submitted"}</button>
                            </div>
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

        {
          tabledata?.travel_vendors.length > 0 &&
          <>
            <h3 className='text-2xl font-semibold'>Travel Desk</h3>
            <div className="border bg-white h-full p-4 rounded-[18px] my-6">
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
                    {/* <TableHead
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
                    </TableHead> */}
                    <TableHead
                      className={
                        "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-20 bg-[#E0E9FF]"
                      }
                    >Action</TableHead>
                  </TableRow>
                </TableHeader>
                {
                  tabledata?.travel_vendors &&
                    tabledata?.travel_vendors.length > 0 ?
                    <TableBody>
                      {tabledata &&
                        tabledata.travel_vendors.map((data, index) => {
                          return (
                            <TableRow key={index} className="text-center text-nowrap text-black">
                              <TableCell>{data.parent ?? "-"}</TableCell>
                              <TableCell>{data.vendor_type ?? "-"}</TableCell>
                              <TableCell>{data.vendor_code ?? "-"}</TableCell>
                              <TableCell>{data.vendor_name ?? "-"}</TableCell>
                              <TableCell>{data.actual_amount ?? "-"}</TableCell>
                              <TableCell>{data.status ?? "-"}</TableCell>
                              <TableCell>{data.gst ?? "-"}</TableCell>
                              <TableCell>{data.invoice_amount ?? "-"}</TableCell>
                              <TableCell>{data.tds ?? "-"}</TableCell>
                              <TableCell>{data.net_amount ?? "-"}</TableCell>
                              {/* <TableCell>{data.utr_number ?? "-"}</TableCell>
                              <TableCell>{data.payment_date ?? "-"}</TableCell> */}

                              <TableCell className='sticky right-0 z-20 gap-4 w-[120px] bg-white mt-2 flex border-l justify-center mb-2'>
                                <div className='p-0 cursor-pointer hover:opacity-60' onClick={() => handleSetFileData(data.files)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                {/* <Image src={'/svg/editIcon.svg'} alt='editsvg' width={20} height={18} /> */}
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
          </>
        }

        {
          (showButton) && 
          // (!(tabledata.post_expense_submitted)) && (tabledata.actual_vendors.length > 0) && 
          <div className='flex justify-end gap-2 pt-8'>
            <Button className='bg-[#4430BF] px-10 text-white' onClick={() => { handleDialog() }}>Final Submit</Button>
          </div>
        }
      </div>
      {
        open &&
        <ViewDocument setClose={setOpen} data={fileData} />
      }
      {exportopen && <UploadExport handleExport={handleExport} data={tabledata.import_files} />}
      {isDeletePropOpen && <Ondeleteprop setClose={setIsDeletePropOpen} handleSubmit={handleRecordDeletion} Loading={isLoading} text={"Are you sure you want to delete this expense?"} />}
      {successProp && <SuccessProp title={"Post Expense Approval"} />}
      {
        isDialog &&
        <ExecuteDialog
          handleDialog={handleDialog}
          handleExecute={handleExecute}
          title={`All the expenses listed below are from the current occurrence.`}
        />
      }
      <Toaster richColors position="top-right"/>
    </>

  )
}

export default table
