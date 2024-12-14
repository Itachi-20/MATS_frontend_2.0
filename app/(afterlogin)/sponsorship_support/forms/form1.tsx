'use client'
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
import { useRouter } from "next/navigation";
import { Previewdata } from '@/app/(afterlogin)/monetary_grant/page'
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
  currency: {
    name: string
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
    name: string,
    city: string
  }[]
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
  sponsor_currency: string
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
  dropdownData: dropdownData | null;
  previewData: Previewdata | null;
  eventCostCenter: eventCostCenter | null;
  refno: string;
}


const Form1 = ({ ...Props }: Props) => {
  const { role, name, userid, clearAuthData } = useAuth();
  const [businessUnit, setBusinessUnit] = useState(Props.previewData?.business_unit ?? "");
  const [budget, setBudget] = useState(Props.previewData?.division_category ? Props.previewData.division_category : "");
  const [eventCostCenter, setEventCostCenter] =
    useState<eventCostCenter | null>(null);
  const [subtypeActivity, setSubtypeActivity] =
    useState<subtypeActivity | null>(null);
  const [subtypeActivityVisible, setSubtypeActivityVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>();
  const [refNo, setRefNo] = useState<string | null>(Props.refno ?? "");
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const [citydropdown, setCityDropdown] = useState<cityDropdown | null>()
  const [reportingHeadDropdown, setReportingHeadDropdown] = useState<reportingHeadDropdown | null>(null)
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData

    };
    updatedFormData.event_type = "Sponsorship Support"
    if (refNo) {
      updatedFormData.name = refNo;
    }

    try {
      const response = await fetch(
        "/api/monetary_grant/handleSubmit",
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
        setRefNo(data.message);
        router.push(`/sponsorship_support?forms=2&refno=${data.message}`);

      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };

  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }) as FormData);
  }
  const handleSelectChange = (value: string, name: string) => {
    if (name == "business_unit") { setBusinessUnit(value) };
    if (name == "division_category") { setBudget(value) };
    setFormData((prev) => ({ ...prev, [name]: value }) as FormData);
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

      if (response.ok) {
        const data = await response.json();
        setSubtypeActivity(data.data);
        return data.data;
      } else {
        console.log("Response not Ok at budget change");
      }
    } catch (error) {
      console.error("Error during budget change:", error);
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
        return data.data
      } else {
        console.log("Response not okay business unit change");
      }
    } catch (error) {
      console.error("Error during business unit change:", error);
    }
  };

  useEffect(() => {
    handleBudgetChange(budget);
  }, [])

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
    // </div>
    (
      <div>
        <h1 className="text-black text-2xl font-normal uppercase pb-8">
          Basic Detail
        </h1>
        <div className="grid grid-cols-2 gap-6 pb-8">
          <div className="flex flex-col gap-2">
            <label className="lable">
              Company Name <span className="text-[#e60000]">*</span>
            </label>
            <Select
              defaultValue={Props.previewData?.company ?? ""}
              onValueChange={(value) => handleSelectChange(value, "company")}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {Props.dropdownData &&
                  Props.dropdownData.company ?
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
            <Select
              defaultValue={Props.previewData?.business_unit ?? ""}
              onValueChange={(value) => { handleBusinessUnitChange(value); handleSelectChange(value, "business_unit"); }}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {Props.dropdownData &&
                  Props.dropdownData.division ?
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
              defaultValue={Props.previewData?.event_requestor ?Props.previewData.event_requestor:userid as string}
              onValueChange={(value) => handleSelectChange(value, "event_requestor")}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {Props.dropdownData &&
                  Props.dropdownData.requestor ?
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
              disabled={(formData?.business_unit || Props.previewData?.business_unit) ? false : true}
              defaultValue={Props.previewData?.event_cost_center ?? ""}
              onValueChange={(value) => handleSelectChange(value, "event_cost_center")}
              required
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {
                  eventCostCenter ? eventCostCenter.cost_center.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.cost_center_description}
                      </SelectItem>
                    );
                  }) : Props.eventCostCenter ? Props.eventCostCenter.cost_center.map((item, index) => {
                    return (
                      <SelectItem value={item.name}>
                        {item.cost_center_description}
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
              Budget<span className="text-[#e60000]">*</span>
            </label>
            <Select
              defaultValue={Props.previewData?.division_category ?? ""}
              onValueChange={(value) => { handleBudgetChange(value), handleSelectChange(value, "division_category"); }}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {eventCostCenter ? eventCostCenter.division_category.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.category}
                    </SelectItem>
                  );
                }) : Props.eventCostCenter ? Props.eventCostCenter.division_category.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.category}
                    </SelectItem>
                  )
                }) :
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
                defaultValue={Props.previewData?.division_sub_category ?? ""}
                onValueChange={(value) => { handleSelectChange(value, "division_sub_category") }}
              >
                <SelectTrigger className="dropdown">
                  <SelectValue placeholder="Select" />
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
              State<span className="text-[#e60000]">*</span>
            </label>
            <Select
              defaultValue={Props.previewData?.state ?? ""}
              onValueChange={(value) => { handleSelectChange(value, "state");handleStateChange(value) }}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {
                  Props.dropdownData &&
                    Props.dropdownData.state ?
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
            City<span className="text-[#e60000]">*</span>
          </label>
          <Select
            defaultValue={Props.previewData?.city ?? ""}
            onValueChange={(value) => { handleSelectChange(value, "city") }} disabled={(formData?.state || Props.previewData?.state) ? false : true}>
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
              defaultValue={Props.previewData?.therapy ?? ""}
              onValueChange={(value) => { handleSelectChange(value, "therapy") }}
              disabled={(formData?.business_unit || Props.previewData?.business_unit) ? false : true}
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
                  );
                }) : Props.eventCostCenter ? Props.eventCostCenter.therapy.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.therapy}
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

          <div>
            <label className="lable">
              Sub Type Of Activity<span className="text-[#e60000]">*</span>
            </label>
            <Select
              defaultValue={Props.previewData?.sub_type_of_activity ?? ""}
              onValueChange={(value) => { handleSelectChange(value, "sub_type_of_activity") }}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sponsorship Support for Scientific Conferences">
                  {"Sponsorship Support for Scientific Conferences"}
                </SelectItem>
                {/* <SelectItem value="Mix Event">
                  {"Mix Event"}
                </SelectItem>
                <SelectItem value="Marketing Event">
                  {"Marketing Event"}
                </SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-2">
            <label className="lable">
            Selection Criteria For Faculty<span className="text-[#e60000]">*</span>
            </label>
            <textarea
              defaultValue={Props.previewData?.faculty ?? ""}
              className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2'
              placeholder="Type Here"
              name="faculty"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="lable">
            Selection Criteria For Participant<span className="text-[#e60000]">*</span>
            </label>
            <textarea
              defaultValue={Props.previewData?.participants ?? ""}
              className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2'
              placeholder="Type Here"
              name="participants"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
            />
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
              {/* <Input
                className="text-black shadow md:rounded-xl md:py-5"
                placeholder="Type Here"
                name="organizer_name"
                onChange={(e) => handlefieldChange(e)}
                defaultValue={Props.previewData?.organizer_name ? Props.previewData.organizer_name : ""}
              ></Input> */}
              <textarea
              defaultValue={Props.previewData?.organizer_name ? Props.previewData.organizer_name : ""}
              className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2'
              placeholder="Type Here"
              name="organizer_name"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
            />
            </div>
            <div className="flex flex-col md:gap-2">
              {/* <label className="text-black md:text-sm md:font-normal capitalize">
                Sponsorship Amount<span className="text-[#e60000]">*</span>
              </label>
              <Input

                className="text-black shadow md:rounded-xl md:py-5"
                placeholder="Type Here"
                type="number"
                name="sponsorship_amount"
                onChange={(e) => handlefieldChange(e)}
                defaultValue={Props.previewData?.sponsorship_amount ? Props.previewData.sponsorship_amount : ""}
              ></Input> */}
              <label className="text-black md:text-sm md:font-normal capitalize">
                Entitlement in Lieu of sponsorship<span className="text-[#e60000]">*</span>
              </label>
              {/* <Input
                className="text-black shadow md:rounded-xl md:py-5"
                placeholder="Type Here"
                name="entitlement_in_lieu_of_sponsorship"
                onChange={(e) => handlefieldChange(e)}
                defaultValue={Props.previewData?.entitlement_in_lieu_of_sponsorship ? Props.previewData.entitlement_in_lieu_of_sponsorship : ""}
              ></Input> */}
              <textarea
              defaultValue={Props.previewData?.entitlement_in_lieu_of_sponsorship ? Props.previewData.entitlement_in_lieu_of_sponsorship : ""}
              className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2'
              placeholder="Type Here"
              name="entitlement_in_lieu_of_sponsorship"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
            />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-black md:text-sm md:font-normal capitalize">
                Sponsorship Amount<span className="text-[#e60000]">*</span>
              </label>
              <Input

                className="text-black shadow md:rounded-xl md:py-5"
                placeholder="Type Here"
                type="number"
                name="sponsorship_amount"
                onChange={(e) => handlefieldChange(e)}
                defaultValue={Props.previewData?.sponsorship_amount ? Props.previewData.sponsorship_amount : ""}
              ></Input>
            </div>
            <div className="flex flex-col md:gap-2">
            <label className="lable">
                Currency<span className="text-[#e60000]">*</span>
              </label>
              <Select
                onValueChange={(value) => { handleSelectChange(value, "sponsor_currency") }}
                defaultValue={Props.previewData?.sponsor_currency ? Props.previewData.sponsor_currency : "INR"}
              >
                <SelectTrigger className="dropdown">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {
                    Props.dropdownData && Props.dropdownData?.currency.map((item, index) => {
                      return (
                        <SelectItem value={item.name}>{item.name}</SelectItem>
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
                onChange={(e) => handlefieldChange(e)}
                defaultValue={Props.previewData?.comment_if_any ? Props.previewData.comment_if_any : ""}
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
                onChange={(e) => handlefieldChange(e)}
                defaultValue={Props.previewData?.any_additional_expense ? Props.previewData.any_additional_expense : ""}
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

      </div>)
  );
};

export default Form1;
