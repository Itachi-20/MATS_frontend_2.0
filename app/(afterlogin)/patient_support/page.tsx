import Form1 from "./forms/form1";
import Form2 from "./forms/form2";
import Form4 from "./forms/form4";
import Preview_Form from './forms/preview_form';
import { dropdown, activityList, PreviewData, handleBusinessUnitChange, handleBudgetChange } from "./utility";
import { cookies } from "next/headers";
import { handleStateChange, handleReportingChange, handleCityChange, handleCityDropdown } from './utility'
import { PreviewDataType, DropdownDataType, ActivityDropdownType} from '@/app/Types/EventData'

const index = async ({ ...Props }: any) => {
  const dropdownData: DropdownDataType = await dropdown();
  const props = await Props;
  const { forms, refno } = await props.searchParams;
  const cookie = await cookies()
  const cityDropdownData = await handleCityDropdown(cookie);
  let previewdata: PreviewDataType | null = null;
  let eventCostCenter = null;
  let subtypeActivity = null;
  let cityDropdown = null;
  let ReportingHeadDropdown = null;
  let cityPreviewDropdown = null;
  const actvityDropdown: ActivityDropdownType = await activityList(cookie, 'Pre Activity', 'Patient Support');
  if (refno) {
    previewdata = await PreviewData(refno, cookie);
  }
  if (previewdata && previewdata.business_unit) {
    eventCostCenter = await handleBusinessUnitChange(previewdata.business_unit, cookie);
  }

  if (previewdata && previewdata.division_category == "National") {
    subtypeActivity = await handleBudgetChange(previewdata.division_category, cookie);
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
  console.log(previewdata, "this is preview data")

  return (
    <>
      <div className="px-7 pb-7 pt-4 w-full z-20">
        {
          forms == "1" ?
            <Form1
              ReportingHeadDropdown={ReportingHeadDropdown}
              // cityDropdown={cityDropdown}
              dropdownData={dropdownData}
              previewData={previewdata}
              eventCostCenter={eventCostCenter}
              refno={refno}
              subtypeActivity={subtypeActivity}
              cityDropdown={cityDropdown}
            cityDropdownData={cityDropdownData}
            /> :
            forms == "2" ?
              <Form2
                previewData={previewdata}
                refno={refno}
                currency={dropdownData && dropdownData.currency}
              /> :
              forms == "3" ?
                <Form4
                  activityDropdown={actvityDropdown}
                  refno={refno}
                /> :
                forms == "4" ?
                  <Preview_Form
                    previewData={previewdata}
                    refno={refno}
                  /> :
                  ""
        }
      </div>
    </>
  )
}

export default index