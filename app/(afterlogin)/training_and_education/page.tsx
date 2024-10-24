"use client"
import React, { useEffect, useState } from 'react'
import Form1 from "@/app/(afterlogin)/training_and_education/forms/form1"
import Form2 from "@/app/(afterlogin)/training_and_education/forms/form2"
import Form3 from "@/app/(afterlogin)/training_and_education/forms/form3"
import Form4 from "@/app/(afterlogin)/training_and_education/forms/form4"
import Preview_Form from './forms/preview_form'
import Addvendor from '@/components/add_vendor'
import { useRouter } from 'next/router'
import { AppWrapper } from '@/app/context/module'
import { usePathname } from 'next/navigation'

type dropdownData = {
  company:{
    name:string,
    company_name:"string"
  }[],
  division:{
    name:string,
    division_name:string
  }[],
  requestor:{
    full_name:string,
    email:string
  }[],
  vendor_type:{
    name:string,
    vendor_type:string
  }[],
  state:{
    name:string,
    state:string
  }[]
  currency:{
    name:string
  }[]
}

type Compensation = {
  vendor_type: string;
  vendor_name: string;
  amount: number;
  gst_included?: number;
  gst: number;
};

type Logistics = {
  vendor_type: string;
  amount: number;
};

type formData = {
  name: string | null;
  event_type: string;
  company: string;
  event_cost_center: string;
  state: string;
  city: string;
  event_start_date: string;
  event_end_date: string;
  bu_rational: string;
  faculty: string;
  participants: string;
  therapy: string;
  event_name: string;
  event_venue: string;
  comments: string;
  compensation: Compensation[];
  logistics: Logistics[];
  total_compensation_expense: number;
  total_logistics_expense: number;
  event_requestor: string;
  business_unit: string;
  division_category: string;
  division_sub_category:string;
  sub_type_of_activity:string;
  any_govt_hcp:string,
  no_of_hcp:number
};




const index = () => {
  const pathname = usePathname();
  const [form,setForm] = useState(3);
  const [addVendor,setAddVendor] = useState(false);
  const [dropdownData,setDropdownData] = useState<dropdownData | null>(null);
  const [refNo,setRefNo] = useState<string | null>(localStorage.getItem("refno")?localStorage.getItem("refno"):"");

  const [logisticsBudget,setLogisticBudget] = useState<Logistics[]>([]);

  const [logisticVendorType,setLogisticVendorType] = useState("");
  const [logisticAmount,setLogisticAmount] = useState(0);

  const handleLogisticsAdd = ()=>{
    console.log("inside function")
    if(logisticVendorType&&logisticAmount>0){
      const newObject:Logistics = {vendor_type:logisticVendorType,amount:logisticAmount};
      setLogisticBudget(prevRows=>{
       const updatedRecords =  [...prevRows,newObject]
       console.log(updatedRecords)
       return updatedRecords
      }
      )
      setLogisticVendorType('');
      setLogisticAmount(0);
    }
  }


  let eventype:{[key:string]:string} = {} ;
  eventype["training_and_education"] = "Training and Education";
  useEffect(()=>{
    setFormData({...formdata,name:refNo})
  },[refNo])
  const [formdata, setFormData] = useState<formData | {}>({});

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedFormData = {

       ...formdata, logistics: logisticsBudget 
    };

    if(refNo){
      updatedFormData.name = refNo;
    }
    
    
    try {
      const response = await fetch(
        "/api/training_and_education/handleSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include',
          body:JSON.stringify(updatedFormData)
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data,"response data");
          localStorage.setItem("refno",data.message);
          setRefNo(data.message);
        
        setTimeout(()=>{
          nextForm();
        },1000)
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };


  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    const {name,value} = e.target;
    setFormData(prev =>({ ...prev, [name]: value }));
  }


  const handleSelectChange = (value: string, name:string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const router = useRouter();
  const nextForm = ():void=>{
    setForm(prev=>prev+1);
    // router.push("/modules#form_top")
  }

  const prevForm = ()=>{
    setForm(prev=>prev-1);
    // router.push("/modules#form_top")
  }

  const isAddVendor = ()=>{
    setAddVendor(prev => !prev)
  }


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

  useEffect(()=>{
    dropdown();
  },[])
  console.log(formdata,"this is form data");
  return (
        <>
        <AppWrapper>
        <div className="px-7 pb-7 pt-4 w-full relative z-20">
          <div>
        <h1 className="text-black text-[30px] font-medium capitalize" id="form_top">
        Training & Education
              </h1>
              <div className='py-9'></div>
          </div>
        {
          form == 1?
          <Form1
          nextForm = {nextForm}
          dropdownData={dropdownData}
          handlefieldChange = {handlefieldChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
          />:
          form == 2?
          <Form2
          nextForm = {nextForm}
          prevForm={prevForm}
          handlefieldChange = {handlefieldChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
          />:
          form == 3?
          <Form3
          nextForm = {nextForm}
          prevForm={prevForm}
          isAddVendor = {isAddVendor}
          vendorType = {dropdownData && dropdownData.vendor_type}
          currency = {dropdownData && dropdownData.currency}
          handlefieldChange = {handlefieldChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
          handleLogisticsAdd = {handleLogisticsAdd}
          setLogisticVendorType = {setLogisticVendorType}
          setLogisticAmount={setLogisticAmount}
          />:
          form == 4?
          <Form4
          nextForm = {nextForm}
          prevForm={prevForm}
          />:
          form == 5?
          <Preview_Form
          prevForm = {prevForm}
          />:""
        }
        </div>
    
    {
      addVendor &&
      <Addvendor
      isAddVendor = {isAddVendor}
      />
    }
    </AppWrapper>
    </>
  )
}

export default index