'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import Table from './table';
import SubmitPopup from '@/components/success_prop'
type EventTable = {
  name: string;
  event_date: string;
  event_type: string;
  cost_centre: string;
  cost_code: string;
  cost_desc: string;
  cost_hod: string;
  reporting_head: string;
  business_unit: string;
  event_name: string | null;
  sub_type_of_activity: string | null;
  event_requestor: string;
  total_compensation_expense: number;
  actual_vendors: ActualVendor[];

};

type DocumentRow = {
  name: string;
  file_name: string;
  file_url: string;
};

type File = {
  name: string;
  file_name: string;
  file_url: string;
};
type ActualVendor = {
  event_request_number: string
  name: string;
  document_no: string;
  invoice_date: string;
  division: string;
  nature: string;
  gl_code: string;
  zone: string;
  remark: string;
  posting_date: string;
  basic_amount: number;
  cost_centre: string;
  company_code:string | number | null;
  state: string | null;
  invoice_number: string | null;
  finance_gst: number | null;
  cc_name: string | null;
  gl_name: string | null;
  city: string | null;
  finance_remark: string | null;
  narration: string | null;
  vendor_type: string;
  company_name: any;
  vendor_name: string;
  files: DocumentRow[];
  status: string;
  advance: number;
  gst: string;
  invoice_amount: number;
  tds: number;
  net_amount: number;
  utr_number: string | null;
  payment_date: string | null;
  parent: string;
};


type FormData = {
  name: string | undefined;
  document_no: string | undefined;
  invoice_date: string | null | undefined;
  invoice_amount: number | undefined | unknown;
  division: string | undefined;
  nature: string | null | undefined;
  gl_code: string | null | undefined;
  zone: string | null | undefined;
  remark: string | null | undefined;
  posting_date: string | null | undefined;
  basic_amount: number | undefined | unknown;
  tds: number | undefined | unknown;
  cost_centre: string | null | undefined;
  company_name: any;
  utr_number: string | null | undefined;
  state: string | null | undefined;
  invoice_number: string | null | undefined;
  finance_gst: number | null | undefined | unknown;
  net_amount: number | undefined | unknown;
  cc_name: string | null | undefined;
  gl_name: string | null | undefined;
  payment_date: string | null | undefined;
  city: string | null | undefined;
  finance_remark: string | null | undefined;
  narration: string | null | undefined;
  company_code:string | number | null | undefined;
};

type Company = {
  name: string; // Represents the company identifier, e.g., '7000', '8000'
  company_name: string; // Represents the company name
};

type Division = {
  name: string; // Represents the division identifier, e.g., 'Endosurgery', 'Diagnostics'
  division_name: string; // Represents the division name
};

type State = {
  name: string; // Represents the state code and name, e.g., 'Gujarat-GJ'
  state: string; // Represents the state name, e.g., 'Gujarat'
};

type City = {
  name: string; // Represents the city name, e.g., 'Valsad', 'Mumbai'
  city: string; // Represents the city name
  state: string; // Represents the associated state code and name, e.g., 'Gujarat-GJ'
};

type Dropdown = {
  company: Company[];
  division: Division[];
  state: State[];
  city: City[];
};

type GLdropdown = {
  name: string;
  gl_code: string;
  gl_name: string
}
type Props = {
  expensedata: EventTable | undefined;
  dropdownData: Dropdown | undefined
};


const ExpensePage = ({ ...Props }: Props) => {
  const [action, setAction] = useState('')
  const router = useRouter();
  const refno = useParams();
  console.log(refno.request_number)
  const [formdata, setFormData] = useState<FormData>(
    {
      name: Props?.expensedata?.actual_vendors[0].name,
      document_no: Props.expensedata?.actual_vendors[0].document_no,
      invoice_date: Props.expensedata?.actual_vendors[0].invoice_date,
      invoice_amount: Props.expensedata?.actual_vendors[0].invoice_amount,
      division: Props.expensedata?.actual_vendors[0].division,
      nature: Props.expensedata?.actual_vendors[0].nature,
      gl_code: Props.expensedata?.actual_vendors[0].gl_code,
      zone: Props.expensedata?.actual_vendors[0].zone,
      remark: Props.expensedata?.actual_vendors[0].remark,
      posting_date: Props.expensedata?.actual_vendors[0].posting_date,
      basic_amount: Props.expensedata?.actual_vendors[0].basic_amount,
      tds: Props.expensedata?.actual_vendors[0].tds,
      cost_centre: Props.expensedata?.actual_vendors[0].cost_centre,
      company_name: Props.expensedata?.actual_vendors[0].company_code,
      company_code: Props.expensedata?.actual_vendors[0].company_code,
      utr_number: Props.expensedata?.actual_vendors[0].utr_number,
      state: Props.expensedata?.actual_vendors[0].state,
      invoice_number: Props.expensedata?.actual_vendors[0].invoice_number,
      finance_gst: Props.expensedata?.actual_vendors[0].finance_gst,
      net_amount: Props.expensedata?.actual_vendors[0].net_amount,
      cc_name: Props.expensedata?.actual_vendors[0].cc_name,
      gl_name:"",
      // gl_name: Props.expensedata?.actual_vendors[0].gl_name,
      payment_date: Props.expensedata?.actual_vendors[0].payment_date,
      city: Props.expensedata?.actual_vendors[0].city,
      finance_remark: Props.expensedata?.actual_vendors[0].finance_remark,
      narration: Props.expensedata?.actual_vendors[0].narration,
    }
  );
  const [gldropdowndata, setGLDropdownData] = useState<GLdropdown[] | []>([])
  const [glName, setGLName] = useState<string>();
  const [glcode, setGLCode] = useState<string>();
  const [submitpop, setSubmitPopup] = useState(false);
  const gldropdown = async (value: any) => {
    formdata.gl_code = '';
    try {
      const response = await fetch("/api/advanceApproval/getGL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          "company": value,
          "event_type": Props.expensedata?.event_type.toString(),
        })
      });

      const data = await response.json();
      setGLDropdownData(data.data);
      if (response.ok) {
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    gldropdown(formdata.company_name);
  }, [formdata.company_name])

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "/api/advanceApproval/advanceSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            formdata
          })
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSubmitPopup(true)
        setTimeout(() => {
          router.push(`/advance_payment/${refno.request_number}`);
        }, 2000)
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGLName = (code:string)=>{
    setGLName(code);
  }

  const handleGLCode = async () => {
    // gldropdowndata?.map((item, index) => {
    //   if (item.name == glName) {
    //     console.log("item.gl_code",item.gl_code)
    //     setGLCode(item.gl_code)
    //     formdata.gl_name = item.name
    //     formdata.gl_code =  item.gl_code
    //   }
    // })
  }

  const handleGlname = async(value:any) =>{
    const parglcode = gldropdowndata?.filter((item)=>item.name == value);
    formdata.gl_code = parglcode[0]?.gl_code;
 
  }
  return (

    <>
      <div className='p-8  '>
        <div className='text-black flex justify-between items-center'>
          <div className='text-2xl font-semibold'>
            {Props.expensedata?.event_type}
          </div>
          <div className='flex gap-4'>
            <div className='flex justify-end gap-2 pb-7'>

              {/* <label className="flex items-center gap-2 px-2 bg-[#F0EDFF] rounded-md shadow-sm cursor-pointer border-[1px] py-2">
                                <Image src={'/svg/download.svg'} alt='downloadsvg' width={20} height={20} />
                                <span className="font-medium text-[#4430BF] ">{fileName ? fileName : 'Attachment'}</span>
                                <Input type="file" className="hidden" onChange={handleFileChange} />
                            </label> */}
            </div>
            <Button className='bg-white  shadow text-black px-6' onClick={()=>router.push(`/advance_payment/${refno.request_number}`)}>Back</Button>
          </div>
        </div>
        <div className='border rounded-3xl mt-5 mb-14 p-2 text-black grid grid-cols-3'>
          <div className='grid-cols-1 px-6 border-r'>
            <ul className=''>
              <li className='border-b p-2'>Event Date :<span className='font-semibold px-1'>{Props.expensedata ? Props.expensedata.event_date : ''}</span></li>
              <li className='border-b p-2'>Event Name :<span className='font-semibold px-1'>{Props.expensedata ? Props.expensedata.event_name : ''}</span></li>
              <li className='border-b p-2'>Event Requester Name :<span className='font-semibold px-1'>{Props.expensedata ? Props.expensedata.event_requestor : ''}</span></li>
              <li className='p-2'>Event Request Number :<span className='font-semibold px-1'>{Props.expensedata ? Props.expensedata.name : ''}</span></li>
            </ul>
          </div>
          <div className='grid-cols-1 px-6 border-r'>
            <ul className=''>
              <li className='border-b p-2'>Cost Center :<span className='font-semibold px-1'>{Props.expensedata ? Props.expensedata.cost_centre : ''}</span></li>
              <li className='border-b p-2'>Cost Center Hod :<span className='font-semibold px-1'>{Props.expensedata ? Props.expensedata.cost_hod : ''}</span></li>
              <li className='border-b p-2'>Cost Center Description :<span className='font-semibold px-1'>{Props.expensedata ? Props.expensedata.cost_desc : ''}</span></li>
              <li className='p-2'>Reporting Head :<span className='font-semibold px-1'>{Props.expensedata ? Props.expensedata.reporting_head : ''}</span></li>
            </ul>
          </div>
          <div className='grid-cols-1 px-6'>
            <ul className=''>
              <li className='border-b p-2'>Business Unit :<span className='font-semibold px-1'>{Props.expensedata ? Props.expensedata.business_unit : ''}</span></li>
              <li className='border-b p-2'>Sub Type Of activity :<span className='font-semibold px-1'>{Props.expensedata ? Props.expensedata.sub_type_of_activity : ''}</span></li>
              <li className='border-b p-2'>Total Estimated Expense :<span className='font-semibold px-1'>{Props.expensedata ? Props.expensedata.total_compensation_expense : ''}</span></li>
            </ul>
          </div>

        </div>
        <Table expensetabledata={Props.expensedata?.actual_vendors} />

        <div className=" grid grid-cols-3 gap-4 py-7">
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="document_number" className="text-black md:text-sm md:font-normal capitalize">
              Document Number<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              className="text-black shadow md:rounded-sm md:py-1"
              value={formdata.document_no ?? ''}
              // placeholder={formdata.document_no ? formdata.document_no : 'Type here ...'}
              id='document_no'
              name='document_no'
              onChange={(e) => handleFieldChange(e)}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="amount" className="text-black md:text-sm md:font-normal capitalize">
              Posting Date<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='date'
              className="text-black shadow md:rounded-sm md:py-1"
              // placeholder={formdata.posting_date ? formdata.posting_date : 'Type here ...'}
              id='posting_date'
              name='posting_date'
              value={formdata.posting_date ?? ''}
              onChange={(e) => handleFieldChange(e)}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="basic_amount" className="text-black md:text-sm md:font-normal capitalize">
              Basic Amount<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='number'
              className="text-black shadow md:rounded-sm md:py-1"
              // placeholder={formdata.basic_amount ? formdata.basic_amount as string : "Type here..."}
              id='basic_amount'
              name='basic_amount'
              value={formdata.basic_amount as string ?? ''}
              onChange={(e) => handleFieldChange(e)}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="gst" className="text-black md:text-sm md:font-normal capitalize">
              GST<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='number'
              className="text-black shadow md:rounded-sm md:py-1"
              // placeholder={formdata.finance_gst ? formdata.finance_gst as string : "Type Here ..."}
              id='finance_gst'
              name='finance_gst'
              value={formdata.finance_gst as string ?? ''}
              onChange={handleFieldChange}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="invoice_amount" className="text-black md:text-sm md:font-normal capitalize">
              Invoice Amount<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='number'
              className="text-black shadow md:rounded-sm md:py-1"
              // placeholder={formdata.invoice_amount ? formdata.invoice_amount as string : "Type Here ..."}
              id='invoice_amount'
              name='invoice_amount'
              value={formdata.invoice_amount as string ?? ''}
              onChange={handleFieldChange}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="tds" className="text-black md:text-sm md:font-normal capitalize">
              TDS<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='number'
              className="text-black shadow md:rounded-sm md:py-1"
              // placeholder={formdata.tds ? formdata.tds as string : "Type Here ..."}
              id='tds'
              name='tds'
              value={formdata.tds as string ?? ''}
              onChange={handleFieldChange}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="net_amount" className="text-black md:text-sm md:font-normal capitalize">
              Net Amount<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='number'
              className="text-black shadow md:rounded-sm md:py-1"
              // placeholder={formdata.net_amount ? formdata.net_amount as string : "Type Here ..."}
              id='net_amount'
              name='net_amount'
              value={formdata.net_amount as string ?? ''}
              onChange={handleFieldChange}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="division" className="text-black md:text-sm md:font-normal capitalize">
              Division<span className="text-[#e60000] ">*</span>
            </label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "division")}
              value={formdata.division ?? ""}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Type Here ..." />
              </SelectTrigger>
              <SelectContent>
                {Props.dropdownData &&
                  Props.dropdownData.division.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.division_name}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label className="text-black md:text-sm md:font-normal capitalize">
              Company Name<span className="text-[#e60000] ">*</span>
            </label>
            
            <Select 
              onValueChange={(value) => {handleSelectChange(value, "company_name");gldropdown(value)}}
               value={formdata.company_name  ??  ''}
            >
              <SelectTrigger className="dropdown text-black">
                <SelectValue placeholder="Type Here ..." />
              </SelectTrigger>
              <SelectContent>
                {Props.dropdownData &&
                  Props.dropdownData.company.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.company_name}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="gl_name" className="text-black md:text-sm md:font-normal capitalize">
              GL Name<span className="text-[#e60000] ">*</span>
            </label>
            <Select
              value={formdata?.gl_name ?? ""}
              onValueChange={(value) => {handleGlname(value); handleSelectChange(value, "gl_name"); }}>
              <SelectTrigger className="dropdown rounded-sm gap-4">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                {gldropdowndata &&
                  gldropdowndata.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.name}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="gl_code" className="text-black md:text-sm md:font-normal capitalize">
              GL Code<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              className="text-black shadow md:rounded-sm md:py-1"
              // placeholder={formdata.gl_code ? formdata.gl_code : ""}
              id='gl_code'
              name='gl_code'
              // value={glcode ? glcode : "No Filter"}
              // onChange={handleFieldChange}
              value={formdata.gl_code as string ?? ''}
              readOnly
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="utr_number" className="text-black md:text-sm md:font-normal capitalize">
              UTR Number<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              className="text-black shadow md:rounded-sm md:py-1"
              // placeholder={formdata.utr_number ? formdata.utr_number as string : "Type Here ..."}
              id='utr_number'
              name='utr_number'
              value={formdata.utr_number as string ?? ''}
              onChange={handleFieldChange}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="payment_date" className="text-black md:text-sm md:font-normal capitalize">
              Payment Date<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='date'
              className="text-black shadow md:rounded-sm md:py-1"
              // placeholder={formdata.payment_date ? formdata.payment_date as string : "Type Here ..."}
              id='payment_date'
              name='payment_date'
              value={formdata.payment_date as string ?? ''}
              onChange={handleFieldChange}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="remark" className="text-black md:text-sm md:font-normal capitalize">
              Remark<span className="text-[#e60000] ">*</span>
            </label>
            <Textarea
              className="text-black shadow md:rounded-sm md:py-2"
              // placeholder={formdata.narration ? formdata.narration as string : "Type Here ..."}
              id='narration'
              name='narration'
              value={formdata.narration as string ?? ''}
              onChange={handleFieldChange}
            ></Textarea>
          </div>
        </div>
        <div className='flex justify-end gap-2 pt-8'>
          <Button className='bg-[#5DBE74] px-6' onClick={() => handleSubmit()}>Submit</Button>
        </div>
      </div>
      {
        submitpop && <SubmitPopup title={'Advance'} />
      }

    </>


  )
}

export default ExpensePage



