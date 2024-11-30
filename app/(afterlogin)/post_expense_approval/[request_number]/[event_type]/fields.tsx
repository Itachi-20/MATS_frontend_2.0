import React, { useEffect } from 'react'
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
import ViewDocument from '@/components/view_document'
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';

type city = {
  name:string,
  city: string,
  state:string,
}

type DocumentRow = {
  name: string;
  file_name: string;
  file_url: string;
};

type DropdownData = {
  company: {
    name: string;
    company_name: string;
  }[];
  division: {
    name: string;
    division_name: string;
  }[];
  city: {
    name: string;
    city: string;
    state: string;
  }[];
  state: {
    name: string;
    state: string;
  }[];
  zone: {
    name: string;
    zone: string;
  }[];
};

type eventCostCenter = {
  cost_center: {
    name: string;
    cost_center_description: string;
  }[];
  division_category: {
    name: string;
    category: string;
  }[];
  therapy: {
    name: string;
    therapy: string;
  }[];
};

type Glcode = {
  name:string,
  gl_code:string,
  gl_name:string,

}

type ActualVendor = {
  status: string;
  is_approved: boolean;
};

type EventData = {
  event_type: string;
  actual_vendors: ActualVendor[];
}

type FormData = {
  name: string;
  document_no: string;
  posting_date: string;
  invoice_number: string;
  date: string;
  basic_amount: number;
  gst: string;
  invoice_amount: number;
  tds: number;
  net_amount: number;
  division: string;
  cost_center: string;
  cc_name: string;
  nature: string;
  company_name: string;
  gl_name: string;
  gl_code: string;
  utr_number: number;
  payment_date: string;
  zone: string;
  state: string;
  city: string;
  action: string;
  remark: string;
  narration: string;
  isClosed: boolean;
};

type ccname = { name: string; cost_center_description: string; }

type Props = {
  dropdown: DropdownData;
  expenseData: EventData;
  formdata: FormData;
  handlefieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>void
  handleSelectChange:(value: string, name: string)=>void
  view: string | null;
  // handleSubmit: (e: React.MouseEvent<HTMLButtonElement>)=>void
};

const Fields = ({ ...Props }: Props) => {

  const [open, setOpen] = useState(false);
  const [ccName,setCcName] = useState<ccname[]>();
  const [fileData, setFileData] = useState<DocumentRow[] | undefined>();
  const [glCodeDropdown, setGlCodeDropdown] = useState<Glcode[] | undefined>();
  const [particularGlCode, setParticularGlCode] = useState<Glcode[]>();
  const [eventCostCenter, setEventCostCenter] =
    useState<eventCostCenter | null >(null);

  const [filtercity, setFiltercity] = useState<city[]>();
  
  const handleglcode = async (value:any) => {
    try {
        const response = await fetch(
            "/api/postExpenseApproval/glDropdownData",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                  company_name: value,
                  event_type: Props?.expenseData?.event_type,
                }),
            }
        );

        if (response.ok) {
            const data = await response.json();
            // console.log("@@@@@@@data", data);
            // console.log("@@@@@@@eventtype", Props?.expenseData?.event_type);
            setGlCodeDropdown(data && data.data);
            // Props.formdata.gl_code = "";
            // console.log(data, 'data')

        } else {
            // console.log("@@@@@@@", Props?.expenseData?.event_type);
            console.log("Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
    } 
  }

  const handleDivisionChange = async (value: string) => {
    try {
      const response = await fetch(
        "/api/monetary_grant/eventCostCenterDropdown",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            division: value,
          }),
        }
      );

      
      if (response.ok) {
        const data = await response.json();
        setEventCostCenter(data && data.data);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  const handleStateChange = async (value: string) => {
    setFiltercity(Props.dropdown?.city.filter(item=>item.state == value));
    
  };

  const handleGlname = async(value:any) =>{
    const parglcode = glCodeDropdown?.filter((item)=>item.name == value) ?? [];
    Props.formdata.gl_code = parglcode[0]?.gl_code;
  
  }

  const handleCostCenter = async(value:any) => {
    const ccname = eventCostCenter?.cost_center.filter(item=>item.name == value) ?? [];
    Props.formdata.cc_name = ccname[0]?.cost_center_description;
  //  }
  }

  useEffect(()=>{
    handleglcode(Props.formdata?.company_name);
  },[Props?.formdata?.company_name]);

  useEffect(()=>{
    handleDivisionChange( Props.formdata?.division);
  },[Props?.formdata?.division]);

  useEffect(()=>{
    handleStateChange(Props.formdata?.state);
  },[Props?.formdata?.state]);

  // useEffect(()=>{
  //   // console.log("In side useEFFECT", Props?.formdata?.company_name)
  //   handleCostCenter(Props?.formdata?.cost_center);
  // },[Props?.formdata?.cost_center]);
  useEffect(()=>{
    handleStateChange(Props?.formdata?.state);
  },[])
 
  console.log("Print", Props.expenseData);

  return (

    <>
      <div className="">
        <div className=" grid grid-cols-3 gap-4 py-7">
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="document_number" className="text-black md:text-sm md:font-normal capitalize">
              Document Number<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='text'
              value={Props.formdata?.document_no ?? 0}
              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='document_no'
              name='document_no'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="amount" className="text-black md:text-sm md:font-normal capitalize">
              Posting Date<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='date'
              value={Props.formdata?.posting_date ?? ""}
              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='posting_date'
              name='posting_date'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="posting_date" className="text-black md:text-sm md:font-normal capitalize">
              Invoice Number<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='number'
              value={Props.formdata?.invoice_number ?? 0}
              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='invoice_number'
              name='invoice_number'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="date" className="text-black md:text-sm md:font-normal capitalize">
              Date<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='date'
              value={Props.formdata?.date ?? ""}
              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='date'
              name='date'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="basic_amount" className="text-black md:text-sm md:font-normal capitalize">
              Basic Amount<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='number'
              value={Props.formdata?.basic_amount ?? 0}
              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='date'
              name='basic_amount'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="gst" className="text-black md:text-sm md:font-normal capitalize">
              GST<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='text'
              value={Props.formdata?.gst ?? ""}
              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='gst'
              name='gst'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="invoice_amount" className="text-black md:text-sm md:font-normal capitalize">
              Invoice Amount<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='number'
              value={Props.formdata?.invoice_amount ?? 0}
              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='invoice_amount'
              name='invoice_amount'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="tds" className="text-black md:text-sm md:font-normal capitalize">
              TDS<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='number'
              value={Props.formdata?.tds ?? 0}
              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='tds'
              name='tds'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="net_amount" className="text-black md:text-sm md:font-normal capitalize">
              Net Amount<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='number'
              value={Props.formdata?.net_amount ?? 0}
              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='net_amount'
              name='net_amount'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            ></Input>
          </div>

          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="division" className="text-black md:text-sm md:font-normal capitalize">
              Division<span className="text-[#e60000] ">*</span>
            </label>
              
            <Select 
              onValueChange={(value) => {handleDivisionChange(value); Props.handleSelectChange(value, "division")}} 
              value={Props.formdata?.division ?? ""}
              disabled={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
              >
              <SelectTrigger className="dropdown rounded-sm gap-4">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                {
                  Props.dropdown?.division.map((data, index) => (
                    <SelectItem key={index} value={data.name}>{data.name}</SelectItem>
                  ))
                }

              </SelectContent>
            </Select>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="cost_center" className="text-black md:text-sm md:font-normal capitalize">
              Cost Center<span className="text-[#e60000] ">*</span>
            </label>
            <Select 
              value={Props.formdata?.cost_center ?? ""}
              onValueChange={(value) =>  { handleCostCenter(value); Props.handleSelectChange(value, "cost_center");}}
              disabled={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            >
              <SelectTrigger className="dropdown rounded-sm gap-4">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                {eventCostCenter &&
                  eventCostCenter.cost_center.map((item, index) => {
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
            <label htmlFor="cc_name" className="text-black md:text-sm md:font-normal capitalize">
              CC Name<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='text'
              value={Props.formdata?.cc_name ?? ""}
              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='cc_name'
              name='cc_name'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="cc_name" className="text-black md:text-sm md:font-normal capitalize">
              Nature<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='text'
              value={Props.formdata?.nature ?? ""}

              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='nature'
              name='nature'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}

            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="company_name" className="text-black md:text-sm md:font-normal capitalize">
              Company Name<span className="text-[#e60000] ">*</span>
            </label>
            <Select 
              value={Props.formdata?.company_name}
              onValueChange={(value) => {handleglcode(value); Props.handleSelectChange(value, "company_name");}}
              disabled={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            >
              
              <SelectTrigger className="dropdown rounded-sm gap-4">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                {
                  Props.dropdown?.company.map((data, index) => (
                    <SelectItem key={index} value={data.name}>{data.company_name}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="gl_name" className="text-black md:text-sm md:font-normal capitalize">
              GL Name<span className="text-[#e60000] ">*</span>
            </label>
            <Select 
              value={Props.formdata?.gl_name ?? ""}
              onValueChange={(value) => {handleGlname(value); Props.handleSelectChange(value, "gl_name"); }}
              disabled={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
              >
              
              <SelectTrigger className="dropdown rounded-sm gap-4">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                {
                  glCodeDropdown?.map((data, index) => (
                    <SelectItem key={index} value={data.name}>{data.name}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="gl_code" className="text-black md:text-sm md:font-normal capitalize">
              GL Code<span className="text-[#e60000] ">*</span>
            </label>
            <Input
            type='text'
            value={Props.formdata?.gl_code ?? ""}
            className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='gl_code'
              name='gl_code'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="utr_number" className="text-black md:text-sm md:font-normal capitalize">
              UTR Number<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='text'
              value={Props.formdata?.utr_number ?? ""}
              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='utr_number'
              name='utr_number'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="payment_date" className="text-black md:text-sm md:font-normal capitalize">
              Payment Date<span className="text-[#e60000] ">*</span>
            </label>
            <Input
              type='date'
              value={Props.formdata?.payment_date ?? ""}
              className="text-black shadow md:rounded-sm md:py-1"
              placeholder="Type here ..."
              id='payment_date'
              name='payment_date'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            ></Input>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="zone" className="text-black md:text-sm md:font-normal capitalize">
              Zone<span className="text-[#e60000] ">*</span>
            </label>
            <Select 
            value={Props.formdata?.zone ?? ""}
            onValueChange={(value) => Props.handleSelectChange(value, "zone")}
            disabled={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            >
              <SelectTrigger className="dropdown rounded-sm gap-4">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                {
                  Props.dropdown?.zone.map((data, index) => (
                    <SelectItem key={index} value={data.name}>{data.zone}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="state" className="text-black md:text-sm md:font-normal capitalize">
              State<span className="text-[#e60000] ">*</span>
            </label>
            <Select 
            value={Props.formdata?.state ?? ""}
            onValueChange={(value) => {handleStateChange(value); Props.handleSelectChange(value, "state");}}
            disabled={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            >
              <SelectTrigger className="dropdown rounded-sm gap-4">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                {
                  Props.dropdown?.state.map((data, index) => (
                    <SelectItem key={index} value={data.name}>{data.state}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="city" className="text-black md:text-sm md:font-normal capitalize">
              City<span className="text-[#e60000] ">*</span>
            </label>
            <Select
              value={Props.formdata?.city ?? ""}
              onValueChange={(value) =>  Props.handleSelectChange(value, "city")}
              disabled={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            >
              <SelectTrigger className="dropdown rounded-sm gap-4">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                {
                  filtercity?.map((data, index) => (
                    <SelectItem key={index} value={data.name}>{data.city}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div className='grid-cols-1 space-y-2'>
            <label htmlFor="narration" className="text-black md:text-sm md:font-normal capitalize">
              Narration<span className="text-[#e60000] ">*</span>
            </label>
            <Textarea
              value={Props.formdata?.narration ?? ""}
              className="text-black shadow md:rounded-sm md:py-2"
              placeholder="Type here ..."
              id='narration'
              name='narration'
              onChange={(e)=>Props.handlefieldChange(e)}
              readOnly={Props?.expenseData?.actual_vendors[0]?.is_approved ? true : false}
            ></Textarea>
          </div>
        </div>


      </div>


      {
        open &&
        <ViewDocument setClose={setOpen} data={fileData} />
      }
    </>
  )
}

export default Fields;
