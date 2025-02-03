
import React from 'react';
import Form1 from "@/app/(afterlogin)/awareness_program/forms/form1";
import Form2 from "@/app/(afterlogin)/awareness_program/forms/form2";
import Form3 from "@/app/(afterlogin)/awareness_program/forms/form3";
import Form4 from "@/app/(afterlogin)/awareness_program/forms/form4";
import Preview_Form from './forms/preview_form';
import { AppWrapper } from '@/app/context/module';
import { activityList, dropdown, PreviewData, handleBusinessUnitChange } from './utility';
import { cookies } from "next/headers";
import { handleStateChange, handleReportingChange, handleCityChange, handleCityDropdown } from './utility'
import {DropdownDataType,ActivityDropdownType,PreviewDataType} from '@/app/Types/EventData'


const Index = async ({ ...Props }: any) => {
  const props = await Props;
  const { forms, refno } = await props.searchParams;
  const dropdownData: DropdownDataType = await dropdown();

  let eventype: { [key: string]: string } = {};
  const cookie = await cookies()
  const cityDropdownData = await handleCityDropdown(cookie);
  let previewdata: PreviewDataType | null = null;
  let eventCostCenter = null;
  let cityDropdown = null;
  let ReportingHeadDropdown = null;
  let cityPreviewDropdown = null;
  console.log(refno, cookie);
  const activityDropdown: ActivityDropdownType = await activityList(cookie,'Pre Activity','Awareness Program');
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