import React, { useState } from "react";
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
import {budget_options}  from "@/app/page";
import {business_unit_options} from "@/app/page";

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
}

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


type Props = {
  dropdownData: dropdownData | null;
  handlefieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>void;
  handleSelectChange: (value:string,name:string)=>void;
  handleSubmit:(e: React.MouseEvent<HTMLButtonElement>)=>void
};

const Form1 = ({ ...Props }: Props) => {
  const[businessUnit, setBusinessUnit] = useState("");
  const[budget, setBudget] = useState("");
  const [eventCostCenter, setEventCostCenter] =
    useState<eventCostCenter | null>(null);
  const [subtypeActivity, setSubtypeActivity] =
    useState<subtypeActivity | null>(null);
  const [subtypeActivityVisible, setSubtypeActivityVisible] = useState(false);


  const handleBudgetChange = async (value: string) => {
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

      const data = await response.json();
      setSubtypeActivity(data.data);
      if (value == "National") {
        setSubtypeActivityVisible(true);
      } else {
        setSubtypeActivityVisible(false);
      }

      if (response.ok) {
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
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

      const data = await response.json();
      setEventCostCenter(data.data);

      if (response.ok) {
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
    
  return (
    // </div>
    (<div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Basic Detail
      </h1>
      <div className="grid grid-cols-2 gap-6 pb-8">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Company Name <span className="text-[#e60000]">*</span>
          </label>
          <Select
          onValueChange={(value)=>{Props.handleSelectChange(value,"company")}}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {
                Props.dropdownData && Props.dropdownData.company?.map((item,index)=>{
                  return (
                    <SelectItem value={item.name}>{item.company_name}</SelectItem>
                  )
                }) 
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Business Unit<span className="text-[#e60000]">*</span>
          </label>
          <Select onValueChange={(value)=>{handleBusinessUnitChange(value),Props.handleSelectChange(value,"business_unit")}}>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              { 
                Props.dropdownData && Props.dropdownData.division.map((item,index)=>(
                  <SelectItem key={index} value={item.name}>{item.division_name}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Event requester<span className="text-[#e60000]">*</span>
          </label>
          <Select
          onValueChange={(value)=>Props.handleSelectChange(value,"event_requestor")}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
            {Props.dropdownData &&
                  Props.dropdownData.requestor.map((item, index) => {
                    return (
                      <SelectItem value={item.email}>
                        {item.full_name}
                      </SelectItem>
                    );
                  })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            event cost center<span className="text-[#e60000]">*</span>
          </label>
          <Select
           onValueChange={(value)=>Props.handleSelectChange(value,"event_cost_center")}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
            {eventCostCenter &&
                  eventCostCenter.cost_center.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.cost_center_description}
                      </SelectItem>
                    );
                  })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Budget<span className="text-[#e60000]">*</span>
          </label>
          <Select onValueChange={(value)=>{handleBudgetChange(value),Props.handleSelectChange(value,"division_category")}}>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="--Selected--" />
            </SelectTrigger>
            <SelectContent>
            {eventCostCenter &&
                  eventCostCenter.division_category.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>{item.category}</SelectItem>
                    );
                  })}
            </SelectContent>
          </Select>
        </div>

        {
          businessUnit == "Endosurgery" && budget == "National" &&          
          <div className="flex flex-col gap-2">
            <label className="lable">
              Budget Sub Type<span className="text-[#e60000]">*</span>
            </label>
            <Select
             onValueChange={(value)=>{Props.handleSelectChange(value,"division_sub_category")}}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="--Selected--" />
              </SelectTrigger>
              <SelectContent>
              {subtypeActivity &&
                  subtypeActivity.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.division_sub_category}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>

        }

        <div className="flex flex-col gap-2">
          <label className="lable">
            Therapy<span className="text-[#e60000]">*</span>
          </label>
          <Select
          onValueChange={(value)=>{Props.handleSelectChange(value,"therapy")}}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
            {eventCostCenter &&
                  eventCostCenter.therapy.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>{item.therapy}</SelectItem>
                    );
                  })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="lable">
            State<span className="text-[#e60000]">*</span>
          </label>
          <Select
          onValueChange={(value)=>{Props.handleSelectChange(value,"state")}}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
            {
              Props && Props.dropdownData && Props.dropdownData.state?.map((item,index)=>{
                  return (
                    <SelectItem value={item.name}>{item.state}</SelectItem>
                  )
              })
            }
            </SelectContent>
          </Select>
        </div>

        {/* <div className="flex flex-col gap-2">
          <label className="lable">
            City<span className="text-[#e60000]">*</span>
          </label>
          <Select
          onValueChange={(value)=>{Props.handleSelectChange(value,"city")}}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        
        {/* <div className="flex flex-col gap-2">
          <label className="lable">
            Reporting Head<span className="text-[#e60000]">*</span>
          </label>
          <Select
          onValueChange={(value)=>{Props.handleSelectChange(value,"reporting_head")}}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <div className="flex flex-col gap-2">
          <label className="lable">
            Sub Type Of Activity<span className="text-[#e60000]">*</span>
          </label>
          <Select
          onValueChange={(value)=>{Props.handleSelectChange(value,"sub_type_of_activity")}}
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
          onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{Props.handlefieldChange(e)}}
           />
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Participants<span className="text-[#e60000]">*</span>
          </label>
          <Textarea className="text-black shadow-md"
              placeholder="Type Here"
              name="participants"
              onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{Props.handlefieldChange(e)}} />
        </div>
      </div>

      <div className="py-8">
          <h1 className="text-black text-2xl font-normal uppercase pb-8">
            Sponsorship Details
          </h1>
          <div className="grid md:grid-cols-2 md:gap-6">
                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Organizer Name<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="Type Here"
                        name="organizer_name"
                        onChange={(e) => Props.handlefieldChange(e)}
                    ></Input>
                </div>
                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Sponsorship Amount<span className="text-[#e60000]">*</span>
                    </label>
                    <Input

                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="Type Here"
                        type="number"
                        name="sponsorship_amount"
                        onChange={(e) => Props.handlefieldChange(e)}
                    ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="lable">
                    Currency<span className="text-[#e60000]">*</span>
                  </label>
                  <Select
                  onValueChange={(value)=>{Props.handleSelectChange(value,"sponsor_currency")}}
                  >
                    <SelectTrigger className="dropdown">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        Props && Props.dropdownData && Props.dropdownData.currency?.map((item,index)=>{
                          return (
                            <SelectItem value={item.name}>{item.name}</SelectItem>
                          )
                        })
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                    Entitlement in Lieu of sponsorship<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="Type Here"
                        name="entitlement_in_lieu_of_sponsorship"
                        onChange={(e) => Props.handlefieldChange(e)}
                    ></Input>
                </div>
            </div>
      </div>

      <div className="py-8">
          <h1 className="text-black text-2xl font-normal uppercase pb-8">
            Other Details
          </h1>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                    Comment (If Any)<span className="text-[#e60000]">*</span>
                </label>
                <Input
                    className="text-black shadow md:rounded-xl md:py-5"
                    placeholder="Type Here"
                    name="comment_if_any"
                    onChange={(e) => Props.handlefieldChange(e)}
                ></Input>
            </div>
            <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                    Any Additional Expense<span className="text-[#e60000]">*</span>
                </label>
                <Input
                    className="text-black shadow md:rounded-xl md:py-5"
                    placeholder="Type Here"
                    name="any_additional_expense"
                    onChange={(e) => Props.handlefieldChange(e)}
                ></Input>
            </div>
          </div>
      </div>

      <div className="flex justify-end pt-5 gap-4">
        {/* <Button className="bg-white text-black border text-md font-normal">
          {" "}
          Save as Draft
        </Button> */}
        <Button className='bg-[#4430bf] text-white text-md font-normal border'onClick={(e)=>Props.handleSubmit(e)}>Next</Button>
      </div>
    </div>
    )
  );
};

export default Form1;
