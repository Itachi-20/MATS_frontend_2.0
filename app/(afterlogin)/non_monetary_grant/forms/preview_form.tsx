import React,{useState} from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import BasicDetails from "@/components/basic_Details"
import EventDetails from "@/components/event_Details"
import VendorDetails from "@/components/vendor_Details";
import LogisticsBudget from "@/components/logistics_budget";
import CompensationBudget from "@/components/compensation_budget"
import TotalExpense from "@/components/total_Expense"
import Documents from "@/components/documents"
import Add_vendor from "@/components/add_vendor";
type Props = {
    prevForm: ()=>void
}
const Preview_Form = ({...Props}:Props) => {
  const [dialog,setDialog] = useState(false);
  const [addVendor,setAddVendor] = useState(false);
  const isAddVendor = ()=>{
    setAddVendor(prev => !prev)
  }
  const handleDialog = ()=>{
    setDialog(prev=> !prev);
  }
  return (
      <>
        <div className="md:px-7 md:pb-7 md:pt-4 w-full relative z-20">
            
        <BasicDetails/>

        <EventDetails/>

        <LogisticsBudget/>
        
        <CompensationBudget/>

        <TotalExpense/>
            
        <Documents/>
        
            <div className="flex items-center md:pb-8 gap-3">
            <Checkbox />
            <label className="text-black md:text-sm md:font-normal">
              I hereby declare that all details filled by me are correct and genuine.<span className="text-[#e60000]">*</span>
                </label>
            </div>

            <div className="flex justify-end pt-5 gap-4">
              <Button className="bg-white text-black border text-md font-normal">
                Save as Draft
              </Button>
              <Button className="bg-white text-black border text-md font-normal" onClick={Props.prevForm}>
                Back
              </Button>
              <Button className="bg-[#4430bf] text-white text-md font-normal border" onClick={handleDialog}>
                Submit
              </Button>
            </div>
        </div>
        {

          dialog && 
          <Add_vendor
          isAddVendor={isAddVendor}
          />
        }
      </>
  )
}

export default Preview_Form