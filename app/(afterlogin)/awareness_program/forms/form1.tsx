'use client'
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {Previewdata} from '@/app/(afterlogin)/hcp_services/page'
import { useAuth } from "@/app/context/AuthContext";

type dropdownData = {
  company: {
    name: string;
    company_name: "string";
  }[];
  division: {
    name: string;
    division_name: string;
  }[];
  requestor: {
    full_name: string;
    email: string;
  }[];
  vendor_type: {
    name: string;
    vendor_type: string;
  }[];
  state: {
    name: string;
    state: string;
  }[];
  city: {
    name: string;
    city: string;
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

type subtypeActivity = {
  name: string;
  division_sub_category: string
}[];

type Compensation = {
  vendor_type: string;
  vendor_name: string;
  est_amount: number;
  gst_included?: number;
};

type Logistics = {
  vendor_type: string;
  est_amount: number;
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
  division_sub_category: string;
  sub_type_of_activity: string;
  any_govt_hcp: string,
  no_of_hcp: number
};
type reportingHeadDropdown = {
  reporting_name: string;
  reporting: string
}[];
type cityDropdown = {
  name: string;
  city: string
}[];



type Props = {
  cityDropdown: cityDropdown | null
  ReportingHeadDropdown: reportingHeadDropdown | null
  eventCostCenter: eventCostCenter | null;
  dropdownData: dropdownData | null;
  previewData:Previewdata | null;
  refNo:string
}

type FormErrors = {
  sub_type_of_activity? : string;
  event_cost_center?: string;
}


const Form1 = ({ ...Props }: Props) => {
  const router = useRouter();
  const { role, name, userid, clearAuthData } = useAuth();
  const[businessUnit, setBusinessUnit] = useState(Props.previewData?.business_unit ?? "");
  const[budget, setBudget] = useState(Props.previewData?.division_category ?? "");
  const [eventCostCenter, setEventCostCenter] = useState<eventCostCenter | null>(null);
  const [subtypeActivity, setSubtypeActivity] = useState<subtypeActivity | null>(null);
  const [subtypeActivityVisible, setSubtypeActivityVisible] = useState(false);
  const [engagementTypes, setEngagementTypes] = useState("");  
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<formData>(); 
    const [errors, setErrors] = useState<FormErrors>();
  const [citydropdown, setCityDropdown] = useState<cityDropdown | null>()
  const [reportingHeadDropdown, setReportingHeadDropdown] = useState<reportingHeadDropdown | null>(null)
  
  const validateAtSubmit = () => {
    const errors: FormErrors = {};
    console.log("Checking Formdata value", formData?.sub_type_of_activity);
    if ((Props.previewData?.sub_type_of_activity  ? (formData && ("sub_type_of_activity" in formData && formData.sub_type_of_activity == '')) : !formData?.sub_type_of_activity )) errors.sub_type_of_activity = "Sub Type Of Activity is required";
    if ((Props.previewData?.event_cost_center  ? (formData && ("event_cost_center" in formData && formData.event_cost_center == '')) : !formData?.event_cost_center )) errors.event_cost_center = "Event Cost Center is required";
    return errors;
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationErrors = validateAtSubmit();
    if (Object.keys(validationErrors).length > 0) {
      console.error(validationErrors)
      setErrors(validationErrors);
      return;
    }
    const updatedFormData = {
      ...formData
    };
    updatedFormData.event_type = "Awareness Program";

    if (Props.refNo) {
      updatedFormData.name = Props.refNo;
    }


    try {
      const response = await fetch(
        "/api/training_and_education/handleSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(updatedFormData)
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data, "response data");
        setTimeout(() => {
          router.push(`/awareness_program?forms=2&refno=${data.message}`);
        }, 1000)
        
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };
  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }) as formData);
  }
  const handleSelectChange = (value: string, name: string) => {
    if(name == "business_unit"){setBusinessUnit(value)};
    if(name == "division_category"){setBudget(value)};
    setFormData((prev) => ({ ...prev, [name]: value }) as formData);
  };
  const handleBudgetChange = async (value: string) => {
    console.log(value);
    try {
      const response = await fetch(
        "/api/training_and_education/subtypeDropdown",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            budget: value,
          }),
        }
      );

      
      if (response.ok) {
        const data = await response.json();
        setSubtypeActivity(data.data);
        if (value == "National") {
          setSubtypeActivityVisible(true);
        } else {
          setSubtypeActivityVisible(false);
        }
      } else {
        console.log("Response was not OK");
      }
    } catch (error) {
      console.error("Error during submitting:", error);
    }
  };
  const handleBusinessUnitChange = async (value: string) => {
    try {
      const response = await fetch(
        "/api/training_and_education/eventCostCenterDropdown",
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
        setEventCostCenter(data.data);
      } else {
        console.log("Response was not OK");
      }
    } catch (error) {
      console.error("Error during submitting:", error);
    }
  };
  const handleStateChange = async (value: string) => {
    try {
      const response = await fetch(
        "/api/training_and_education/cityDropdown",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: value,
          }),
        }
      );


      if (response.ok) {
        const data = await response.json();
        setCityDropdown(data.data);
        return data.data
      } else {
        console.log("Response not okay  state change");
      }
    } catch (error) {
      console.error("Error during state  change:", error);
    }
  };
  const handleReportingChange = async () => {
    setReportingHeadDropdown([])
    try {
      const response = await fetch(
        "/api/training_and_education/reportingHeadDropdown",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_requestor: formData?.event_requestor,
            business_unit: formData?.business_unit,
            division_category: formData?.division_category,
            division_sub_category: formData?.division_category == 'National' ? formData?.division_sub_category : "",
            state: formData?.state
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setReportingHeadDropdown(data.data);
        return data.data;
      } else {
        console.log("Response not Ok at Reporting change");
      }
    } catch (error) {
      console.error("Error during Reporting change:", error);
    }
  };

  useEffect(()=>{
    handleBudgetChange(budget);
  },[])

  useEffect(() => {
    if (userid !== undefined) {
      setLoading(false);
      if(Props?.previewData?.event_requestor){
        handleSelectChange(Props.previewData.event_requestor, "event_requestor")
      }else{
        handleSelectChange(userid as string, "event_requestor")
      }
    }
  }, [userid]);

  useEffect(() => {
    // Check if all values are present
    if (formData?.event_requestor && formData?.business_unit && formData?.state) {
      console.log("inside use effect reporting head");
      handleReportingChange();
    }
  }, [formData?.event_requestor, formData?.business_unit, formData?.division_category, formData?.division_sub_category, formData?.state]);
  console.log("Formdata", formData);

  if (loading) {
    return <div>Loading Please Wait</div>;
  }

  return (
    <div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Basic Detail
      </h1>
      <div className="grid grid-cols-2 gap-6 pb-8">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Company Name
          </label>
          <Select
            onValueChange={(value) => handleSelectChange(value, "company")}
            defaultValue={Props.previewData?.company?Props.previewData.company:""}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Props.dropdownData ?
                Props.dropdownData.company.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.company_name}
                    </SelectItem>
                  );
                })
                :
                <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Business Unit
          </label>
          <Select onValueChange={(value) => { handleBusinessUnitChange(value), handleSelectChange(value, "business_unit") }}
            defaultValue={Props.previewData?.business_unit?Props.previewData.business_unit:""}
            >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Props.dropdownData ?
                Props.dropdownData.division.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.division_name}
                    </SelectItem>
                  );
                })
                :
                <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Event requester
          </label>
          <Select
            onValueChange={(value) => handleSelectChange(value, "event_requestor")}
            defaultValue={Props.previewData?.event_requestor?Props.previewData.event_requestor:userid as string}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Props.dropdownData ?
                Props.dropdownData.requestor.map((item, index) => {
                  return (
                    <SelectItem value={item.email}>
                      {item.full_name}
                    </SelectItem>
                  );
                })
                :
                <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className={`lable ${(errors?.event_cost_center && !formData?.event_cost_center) ? `text-red-600`:`text-black`}`}>
            event cost center<span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => handleSelectChange(value, "event_cost_center")}
            defaultValue={Props.previewData?.event_cost_center?Props.previewData.event_cost_center:""}
          >
            <SelectTrigger className={`dropdown ${(errors?.event_cost_center && !formData?.event_cost_center) ? `border border-red-600`:``}`}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              { Props.eventCostCenter?
                  Props.eventCostCenter.cost_center.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.cost_center_description}
                      </SelectItem>
                    );
                  }): eventCostCenter ? eventCostCenter.cost_center.map((item,index)=>{
                    return (
                      <SelectItem value={item.name}>
                        {item.cost_center_description}
                      </SelectItem>
                    )
                  })
                  :
                <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
                }
            </SelectContent>
          </Select>
          {
            errors && 
            (errors?.event_cost_center && !formData?.event_cost_center) && 
              (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.event_cost_center}
              </p>
              )
          }
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Budget
          </label>
          <Select onValueChange={(value) => { handleBudgetChange(value); handleSelectChange(value, "division_category"); }}
            defaultValue={Props.previewData?.division_category?Props.previewData.division_category:""}
            >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
            { Props.eventCostCenter?Props.eventCostCenter.division_category.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.category}
                      </SelectItem>
                    );
                  }): eventCostCenter ? eventCostCenter.division_category.map((item,index)=>{
                    return (
                      <SelectItem value={item.name}>
                        {item.category}
                      </SelectItem>
                    )
                  })
                  :
                <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
                }
            </SelectContent>
          </Select>
        </div>
        {
          (businessUnit == "Endosurgery" && budget == "National") &&          
          <div className="flex flex-col gap-2">
            <label className="lable">
              Budget Sub Type
            </label>
            <Select
            onValueChange={(value)=>{handleSelectChange(value,"division_sub_category")}}
            defaultValue={Props.previewData?.division_sub_category?Props.previewData.division_sub_category:""}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
              {subtypeActivity ?
                  subtypeActivity.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.division_sub_category}
                      </SelectItem>
                    );
                  })
                  :
                <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
                }
              </SelectContent>
            </Select>
          </div>
        }
        <div className="flex flex-col gap-2">
          <label className="lable">
            State
          </label>
          <Select
            onValueChange={(value) => { handleSelectChange(value, "state");handleStateChange(value) }}
            defaultValue={Props.previewData?.state?Props.previewData.state:""}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Props.dropdownData ?
                Props.dropdownData.state.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.state}
                    </SelectItem>
                  );
                })
                :
                <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            City
          </label>
          <Select 
          onValueChange={(value) => { handleSelectChange(value, "city") }}
          defaultValue={Props.previewData?.city?Props.previewData.city:""}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {
                citydropdown ? citydropdown.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.city}
                    </SelectItem>
                  );
                }) : Props.cityDropdown ? Props.cityDropdown.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.city}
                    </SelectItem>
                  )
                }) :
                  <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Reporting Head
          </label>
          <Select
            defaultValue={Props.previewData?.reporting_head ?? ""}
            onValueChange={(value) => { handleSelectChange(value, "reporting_head") }}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {
                reportingHeadDropdown ? reportingHeadDropdown.map((item, index) => {
                  return (
                    <SelectItem value={item.reporting}>
                      {item.reporting_name}
                    </SelectItem>
                  );
                }) : Props.ReportingHeadDropdown ? Props.ReportingHeadDropdown.map((item, index) => {
                  return (
                    <SelectItem value={item.reporting}>
                      {item.reporting_name}
                    </SelectItem>
                  )
                }) :
                  <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
        <label className={`lable ${(errors?.sub_type_of_activity && !formData?.sub_type_of_activity) ? `text-red-600`:`text-black`}`}>
            Sub Type Of Activity <span className={"text-[#e60000]"}>*</span>
          </label>
          <Select
            onValueChange={(value) => { handleSelectChange(value, "sub_type_of_activity") }}
            defaultValue={Props.previewData?.sub_type_of_activity?Props.previewData.sub_type_of_activity:""}
          >
            <SelectTrigger className={`dropdown ${(errors?.sub_type_of_activity && !formData?.sub_type_of_activity) ? `border border-red-600`:``}`}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>

              <SelectItem value="Awareness Talk">
                {"Awareness Talk"}
              </SelectItem>
              <SelectItem value="Media Activity">
                {"Media Activity"}
              </SelectItem>
              <SelectItem value="Awareness Camp">
                {"Awareness Camp"}
              </SelectItem>
              <SelectItem value="Others">
                {"Others"}
              </SelectItem>
            </SelectContent>
          </Select>
          {
            errors && 
            (errors?.sub_type_of_activity && !formData?.sub_type_of_activity) && 
              (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.sub_type_of_activity}
              </p>
              )
          }
        </div>

      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <label className="lable">
          Selection Criteria For Faculty
          </label>
          <textarea
            className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2'
            placeholder="Type Here"
            name="faculty"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
            defaultValue={Props.previewData?.faculty?Props.previewData.faculty:""}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
          Selection Criteria For Participant
          </label>
          <textarea
            className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2'
            placeholder="Type Here"
            name="participants"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
            defaultValue={Props.previewData?.participants?Props.previewData.participants:""}
          />
        </div>
      </div>
      <div className="flex justify-end pt-5 gap-4">
        {/* <Button className="bg-white text-black border text-md font-normal">
          {" "}
          Save as Draft
        </Button>*/}
        <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={(e: React.MouseEvent<HTMLButtonElement>)=>handleSubmit(e)}>Next</Button>
      </div>
    </div>
  );
};

export default Form1;
