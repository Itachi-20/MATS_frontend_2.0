
import React from 'react';
import Form1 from "@/app/(afterlogin)/awareness_program/forms/form1";
import Form2 from "@/app/(afterlogin)/awareness_program/forms/form2";
import Form3 from "@/app/(afterlogin)/awareness_program/forms/form3";
import Form4 from "@/app/(afterlogin)/awareness_program/forms/form4";
import Preview_Form from './forms/preview_form';
import { AppWrapper } from '@/app/context/module';
import { activityList, dropdown, PreviewData, handleBusinessUnitChange } from './utility';
import { cookies } from "next/headers";
import { Previewdata } from '../hcp_services/page';
import { handleStateChange, handleReportingChange, handleCityChange, handleCityDropdown } from '../training_and_education/utility'
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
  city: {
    name: string,
    city: string
  }[]
  currency: {
    name: string
  }[]
  event_division:{
    name:string,
    event_division:string
  }[]
}
export type Compensation = {
  vendor_type: string;
  vendor_name: string;
  est_amount: number;
  gst_included?: number;
};
export type Logistics = {
  vendor_type: string;
  est_amount: number;
};
export type formData = {
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
  division_sub_category: string;
  sub_type_of_activity: string;
  any_govt_hcp: string,
  no_of_hcp: number
};
type activityDropdown = {
  name: string,
  document_name: string
}[]

const Index = async ({ ...Props }: any) => {
  const props = await Props;
  const { forms, refno } = await props.searchParams;
  const dropdownData: dropdownData = await dropdown();

  let eventype: { [key: string]: string } = {};
  const cookie = await cookies()
  const cityDropdownData = await handleCityDropdown(cookie);
  let previewdata: Previewdata | null = null;
  let eventCostCenter = null;
  let cityDropdown = null;
  let ReportingHeadDropdown = null;
  let cityPreviewDropdown = null;
  console.log(refno, cookie);
  const activityDropdown: activityDropdown = await activityList(cookie,'Pre Activity','Awareness Program');
  if (refno) {
    previewdata = await PreviewData(refno, cookie);
  }
  if (previewdata && previewdata.business_unit) {
    eventCostCenter = await handleBusinessUnitChange(previewdata.business_unit, cookie);
  }
  if (previewdata && previewdata.state) {
    cityDropdown = await handleStateChange(previewdata?.state, cookie);
  }
  if (previewdata && previewdata.state && previewdata.event_requestor && previewdata.business_unit) {
    ReportingHeadDropdown = await handleReportingChange(previewdata.event_requestor, previewdata.business_unit, previewdata.division_category, previewdata.division_sub_category, previewdata?.state, cookie);
  }
  if (previewdata && previewdata.state && previewdata.event_requestor && previewdata.business_unit) {
    ReportingHeadDropdown = await handleReportingChange(previewdata.event_requestor, previewdata.business_unit, previewdata.division_category, previewdata.division_sub_category, previewdata?.state, cookie);
  }
  if (previewdata && previewdata.city) {
    cityPreviewDropdown = await handleCityChange(previewdata?.city, 1, 10, cookie);
  }
  console.log("Preview data", previewdata);
  return (
    <>
      <AppWrapper>
        <div className="px-7 pb-7 pt-4 w-full z-20">
          <div>
            <h1 className="text-black text-[30px] font-medium capitalize" id="form_top">
              {/* {pathname.replace("/","").replaceAll("_"," ")} */}
            </h1>
            <div className='py-9'></div>
          </div>
          {
            forms == "1" ?
              <Form1
                // cityDropdown={cityDropdown}
                ReportingHeadDropdown={ReportingHeadDropdown}
                eventCostCenter={eventCostCenter}
                previewData={previewdata}
                dropdownData={dropdownData}
                refNo={refno}
                cityDropdown={cityDropdown}
            cityDropdownData={cityDropdownData}
              /> :
              forms == "2" ?
                <Form2
                  previewData={previewdata}
                  refNo={refno}
                /> :
                forms == "3" ?
                  <Form3
                    previewData={previewdata}
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

export default Index