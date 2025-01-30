"use client"
import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from '@/components/ui/checkbox';
import { Previewdata } from '@/app/(afterlogin)/monetary_grant/page'
import { useRouter } from 'nextjs-toploader/app';
import { Toaster, toast } from 'sonner'
import Image from 'next/image';
type Props = {
  vendorType: {
    name: string,
    vendor_type: string
  }[] | null,
  currency: {
    name: string
  }[] | null,
  previewData: Previewdata | null | undefined
  refno: string | undefined;
  // logisticsBudget:Logistics[]
}
type Budget = "logistics" | "compensation" | "";

type vendorName = {
  name: string,
  vendor_name: string
}[]

type Compensation = {
  vendor_type: string;
  vendor_name: string | null;
  est_amount: number;
  gst_included?: number;
  name: string | null;
  budget_category: string;
};

type Logistics = {
  vendor_type: string;
  est_amount: number;
  name: string | null;
  budget_category: string
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


const Form3 = ({ ...Props }: Props) => {
  const router = useRouter();
  const [formdata, setFormData] = useState<formData>();
  const [refNo, setRefNo] = useState<string | null>(Props.refno ?? "");
  const [previewData, setPreviewData] = useState<Previewdata>()
  const [budgetType, setBudgetType] = useState<Budget>("");
  const [vendorName, setVendorName] = useState<vendorName | null>(null);
  const [logisticVendorType, setLogisticVendorType] = useState("");
  const [logisticAmount, setLogisticAmount] = useState(0);
  const [compansationVendorName, setCompansationVendorName] = useState("");
  const [compansationVendorType, setCompansationVendorType] = useState("");
  const [compansationAmount, setCompansationAmount] = useState(0);
  const [compansation_is_GST, setCompansation_is_GST] = useState(0);
  const PreviewData = async () => {
    try {
      const response = await fetch("/api/previewData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          name: refNo
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewData(data.data);
      } else {
        console.log('Response was not OKAY');
      }
    } catch (error) {
      console.error("Error during Previewing data:", error);
    }
  };
  useEffect(() => {
    PreviewData();
  }, [])
  console.log(refNo, 'previewData useffect')
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setTimeout(() => {
      router.push(`/sponsorship_support?forms=4&refno=${refNo}`)
    }, 500)
  };
  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }) as formData);
  };
  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }) as formData);
  };
  const handleLogisticsAdd = async () => {
    try {
      if (!logisticVendorType || logisticAmount <= 0) {
        return toast.warning("Fill the required field")
      }
      const newObject: Logistics = { vendor_type: logisticVendorType, est_amount: logisticAmount, name: refNo, budget_category: 'Logistics' };

      const apiCallPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await fetch('/api/training_and_education/addVendor', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(newObject)
          });

          if (!response.ok) {
            throw new Error('vendor  request failed');
          }

          const data = await response.json();
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
      toast.promise(apiCallPromise, {
        loading: 'Submitting vendor details...',
        success: (data) => {
          setTimeout(() => {
            PreviewData();
          }, 500);
          console.log("data reponse ", data)
          setLogisticVendorType('');
          setLogisticAmount(0);
          PreviewData()
          return 'Vendor has been added successfully!';
        },
        error: (error) => `Failed to add vendor: ${error.message || error}`,
      });

    } catch (error) {
      console.error("Error during vendor type change:", error);
    }
  };
  const handleCompensationAdd = async () => {
    console.log(compansation_is_GST, 'compansation_is_GST')
    try {
      if (!compansationVendorType || !compansationVendorName || compansationAmount <= 0) {
        return toast.warning("Fill the required field")
      }
      const newObject: Compensation = { vendor_type: compansationVendorType, est_amount: compansationAmount, gst_included: compansation_is_GST, vendor_name: compansationVendorName, name: refNo, budget_category: 'Compensation' };

      const apiCallPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await fetch('/api/training_and_education/addVendor', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(newObject)
          });

          if (!response.ok) {
            throw new Error('vendor  request failed');
          }

          const data = await response.json();
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
      toast.promise(apiCallPromise, {
        loading: 'Submitting vendor details...',
        success: (data) => {
          setTimeout(() => {
            PreviewData();
          }, 500);
          console.log("data reponse ", data)
          setCompansationVendorType('');
          setCompansationAmount(0);
          setCompansationVendorName('');
          setCompansation_is_GST(0);
          return 'Vendor has been added successfully!';
        },
        error: (error) => `Failed to add vendor: ${error.message || error}`,
      });

    } catch (error) {
      console.error("Error during vendor type change:", error);
    }
  };

  const handleCompensationDelete = async (deletename: string) => {
    console.log("deletename", deletename)
    try {
      const response = await fetch(
        "/api/deleteVendor",
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
        console.log(" Successful Delete response data");
        setTimeout(() => {
          toast.success("Vendor Deleted Successfully");
        }, 1000)
        PreviewData();

      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };
  const handleLogisticDelete = async (deletename: string) => {
    try {
      const response = await fetch(
        "/api/deleteVendor",
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
        console.log(" Successful Delete response data");
        setTimeout(() => {
          toast.success("Vendor Deleted Successfully");
        }, 1000)
        PreviewData();

      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };
  const handleVendorTypeChangeApi = async (value: string) => {
    try {
      const response = await fetch(
        `/api/training_and_education/vendorName?vendor_type=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          "credentials": 'include'
        }
      );
      if (response.ok) {
        const data = await response.json();
        setVendorName(data.data)
      } else {
        console.log("Response was Not OK");
      }
    } catch (error) {
      console.error("Error during vendor type change:", error);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogisticAmount(e.target.valueAsNumber)
  }

  const handleCompensationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompansationAmount(e.target.valueAsNumber);
  }

  const handle_is_GST = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCompansation_is_GST(1);
    } else {
      setCompansation_is_GST(0);
    }
  }
  const handleNavigation = () => {
    const fromValue = encodeURIComponent(`sponsorship_support?forms=3&refno=${refNo}`);
    router.push(`/add_vendor?from=${fromValue}`);
  };

  return (
    // </div>
    (<div>
      <div className='pb-8'>
        <h1 className="text-black text-2xl font-normal uppercase pb-8">
          Budget Details
        </h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="lable">
              Budget Type<span className="text-[#e60000]">*</span>
            </label>
            <Select
              onValueChange={(value: Budget) => setBudgetType(value)}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="logistics">Logistics</SelectItem>
                <SelectItem value="compensation">Non Logistics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {budgetType == "logistics" ?
        <div className="grid grid-cols-3 gap-12 mb-7">
          <div className="flex flex-col gap-2">
            <label className="lable">
              vendor type<span className="text-[#e60000]">*</span>
            </label>
            <Select
              onValueChange={(value: string) => { setLogisticVendorType(value) }}
              value={logisticVendorType ? logisticVendorType : ""}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {Props.vendorType ? Props.vendorType?.filter((item, index) => {
                  if (item.name == "Hotel" || item.name == "Travel" || item.name == "Food") {
                    return item
                  }
                })
                  .map((item) => {
                    return (
                      <SelectItem value={item.name}>{item.vendor_type}</SelectItem>
                    )
                  })
                  :
                  <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
                }
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="lable">
              Amount<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow"
              placeholder="Type Here"
              type='number'
              onChange={handleAmountChange}
              value={logisticAmount ? logisticAmount : ''}
            ></Input>
          </div>
          <div className="flex justify-end pt-7">
            <Button className="bg-white text-[#4430bf] border border-[#4430bf] text-md font-normal hover:bg-white"
              onClick={() => handleLogisticsAdd()}
            >
              Add
            </Button>
          </div>
        </div>
        : budgetType == "compensation" ?
          <div>
            <div className="grid grid-cols-4 gap-12">
              <div className="flex flex-col gap-2">
                <label className="lable">
                  vendor type<span className="text-[#e60000]">*</span>
                </label>
                <Select
                  onValueChange={(value) => { handleVendorTypeChangeApi(value); setCompansationVendorType(value) }}
                  value={compansationVendorType ? compansationVendorType : ""}
                >
                  <SelectTrigger className="dropdown">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      Props.vendorType
                        ? Props.vendorType?.filter((item) => {
                          return item.name !== "Hotel" && item.name !== "Travel";
                        })
                          .map((item) => {
                            return (
                              <SelectItem value={item.name} key={item.name}>
                                {item.vendor_type}
                              </SelectItem>
                            );
                          })
                        : <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
                    }
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="lable">
                  vendor Name<span className="text-[#e60000]">*</span>
                </label>
                <Select
                  onValueChange={(value: string) => { setCompansationVendorName(value) }}
                  value={compansationVendorName ? compansationVendorName : ""}
                >
                  <SelectTrigger className="dropdown">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      vendorName && vendorName.map((item, index) => {
                        return (
                          <SelectItem value={item.name}>{item.vendor_name}</SelectItem>
                        )
                      })
                    }
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="lable">
                  Amount<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow"
                  placeholder="Type Here"
                  type='number'
                  onChange={(e) => handleCompensationChange(e)}
                  value={compansationAmount ? compansationAmount : ""}
                ></Input>
              </div>
              <div className="flex flex-col gap-5 items-center">
                <label className="lable">
                  Is GST Included?<span className="text-[#e60000]">*</span>
                </label>
                <Input className='text-black w-5 h-5'
                  type='checkbox'
                  onChange={(e) => handle_is_GST(e)}
                  checked={compansation_is_GST ? true : false}
                />
              </div>
            </div>
            <div className="flex justify-end pt-5 gap-4 pb-4">
              <div className="relative">
                <svg
                  className="absolute top-3 left-4"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector"
                    d="M14.8571 9.14286H9.14286V14.8571C9.14286 15.1602 9.02245 15.4509 8.80812 15.6653C8.59379 15.8796 8.30311 16 8 16C7.6969 16 7.40621 15.8796 7.19188 15.6653C6.97755 15.4509 6.85714 15.1602 6.85714 14.8571V9.14286H1.14286C0.839753 9.14286 0.549063 9.02245 0.334735 8.80812C0.120408 8.59379 0 8.3031 0 8C0 7.6969 0.120408 7.40621 0.334735 7.19188C0.549063 6.97755 0.839753 6.85714 1.14286 6.85714H6.85714V1.14286C6.85714 0.839752 6.97755 0.549062 7.19188 0.334735C7.40621 0.120407 7.6969 0 8 0C8.30311 0 8.59379 0.120407 8.80812 0.334735C9.02245 0.549062 9.14286 0.839752 9.14286 1.14286V6.85714H14.8571C15.1602 6.85714 15.4509 6.97755 15.6653 7.19188C15.8796 7.40621 16 7.6969 16 8C16 8.3031 15.8796 8.59379 15.6653 8.80812C15.4509 9.02245 15.1602 9.14286 14.8571 9.14286Z"
                    fill="#635E5E"
                  />
                </svg>
                <Button className="bg-white text-black border text-md font-normal rounded-xl pl-10 py-2 hover:bg-white" onClick={() => handleNavigation()}>
                  Add New Vendor
                </Button>
              </div>
              <Button className="bg-white text-[#4430bf] border border-[#4430bf] text-md font-normal hover:bg-white" onClick={handleCompensationAdd}>
                Add
              </Button>
            </div>
          </div>
          :
          ""
      }
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Logistics Budget
      </h1>
      <div className="border mb-8 border-[#848484] p-7 rounded-[50px] w-full mr-4  bg-white">
        <Table className={"overflow-hidden"}>
          <TableHeader className={"bg-[#E0E9FF]"}>
            <TableRow className={""}>
              <TableHead
                className={
                  "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Vendor Type
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Amount
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] rounded-r-2xl text-[15px] font-normal font-['Montserrat']"
                }
              >
                {"       "}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewData && previewData.logistics.map((item, index) => (
              <TableRow className="text-black text-center">
                <><TableCell>{item.vendor_type}</TableCell><TableCell>{item.est_amount}</TableCell>
                  <TableCell>
                    <div className="flex justify-around">
                      <div onClick={() => { handleLogisticDelete(item.name) }} >
                        <Image src={"/svg/delete.svg"} width={20} height={20} alt='view-document' className='cursor-pointer' />
                      </div>
                    </div>
                  </TableCell>
                </>
              </TableRow>
            ))}
            {/* <div className='text-black pt-3 text-[16px]'>
                  Total Amount :- {totalLogisticAmount}
                </div> */}
          </TableBody>
        </Table>
        <div className='text-black pt-3 font-poppins text-[16px]'>
          Total Amount :- {previewData?.total_logistics_expense}
        </div>
      </div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Non Logistics Budget
      </h1>
      <div className="border border-[#848484] p-7 rounded-[50px] w-full mr-4  bg-white">
        <Table className={"overflow-hidden"}>
          <TableHeader className={"bg-[#E0E9FF]"}>
            <TableRow className={""}>
              <TableHead
                className={
                  "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Vendor Type
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Vendor Name
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                {"Amount (in INR)"}
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                GST Included?
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] rounded-r-2xl text-[15px] font-normal font-['Montserrat']"
                }
              >
                {"       "}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewData && previewData.compensation.map((item, index) => (

              <TableRow className="text-black text-center">
                <TableCell>{item.vendor_type}</TableCell>
                <TableCell>{item.vendor_name}</TableCell>
                <TableCell>{item.est_amount}</TableCell>
                <TableCell>
                  <div><input className='text-black w-5 h-5' type='checkbox' checked={item.gst_included ? true : false} /></div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-around">
                    <div className="hover:cursor-pointer" onClick={() => handleCompensationDelete(item.name)}>
                      <Image src={"/svg/delete.svg"} width={20} height={20} alt='view-document' className='cursor-pointer' />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
        <div className='text-black pt-3 font-poppins text-[16px]'>
          Total Amount :- {previewData?.total_compensation_expense}
        </div>
      </div>
      <h1 className="text-black text-2xl font-normal uppercase py-8">
        Expense Details
      </h1>
      <div className="grid grid-cols-4 gap-12">
        <div className="flex flex-col col-span-2 gap-2">
          <label className="lable">
            Total Estimated Expense
            <span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow"
            placeholder="Type Here"
            name='total_estimated_expense'
            type='number'
            disabled
            value={previewData?.total_estimated_expense}
            onChange={(e) => handlefieldChange(e)}
          ></Input>
        </div>
        <div className="flex flex-col col-span-1 gap-2">
          <label className="lable">
            Currency<span className="text-[#e60000]">*</span>
          </label>
          <Select
            onValueChange={(value: string) => { handleSelectChange(value, "currency") }}
            defaultValue={Props.previewData ? Props.previewData.currency : "INR"}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {
                Props && Props.currency?.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>{item.name}</SelectItem>
                  )
                })
              }
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end pt-5 gap-4">
        {/* <Button className="bg-white text-black border text-md font-normal hover:bg-white">
          {" "}
          Save as Draft
        </Button> */}
        <Button className="bg-white text-black border text-md font-normal hover:text-white hover:bg-black" onClick={() => router.push(`/sponsorship_support?forms=2&refno=${Props.refno}`)}>
          Back
        </Button>
        <Button className="bg-[#4430bf] text-white text-md font-normal border hover:bg-[#4430bf]" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>
          Next
        </Button>
        <Toaster richColors position="top-right" />
      </div>
    </div>)
  );
}

export default Form3