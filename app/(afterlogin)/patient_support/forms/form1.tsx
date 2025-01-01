"use client"
import React, { useState, useEffect } from "react";
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
import { Previewdata } from '@/app/(afterlogin)/patient_support/page'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import IsReportingHeadDialog from "@/components/isReportingHeadDialog";

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
  product_amount: number
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
}
type FormErrors = {
  sub_type_of_activity?: string;
  event_cost_center?: string;
  product_amount?: string;
}

const Form1 = ({ ...Props }: Props) => {
  const { role, name, userid, clearAuthData } = useAuth();
  const router = useRouter();
  const [businessUnit, setBusinessUnit] = useState(Props.previewData?.business_unit);
  const [budget, setBudget] = useState(Props.previewData?.division_category);
  const [eventCostCenter, setEventCostCenter] =
    useState<eventCostCenter | null>(null);
  const [subtypeActivity, setSubtypeActivity] =
    useState<subtypeActivity | null>(null);
  const [subtypeActivityVisible, setSubtypeActivityVisible] = useState(false);
  const [formdata, setFormData] = useState<FormData>();
  const [errors, setErrors] = useState<FormErrors>();
  const [refNo, setRefNo] = useState<string | null>(Props.refno);
  const [citydropdown, setCityDropdown] = useState<cityDropdown | null>()
  const [reportingHeadDropdown, setReportingHeadDropdown] = useState<reportingHeadDropdown | null>(null)
  const [loading, setLoading] = useState(true);
  const [isReportingHeadDialog, setIsReportingHeadDialog] = useState(false);

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }) as FormData);
  };
  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }) as FormData);
  };
  const validateAtSubmit = () => {
    const errors: FormErrors = {};
    console.log("Checking Formdata value", formdata?.sub_type_of_activity);
    if ((Props.previewData?.sub_type_of_activity ? (formdata && ("sub_type_of_activity" in formdata && formdata.sub_type_of_activity == '')) : !formdata?.sub_type_of_activity)) errors.sub_type_of_activity = "Sub Type Of Activity is required";
    if ((Props.previewData?.event_cost_center ? (formdata && ("event_cost_center" in formdata && formdata.event_cost_center == '')) : !formdata?.event_cost_center)) errors.event_cost_center = "Event Cost Center is required";
    if ((Props.previewData?.product_amount ? (formdata && ("product_amount" in formdata && !formdata.product_amount)) : !formdata?.product_amount)) errors.product_amount = "Product Amount is required";
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
      ...formdata

    };

    updatedFormData.event_type = "Patient Support"
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
        router.push(`/patient_support?forms=2&refno=${data.message}`);

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

      if (response.status == 500) {
        setIsReportingHeadDialog(true);
      }

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
    // Check if all values are present
    if (formdata?.event_requestor && formdata?.business_unit && formdata?.state) {
      console.log("inside use effect reporting head");
      handleReportingChange();
    }
  }, [formdata?.event_requestor, formdata?.business_unit, formdata?.division_category, formdata?.division_sub_category, formdata?.state]);

  console.log("Formdata", formdata);

  if (loading) {
    return <div>Loading Please Wait</div>;
  }

  const handleIsReportingDialog = ()=>{
    setIsReportingHeadDialog(prev => !prev);
  }
  return (
    // </div>
    (<div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Basic Detail
      </h1>
      <div className="grid grid-cols-2 gap-6 pb-8">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Company Names
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
        <div className="flex flex-col gap-2">
          <label className={`lable ${(errors?.event_cost_center && !formdata?.event_cost_center) ? `text-red-600` : `text-black`}`}>
            event cost center<span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value) => handleSelectChange(value, "event_cost_center")}
            defaultValue={Props.previewData?.event_cost_center ? Props.previewData.event_cost_center : ""}
          >
            <SelectTrigger className={`dropdown ${(errors?.event_cost_center && !formdata?.event_cost_center) ? `border border-red-600` : ``}`}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Props.eventCostCenter ?
                Props.eventCostCenter.cost_center.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.cost_center_description}
                    </SelectItem>
                  );
                }) : eventCostCenter ? eventCostCenter.cost_center.map((item, index) => {
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
            (errors?.event_cost_center && !formdata?.event_cost_center) &&
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
              Budget Sub Type
            </label>
            <Select
              onValueChange={(value) => { handleSelectChange(value, "division_sub_category") }}
              defaultValue={Props.previewData?.division_sub_category ? Props.previewData.division_sub_category : ""}
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
          <label className="lable">
            State
          </label>
          <Select
            onValueChange={(value) => { handleSelectChange(value, "state"); handleStateChange(value) }}
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
            City
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
          <label className={`lable ${(errors?.sub_type_of_activity && !formdata?.sub_type_of_activity) ? `text-red-600` : `text-black`}`}>
            Sub Type Of Activity <span className={"text-[#e60000]"}>*</span>
          </label>
          <Select
            onValueChange={(value) => { handleSelectChange(value, "sub_type_of_activity") }}
            defaultValue={Props.previewData?.sub_type_of_activity ? Props.previewData.sub_type_of_activity : ""}
          >
            <SelectTrigger className={`dropdown ${(errors?.sub_type_of_activity && !formdata?.sub_type_of_activity) ? `border border-red-600` : ``}`}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Product Donation for Patient">
                {"Product Donation for Patient"}
              </SelectItem>
              <SelectItem value="Financial Support to Poor Patient">
                {"Financial Support to Poor Patient"}
              </SelectItem>
            </SelectContent>
          </Select>
          {
            errors && 
            (errors?.sub_type_of_activity && !formdata?.sub_type_of_activity) && 
              (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.sub_type_of_activity}
              </p>
              )
          }
        </div>
      </div>
      <div className="py-8">
        <h1 className="text-black text-2xl font-normal uppercase pb-8">
          Beneficiary Detail
        </h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="flex flex-col md:gap-2">
          <label className={`lable ${(errors?.product_amount && !formdata?.product_amount) ? `text-red-600` : `text-black`}`}>
              Product Amount<span className="text-[#e60000]">*</span>
            </label>
            <Input 
              type='number' 
              className={`${(errors?.product_amount && !formdata?.product_amount) ? `border border-red-600` : ``} text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2`} 
              placeholder="Type Here"
              name="product_amount"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handlefieldChange(e) }}
              defaultValue={Props.previewData?.product_amount ? Props.previewData.product_amount : ""}
            ></Input>
            {
            errors && 
            (errors?.product_amount && !formdata?.product_amount) && 
              (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.product_amount}
              </p>
              )
            }
          </div>
          <div className="flex flex-col md:gap-2">
            <label className="text-black md:text-sm md:font-normal capitalize">
              Quantity
            </label>
            <Input type='number' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              placeholder="Type Here"
              name="quantity"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handlefieldChange(e) }}
              defaultValue={Props.previewData?.quantity ? Props.previewData.quantity : ""}
            ></Input>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-5 gap-4">
        {/* <Button className="bg-white text-black border text-md font-normal">
          {" "}
          Save as Draft
        </Button> */}
        <Button
          className="bg-[#4430bf] text-white text-md font-normal border"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
        >
          Next
        </Button>
      </div>
      {formdata?.state  && isReportingHeadDialog && (
        <IsReportingHeadDialog
        handleIsReportingDialog = {handleIsReportingDialog}
        />
      )}
    </div>)
  );
};

export default Form1;
