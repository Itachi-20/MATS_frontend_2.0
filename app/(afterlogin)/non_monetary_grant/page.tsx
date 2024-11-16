"use client"
import React, { useState, useEffect } from 'react';
import Form1 from "./forms/form1";
import Form2 from "./forms/form2";
import Form3 from "./forms/form3";
import Form4 from "./forms/form4";
import Preview_Form from './forms/preview_form';
import Adddocument from '@/components/add_document';
import Addvendor from '@/components/add_vendor';
import { AppWrapper } from '@/app/context/module';
import { usePathname } from 'next/navigation';
import { useSearchParams,useRouter } from 'next/navigation';


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
  reporting_head:string;
  requesting_hospital_name:string;
  ship_to:string;
  bill_to:string;
  organization_name:string;
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

const index = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [addVendor, setAddVendor] = useState(false);
  const [addDocument, setAddDocument] = useState(false);
  const [activityDropdown ,setActivityDropdown] = useState<activityDropdown | null>(null);
  const [dropdownData, setDropdownData] = useState<dropdownData | null>(null);
  const [refNo, setRefNo] = useState<string | null>(localStorage.getItem("refno") ? localStorage.getItem("refno") : "");
  const search = searchParams.get('forms')
  console.log("search", search)
  const router = useRouter()
  const [form, setForm] = useState<string | number | null>(searchParams.get('forms'));
  const [logisticsBudget, setLogisticBudget] = useState<Logistics[]>([]);


  let eventype: { [key: string]: string } = {};
  eventype["monetary_grant"] = "Monetary Grant";
  useEffect(() => {
    setFormData({ ...formdata, name: refNo })
  }, [refNo])
  const [formdata, setFormData] = useState<formData | {}>({});

  const isAddVendor = () => {
    setAddVendor(prev => !prev)
  }

  const isAddDocument = () => {
    setAddDocument(prev => !prev)
  }

  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const dropdown = async () => {

    try {
      const response = await fetch("/api/monetary_grant/dropdown", {
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

  const activityList = async () => {
    try {
      const response = await fetch("/api/monetary_grant/activityList", {
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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedFormData = {
      ...formdata

    };

    // const eventype = pathname.split("_").map((item,index)=>
    //   (
    //     item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
    //   )
    // ).join().replaceAll("_"," ").replaceAll(","," ").replace("/","")

    updatedFormData.event_type = "Non Monetary Grant"
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
        localStorage.setItem("refno", data.message);
        setRefNo(data.message);

        setTimeout(() => {
          if (search == "1") {
            router.push(`/non_monetary_grant?forms=2`);
          }
          if (search == "2") {
            router.push(`/non_monetary_grant?forms=3`);
          }
          if (search == "3") {
            router.push(`/non_monetary_grant?forms=4`);
          }
          if (search == "4") {
            router.push(`/non_monetary_grant?forms=5`);
          }
        }, 1000)
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };

  const handleBackButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/non_monetary_grant?forms=${Number(search)-1}`);
  }

  useEffect(() => {
    dropdown();
  }, [])

  useEffect(() => {
    activityList();
  }, [])

  return (
    <>
      <AppWrapper>
        <div className="px-7 pb-7 pt-4 w-full relative z-20">
          <div>
            {/* <h1 className="text-black text-[30px] font-medium capitalize" id="form_top">
        {pathname.substring(1).split("_")}
              </h1> */}
            <div className='py-9'></div>
          </div>
          {
            search == "1" ?
              <Form1
              dropdownData={dropdownData}
              handlefieldChange={handlefieldChange}
              handleSelectChange={handleSelectChange}
              handleSubmit={handleSubmit}
              /> :
              search == "2" ?
                <Form2
                  handleBackButton = {handleBackButton}
                  handlefieldChange={handlefieldChange}
                  handleSelectChange={handleSelectChange}
                  handleSubmit={handleSubmit}
                /> :
                search == "3" ?
                  <Form3
                    handleBackButton = {handleBackButton}
                    // prevForm={prevForm}
                    isAddVendor = {isAddVendor}
                    vendorType = {dropdownData && dropdownData.vendor_type}
                    currency = {dropdownData && dropdownData.currency}
                    handlefieldChange = {handlefieldChange}
                    handleSelectChange={handleSelectChange}
                    handleSubmit={handleSubmit}
                    setFormData = {setFormData}
                    logisticsBudget = {logisticsBudget}
                  /> :
                  search == "4" ?
                    <Form4
                    activityDropdown={activityDropdown}
                    handleBackButton={handleBackButton} 
                    /> :
                    search == "5" ?
                      <Preview_Form
                        handleBackButton={handleBackButton} 
                      /> : ""
          }
        </div>
        {
          addVendor &&
          <Addvendor
            isAddVendor={isAddVendor} isAddDocument={isAddDocument}
          />
        }
        {
          addDocument &&
          <Adddocument isAddDocument={isAddDocument} />
        }
      </AppWrapper>
    </>
  )
}

export default index