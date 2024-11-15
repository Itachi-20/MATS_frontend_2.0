"use client"

import React, { useState } from 'react';
import Form1 from "@/app/(afterlogin)/awareness_program/forms/form1";
import Form2 from "@/app/(afterlogin)/awareness_program/forms/form2";
import Form3 from "@/app/(afterlogin)/awareness_program/forms/form3";
import Form4 from "@/app/(afterlogin)/awareness_program/forms/form4";
import Preview_Form from './forms/preview_form';
import Addvendor from '@/components/add_vendor';
import Adddocument from '@/components/add_document';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AppWrapper } from '@/app/context/module'
import { useSearchParams } from 'next/navigation'
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
  // city:{
  //   name:string,
  //   state:string
  // }[]
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

const Index = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const search = searchParams.get('forms')
  console.log("search", search)
  const router = useRouter()
  const [form, setForm] = useState<string | number | null>(searchParams.get('forms'));
  const [activityDropdown, setActivityDropdown] = useState<activityDropdown | null>(null);
  const [addVendor, setAddVendor] = useState(false);
  const [dropdownData, setDropdownData] = useState<dropdownData | null>(null);
  const [refNo, setRefNo] = useState<string | null>(localStorage.getItem("refno") ? localStorage.getItem("refno") : "");
  const [logisticsBudget, setLogisticBudget] = useState<Logistics[]>([]);

  console.log(form, 'form')
  let eventype: { [key: string]: string } = {};
  eventype["awareness_program"] = "Awareness Program";
  useEffect(() => {
    setFormData({ ...formdata, name: refNo })
  }, [refNo])
  const [formdata, setFormData] = useState<formData | {}>({});

  const isAddVendor = () => {
    setAddVendor(prev => !prev)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedFormData = {
      ...formdata
    };
    updatedFormData.event_type = "Awareness Program";

    if (refNo) {
      updatedFormData.name = refNo;
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
        localStorage.setItem("refno", data.message);
        setRefNo(data.message);

        setTimeout(() => {
          if (search == "1") {
            router.push(`/awareness_program?forms=2`);
          }
          if (search == "2") {
            router.push(`/awareness_program?forms=3`);
          }
          if (search == "3") {
            router.push(`/awareness_program?forms=4`);
          }
          if (search == "4") {
            router.push(`/awareness_program?forms=5`);
          }
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
    setFormData(prev => ({ ...prev, [name]: value }));
  }


  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const activityList = async () => {
    try {
      const response = await fetch("/api/training_and_education/activityList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setActivityDropdown(data.data);
        console.log(data, "activity list")
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  useEffect(()=>{
    activityList();
  },[])
  const dropdown = async () => {
    try {
      const response = await fetch("/api/training_and_education/dropdown", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setDropdownData(data.data);
      if (response.ok) {
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    dropdown();
  }, [])

  console.log(formdata, "this is form data");

  return (
    <>
      <div className="px-7 pb-7 pt-4 w-full relative z-20">
        <div>
          <h1 className="text-black text-[30px] font-medium capitalize" id="form_top">
          {/* {pathname.replace("/","").replaceAll("_"," ")} */}
          </h1>
          <div className='py-9'></div>
        </div>
        {
          search == "1" ?
            <Form1
              // nextForm = {nextForm}
              dropdownData={dropdownData}
              handlefieldChange={handlefieldChange}
              handleSelectChange={handleSelectChange}
              handleSubmit={handleSubmit}
            /> :
            search == "2" ?
              <Form2
                handlefieldChange={handlefieldChange}
                handleSelectChange={handleSelectChange}
                handleSubmit={handleSubmit}
              /> :
              search == "3" ?
                <Form3
                  vendorType={dropdownData && dropdownData.vendor_type}
                  currency={dropdownData && dropdownData.currency}
                  handlefieldChange={handlefieldChange}
                  handleSelectChange={handleSelectChange}
                  handleSubmit={handleSubmit}
                  setFormData={setFormData}
                  logisticsBudget={logisticsBudget}
                  isAddVendor={isAddVendor}
                /> :
                search == "4" ?
                  <Form4
                    // nextForm = {nextForm}
                    // prevForm={prevForm}
                    handleSubmit={handleSubmit}
                    activityDropdown={activityDropdown}
                  /> :
                  search == "5" ?
                    <Preview_Form
                    /> : ""
        }
      </div>

      {
        addVendor &&
        <Addvendor
          isAddVendor={isAddVendor}
        />
      }
    </>
  )
}

export default Index