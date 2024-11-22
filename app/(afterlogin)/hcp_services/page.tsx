// import React, { useState, useEffect } from 'react';
import Form1 from "./forms/form1";
import Form2 from "./forms/form2";
import Form3 from "./forms/form3";
import Form4 from "./forms/form4";
import Preview_Form from './forms/preview_form';
import { AppWrapper } from '@/app/context/module';
import { dropdown,activityList} from "./utility";

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


const index = async({...Props}:any) => {
  const dropdownData:dropdownData = await dropdown();
  console.log(dropdownData,"this is dropdown")
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
           dropdownData={dropdownData}
          />:
          forms == "2"?
          <Form2
          />:
          forms == "3"?
          <Form3
                   vendorType = {dropdownData && dropdownData.vendor_type}
                   currency = {dropdownData && dropdownData.currency}
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