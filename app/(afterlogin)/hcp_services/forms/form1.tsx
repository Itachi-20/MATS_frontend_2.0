"use client"
import React, { useState, useEffect,useRef } from "react";
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
import { useAuth } from "@/app/context/AuthContext";
import { Previewdata } from '@/app/(afterlogin)/hcp_services/page';
import { Toaster, toast } from 'sonner';

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
  engagement_type: {
    name: string
    engagement_type: string
  }[]
  training_ref_no: {
    name: string
  }[]
  sponsorship_ref_no:{
    name:string
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

type FormData = {
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
  activity: {
    name: string,
    activity_name: string
  }[],
  document: {
    name: string,
    activity_type: string,
    document_name: string
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
  dropdownData: dropdownData | null;
  previewData: Previewdata | null;
  eventCostCenter: eventCostCenter | null;
  refno: string;
  subtypeActivity: subtypeActivity | null;
};
const Form1 = ({ ...Props }: Props) => {
  const router = useRouter();
  const [businessUnit, setBusinessUnit] = useState(Props.previewData?.business_unit);
  const [budget, setBudget] = useState(Props.previewData?.division_category);
  const [eventCostCenter, setEventCostCenter] =
    useState<eventCostCenter | null>(null);
  const [subtypeActivity, setSubtypeActivity] =
    useState<subtypeActivity | null>(null);
  const [subtypeActivityVisible, setSubtypeActivityVisible] = useState(false);
  const [engagementTypes, setEngagementTypes] = useState("");
  const [formdata, setFormData] = useState<FormData>();
  const [refNo, setRefNo] = useState<string | null>(Props.refno);
  const [eventStartDate, setEventStartDate] = useState<any>(Props.previewData?.event_start_date ? new Date(Props.previewData?.event_start_date).getTime() : "");
  const [citydropdown, setCityDropdown] = useState<cityDropdown | null>()
  const [reportingHeadDropdown, setReportingHeadDropdown] = useState<reportingHeadDropdown | null>(null)  
  const [loading, setLoading] = useState(true);
  const { role, name, userid, clearAuthData } = useAuth();
  const start_date_ref: React.RefObject<any> = useRef(null);
  const end_date_ref: React.RefObject<any> = useRef(null);

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }) as FormData);
  };
  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }) as FormData);
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedFormData = {
      ...formdata

    };

    updatedFormData.event_type = "HCP Services"
    if (refNo) {
      updatedFormData.name = refNo;
    } else {
      updatedFormData.name = '';
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
        console.log(data, "response data-----------------------------------");
        // localStorage.setItem("refno", data.message);
        setRefNo(data.message);
        router.push(`/hcp_services?forms=2&refno=${data.message}`);

      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
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

  const handleEventStartDateValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    if (e.target.valueAsNumber < currentDate) {
      toast.error("You are selecting previous date");
    }
    setEventStartDate(e.target.valueAsNumber);
    handlefieldChange(e);
  };
  const handleEventEndDateValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (eventStartDate && e.target.valueAsNumber < eventStartDate ) {
      toast.error("Event end Date should be greater than or equal to start date");
      e.target.value = "";
    }
    handlefieldChange(e);
  };

  const handleStartDateClick = () => {
    if (start_date_ref.current) {
      start_date_ref.current.showPicker(); // For modern browsers
      start_date_ref.current.focus(); // Fallback for older browsers
    }
  };
  
  const handleEndDateClick = () => {
    if (end_date_ref.current) {
      end_date_ref.current.showPicker(); // For modern browsers
      end_date_ref.current.focus(); // Fallback for older browsers
    }
  };

  useEffect(() => {
    setFormData({ ...formdata, name: refNo } as FormData)
  }, [refNo])

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
            event_requestor: formdata?.event_requestor,
            business_unit: formdata?.business_unit,
            division_category: formdata?.division_category,
            division_sub_category: formdata?.division_category == 'National' ? formdata?.division_sub_category : "",
            state: formdata?.state
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

  useEffect(() => {
    // Check if all values are present
    if (formdata?.event_requestor && formdata?.business_unit && formdata?.state) {
      console.log("inside use effect reporting head");
      handleReportingChange();
    }
  }, [formdata?.event_requestor, formdata?.business_unit, formdata?.division_category, formdata?.division_sub_category, formdata?.state]);

  console.log("Formdata", formdata);
  console.log(formdata, "this is form data")
  if (loading) {
    return <div>Loading Please Wait</div>;
  }
  return (
    // </div>
    <>
    <div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Basic Detail
      </h1>
      <div className="grid grid-cols-2 gap-6 pb-8">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Company Names <span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => { handleSelectChange(value, "company") }}
            defaultValue={Props.previewData?.company ? Props.previewData.company : ""}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {
                Props.dropdownData && Props.dropdownData.company?.map((item, index) => {
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
          <Select onValueChange={(value) => { handleBusinessUnitChange(value); handleSelectChange(value, "business_unit"); setBusinessUnit(value) }}
            defaultValue={Props.previewData?.business_unit ? Props.previewData.business_unit : ""}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {
                Props.dropdownData && Props.dropdownData.division?.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>{item.division_name}</SelectItem>
                  )
                })
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
            defaultValue={Props.previewData?.event_requestor ? Props.previewData.event_requestor : userid as string}
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
            onValueChange={(value) => handleSelectChange(value, "event_cost_center")}
            defaultValue={Props.previewData?.event_cost_center ? Props.previewData.event_cost_center : ""}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {eventCostCenter ? eventCostCenter.cost_center.map((item, index) => {
                return (
                  <SelectItem value={item.name}>
                    {item.cost_center_description}
                  </SelectItem>
                )
              }): Props.eventCostCenter && Props.eventCostCenter.cost_center.map((item, index) => {
                return (
                  <SelectItem value={item.name}>
                    {item.cost_center_description}
                  </SelectItem>
                );
              }) }
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Budget<span className="text-[#e60000]">*</span>
          </label>
          <Select onValueChange={(value) => { handleBudgetChange(value), handleSelectChange(value, "division_category"); setBudget(value) }}
            defaultValue={Props.previewData?.division_category ? Props.previewData.division_category : ""}>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {eventCostCenter ? eventCostCenter.division_category.map((item, index) => {
                return (
                  <SelectItem value={item.name}>
                    {item.category}
                  </SelectItem>
                )
              }) : Props.eventCostCenter && Props.eventCostCenter.division_category.map((item, index) => {
                return (
                  <SelectItem value={item.name}>
                    {item.category}
                  </SelectItem>
                );
              })}
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
                  }): Props.subtypeActivity && Props.subtypeActivity.map((item,index)=>{
                    return (
                      <SelectItem value={item.name}>
                        {item.division_sub_category}
                      </SelectItem>
                    )
                  })}
              </SelectContent>
            </Select>
          </div>
        }
        <div className="flex flex-col gap-2">
          <label className="lable">
            State<span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => { handleSelectChange(value, "state"); handleStateChange(value)  }}
            defaultValue={Props.previewData?.state ? Props.previewData.state : ""}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {
                Props && Props.dropdownData && Props.dropdownData.state?.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>{item.state}</SelectItem>
                  )
                })
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            City<span className="text-[#e60000]">*</span>
          </label>
          <Select
            defaultValue={Props.previewData?.city ?? ""}
            onValueChange={(value) => { handleSelectChange(value, "city") }} disabled={(formdata?.state || Props.previewData?.state) ? false : true}>
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
            Therapy<span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => { handleSelectChange(value, "therapy") }}
            defaultValue={Props.previewData?.therapy ? Props.previewData.therapy : ""}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              { eventCostCenter ? eventCostCenter.therapy.map((item, index) => {
                return (
                  <SelectItem value={item.name}>
                    {item.therapy}
                  </SelectItem>
                )
              }): Props.eventCostCenter && Props.eventCostCenter.therapy.map((item, index) => {
                return (
                  <SelectItem value={item.name}>
                    {item.therapy}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="flex flex-col gap-2">
          <label className="lable">
            Sub Type Of Activity<span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => { handleSelectChange(value, "sub_type_of_activity") }}
            defaultValue={Props.previewData?.sub_type_of_activity ? Props.previewData.sub_type_of_activity : ""}
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
        </div> */}
        <div className="flex flex-col gap-2">
          <label className="lable">
            Reporting Head<span className="text-[#e60000]">*</span>
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
          <label className="lable">
            Type Of Engagement<span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => { handleSelectChange(value, "type_of_engagement"); setEngagementTypes(value) }}
            defaultValue={Props.previewData?.type_of_engagement ? Props.previewData.type_of_engagement : ""}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {
                Props.dropdownData && Props.dropdownData.engagement_type?.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item.name}>{item.engagement_type}</SelectItem>
                  )
                })
              }
            </SelectContent>
          </Select>
        </div>

      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <label className="lable">
          Selection Criteria For Faculty<span className="text-[#e60000]">*</span>
          </label>
          <textarea className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2' placeholder='Type Here'
            name="faculty"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
            defaultValue={Props.previewData?.faculty ? Props.previewData.faculty : ""}
          />
        </div>
        {/* <div className="flex flex-col gap-2">
          <label className="lable">
            Participants<span className="text-[#e60000]">*</span>
          </label>
          <Textarea className="text-black shadow-md"
            placeholder="Type Here"
            name="participants"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
            defaultValue={Props.previewData?.participants ? Props.previewData.participants : ""}
          />
        </div> */}
      </div>

      {(engagementTypes == "One Time" || Props.previewData?.type_of_engagement == "One Time") &&
        <>
          <div className="py-8">
            <h1 className="text-black text-2xl font-normal uppercase pb-8">
              Sub Type Details
            </h1>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="flex flex-col md:gap-2"onClick={()=>handleStartDateClick()}>
                <label className="text-black md:text-sm md:font-normal capitalize"htmlFor="start_date">
                  Start Date<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  type="date"
                  id="start_date"
                  ref={start_date_ref}
                  placeholder="dd/mm/yy"
                  name="event_start_date"
                  onChange={(e) => { handleEventStartDateValidate(e) }}
                  defaultValue={Props.previewData?.event_start_date ? Props.previewData.event_start_date : ""}
                ></Input>
              </div>
              <div className="flex flex-col md:gap-2"onClick={()=>handleEndDateClick()}>
                <label className="text-black md:text-sm md:font-normal capitalize"htmlFor="end_date">
                  End Date<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  type="date"
                  id="end_date"
                  ref={end_date_ref}
                  placeholder="dd/mm/yy"
                  name="event_end_date"
                  onChange={(e) => { handleEventEndDateValidate(e) }}
                  defaultValue={Props.previewData?.event_end_date ? Props.previewData.event_end_date : ""}
                ></Input>
              </div>
              <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                  Training & Education Request Ref Number<span className="text-[#e60000]">*</span>
                </label>
                <Select
                  onValueChange={(value) => { handleSelectChange(value, "training_ref_no") }}
                  defaultValue={Props.previewData?.training_ref_no ? Props.previewData.training_ref_no : ""}
                >
                  <SelectTrigger className="dropdown">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      Props.dropdownData && Props.dropdownData.training_ref_no?.map((item, index) => {
                        return (
                          <SelectItem key={index} value={item.name}>{item.name}</SelectItem>
                        )
                      })
                    }
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                  Sponsorship Support Request Ref Number<span className="text-[#e60000]">*</span>
                </label>
                <Select
                  onValueChange={(value) => { handleSelectChange(value, "sponsorship_ref_no") }}
                  defaultValue={Props.previewData?.sponsorship_ref_no ? Props.previewData.sponsorship_ref_no : ""}
                >
                  <SelectTrigger className="dropdown">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      Props.dropdownData && Props.dropdownData.sponsorship_ref_no?.map((item, index) => {
                        return (
                          <SelectItem key={index} value={item.name}>{item.name}</SelectItem>
                        )
                      })
                    }
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="py-8">
            <h1 className="text-black text-2xl font-normal uppercase pb-8">
              Event Details
            </h1>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                  Event Name<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  placeholder="Type Here"
                  name="event_name"
                  onChange={(e) => { handlefieldChange(e) }}
                  defaultValue={Props.previewData?.event_name ? Props.previewData.event_name : ""}
                ></Input>
              </div>
              <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                  Event Venue<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  placeholder="Type Here"
                  name="event_venue"
                  onChange={(e) => { handlefieldChange(e) }}
                  defaultValue={Props.previewData?.event_venue ? Props.previewData.event_venue : ""}
                ></Input>
              </div>
            </div>
          </div>
        </>

      }


      {(engagementTypes == "MSA" || Props.previewData?.type_of_engagement == "MSA") &&
        <>
          <div className="py-8">
            <h1 className="text-black text-2xl font-normal uppercase pb-8">
              Sub Type Details
            </h1>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="flex flex-col md:gap-2" onClick={()=>{handleStartDateClick()}}>
                <label className="text-black md:text-sm md:font-normal capitalize" htmlFor="start_date">
                  Start Date<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  type="date"
                  id="start_date"
                  ref={start_date_ref}
                  placeholder="dd/mm/yy"
                  name="event_start_date"
                  onChange={(e) => { handleEventStartDateValidate(e) }}
                  defaultValue={Props.previewData?.event_start_date ? Props.previewData.event_start_date : ""}
                ></Input>
              </div>
              <div className="flex flex-col md:gap-2" onClick={()=>{handleEndDateClick()}}>
                <label className="text-black md:text-sm md:font-normal capitalize" htmlFor="end_date">
                  End Date<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  type="date"
                  id="end_date"
                  ref={end_date_ref}
                  placeholder="dd/mm/yy"
                  name="event_end_date"
                  onChange={(e) => { handleEventEndDateValidate(e) }}
                  defaultValue={Props.previewData?.event_end_date ? Props.previewData.event_end_date : ""}
                ></Input>
              </div>
              <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                  Annual Plan<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  type="number"
                  className="text-black shadow md:rounded-xl md:py-5"
                  placeholder="Type Here"
                  name="annual_plan"
                  onChange={(e) => { handlefieldChange(e) }}
                  defaultValue={Props.previewData?.annual_plan ? Props.previewData.annual_plan : ""}
                ></Input>
              </div>
            </div>
          </div>

          <div className="py-8">
            <h1 className="text-black text-2xl font-normal uppercase pb-8">
              MSA Details
            </h1>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                  Service Type<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  placeholder="Type Here"
                  name="service_type"
                  onChange={(e) => { handlefieldChange(e) }}
                  defaultValue={Props.previewData?.service_type ? Props.previewData.service_type : ""}
                ></Input>
              </div>
            </div>
          </div>
        </>

      }

      {(engagementTypes == "Scientific Advisory Consultancy Agreement" || Props.previewData?.type_of_engagement == "Scientific Advisory Consultancy Agreement") &&
        <>
          <div className="py-8">
            <h1 className="text-black text-2xl font-normal uppercase pb-8">
              Sub Type Details
            </h1>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="flex flex-col md:gap-2" onClick={()=>{handleStartDateClick()}}>
                <label className="text-black md:text-sm md:font-normal capitalize"htmlFor="start_date">
                  Start Date<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  type="date"
                  id="start_date"
                  ref={start_date_ref}
                  placeholder="dd/mm/yy"
                  name="event_start_date"
                  onChange={(e) => { handleEventStartDateValidate(e) }}
                  defaultValue={Props.previewData?.event_start_date ? Props.previewData.event_start_date : ""}
                ></Input>
              </div>
              <div className="flex flex-col md:gap-2" onClick={()=>{handleEndDateClick()}}>
                <label className="text-black md:text-sm md:font-normal capitalize" htmlFor="end_date">
                  End Date<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  type="date"
                  id="end_date"
                  ref={end_date_ref}
                  placeholder="dd/mm/yy"
                  name="event_end_date"
                  onChange={(e) => { handleEventEndDateValidate(e) }}
                  defaultValue={Props.previewData?.event_end_date ? Props.previewData.event_end_date : ""}
                ></Input>
              </div>
              <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                  Annual Plan<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  placeholder="Type Here"
                  name="annual_plan"
                  onChange={(e) => { handlefieldChange(e) }}
                  defaultValue={Props.previewData?.annual_plan ? Props.previewData.annual_plan : ""}
                ></Input>
              </div>
            </div>
          </div>
        </>

      }

      {(engagementTypes == "Royalty Agreement" || engagementTypes == "Product development And Royalty Agreement" || engagementTypes == "Product Development Agreement" || engagementTypes == "Product feedback Agreement" || Props.previewData?.type_of_engagement == "Royalty Agreement" || Props.previewData?.type_of_engagement == "Product development And Royalty Agreement" || Props.previewData?.type_of_engagement == "Product Development Agreement" || Props.previewData?.type_of_engagement == "Product feedback Agreement") &&
        <>
          <div className="py-8">
            <h1 className="text-black text-2xl font-normal uppercase pb-8">
              Sub Type Details
            </h1>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="flex flex-col md:gap-2"onClick={()=>handleStartDateClick()}>
                <label className="text-black md:text-sm md:font-normal capitalize" htmlFor="start_date">
                  Start Date<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  type="date"
                  id="start_date"
                  ref={start_date_ref}
                  placeholder="dd/mm/yy"
                  name="event_start_date"
                  onChange={(e) => { handleEventStartDateValidate(e) }}
                  defaultValue={Props.previewData?.event_start_date ? Props.previewData?.event_start_date : ""}
                ></Input>
              </div>
              <div className="flex flex-col md:gap-2" onClick={()=>handleEndDateClick()}>
                <label className="text-black md:text-sm md:font-normal capitalize"htmlFor="end_date">
                  End Date<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  type="date"
                  id="end_date"
                  ref={end_date_ref}
                  placeholder="dd/mm/yy"
                  name="event_end_date"
                  onChange={(e) => { handleEventEndDateValidate(e) }}
                  defaultValue={Props.previewData?.event_end_date ? Props.previewData.event_end_date : ""}
                ></Input>
              </div>
              <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                  Product Details<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl md:py-5"
                  placeholder="Type Here"
                  name="product_details"
                  onChange={(e) => { handlefieldChange(e) }}
                  defaultValue={Props.previewData?.product_details ? Props.previewData.product_details : ""}
                ></Input>
              </div>
            </div>
          </div>
        </>

      }


      <div className="flex justify-end pt-5 gap-4">
        {/* <Button className="bg-white text-black border text-md font-normal">
          {" "}
          Save as Draft
        </Button> */}
        <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={(e) => handleSubmit(e)}>Next</Button>
      </div>
    </div>
    <Toaster richColors position="bottom-right" /> 
    </>
  );
};

export default Form1;
