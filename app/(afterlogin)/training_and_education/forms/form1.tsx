"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'nextjs-toploader/app';
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
import { PreviewDataType, DropdownDataType, FormDataType } from "../page";
import { useAuth } from "@/app/context/AuthContext";
import IsReportingHeadDialog from "@/components/isReportingHeadDialog";
import CityDropdwon from '@/components/training_and_education/search_city'
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
  division_sub_category: string;
}[];

type reportingHeadDropdown = {
  reporting_name: string;
  reporting: string;
}[];
type stateDropdown = {
  name: string;
  state: string;
}[];

type FormErrors = {
  sub_type_of_activity?: string;
  event_cost_center?: string;
  division_category?: string;
  state?: string;
  reporting_head?: string
};
type CityDropdown = {
  name: string;
  city: string
}

type Props = {
  cityDropdown: CityDropdown[];
  ReportingHeadDropdown: reportingHeadDropdown | null;
  eventCostCenter: eventCostCenter | null;
  dropdownData: DropdownDataType | null;
  previewData: PreviewDataType | null;
  refNo: string;
  cityDropdownData: CityDropdown[];
};

const Form1 = ({ ...Props }: Props) => {
  const { role, name, userid, clearAuthData } = useAuth();
  const [formData, setFormData] = useState<FormDataType | null>(Props.previewData as FormDataType  ?? '');
  const [errors, setErrors] = useState<FormErrors>();
  const router = useRouter();
  const [businessUnit, setBusinessUnit] = useState(
    Props.previewData?.business_unit ?? ""
  );
  const [budget, setBudget] = useState(
    Props.previewData?.division_category ?? ""
  );
  const [refNo, setRefNo] = useState<string>(Props.refNo ?? "");
  const [eventCostCenter, setEventCostCenter] =
    useState<eventCostCenter | null>(null);
  const [subtypeActivity, setSubtypeActivity] =
    useState<subtypeActivity | null>(null);
  const [citydropdown, setCityDropdown] = useState<CityDropdown[]>(Props.cityDropdown);
  const [statedropdown, setStateDropdown] = useState<stateDropdown>();
  const [reportingHeadDropdown, setReportingHeadDropdown] =
    useState<reportingHeadDropdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReportingHeadDialog, setIsReportingHeadDialog] = useState(false);
  const [city, setCity] = useState(Props.previewData?.city);
  // const [previewcity, setPreviewCity] = useState(Props.previewData?.city);
  const validateAtSubmit = () => {
    const errors: FormErrors = {};
    if (
      Props.previewData?.sub_type_of_activity
        ? formData &&
        "sub_type_of_activity" in formData &&
        formData.sub_type_of_activity == ""
        : !formData?.sub_type_of_activity
    )
      errors.sub_type_of_activity = "Sub type activity is required";
    if (
      Props.previewData?.event_cost_center
        ? formData &&
        "event_cost_center" in formData &&
        formData.event_cost_center == ""
        : !formData?.event_cost_center
    )
      errors.event_cost_center = "Event Cost Center is required";
    if (
      Props.previewData?.division_category
        ? formData &&
        "division_category" in formData &&
        formData.division_category == ""
        : !formData?.division_category
    )
      errors.division_category = "Budget is required";
    if (
      Props.previewData?.state
        ? formData &&
        "state" in formData &&
        formData.state == ""
        : !formData?.state
    )
      errors.state = "State is required";
    if (
      Props.previewData?.reporting_head
        ? formData &&
        "reporting_head" in formData &&
        formData.reporting_head == ""
        : !formData?.reporting_head
    )
      errors.reporting_head = "Reporting Head is required";
    return errors;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors = validateAtSubmit();
    if (Object.keys(validationErrors).length > 0) {
      console.error(validationErrors);
      setErrors(validationErrors);
      return;
    }
    const updatedFormData = {
      ...formData,
    };
    updatedFormData.event_type = "Training and Education";
    if (refNo) {
      updatedFormData.name = refNo;
    }
    try {
      const response = await fetch("/api/training_and_education/handleSubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedFormData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data, "response data");
        setRefNo(data.message);

        // setTimeout(() => {
        router.push(`/training_and_education?forms=2&refno=${data.message}`);
        // }, 1000)
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };
  const handlefieldChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value } as FormDataType));
  };
  const handleSelectChange = (value: string, name: string) => {
    if (name == "business_unit") {
      setBusinessUnit(value);
    }
    if (name == "division_category") {
      setBudget(value);
    }
    setFormData((prev) => ({ ...prev, [name]: value } as FormDataType));
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
      event_division:'',
    }) as FormDataType);
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
        return data.data;
      } else {
        console.log("Response not okay business unit change");
      }
    } catch (error) {
      console.error("Error during business unit change:", error);
    }
  };
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
        if(data.message.length == 1){
          setFormData((prev) => ({ ...prev, state: data.message[0].name } as FormDataType));
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
  const handleReportingChange = async () => {
    setReportingHeadDropdown([]);
    console.log('inside reporting head dropdwon api')
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
            division_sub_category:
              formData?.division_category == "National"
                ? formData?.division_sub_category
                : "",
            state: formData?.state,
          }),
        }
      );

      if (response.status == 500) {
        setIsReportingHeadDialog(true);
        setReportingHeadDropdown([]);
      }

      if (response.ok) {
        const data = await response.json();
        setReportingHeadDropdown(data.data);
        console.log(data.data[0].reporting,'data.data[0].name-------------------------------------------')
        if(data.data.length == 1){
          setFormData((prev) => ({ ...prev, reporting_head: data.data[0].reporting } as FormDataType));
        }
        return data.data;
      } else {
        console.log("Response not Ok at Reporting change");
        setReportingHeadDropdown([]);
      }
    } catch (error) {
      console.error("Error during Reporting change:", error);
      setReportingHeadDropdown([]);
    }
  };
  useEffect(() => {
    console.log("inside useeffect reporting head")
    if (
      formData?.event_requestor &&
      formData?.business_unit &&
      formData?.state &&
      formData?.division_category
    ) {
      handleReportingChange();
    }
  }, [
    formData?.event_requestor,
    formData?.business_unit,
    formData?.division_category,
    formData?.division_sub_category,
    formData?.state,
  ]);

  useEffect(() => {
    if (userid !== undefined) {
      setLoading(false);
      if (Props?.previewData?.event_requestor) {
        handleSelectChange(
          Props.previewData.event_requestor,
          "event_requestor"
        );
      } else {
        handleSelectChange(userid as string, "event_requestor");
      }
    }
  }, [userid]);

  useEffect(() => {
    console.log(city, 'city')
    if (city) {
      setFormData((prev) => ({ ...prev, city: city } as FormDataType));
      handleCityChange(city)
    }
  }, [city]);
  useEffect(() => {
    handleBudgetChange(budget);
  }, []);

  if (loading) {
    return <div>Loading Please Wait</div>;
  }

  const handleIsReportingDialog = () => {
    setIsReportingHeadDialog(prev => !prev);
  }
  const clearCity = () => {
    console.log('inside claer city')
    setCity('');
    setFormData((prev) => ({ ...prev, reporting_head: '' }) as FormDataType);
    setFormData((prev) => ({ ...prev, state: '' }) as FormDataType);
  };

  return (
    <div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Basic Detail
      </h1>
      <div className="grid grid-cols-2 gap-6 pb-8">
        <div className="flex flex-col gap-2">
          <label className="lable">Company Name</label>
          <Select
            defaultValue={Props.previewData?.company ?? ""}
            onValueChange={(value) => handleSelectChange(value, "company")}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Props.dropdownData && Props.dropdownData.company ? (
                Props.dropdownData.company.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.company_name}
                    </SelectItem>
                  );
                })
              ) : (
                <SelectItem value={"null"} disabled>
                  No Data Yet
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">Business Unit</label>
          <Select
            defaultValue={Props.previewData?.business_unit ?? ""}
            onValueChange={(value) => {
              handleBusinessUnitChange(value);
              handleSelectChange(value, "business_unit");
            }}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Props.dropdownData && Props.dropdownData.division ? (
                Props.dropdownData.division.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.division_name}
                    </SelectItem>
                  );
                })
              ) : (
                <SelectItem value={"null"} disabled>
                  No Data Yet
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">Event requester</label>
          <Select
            defaultValue={
              Props.previewData?.event_requestor
                ? Props.previewData.event_requestor
                : (userid as string)
            }
            onValueChange={(value) =>
              handleSelectChange(value, "event_requestor")
            }
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Props.dropdownData && Props.dropdownData.requestor ? (
                Props.dropdownData.requestor.map((item, index) => {
                  return (
                    <SelectItem value={item.email}>{item.full_name}</SelectItem>
                  );
                })
              ) : (
                <SelectItem value={"null"} disabled>
                  No Data Yet
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

          {
          formData?.business_unit == "Orthopedics" &&
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
                {Props.dropdownData && Props.dropdownData.event_division ?
                  Props.dropdownData.event_division.map((item, index) => {
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
          </div>
          )
        }

        <div className="flex flex-col gap-2">
          <label
            className={`lable ${errors?.event_cost_center && !formData?.event_cost_center
              ? `text-red-600`
              : `text-black`
              }`}
          >
            event cost center<span className={"text-[#e60000]"}>*</span>
          </label>
          <Select
            disabled={
              formData?.business_unit || Props.previewData?.business_unit
                ? false
                : true
            }
            // defaultValue={Props.previewData?.event_cost_center ?? ""}
            value={formData?.event_cost_center ? formData?.event_cost_center : Props.previewData?.event_cost_center ?? ''}
            onValueChange={(value) =>
              handleSelectChange(value, "event_cost_center")
            }
            required
          >
            <SelectTrigger
              className={`dropdown ${errors?.event_cost_center && !formData?.event_cost_center
                ? `border border-red-600`
                : ``
                }`}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {eventCostCenter ? (
                eventCostCenter.cost_center.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.cost_center_description}
                    </SelectItem>
                  );
                })
              ) : Props.eventCostCenter ? (
                Props.eventCostCenter.cost_center.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.cost_center_description}
                    </SelectItem>
                  );
                })
              ) : (
                <SelectItem value={"null"} disabled>
                  No Data Yet
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {errors &&
            errors?.event_cost_center &&
            !formData?.event_cost_center && (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.event_cost_center}
              </p>
            )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className={`lable ${errors?.division_category && !formData?.division_category
              ? `text-red-600`
              : `text-black`
              }`}
          >Budget<span className={"text-[#e60000]"}>*</span></label>
          <Select
            // defaultValue={Props.previewData?.division_category ?? ""}
            value={formData?.division_category ? formData?.division_category : Props.previewData?.division_category ?? ''}
            onValueChange={(value) => {
              handleBudgetChange(value),
                handleSelectChange(value, "division_category");
            }}
          >
            <SelectTrigger className={`dropdown ${errors?.division_category && !formData?.division_category
              ? `border border-red-600`
              : ``
              }`}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {eventCostCenter ? (
                eventCostCenter.division_category.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>{item.category}</SelectItem>
                  );
                })
              ) : Props.eventCostCenter ? (
                Props.eventCostCenter.division_category.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>{item.category}</SelectItem>
                  );
                })
              ) : (
                <SelectItem value={"null"} disabled>
                  No Data Yet
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {errors &&
            errors?.division_category &&
            !formData?.division_category && (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.division_category}
              </p>
            )}
        </div>
        {businessUnit == "Endosurgery" && budget == "National" && (
          <div className="flex flex-col gap-2">
            <label className="lable">Budget Sub Type</label>
            <Select
              // defaultValue={Props.previewData?.division_sub_category ?? ""}
              value={formData?.division_sub_category ? formData?.division_sub_category : Props.previewData?.division_sub_category ?? ''}
              onValueChange={(value) => {
                handleSelectChange(value, "division_sub_category");
              }}
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
        )}
        <div className="flex flex-col gap-2">
          <label className="lable">City</label>
          <CityDropdwon setCity={setCity} city={city} citydropdown={citydropdown} handleCityChange={handleLoadCity} clearCity={clearCity}/>
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
          <label className={`lable ${errors?.reporting_head && !formData?.reporting_head
            ? `text-red-600`
            : `text-black`
            }`}>Reporting Head<span className={"text-[#e60000]"}>*</span></label>
          <Select
            // defaultValue={
            //   Props.previewData?.reporting_head ?? "selected reporting"
            // }
            value={formData?.reporting_head ? formData?.reporting_head : Props.previewData?.reporting_head ?? ''}
            onValueChange={(value) => {
              handleSelectChange(value, "reporting_head");
            }}
          >
            <SelectTrigger className={`dropdown ${errors?.reporting_head && !formData?.reporting_head
              ? `border border-red-600`
              : ``
              }`}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {reportingHeadDropdown ? (
                reportingHeadDropdown.map((item, index) => {
                  return (
                    <SelectItem value={item.reporting}>
                      {item.reporting_name}
                    </SelectItem>
                  );
                })
              ) : Props.ReportingHeadDropdown ? (
                Props.ReportingHeadDropdown.map((item, index) => {
                  return (
                    <SelectItem value={item.reporting}>
                      {item.reporting_name}
                    </SelectItem>
                  );
                })
              ) : (
                <SelectItem value={"null"} disabled>
                  No Data Yet
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {errors &&
            errors?.reporting_head &&
            !formData?.reporting_head && (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.reporting_head}
              </p>
            )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">Therapy</label>
          <Select
            // defaultValue={Props.previewData?.therapy ?? ""}
            value={formData?.therapy ? formData?.therapy : Props.previewData?.therapy ?? ''}
            onValueChange={(value) => {
              handleSelectChange(value, "therapy");
            }}
            disabled={
              formData?.business_unit || Props.previewData?.business_unit
                ? false
                : true
            }
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {eventCostCenter ? (
                eventCostCenter.therapy.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>{item.therapy}</SelectItem>
                  );
                })
              ) : Props.eventCostCenter ? (
                Props.eventCostCenter.therapy.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>{item.therapy}</SelectItem>
                  );
                })
              ) : (
                <SelectItem value={"null"} disabled>
                  No Data Yet
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            HCP Services Request Ref Number
          </label>
          <Select
            // defaultValue={Props.previewData?.hcp_ref_no ?? ""}
            value={formData?.hcp_ref_no ? formData?.hcp_ref_no : Props.previewData?.hcp_ref_no ?? ''}
            onValueChange={(value) => {
              handleSelectChange(value, "hcp_ref_no");
            }}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Props.dropdownData && Props.dropdownData.hcp_ref_no ? (
                Props.dropdownData.hcp_ref_no?.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item.name}>
                      {item.name}
                    </SelectItem>
                  );
                })
              ) : (
                <SelectItem value={"null"} disabled>
                  No Data Yet
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col md:gap-2">
          <label
            className={`lable ${errors?.sub_type_of_activity && !formData?.sub_type_of_activity
              ? `text-red-600`
              : `text-black`
              }`}
          >
            Sub Type Of Activity <span className={"text-[#e60000]"}>*</span>
          </label>
          <Select
            // defaultValue={Props.previewData?.sub_type_of_activity ?? ""}
            value={formData?.sub_type_of_activity ? formData?.sub_type_of_activity : Props.previewData?.sub_type_of_activity ?? ''}
            onValueChange={(value) => {
              handleSelectChange(value, "sub_type_of_activity");
            }}
          >
            <SelectTrigger
              className={`dropdown ${errors?.sub_type_of_activity && !formData?.sub_type_of_activity
                ? `border border-red-600`
                : ``
                }`}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Meril Event">{"Meril Event"}</SelectItem>
              <SelectItem value="Mix Event">{"Mix Event"}</SelectItem>
              <SelectItem value="Marketing Event">
                {"Marketing Event"}
              </SelectItem>
            </SelectContent>
          </Select>
          {errors &&
            errors?.sub_type_of_activity &&
            !formData?.sub_type_of_activity && (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.sub_type_of_activity}
              </p>
            )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <label className="lable">Selection Criteria For Faculty</label>
          <textarea
            defaultValue={Props.previewData?.faculty ?? ""}
            className="text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2"
            placeholder="Type Here"
            name="faculty"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              handlefieldChange(e);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">Selection Criteria For Participant</label>
          <textarea
            defaultValue={Props.previewData?.participants ?? ""}
            className="text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2"
            placeholder="Type Here"
            name="participants"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              handlefieldChange(e);
            }}
          />
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
      {isReportingHeadDialog && (
        <IsReportingHeadDialog
          handleIsReportingDialog={handleIsReportingDialog}
        />
      )}
    </div>
  );
};

export default Form1;
