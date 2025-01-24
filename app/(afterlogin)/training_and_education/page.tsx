import React from 'react';
import Form1 from "@/app/(afterlogin)/training_and_education/forms/form1";
import Form2 from "@/app/(afterlogin)/training_and_education/forms/form2";
import Form3 from "@/app/(afterlogin)/training_and_education/forms/form3";
import Form4 from "@/app/(afterlogin)/training_and_education/forms/form4";
import Preview_Form from './forms/preview_form';
import { AppWrapper } from '@/app/context/module';
import { PreviewData, handleBusinessUnitChange, activityList, dropdown } from '../hcp_services/utility';
import { cookies } from 'next/headers';
import {handleStateChange,handleReportingChange,handleCityChange,handleCityDropdown} from '../training_and_education/utility'
import {DropdownDataType,ActivityDropdownType,PreviewDataType} from './Types'

const index = async ({...Props}:any) => {

  const props =  await Props;
  const {forms,refno} = await props.searchParams;
  const cookie = await cookies();
  const dropdownData:DropdownDataType =await dropdown();
  const cityDropdownData =await handleCityDropdown(cookie);
  let previewdata:  PreviewDataType | null = null;
  let eventCostCenter = null;
  let cityPreviewDropdown = null;
  let ReportingHeadDropdown = null;
  // console.log(refno,cookie);
  const activityDropdown: ActivityDropdownType = await activityList(cookie, 'Pre Activity', 'Training and Education');
  if(refno){
    previewdata =  await PreviewData(refno,cookie);
  }
  if(previewdata && previewdata.business_unit){
    eventCostCenter = await handleBusinessUnitChange(previewdata.business_unit,cookie);
  }
  // if(previewdata && previewdata.state){
  //   cityDropdown = await handleStateChange(previewdata?.state,cookie);
  // }
  if(previewdata && previewdata.state && previewdata.event_requestor && previewdata.business_unit){
    ReportingHeadDropdown = await handleReportingChange(previewdata.event_requestor,previewdata.business_unit,previewdata.division_category,previewdata.division_sub_category,previewdata?.state,cookie);
  }
  if(previewdata && previewdata.city){
    cityPreviewDropdown = await handleCityChange(previewdata?.city,1,10,cookie);
  }
  let eventType = "Training and Education";
console.log(previewdata?.city,'previewdata?.city',cityPreviewDropdown)
  return (
    <>
      <AppWrapper>
        <div className="px-7 pb-7 pt-4 w-full z-20">
          <div>
            <h1 className="text-black text-[30px] font-medium capitalize" id="form_top">
            
            </h1>
            <div className='py-9'></div>
          </div>
          {
          forms == "1" ?
            <Form1
              eventCostCenter={eventCostCenter}
              ReportingHeadDropdown={ReportingHeadDropdown}
              cityDropdown={cityPreviewDropdown}
              previewData = {previewdata}
              dropdownData={dropdownData}
              cityDropdownData={cityDropdownData}
              refNo={refno}
            /> :
            forms == "2" ?
              <Form2
                previewData = {previewdata}
                refNo={refno}
              /> :
              forms == "3" ?
                <Form3
                  previewData = {previewdata}
                  vendorType={dropdownData && dropdownData.vendor_type}
                  currency={dropdownData && dropdownData.currency}
                  refNo={refno}

                /> :
                forms == "4" ?
                  <Form4
                    activityDropdown={activityDropdown}
                    refNo={refno}

                  /> :
                  forms == "5" ?
                    <Preview_Form
                      refNo={refno}
                    /> : ""
        }
        </div>
      </AppWrapper>
    </>
  )
}

export default index