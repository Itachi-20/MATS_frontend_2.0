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
import { useAuth } from "@/app/context/AuthContext";
import IsReportingHeadDialog from "@/components/isReportingHeadDialog";
import CityDropdwon from '@/components/training_and_education/search_city'
import {eventCostCenter,subtypeActivity,reportingHeadDropdown,stateDropdown,FormErrors,CityDropdown, PreviewDataType, ChildVendor, DropdownDataType} from '@/app/Types/EventData'
import Link from "next/link";

type Props = {
  cityDropdown: CityDropdown[];
  cityDropdownData: CityDropdown[];
  ReportingHeadDropdown: reportingHeadDropdown | null
  dropdownData: DropdownDataType | null;
  previewData: PreviewDataType | null;
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
  const [formData, setFormData] = useState<PreviewDataType>(Props.previewData as PreviewDataType?? '');
  const [errors, setErrors] = useState<FormErrors>();
  const [refNo, setRefNo] = useState<string | null>(Props.refno ?? "");
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const [reportingHeadDropdown, setReportingHeadDropdown] = useState<reportingHeadDropdown | null>(null)
  const [isReportingHeadDialog, setIsReportingHeadDialog] = useState(false);
  const [citydropdown, setCityDropdown] = useState<CityDropdown[]>(Props.cityDropdown);
  const [statedropdown, setStateDropdown] = useState<stateDropdown>();
  const [city, setCity] = useState(Props.previewData?.city);
  const validateAtSubmit = () => {
    const errors: FormErrors = {};
    console.log("Checking Formdata value", formData?.sub_type_of_activity);
    if ((Props.previewData?.sub_type_of_activity ? (formData && ("sub_type_of_activity" in formData && formData.sub_type_of_activity == '')) : !formData?.sub_type_of_activity)) errors.sub_type_of_activity = "Sub Type Of Activity is required";
    if ((Props.previewData?.event_cost_center ? (formData && ("event_cost_center" in formData && formData.event_cost_center == '')) : !formData?.event_cost_center)) errors.event_cost_center = "Event Cost Center is required";
    if ((Props.previewData?.organizer_name ? (formData && ("organizer_name" in formData && formData.organizer_name == '')) : !formData?.organizer_name)) errors.organizer_name = "Organizer Name is required";
    if ((Props.previewData?.entitlement_in_lieu_of_sponsorship ? (formData && ("entitlement_in_lieu_of_sponsorship" in formData && formData.entitlement_in_lieu_of_sponsorship == '')) : !formData?.entitlement_in_lieu_of_sponsorship)) errors.entitlement_in_lieu_of_sponsorship = "Entitlement in liew is sponsorship is required";
    if ((Props.previewData?.sponsorship_amount ? (formData && ("sponsorship_amount" in formData && !formData.sponsorship_amount)) : !formData?.sponsorship_amount)) errors.sponsorship_amount = "Sponsorship Amount is required";
    if ((Props.previewData?.sponsor_currency ? (formData && ("sponsor_currency" in formData && formData.sponsor_currency == 0)) : !formData?.sponsor_currency)) errors.sponsor_currency = "Currency is required";
    if (Props.previewData?.state ? formData && "state" in formData && formData.state == "" : !formData?.state) errors.state = "State is required";
    if (Props.previewData?.reporting_head ? formData && "reporting_head" in formData && formData.reporting_head == "" : !formData?.reporting_head) errors.reporting_head = "Reporting Head is required";
    if (Props.previewData?.division_category ? formData && "division_category" in formData && formData.division_category == "" : !formData?.division_category) errors.division_category = "Budget is required";
    if((Props.previewData?.business_unit == "Orthopedics" || formData?.business_unit == "Orthopedics")){
      if ( 
        Props.previewData?.event_division
        ? formData &&
        "event_division" in formData &&
        formData.event_division == ""
        : !formData?.event_division
      )
      errors.event_division = "event_division is required";
    }
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
    updatedFormData.event_type = "Sponsorship Support"
    if(updatedFormData?.business_unit != "Orthopedics"){
      updatedFormData.event_division = "";
    }
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
    setFormData(prev => ({ ...prev, [name]: value }) as PreviewDataType);
  }
  const handleSelectChange = (value: string, name: string) => {
    if (name == "business_unit") { setBusinessUnit(value) };
    if (name == "division_category") { setBudget(value) };
    setFormData((prev) => ({ ...prev, [name]: value }) as PreviewDataType);
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
    setFormData((prevState) => ({
      ...prevState,
      state: '',
      reporting_head: '',
      division_sub_category: '',
      division_category: '',
      event_cost_center: '',
      event_division:''
    }) as PreviewDataType);
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
      if (Props?.previewData?.event_requestor) {
        handleSelectChange(Props.previewData.event_requestor, "event_requestor")
      } else {
        handleSelectChange(userid as string, "event_requestor")
      }
    }
  }, [userid]);

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
          setFormData((prev) => ({ ...prev, state: data.message[0].name } as PreviewDataType));
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
      setFormData((prev) => ({ ...prev, city: city } as PreviewDataType));
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
            event_requestor: formData?.event_requestor,
            business_unit: formData?.business_unit,
            division_category: formData?.division_category,
            division_sub_category: formData?.division_category == 'National' ? formData?.division_sub_category : "",
            state: formData?.state
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
          setFormData((prev) => ({ ...prev, reporting_head: data.data[0].reporting } as PreviewDataType));
        }
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


  const handleIsReportingDialog = () => {
    setIsReportingHeadDialog(prev => !prev);
  }
  const clearCity = () => {
    console.log('inside claer city')
    setCity('');
    setFormData((prev) => ({ ...prev, reporting_head: '' }) as PreviewDataType);
    setFormData((prev) => ({ ...prev, state: '' }) as PreviewDataType);
  };
  return (
    // </div>
    (
      <div>
        <div className="flex justify-end w-full">
        <Link href={`/audit_trail/${refNo}`}>
      <Button className="border border-[#4430bf] text-[#4430bf] px-6">Audit Trail</Button>
        </Link>
    </div>
        <h1 className="text-black text-2xl font-normal uppercase pb-8">
          Basic Detail
        </h1>
        <div className="grid grid-cols-2 gap-6 pb-8">
          <div className="flex flex-col gap-2">
            <label className="lable">
              Company Name
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
              Business Unit
            </label>
            <Select
              // defaultValue={Props.previewData?.business_unit ?? ""}
              value={formData?.business_unit ? formData?.business_unit : Props.previewData?.business_unit ?? ''}
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
              Event requester
            </label>
            <Select
              defaultValue={Props.previewData?.event_requestor ? Props.previewData.event_requestor : userid as string}
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

          {
          formData.business_unit == "Orthopedics" &&
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
                ) :
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
            !formData?.event_division && (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.event_division}
              </p>
            )}
          </div>
          )
        }

          <div className="flex flex-col gap-2">
            <label className={`lable ${(errors?.event_cost_center && !formData?.event_cost_center) ? `text-red-600` : `text-black`}`}>
              event cost center<span className="text-[#e60000]">*</span>
            </label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "event_cost_center")}
              // defaultValue={Props.previewData?.event_cost_center ? Props.previewData.event_cost_center : ""}
              value={formData?.event_cost_center ? formData?.event_cost_center : Props.previewData?.event_cost_center ?? ''}
            >
              <SelectTrigger className={`dropdown ${(errors?.event_cost_center && !formData?.event_cost_center) ? `border border-red-600` : ``}`}>
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
              (errors?.event_cost_center && !formData?.event_cost_center) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.event_cost_center}
                </p>
              )
            }
          </div>
          <div className="flex flex-col gap-2">
            <label  className={`lable ${errors?.division_category && !formData?.division_category
              ? `text-red-600`
              : `text-black`
              }`}>
              Budget<span className={"text-[#e60000]"}>*</span>
            </label>
            <Select
              // defaultValue={Props.previewData?.division_category ?? ""}
              value={formData?.division_category ? formData?.division_category : Props.previewData?.division_category ?? ''}
              onValueChange={(value) => { handleBudgetChange(value), handleSelectChange(value, "division_category"); }}
            >
              <SelectTrigger  className={`dropdown ${errors?.division_category && !formData?.division_category ? `border border-red-600` : ``
                  }`}>
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
            {errors && errors?.division_category && !formData?.division_category && (
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
                // defaultValue={Props.previewData?.division_sub_category ?? ""}
                value={formData?.division_category ? formData?.division_category : Props.previewData?.division_category ?? ''}
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
            <label className="lable">City</label>
            <CityDropdwon setCity={setCity} city={city} citydropdown={citydropdown} handleCityChange={handleLoadCity} clearCity={clearCity} />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className={`label ${errors?.state && !formData?.state ? `text-red-600` : `text-black`
                }`}
            >
              State<span className={"text-[#e60000]"}>*</span>
            </label>
            <Select
              value={formData?.state ? formData?.state : Props.previewData?.state ?? ''}
              // value={formData?.state ? formData?.state : (Props.previewData?.state ? Props.previewData?.state : (statedropdown?.length === 1 ? statedropdown[0].name : '')) }
              onValueChange={(value) => {
                handleSelectChange(value, "state");
              }}
            >
              <SelectTrigger
                className={`dropdown ${errors?.state && !formData?.state ? `border border-red-600` : ``
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
            {errors && errors?.state && !formData?.state && (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.state}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label  className={`label ${errors?.reporting_head && !formData?.reporting_head ? `text-red-600` : `text-black`
                }`}>
              Reporting Head<span className={"text-[#e60000]"}>*</span>
            </label>
            <Select
              // defaultValue={Props.previewData?.reporting_head ?? ""}
              value={formData?.reporting_head ? formData?.reporting_head : Props.previewData?.reporting_head ?? ''}
              onValueChange={(value) => { handleSelectChange(value, "reporting_head") }}
            >
              <SelectTrigger className={`dropdown ${errors?.reporting_head && !formData?.reporting_head ? `border border-red-600` : ``
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
            {errors && errors?.reporting_head && !formData?.reporting_head && (
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
            <label className={`lable ${(errors?.sub_type_of_activity && !formData?.sub_type_of_activity) ? `text-red-600` : `text-black`}`}>
              Sub Type Of Activity <span className={"text-[#e60000]"}>*</span>
            </label>
            <Select
              onValueChange={(value) => { handleSelectChange(value, "sub_type_of_activity") }}
              defaultValue={Props.previewData?.sub_type_of_activity ? Props.previewData.sub_type_of_activity : ""}
            >
              <SelectTrigger className={`dropdown ${(errors?.sub_type_of_activity && !formData?.sub_type_of_activity) ? `border border-red-600` : ``}`}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sponsorship Support for Scientific Conferences">
                  {"Sponsorship Support for Scientific Conferences"}
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
              defaultValue={Props.previewData?.faculty ?? ""}
              className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2'
              placeholder="Type Here"
              name="faculty"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
            />
          </div>
          {/* <div className="flex flex-col gap-2">
            <label className="lable">
              Selection Criteria For Participant
            </label>
            <textarea
              defaultValue={Props.previewData?.participants ?? ""}
              className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2'
              placeholder="Type Here"
              name="participants"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
            />
          </div> */}
        </div>
        <div className="py-8">
          <h1 className="text-black text-2xl font-normal uppercase pb-8">
            Sponsorship Details
          </h1>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="flex flex-col md:gap-2">
              <label className={`lable ${(errors?.organizer_name && !formData?.organizer_name) ? `text-red-600` : `text-black`}`}>
                Organizer Name<span className="text-[#e60000]">*</span>
              </label>
              <textarea
                defaultValue={Props.previewData?.organizer_name ? Props.previewData.organizer_name : ""}
                className={`${(errors?.organizer_name && !formData?.organizer_name) ? `border border-red-600` : ``} text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2`}
                placeholder="Type Here"
                name="organizer_name"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
              />
              {
                errors &&
                (errors?.organizer_name && !formData?.organizer_name) &&
                (
                  <p className="w-full text-red-500 text-[11px] font-normal text-left">
                    {errors?.organizer_name}
                  </p>
                )
              }
            </div>
            <div className="flex flex-col md:gap-2">
              <label className={`lable ${(errors?.entitlement_in_lieu_of_sponsorship && !formData?.entitlement_in_lieu_of_sponsorship) ? `text-red-600` : `text-black`}`}>
                Entitlement in Lieu of sponsorship<span className="text-[#e60000]">*</span>
              </label>
              <textarea
                defaultValue={Props.previewData?.entitlement_in_lieu_of_sponsorship ? Props.previewData.entitlement_in_lieu_of_sponsorship : ""}
                className={`${(errors?.entitlement_in_lieu_of_sponsorship && !formData?.entitlement_in_lieu_of_sponsorship) ? `border border-red-600` : ``} text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2`}
                placeholder="Type Here"
                name="entitlement_in_lieu_of_sponsorship"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { handlefieldChange(e) }}
              />
              {
                errors &&
                (errors?.entitlement_in_lieu_of_sponsorship && !formData?.entitlement_in_lieu_of_sponsorship) &&
                (
                  <p className="w-full text-red-500 text-[11px] font-normal text-left">
                    {errors?.entitlement_in_lieu_of_sponsorship}
                  </p>
                )
              }
            </div>
            <div className="flex flex-col gap-2">
              <label className={`lable ${(errors?.sponsorship_amount && !formData?.sponsorship_amount) ? `text-red-600` : `text-black`}`}>
                Sponsorship Amount<span className="text-[#e60000]">*</span>
              </label>
              <Input
                className={`${(errors?.sponsorship_amount && !formData?.sponsorship_amount) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
                placeholder="Type Here"
                type="number"
                name="sponsorship_amount"
                onChange={(e) => handlefieldChange(e)}
                defaultValue={Props.previewData?.sponsorship_amount ? Props.previewData.sponsorship_amount : ""}
              ></Input>
              {
                errors &&
                (errors?.sponsorship_amount && !formData?.sponsorship_amount) &&
                (
                  <p className="w-full text-red-500 text-[11px] font-normal text-left">
                    {errors?.sponsorship_amount}
                  </p>
                )
              }
            </div>
            <div className="flex flex-col md:gap-2">
              <label className={`lable ${(errors?.sponsor_currency && !formData?.sponsor_currency) ? `text-red-600` : `text-black`}`}>
                Currency<span className="text-[#e60000]">*</span>
              </label>
              <Select
                onValueChange={(value) => { handleSelectChange(value, "sponsor_currency") }}
                defaultValue={Props.previewData?.sponsor_currency ? Props.previewData.sponsor_currency as any : ""}
              >
                <SelectTrigger className={`dropdown ${(errors?.sponsor_currency && !formData?.sponsor_currency) ? `border border-red-600` : ``}`}>
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
              {
                errors &&
                (errors?.sponsor_currency && !formData?.sponsor_currency) &&
                (
                  <p className="w-full text-red-500 text-[11px] font-normal text-left">
                    {errors?.sponsor_currency}
                  </p>
                )
              }
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
                Comment (If Any)
              </label>
              <Input
                className="text-black shadow md:rounded-md md:py-5"
                placeholder="Type Here"
                name="comment_if_any"
                onChange={(e) => handlefieldChange(e)}
                defaultValue={Props.previewData?.comment_if_any ? Props.previewData.comment_if_any : ""}
              ></Input>
            </div>
            <div className="flex flex-col md:gap-2">
              <label className="text-black md:text-sm md:font-normal capitalize">
                Any Additional Expense
              </label>
              <Input
                className="text-black shadow md:rounded-md md:py-5"
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
        {formData?.state && isReportingHeadDialog && (
          <IsReportingHeadDialog
            handleIsReportingDialog={handleIsReportingDialog}
          />
        )}
      </div>)
  );
};

export default Form1;
