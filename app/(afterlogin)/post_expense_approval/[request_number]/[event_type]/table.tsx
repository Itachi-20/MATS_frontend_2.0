import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import Image from 'next/image';
  import { useAuth } from "@/app/context/AuthContext";
  import { Input } from '@/components/ui/input';

  type File = {
    name: string;
    file_name: string;
    file_url: string;
};

type ActualVendor = {
    name: string;
    creation: string;
    modified: string;
    modified_by: string;
    owner: string;
    docstatus: number;
    idx: number;
    vendor_type: string;
    actual_amount: number;
    status: string;
    vendor_name: string;
    vendor_code:string
    advance: number;
    budget_category: string;
    est_amount: number;
    gst_included: number;
    gst: string;
    parent: string;
    parentfield: string;
    parenttype: string;
    occurrence_no: number;
    attachment: string | null;
    event_conclusion: string | null;
    advance_expense_check: number;
    post_expense_check: number;
    document_no: string | null;
    invoice_date: string | null;
    invoice_amount: number;
    division: string;
    nature: string | null;
    gl_code: string | null;
    zone: string | null;
    finance_remark: string | null;
    posting_date: string | null;
    basic_amount: number;
    tds: number;
    cost_center: string | null;
    company_name: string | null | undefined;
    utr_number: string | null;
    state: string;
    invoice_number: string | null;
    finance_gst: string | null;
    net_amount: number;
    cc_name: string | null ;
    gl_name: string | null;
    payment_date: string | null;
    city: string | null;
    file: string | null;
    narration: string | null;
    travel_expense_check: number;
    company_code: string;
    state_code: string;
    files: File[];
};

type EventData = {
  name: string;
  reporting_head: string;
  event_date: string;
  cost_center: string;
  cost_code: string;
  cost_desc: string;
  cost_hod: string;
  business_unit: string;
  event_name: string;
  event_type: string;
  sub_type_of_activity: string | null;
  event_requestor: string;
  total_compensation_expense: number;
  actual_vendors: ActualVendor[];
  // import_files: ImportFile[];
}

  type FormData = {
    "vendor_name":string,
    "vendor_type":string,
    "vendor_code":string,
    "name":string
  }

  type Props = {
    // expensetabledata: ActualVendor[]; // Props includes the tableData field
    handleSetFileData: (value:File[])=>void
    refno:any
  };

const table = ({ ...Props }: Props) => {
//   const [fileData, setFileData] = useState<File[] | undefined>();
    const { role, name,userid, clearAuthData } = useAuth();
    const [editable, setEditable] = useState(false);
    const [expenseData, setExpenseData] = useState<EventData>();
    const [formData, setFormData] = useState<FormData>();
    // const handleSetFileData = async (file: any) => {
    //     // console.log(file, 'file in setfile ')
    //     setFileData(file);
    //     setOpen(true)
    // };

    const AddVendorCode = async () => {
      console.log("inside event Data")
      try {
          const response = await fetch(
              "/api/postExpenseApproval/addVendorCode",
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  credentials: 'include',
                  body:JSON.stringify(formData)
                
              }
          );

          if (response.ok) {
              console.log("SUCCEESSSSSSSSS");
          } else {
              console.log("failed");
          }
      } catch (error) {
          console.error("Error during vendor code insertion:", error);
      }
  };

    const handleCheckBox = (e:React.ChangeEvent<HTMLInputElement>) => {
      setEditable(e.target.checked);
      if(e.target.checked){
        AddVendorCode();
        console.log(formData,"+++++++++++++++++++++++");
      }
    }

    const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }) as FormData);
    }

    const eventDataApi = async () => {
      console.log("inside event Data")
      try {
          const response = await fetch(
              "/api/postExpenseApproval/postExpenseApprovalData",
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  credentials: 'include',
                  body: JSON.stringify({
                      name: Props.refno.event_type,
                      req_no: Props.refno.request_number
                  })
              }
          );

          if (response.ok) {
            console.log("HELLLLLO")
              const data = await response.json();
              setExpenseData(data.data);
              setFormData({
                "vendor_name": data.data?.actual_vendors?.[0]?.vendor_name ?? "",
                "vendor_type": data.data?.actual_vendors?.[0]?.vendor_type ?? "",
                "vendor_code": "",
                "name": data.data?.actual_vendors?.[0]?.name ?? ""
              });
              console.log(data.data?.actual_vendors[0]?.name, 'formdata is set')

          } else {
              console.log("Login failed");
          }
      } catch (error) {
          console.error("Error during login:", error);
      }
  };

    // useEffect(()=>{
    //   formData.vendor_type = Props.expensetabledata?.[0]?.vendor_type;
    //   formData.name =  Props.expensetabledata?.[0]?.name;
    //   formData.vendor_name =  Props.expensetabledata?.[0]?.vendor_name;
    // },[formData.vendor_code]);

    useEffect(()=>{
      eventDataApi();
    },[])
    

  return (
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
                  "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-20 bg-[#E0E9FF]"
                }
              >Action</TableHead> 
            </TableRow>
          </TableHeader>
          {
            expenseData ?
              <TableBody>
                {expenseData &&
                  expenseData?.actual_vendors.map((data, index) => {
                    return (
                      <TableRow key={index} className="text-center text-nowrap text-black">
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.vendor_type}</TableCell>
                        <TableCell className={data && data.vendor_code ? '' : 'flex items-center space-x-2'}>
                          {
                            data.vendor_code ? data.vendor_code :
                            role == 'Event Finance' ?
                            <>
                            <Input
                              type='text'
                              // value={Props.formdata?.invoice_number ?? 0}
                              className="text-black shadow md:rounded-sm md:py-1 w-[100px]"
                              placeholder="Type here ..."
                              id='vendor_code'
                              name='vendor_code'
                              onChange={(e)=>handlefieldChange(e)}
                              readOnly={editable ? true : false}
                            ></Input>
                            <div className='rounded-full'>
                            <Input 
                              type='checkbox' 
                              className='w-5 h-5' 
                              onChange={(e)=>{handleCheckBox(e)}}
                              // disabled={data.status == "Post Expense Approved" || data?.status == "Post Expense Closed" ? true : false}
                            ></Input>
                            </div>
                            </>:'-'
                          }
                          
                        </TableCell>
                        <TableCell>{data.vendor_name}</TableCell>
                        <TableCell>{data.advance}</TableCell>
                        <TableCell>{data.status}</TableCell>
                        <TableCell>{data.gst}</TableCell>
                        <TableCell>{data.invoice_amount}</TableCell>
                        <TableCell>{data.tds}</TableCell>
                        <TableCell>{data.net_amount}</TableCell>
                        <TableCell>{data.utr_number}</TableCell>
                        <TableCell>{data.payment_date}</TableCell>
                        <TableCell className='sticky right-0 z-20 w-[120px] bg-white mt-2 flex justify-center border-l'>
                          <button onClick={() => Props.handleSetFileData(data.files)}><Image src={'/svg/view.svg'} alt='viewsvg' width={24} height={18} /></button>
                          {/* <Image src={'/svg/view.svg'} alt='viewsvg' width={24}  height={18}/> */}
                            {/* <Image src={'/svg/editIcon.svg'} alt='editsvg' width={20} height={18} />
                            <Image src={'/svg/delete.svg'} alt='deletesvg' width={20} height={18} /> */}
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
  )
}

export default table