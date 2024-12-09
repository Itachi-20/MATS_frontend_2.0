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


type Props = {
  eventCostCenter: eventCostCenter | null;
  dropdownData: dropdownData | null;
  previewData:Previewdata | null;
  refNo:string
}

const Form1 = ({ ...Props }: Props) => {
  const router = useRouter();
  const[businessUnit, setBusinessUnit] = useState(Props.previewData?.business_unit ?? "");
  const[budget, setBudget] = useState(Props.previewData?.division_category ?? "");
  const [eventCostCenter, setEventCostCenter] = useState<eventCostCenter | null>(null);
  const [subtypeActivity, setSubtypeActivity] = useState<subtypeActivity | null>(null);
  const [subtypeActivityVisible, setSubtypeActivityVisible] = useState(false);
  const [engagementTypes, setEngagementTypes] = useState("");  
  const [formData, setFormData] = useState<formData>(); 

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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

  useEffect(()=>{
    handleBudgetChange(budget);
  },[])

  return (
    <div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Basic Detail
      </h1>
      <div className="grid grid-cols-2 gap-6 pb-8">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Company Name<span className="text-[#e60000]">*</span>
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
            Business Unit<span className="text-[#e60000]">*</span>
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
            Event requester<span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => handleSelectChange(value, "event_requestor")}
            defaultValue={Props.previewData?.event_requestor?Props.previewData.event_requestor:""}
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
          <label className="lable">
            event cost center<span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => handleSelectChange(value, "event_cost_center")}
            defaultValue={Props.previewData?.event_cost_center?Props.previewData.event_cost_center:""}
          >
            <SelectTrigger className="dropdown">
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
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Budget<span className="text-[#e60000]">*</span>
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
              Budget Sub Type<span className="text-[#e60000]">*</span>
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
            City<span className="text-[#e60000]">*</span>
          </label>
          <Select 
          onValueChange={(value) => { handleSelectChange(value, "city") }}
          defaultValue={Props.previewData?.city?Props.previewData.city:""}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {(Props.dropdownData && Props.dropdownData.city)?
                  Props.dropdownData.city.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.city}
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
            State<span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => { handleSelectChange(value, "state") }}
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
            Sub Type Of Activity<span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => { handleSelectChange(value, "sub_type_of_activity") }}
            defaultValue={Props.previewData?.sub_type_of_activity?Props.previewData.sub_type_of_activity:""}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>

              <SelectItem value="Meril Event">
                {"Meril Event"}
              </SelectItem>
              <SelectItem value="Mix Event">
                {"Mix Event"}
              </SelectItem>
              <SelectItem value="Marketing Event">
                {"Marketing Event"}
              </SelectItem>

            </SelectContent>
          </Select>
        </div>

      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Faculties<span className="text-[#e60000]">*</span>
          </label>
          <Textarea
            className="text-black shadow-md"
            placeholder="Type Here"
            name="faculty"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
            defaultValue={Props.previewData?.faculty?Props.previewData.faculty:""}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Participants<span className="text-[#e60000]">*</span>
          </label>
          <Textarea
            className="text-black shadow-md"
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
