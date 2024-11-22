// import React, { useState, useEffect } from 'react';
import Form1 from "./forms/form1";
import Form2 from "./forms/form2";
import Form3 from "./forms/form3";
import Form4 from "./forms/form4";
import Preview_Form from './forms/preview_form';
import Addvendor from '@/components/add_vendor';
import Adddocument from '@/components/add_document';
import { AppWrapper } from '@/app/context/module';
// import { useRouter } from 'next/navigation';
// import { usePathname } from 'next/navigation';
// import { useSearchParams } from 'next/navigation'

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
  engagement_type:{
    name:string
    engagement_type:string
  }[]
  training_ref_no:{
    name:string
  }[]
}

// type Compensation = {
//   vendor_type: string;
//   vendor_name: string;
//   est_amount: number;
//   gst_included?: number;
// };

// type Logistics = {
//   vendor_type: string;
//   est_amount: number;
// };

// type formData = {
//   name: string | null;
//   event_type: string;
//   company: string;
//   event_cost_center: string;
//   state: string;
//   city: string;
//   event_start_date: string;
//   event_end_date: string;
//   bu_rational: string;
//   faculty: string;
//   participants: string;
//   therapy: string;
//   event_name: string;
//   event_venue: string;
//   comments: string;
//   compensation: Compensation[];
//   logistics: Logistics[];
//   total_compensation_expense: number;
//   total_logistics_expense: number;
//   event_requestor: string;
//   business_unit: string;
//   division_category: string;
//   division_sub_category: string;
//   sub_type_of_activity: string;
//   any_govt_hcp: string,
//   no_of_hcp: number
// };


type activityDropdown = {
  activity:{
    name:string,
    activity_name:string
  }[],
  document:{
    name:string,
    activity_type:string,
    document_name:string
  }[]
}


const fetchDropdown = async()=>{
  try {
    const response = await fetch("http://10.120.140.7:8001/api/method/matsapp.api.event.event.get_field_data", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
      const data = await response.json();
      return (data.data);
    } else {
        console.log('Login failed');
    }
} catch (error) {
    console.error("Error during login:", error);
}
}


const activityList = async () => {
  try {
      const response = await fetch("http://10.120.140.7:8001/api/method/matsapp.api.event.event.get_document_and_activity_type", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          credentials:'include'
      });

      if (response.ok) {
        const data = await response.json();
        //setActivityDropdown(data.data);
        return data.data;
      } else {
          console.log('Login failed');
      }
  } catch (error) {
      console.error("Error during login:", error);
  }
};


const index = async({...Props}:any) => {
  const Dropdown:dropdownData = await fetchDropdown();
  const actvityDropdown:activityDropdown = await activityList(); 
  const props =  await Props;
  const {forms} = props.searchParams;
  return (
        <>
        <AppWrapper>
        <div className="px-7 pb-7 pt-4 w-full relative z-20">
          <div>
        <h1 className="text-black text-[30px] font-medium capitalize" id="form_top">
        {/* {pathname.replace("/","").replaceAll("_"," ")} */}
              </h1>
              <div className='py-9'></div>
          </div>
        {

          forms == "1"?
          <Form1
           dropdownData={Dropdown}
          />:
          forms == "2"?
          <Form2
          />:
          forms == "3"?
          <Form3
                   vendorType = {Dropdown && Dropdown.vendor_type}
                   currency = {Dropdown && Dropdown.currency}
          />:
          forms == "4"?
          <Form4
           activityDropdown={actvityDropdown}
          />:
          forms == "5"?
          <Preview_Form
          // prevForm = {prevForm}
          />:""
        
        }
        </div>
    
    {/* {
      addVendor &&
      <Addvendor isAddVendor={isAddVendor} isAddDocument={isAddDocument}/>
    }
    {
      addDocument &&
      <Adddocument isAddDocument={isAddDocument}/>
    } */}
    </AppWrapper>
    </>
  )
}

export default index