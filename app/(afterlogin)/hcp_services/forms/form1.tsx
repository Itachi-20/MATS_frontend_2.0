"use client"
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Previewdata } from '@/app/(afterlogin)/hcp_services/page';
import { Toaster, toast } from 'sonner';
import IsReportingHeadDialog from "@/components/isReportingHeadDialog";
import CityDropdwon from '@/components/training_and_education/search_city'
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
  }[],
  currency: {
    name: string
  }[],
  engagement_type: {
    name: string
    engagement_type: string
  }[],
  training_ref_no: {
    name: string
  }[],
  sponsorship_ref_no: {
    name: string
  }[],
  event_division:{
    name:string;
    event_division:string;
  }[];
};
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
  no_of_hcp: number,
  type_of_engagement: string,
  training_ref_no:string,
  product_details:string,
  annual_plan: number,
  service_type: string,
  sponsorship_ref_no: string,
  reporting_head: string,
  event_division:string
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
  event_division: {
    name: string;
    event_division: string;
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
type CityDropdown = {
  name: string;
  city: string
}
type stateDropdown = {
  name: string;
  state: string;
}[];

type Props = {
  cityDropdown: CityDropdown[];
  cityDropdownData: CityDropdown[];
  ReportingHeadDropdown: reportingHeadDropdown | null
  dropdownData: dropdownData | null;
  previewData: Previewdata | null;
  eventCostCenter: eventCostCenter | null;
  refno: string;
  subtypeActivity: subtypeActivity | null;
};
type FormErrors = {
  type_of_engagement?: string;
  event_cost_center?: string;
  product_details?: string;
  event_end_date?: string;
  event_start_date?: string;
  annual_plan?: string;
  service_type?: string;
  event_venue?: string;
  event_name?: string;
  // sponsorship_ref_no: string;
  training_ref_no: string;
  state?: string;
  reporting_head?: string;
  division_category?:string;
  event_division?:string
}

const Form1 = ({ ...Props }: Props) => {
  const router = useRouter();
  const [businessUnit, setBusinessUnit] = useState(Props.previewData?.business_unit);
  const [errors, setErrors] = useState<Partial<FormErrors>>();
  const [budget, setBudget] = useState(Props.previewData?.division_category);
  const [eventCostCenter, setEventCostCenter] =
    useState<eventCostCenter | null>(null);
  const [subtypeActivity, setSubtypeActivity] =
    useState<subtypeActivity | null>(null);
  const [subtypeActivityVisible, setSubtypeActivityVisible] = useState(false);
  const [engagementTypes, setEngagementTypes] = useState("");
  const [formdata, setFormData] = useState<FormData>(Props.previewData as FormData?? '');
  const [refNo, setRefNo] = useState<string | null>(Props.refno);
  const [eventStartDate, setEventStartDate] = useState<any>(Props.previewData?.event_start_date ? new Date(Props.previewData?.event_start_date).getTime() : "");
  const [reportingHeadDropdown, setReportingHeadDropdown] = useState<reportingHeadDropdown | null>(null)
  const [loading, setLoading] = useState(true);
  const { role, name, userid, clearAuthData } = useAuth();
  const start_date_ref: React.RefObject<any> = useRef(null);
  const end_date_ref: React.RefObject<any> = useRef(null);
  const [isReportingHeadDialog, setIsReportingHeadDialog] = useState(false);
  const [citydropdown, setCityDropdown] = useState<CityDropdown[]>(Props.cityDropdown);
  const [statedropdown, setStateDropdown] = useState<stateDropdown>();
  const [city, setCity] = useState(Props.previewData?.city);
  const validateAtSubmit = () => {
    const errors: Partial<FormErrors> = {};
    console.log("Checking Formdata value", formdata?.type_of_engagement);
    if ((Props.previewData?.type_of_engagement ? (formdata && ("type_of_engagement" in formdata && formdata.type_of_engagement == '')) : (!formdata?.type_of_engagement))) errors.type_of_engagement = "Type of engagement is required";
    if ((Props.previewData?.event_cost_center ? (formdata && ("event_cost_center" in formdata && formdata.event_cost_center == '')) : (!formdata?.event_cost_center))) errors.event_cost_center = "Event Cost Center is required";
    if ((Props.previewData?.product_details ? (formdata && ("product_details" in formdata && formdata.product_details == '')) : (((formdata?.type_of_engagement == "Royalty Agreement")||(formdata?.type_of_engagement == "Product feedback Agreement")||(formdata?.type_of_engagement == "Product Development Agreement")||(formdata?.type_of_engagement == "Product development And Royalty Agreement")) && (!formdata?.product_details)))) errors.product_details = "Product Details required";
    if ((Props.previewData?.event_start_date ? (formdata && ("event_start_date" in formdata && formdata.event_start_date == '')) : (!formdata?.event_start_date))) errors.event_start_date = "Event Start Date is required";
    if ((Props.previewData?.event_end_date ? (formdata && ("event_end_date" in formdata && formdata.event_end_date == '')) : (!formdata?.event_end_date))) errors.event_end_date = "Event End Date is required";
    if ((Props.previewData?.annual_plan ? (formdata && ("annual_plan" in formdata && formdata.annual_plan)) : (((formdata?.type_of_engagement == "MSA") || (formdata?.type_of_engagement == "Scientific Advisory Consultancy Agreement")) && (!formdata?.annual_plan)))) errors.annual_plan = "Annual Plan is required";
    if ((Props.previewData?.service_type ? (formdata && ("service_type" in formdata && formdata.service_type == '')) : ((formdata?.type_of_engagement == "MSA") && (!formdata?.service_type)))) errors.service_type = "Service Type is required";
    // if ((Props.previewData?.sponsorship_ref_no ? (formdata && ("sponsorship_ref_no" in formdata && formdata.sponsorship_ref_no == '')) : ((formdata?.type_of_engagement == "One Time") && (!formdata?.sponsorship_ref_no)))) errors.sponsorship_ref_no = "Sponsorship Reference Number is required";
    if ((Props.previewData?.training_ref_no ? (formdata && ("training_ref_no" in formdata && formdata.training_ref_no == '')) : ((formdata?.type_of_engagement == "One Time") && (!formdata?.training_ref_no)))) errors.training_ref_no = "Training Reference Number is required";
    if ((Props.previewData?.event_venue ? (formdata && ("event_venue" in formdata && formdata.event_venue == '')) : ((formdata?.type_of_engagement == "One Time") && (!formdata?.event_venue)))) errors.event_venue = "Event Venue is required";
    if ((Props.previewData?.event_name ? (formdata && ("event_name" in formdata && formdata.event_name == '')) : ((formdata?.type_of_engagement == "One Time") && (!formdata?.event_name)))) errors.event_name = "Event Name is required";
    if (Props.previewData?.state ? formdata && "state" in formdata && formdata.state == "" : !formdata?.state) errors.state = "State is required";
    if (Props.previewData?.reporting_head ? formdata && "reporting_head" in formdata && formdata.reporting_head == "" : !formdata?.reporting_head) errors.reporting_head = "Reporting Head is required";
    if (Props.previewData?.division_category ? formdata && "division_category" in formdata && formdata.division_category == "" : !formdata?.division_category) errors.division_category = "Budget is required";
    if((Props.previewData?.business_unit == "Orthopedics" || formdata?.business_unit == "Orthopedics")){
      if ( 
        Props.previewData?.event_division
        ? formdata &&
        "event_division" in formdata &&
        formdata.event_division == ""
        : !formdata?.event_division
      )
      errors.event_division = "event_division is required";
    }
    return errors;
  };
  const handleFieldValues = () => {
    setFormData((prevData) => ({
      ...prevData,
      event_name: "",
      event_venue: "",
      training_ref_no: "",
      sponsorship_ref_no: "",
      service_type: "",
      annual_plan: 0,
      event_end_date: "",
      event_start_date: "",
      product_details: "",
    })as FormData);
  };
  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }) as FormData);
  };
  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }) as FormData);
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
      ...formdata

    };
    if(updatedFormData?.training_ref_no == "NA"){
      updatedFormData.training_ref_no = "";
    }
    if(updatedFormData?.business_unit != "Orthopedics"){
      updatedFormData.event_division = "";
    }
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
    setFormData((prevState) => ({
      ...prevState,
      state: '',
      reporting_head: '',
      division_sub_category: '',
      division_category: '',
      event_cost_center: '',
      event_division: ''
    }) as FormData);
    setCity("")
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
    if (eventStartDate && e.target.valueAsNumber < eventStartDate) {
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
  useEffect(() => {
    setFormData({ ...formdata, name: refNo } as FormData)
  }, [refNo])

  useEffect(() => {
    if (userid !== undefined) {
      setLoading(false);
      if (Props?.previewData?.event_requestor) {
        handleSelectChange(Props.previewData.event_requestor, "event_requestor")
      } else {
        handleSelectChange(userid as string, "event_requestor")
      }
    }
  }, [userid]);

  useEffect(() => {
    if (formdata?.event_requestor && formdata?.business_unit && formdata?.state) {
      handleReportingChange();
    }
  }, [formdata?.event_requestor, formdata?.business_unit, formdata?.division_category, formdata?.division_sub_category, formdata?.state]);
    const handleCityChange = async (city: string) => {
      // setFormData((prev) => ({ ...prev, reporting_head: '' } as FormDataType));
      try {
        const response = await fetch("/api/stateDropdown", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city: city,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.message.length == 1) {
            setFormData((prev) => ({ ...prev, state: data.message[0].name } as FormData));
          }
          setStateDropdown(data.message);
          return data.data;
        } else {
          console.log("Response not okay  state change");
        }
      } catch (error) {
        console.error("Error during state  change:", error);
      }
    };
  
    const handleLoadCity = async (city_name: string, page_length: number, page_no: number) => {
      try {
        const response = await fetch("/api/loadCityDropdown", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city_name: city_name,
            page_length: page_length,
            page_no: page_no,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setCityDropdown(data.data);
          return data.data;
        } else {
          console.log("Response not okay  state change");
        }
      } catch (error) {
        console.error("Error during state  change:", error);
      }
    };
  
    useEffect(() => {
      console.log(city, 'city')
      if (city) {
        setFormData((prev) => ({ ...prev, city: city } as FormData));
        handleCityChange(city)
      }
    }, [city]);
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
  
        if (response.status == 500) {
          setIsReportingHeadDialog(true);
        }
  
        if (response.ok) {
          const data = await response.json();
          setReportingHeadDropdown(data.data);
          if (data.data.length == 1) {
            setFormData((prev) => ({ ...prev, reporting_head: data.data[0].reporting } as FormData));
          }
          return data.data;
        } else {
          console.log("Response not Ok at Reporting change");
        }
      } catch (error) {
        console.error("Error during Reporting change:", error);
      }
    };
  
  if (loading) {
    return <div>Loading Please Wait</div>;
  }

  const handleIsReportingDialog = () => {
    setIsReportingHeadDialog(prev => !prev);
  }
  const clearCity = () => {
    console.log('inside claer city')
    setCity('');
    setFormData((prev) => ({ ...prev, reporting_head: '' }) as FormData);
    setFormData((prev) => ({ ...prev, state: '' }) as FormData);
  };
  console.log(formdata,"----------------")
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
              Company Name
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
              Business Unit
            </label>
            <Select onValueChange={(value) => { handleBusinessUnitChange(value); handleSelectChange(value, "business_unit"); setBusinessUnit(value) }}
              // defaultValue={Props.previewData?.business_unit ? Props.previewData.business_unit : ""}
              value={formdata?.business_unit ? formdata?.business_unit : Props.previewData?.business_unit ?? ''}
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
              Event requester
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

        {
          formdata.business_unit == "Orthopedics" &&
          (
          <div className="flex flex-col gap-2">
            <label className="lable">
              Event Division
            </label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "event_division")}
              defaultValue={Props.previewData?.event_division ? Props.previewData.event_division : userid as string}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {
                  eventCostCenter ? (
                    eventCostCenter.event_division.map((item, index) => {
                      return (
                        <SelectItem value={item.name}>
                          {item.event_division}
                        </SelectItem>
                      );
                    })
                  )
                :
                Props.eventCostCenter && Props.eventCostCenter.event_division ?
                  Props.eventCostCenter.event_division.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.event_division}
                      </SelectItem>
                    );
                  })
                  :
                  <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
                }
              </SelectContent>
            </Select>
            {errors &&
            errors?.event_division &&
            !formdata?.event_division && (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.event_division}
              </p>
            )}
          </div>
          )
        }

          <div className="flex flex-col gap-2">
            <label className="lable">
              event cost center<span className="text-[#e60000]">*</span>
            </label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "event_cost_center")}
              // defaultValue={Props.previewData?.event_cost_center ? Props.previewData.event_cost_center : ""}
              value={formdata?.event_cost_center ? formdata?.event_cost_center : Props.previewData?.event_cost_center ?? ''}
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
                }) : Props.eventCostCenter && Props.eventCostCenter.cost_center.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.cost_center_description}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {
              errors &&
              (errors?.event_cost_center && !formdata?.event_cost_center) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.event_cost_center}
                </p>
              )
            }
          </div>
          <div className="flex flex-col gap-2">
            <label className={`lable ${errors?.division_category && !formdata?.division_category
              ? `text-red-600`
              : `text-black`
              }`}
>
              Budget<span className={"text-[#e60000]"}>*</span>
            </label>
            <Select onValueChange={(value) => { handleBudgetChange(value), handleSelectChange(value, "division_category"); setBudget(value) }}
              // defaultValue={Props.previewData?.division_category ? Props.previewData.division_category : ""}
              value={formdata?.division_category ? formdata?.division_category : Props.previewData?.division_category ?? ''}
              >
              <SelectTrigger className={`dropdown ${errors?.division_category && !formdata?.division_category ? `border border-red-600` : ``}`}>
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
            {errors && errors?.division_category && !formdata?.division_category && (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.division_category}
              </p>
            )}
          </div>
          {
            (businessUnit == "Endosurgery" && budget == "National") &&
            <div className="flex flex-col gap-2">
              <label className="lable">
                Budget Sub Type
              </label>
              <Select
                onValueChange={(value) => { handleSelectChange(value, "division_sub_category") }}
                // defaultValue={Props.previewData?.division_sub_category ? Props.previewData.division_sub_category : ""}
                value={formdata?.division_sub_category ? formdata?.division_sub_category : Props.previewData?.division_sub_category ?? ''}
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
                    }) : Props.subtypeActivity && Props.subtypeActivity.map((item, index) => {
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
            <label className="lable">City</label>
            <CityDropdwon setCity={setCity} city={city} citydropdown={citydropdown} handleCityChange={handleLoadCity} clearCity={clearCity} />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className={`label ${errors?.state && !formdata?.state ? `text-red-600` : `text-black`
                }`}
            >
              State<span className={"text-[#e60000]"}>*</span>
            </label>
            <Select
              value={formdata?.state ? formdata?.state : Props.previewData?.state ?? ''}
              // value={formData?.state ? formData?.state : (Props.previewData?.state ? Props.previewData?.state : (statedropdown?.length === 1 ? statedropdown[0].name : '')) }
              onValueChange={(value) => {
                handleSelectChange(value, "state");
              }}
            >
              <SelectTrigger
                className={`dropdown ${errors?.state && !formdata?.state ? `border border-red-600` : ``
                  }`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {statedropdown && statedropdown.length > 0 ? (
                  statedropdown.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.state}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value={"null"} disabled>
                    No Data Yet
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors && errors?.state && !formdata?.state && (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.state}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className={`label ${errors?.reporting_head && !formdata?.reporting_head ? `text-red-600` : `text-black`
              }`}>
              Reporting Head<span className={"text-[#e60000]"}>*</span>
            </label>
            <Select
              // defaultValue={Props.previewData?.reporting_head ?? ""}
              value={formdata?.reporting_head ? formdata?.reporting_head : Props.previewData?.reporting_head ?? ''}
              onValueChange={(value) => { handleSelectChange(value, "reporting_head") }}
            >
              <SelectTrigger className={`dropdown ${errors?.reporting_head && !formdata?.reporting_head ? `border border-red-600` : ``
                }`}>
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
            {errors && errors?.reporting_head && !formdata?.reporting_head && (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.reporting_head}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="lable">
              Therapy
            </label>
            <Select
              onValueChange={(value) => { handleSelectChange(value, "therapy") }}
              defaultValue={Props.previewData?.therapy ? Props.previewData.therapy : ""}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {eventCostCenter ? eventCostCenter.therapy.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.therapy}
                    </SelectItem>
                  )
                }) : Props.eventCostCenter && Props.eventCostCenter.therapy.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.therapy}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="lable">
              Type Of Engagement<span className="text-[#e60000]">*</span>
            </label>
            <Select
              onValueChange={(value) => { handleSelectChange(value, "type_of_engagement"); setEngagementTypes(value); handleFieldValues();}}
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
            {
              errors &&
              (errors?.type_of_engagement && !formdata?.type_of_engagement) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.type_of_engagement}
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
            <textarea className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2' placeholder='Type Here'
              name="faculty"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
              defaultValue={Props.previewData?.faculty ? Props.previewData.faculty : ""}
            />
          </div>
        </div>

        {(engagementTypes ? (engagementTypes == "One Time"):(engagementTypes == "One Time" || Props.previewData?.type_of_engagement == "One Time")) &&
          <>
            <div className="py-8">
              <h1 className="text-black text-2xl font-normal uppercase pb-8">
                Sub Type Details
              </h1>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="flex flex-col md:gap-2" onClick={() => handleStartDateClick()}>
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
                  {
                    errors &&
                    (errors?.event_start_date && !formdata?.event_start_date) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.event_start_date}
                      </p>
                    )
                  }
                </div>
                <div className="flex flex-col md:gap-2" onClick={() => handleEndDateClick()}>
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
                  {
                    errors &&
                    (errors?.event_end_date && !formdata?.event_end_date) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.event_end_date}
                      </p>
                    )
                  }
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
                    <SelectItem value={"NA"}>{"NA"}</SelectItem>
                      {
                        Props.dropdownData && Props.dropdownData.training_ref_no?.map((item, index) => {
                          return (
                            <SelectItem key={index} value={item.name}>{item.name}</SelectItem>
                          )
                        })
                      }
                    </SelectContent>
                  </Select>
                  {
                    errors &&
                    (errors?.training_ref_no && !formdata?.training_ref_no) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.training_ref_no}
                      </p>
                    )
                  }
                </div>
                {/* <div className="flex flex-col md:gap-2">
                  <label className="text-black md:text-sm md:font-normal capitalize">
                    Sponsorship Support Request Ref Number
                  </label>
                  <Select
                    onValueChange={(value) => { handleSelectChange(value, "sponsorship_ref_no") }}
                    defaultValue={Props.previewData?.sponsorship_ref_no ? Props.previewData.sponsorship_ref_no : ""}
                  >
                    <SelectTrigger className="dropdown">
                      <SelectValue placeholder="Select"/>
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
                  </Select> */}
                  {/* {
                    errors &&
                    (errors?.sponsorship_ref_no && !formdata?.sponsorship_ref_no) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.sponsorship_ref_no}
                      </p>
                    )
                  } */}
                {/* </div> */}
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
                  <textarea
                    className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2'
                    placeholder="Type Here"
                    name="event_name"
                    onChange={(e) => { handlefieldChange(e) }}
                    defaultValue={Props.previewData?.event_name ? Props.previewData.event_name : ""}
                  ></textarea>
                  {
                    errors &&
                    (errors?.event_name && !formdata?.event_name) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.event_name}
                      </p>
                    )
                  }
                </div>
                <div className="flex flex-col md:gap-2">
                  <label className="text-black md:text-sm md:font-normal capitalize">
                    Event Venue<span className="text-[#e60000]">*</span>
                  </label>
                  <textarea
                    className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2'
                    placeholder="Type Here"
                    name="event_venue"
                    onChange={(e) => { handlefieldChange(e) }}
                    defaultValue={Props.previewData?.event_venue ? Props.previewData.event_venue : ""}
                  ></textarea>
                  {
                    errors &&
                    (errors?.event_venue && !formdata?.event_venue) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.event_venue}
                      </p>
                    )
                  }
                </div>
              </div>
            </div>
          </>

        }


        {(engagementTypes ? (engagementTypes == "MSA"):(engagementTypes == "MSA" || Props.previewData?.type_of_engagement == "MSA")) &&
          <>
            <div className="py-8">
              <h1 className="text-black text-2xl font-normal uppercase pb-8">
                Sub Type Details
              </h1>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="flex flex-col md:gap-2" onClick={() => { handleStartDateClick() }}>
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
                  {
                    errors &&
                    (errors?.event_start_date && !formdata?.event_start_date) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.event_start_date}
                      </p>
                    )
                  }
                </div>
                <div className="flex flex-col md:gap-2" onClick={() => { handleEndDateClick() }}>
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
                  {
                    errors &&
                    (errors?.event_end_date && !formdata?.event_end_date) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.event_end_date}
                      </p>
                    )
                  }
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
                  {
                    errors &&
                    (errors?.annual_plan && !formdata?.annual_plan) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.annual_plan}
                      </p>
                    )
                  }
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
                   {
                    errors &&
                    (errors?.service_type && !formdata?.service_type) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.service_type}
                      </p>
                    )
                  }
                </div>
              </div>
            </div>
          </>

        }

        {(engagementTypes ? (engagementTypes == "Scientific Advisory Consultancy Agreement"):(engagementTypes == "Scientific Advisory Consultancy Agreement" || Props.previewData?.type_of_engagement == "Scientific Advisory Consultancy Agreement")) &&
          <>
            <div className="py-8">
              <h1 className="text-black text-2xl font-normal uppercase pb-8">
                Sub Type Details
              </h1>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="flex flex-col md:gap-2" onClick={() => { handleStartDateClick() }}>
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
                   {
                    errors &&
                    (errors?.event_start_date && !formdata?.event_start_date) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.event_start_date}
                      </p>
                    )
                  }
                </div>
                <div className="flex flex-col md:gap-2" onClick={() => { handleEndDateClick() }}>
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
                  {
                    errors &&
                    (errors?.event_end_date && !formdata?.event_end_date) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.event_end_date}
                      </p>
                    )
                  }
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
                  {
                    errors &&
                    (errors?.annual_plan && !formdata?.annual_plan) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.annual_plan}
                      </p>
                    )
                  }
                </div>
              </div>
            </div>
          </>

        }

        {(engagementTypes ? (engagementTypes == "Royalty Agreement" || engagementTypes == "Product development And Royalty Agreement" || engagementTypes == "Product Development Agreement" || engagementTypes == "Product feedback Agreement"):(engagementTypes == "Royalty Agreement" || engagementTypes == "Product development And Royalty Agreement" || engagementTypes == "Product Development Agreement" || engagementTypes == "Product feedback Agreement" || Props.previewData?.type_of_engagement == "Royalty Agreement" || Props.previewData?.type_of_engagement == "Product development And Royalty Agreement" || Props.previewData?.type_of_engagement == "Product Development Agreement" || Props.previewData?.type_of_engagement == "Product feedback Agreement")) &&
          <>
            <div className="py-8">
              <h1 className="text-black text-2xl font-normal uppercase pb-8">
                Sub Type Details
              </h1>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="flex flex-col md:gap-2" onClick={() => handleStartDateClick()}>
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
                    defaultValue={Props.previewData?.event_start_date ? Props.previewData?.event_start_date : formdata?.event_start_date}
                  ></Input>
                  {
                    errors &&
                    (errors?.event_start_date && !formdata?.event_start_date) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.event_start_date}
                      </p>
                    )
                  }
                </div>
                <div className="flex flex-col md:gap-2" onClick={() => handleEndDateClick()}>
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
                  {
                    errors &&
                    (errors?.event_end_date && !formdata?.event_end_date) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.event_end_date}
                      </p>
                    )
                  }
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
                  {
                    errors &&
                    (errors?.product_details && !formdata?.product_details) &&
                    (
                      <p className="w-full text-red-500 text-[11px] font-normal text-left">
                        {errors?.product_details}
                      </p>
                    )
                  }
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
    {formdata?.state  && isReportingHeadDialog && (
        <IsReportingHeadDialog
        handleIsReportingDialog = {handleIsReportingDialog}
        />
      )}
    </>
  );
};

export default Form1;
