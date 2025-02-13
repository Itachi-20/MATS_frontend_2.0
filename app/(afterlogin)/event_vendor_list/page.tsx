'use client'
import React from 'react'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Table from "@/app/(afterlogin)/event_vendor_list/table";
import { useState, useEffect } from 'react';
import DeletePopup from '@/components/deleteDialog'
import { View } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';
import { toast, Toaster } from 'sonner';

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

type EventTable = {
  name: string;
  vendor_type: string;
  vendor_name: string;
  remark: string;
  pan_number: string;
  vendor_code: string;
  email: string;
  contact_number: string;
  status:string;
}[];

type particularVendorData = {
  name: string;
  vendor_type: string;
  vendor_name: string;
  remark: string;
  pan_number: string;
  vendor_code: string;
  email: string;
  contact_number: string;
}

type Document = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  activity_type: string;
  occurrence_no: number;
  document_type: string;
  file: string;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type formData = {
  name: string;
  vendor_type: string;
  vendor_name: string;
  remark: string;
  pan_number: string;
  vendor_code: string;
  email: string;
  contact_number: string;
  document:Document[];
};

const page = () => {
  const [viewVendor, setViewVendor] = useState(false);
  const [addDocument, setAddDocument] = useState(false);
  const [viewDocument, setViewDocument] = useState(false);
  const [vendorData, setVendorData] = useState<EventTable | undefined>();
  const [particularVendorData, setParticularVendorData] = useState<particularVendorData | undefined>();
  const [dropdownData, setDropdownData] = useState<dropdownData | null>(null);
  const [addVendor, setAddVendor] = useState(false);
  const [deletevendorname,setDeleteVendorName]=useState()
  const [formdata, setFormData] = useState<formData | {}>({});
  const [deletepopup, setDeletePopup] = useState(false);
  const [deletename, setDeleteName] = useState<string | null>();
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const isViewVendor = () => {
    setViewVendor(prev => !prev)
  }

  const isAddDocument = () => {
    setAddDocument(prev => !prev)
  }

  const isViewDocument = () => {
    setViewDocument(prev => !prev)
  }
  const VendorList = async () => {
    try {
      const response = await fetch("/api/vendorList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data,'data')
        setVendorData(data.message);
      } else {
        console.log('Error fetching data');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

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
    VendorList();
  }, [])

  useEffect(() => {
    dropdown();
  }, [])

  useEffect(() => {
    setFormData({ ...formdata})
  }, [])

  const handleDeleteVendor = async () => {
    console.log("deletename", deletename)
    setLoading(true)
    try {
      const response = await fetch(
        "/api/deleteVendorFromMaster",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            name: deletename
          })
        }
      );
      if (response.ok) {
        setLoading(false)
        setDeletePopup(false)
        console.log(response);
        // toast.success("Vendor Deleted Successfully");
        // setTimeout(() => {
          VendorList()
        // }, 1000)
        setTimeout(() => {
          toast.success("Vendor Deleted Successfully");
        }, 1000)
      } else {
        setLoading(false)
        console.log("submission failed");
      }
    } catch (error) {
      setLoading(false)
      console.error("Error during Submission:", error);
    }
  };

  const handleDeleteDialog = async (name: string) => {
    console.log('indise delete ',name)
    setDeleteName(name);
    setDeletePopup(true)
  };
  console.log(vendorData, "this is vendorData ");
  return (
    <>
      <div className='p-7 w-full relative z-20 text-black'>
        <div className="flex justify-between pb-5">
          <Input
            className="w-[40%] rounded-[50px] bg-[#ecf2ff]"
            placeholder="Search"
          />
          <div className="flex gap-5">
            <Button className="bg-white text-black border text-md font-normal rounded-xl py-2 hover:bg-white" onClick={()=> router.push(`/add_vendor`)}>
              <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M12.5394 9.64286H8.06739V15.3571C8.06739 15.6602 7.97316 15.9509 7.80542 16.1653C7.63769 16.3796 7.41019 16.5 7.17298 16.5C6.93577 16.5 6.70827 16.3796 6.54054 16.1653C6.3728 15.9509 6.27857 15.6602 6.27857 15.3571V9.64286H1.80652C1.56931 9.64286 1.34181 9.52245 1.17408 9.30812C1.00634 9.09379 0.912109 8.8031 0.912109 8.5C0.912109 8.1969 1.00634 7.90621 1.17408 7.69188C1.34181 7.47755 1.56931 7.35714 1.80652 7.35714H6.27857V1.64286C6.27857 1.33975 6.3728 1.04906 6.54054 0.834735C6.70827 0.620407 6.93577 0.5 7.17298 0.5C7.41019 0.5 7.63769 0.620407 7.80542 0.834735C7.97316 1.04906 8.06739 1.33975 8.06739 1.64286V7.35714H12.5394C12.7767 7.35714 13.0041 7.47755 13.1719 7.69188C13.3396 7.90621 13.4338 8.1969 13.4338 8.5C13.4338 8.8031 13.3396 9.09379 13.1719 9.30812C13.0041 9.52245 12.7767 9.64286 12.5394 9.64286Z" fill="#635E5E" />
              </svg>
              <span>
                Add New Vendor
              </span>
            </Button>
            {/* <Select>
              <SelectTrigger className="dropdown rounded-[25px] gap-4">
                <SelectValue className="text-nowrap" placeholder="Vendor Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select> */}
            {/* <Select>
              <SelectTrigger className="dropdown rounded-[25px] gap-4">
                <SelectValue placeholder="Export" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select> */}
            <Button className='border rounded-xl'>Export</Button>
            {/* <Button className="text-black text-md font-normal bg-white hover:bg-white border rounded-[25px] px-8 py-5 shadow">
              Back
            </Button> */}
          </div>
        </div>
        <Table  vendorData={vendorData}  isViewDocument={isViewDocument}  handleDeleteVendor={handleDeleteDialog} />
      </div>
      {
        deletepopup && <DeletePopup setClose={setDeletePopup} handleSubmit={handleDeleteVendor} Loading={loading} text={'Are you sure want to delete this Vendor?'} />
      }

      <Toaster richColors position="top-right" />
    </>
  )
}

export default page