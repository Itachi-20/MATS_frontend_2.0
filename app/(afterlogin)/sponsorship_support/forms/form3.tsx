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
import { useRouter } from 'next/navigation';
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


type Props = {
  vendorType: {
    name: string,
    vendor_type: string
  }[] | null,
  currency: {
    name: string
  }[] | null
  previewData: Previewdata | null | undefined
  refno: string;
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
};

type Logistics = {
  vendor_type: string;
  est_amount: number;
};
const Form3 = ({ ...Props }: Props) => {
  const [budgetType, setBudgetType] = useState<Budget>("");
  const [vendorName, setVendorName] = useState<vendorName | null>(null);
  const [logisticVendorType, setLogisticVendorType] = useState("");
  const [logisticAmount, setLogisticAmount] = useState(0);
  const [logisticsBudget, setLogisticBudget] = useState<Logistics[] | undefined>(Props.previewData?.logistics);
  const [compansationVendorName, setCompansationVendorName] = useState("");
  const [compansationVendorType, setCompansationVendorType] = useState("");
  const [compansationAmount, setCompansationAmount] = useState(0);
  const [compansation_is_GST, setCompansation_is_GST] = useState(0);
  const [compansationBudget, setCompansationBudget] = useState<Compensation[] | undefined>(Props.previewData?.compensation);
  const [totalLogisticAmount, setTotalLogisticAmount] = useState(0);
  const [totalCompansationAmount, setTotalCompansationAmount] = useState(0);
  const [totalEstimatedAmount, setTotalEstimatedAmount] = useState(0);

  const router = useRouter();
  const [formdata, setFormData] = useState<formData | {}>();
  const [refNo, setRefNo] = useState<string | null>(Props.refno);

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedFormData = {
        ...formdata

    };
    updatedFormData.event_type = "Sponsorship Support"
    if(refNo){
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
        setRefNo(data.message);
        router.push(`/sponsorship_support?forms=4&refno=${data.message}`);
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };
  useEffect(() => {
    setFormData({ ...formdata, name: Props.refno ? Props.refno : '' })
    Props.refno
  }, [])

  console.log(formdata, "this is form data")

  const handleLogisticsAdd = () => {
    if (logisticVendorType && logisticAmount > 0) {
      const newObject: Logistics = { vendor_type: logisticVendorType, est_amount: logisticAmount };
      setLogisticBudget(prevRows => {
        const updatedRecords = prevRows && [...prevRows, newObject]
        console.log(updatedRecords)
        setFormData((prev: any) => ({ ...prev, logistics: updatedRecords }))
        return updatedRecords
      }
      )
      setLogisticVendorType('');
      setLogisticAmount(0);
    }
  }

  const handleCompensationAdd = () => {
    if (compansationVendorType && compansationAmount > 0) {
      const newObject: Compensation = { vendor_type: compansationVendorType, est_amount: compansationAmount, gst_included: compansation_is_GST, vendor_name: compansationVendorName };
      setCompansationBudget(prevRows => {
        const updatedRecords = prevRows && [...prevRows, newObject]
        console.log(updatedRecords)
        setFormData((prev: any) => ({ ...prev, compensation: updatedRecords }))
        return updatedRecords
      }
      )
      setCompansationVendorType('');
      setCompansationAmount(0);
      setCompansationVendorName('');
      setCompansation_is_GST(0);
    }
  }

  const handleCompensationDelete = (indexToDelete: number) => {
    setCompansationBudget((prevRows) => {
      const updatedRecords = prevRows?.filter((_, index) => index !== indexToDelete) || [];
      setFormData((prev: any) => ({ ...prev, compensation: updatedRecords }));
      return updatedRecords;
    });
  };


  const handleLogisticDelete = (indexToDelete: number) => {
    setLogisticBudget((prevRows) => {
      const updatedRecords = prevRows?.filter((_, index) => index !== indexToDelete) || [];
      setFormData((prev: any) => ({ ...prev, logistics: updatedRecords }));
      return updatedRecords;
    });
  };

  useEffect(() => {
    totalLogisticAmountCalculation();
  }, [logisticsBudget])

  useEffect(() => {
    totalCompansationAmountCalculation();
  }, [compansationBudget])


  const totalLogisticAmountCalculation = () => {
    let total = 0;
    logisticsBudget && logisticsBudget.map((data, index) => {
      total += data.est_amount
      setTotalLogisticAmount((prev) => (
        total
      )
      )
    })
  }

  const totalCompansationAmountCalculation = () => {
    let total = 0;
    compansationBudget && compansationBudget.map((data, index) => {
      total += data.est_amount
      setTotalCompansationAmount((prev) => (
        total
      )
      )
    })
  }
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
        console.log(data, "vendor name api");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
                <SelectItem value="compensation">Compensation</SelectItem>
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
                {Props && Props.vendorType?.filter((item, index) => {
                  if (item.vendor_type == "Hotel" || item.vendor_type == "Travel" || item.vendor_type == "Food") {
                    return item
                  }
                })
                  .map((item) => {
                    return (
                      <SelectItem value={item.name}>{item.vendor_type}</SelectItem>
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
                    {Props && Props.vendorType?.map((item, index) => {
                      return (
                        <SelectItem value={item.name}>{item.vendor_type}</SelectItem>
                      )
                    })}
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
                  value={compansation_is_GST ? compansation_is_GST : 0}
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
                <Button className="bg-white text-black border text-md font-normal rounded-xl pl-10 py-2 hover:bg-white" onClick={() => router.push("/add_vendor")}>
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
            {logisticsBudget && logisticsBudget.map((item, index) => (
              <TableRow className="text-black text-center">
                <><TableCell>{item.vendor_type}</TableCell><TableCell>{item.est_amount}</TableCell>
                  <TableCell>
                    <div className="flex justify-around">
                      <div onClick={() => { handleLogisticDelete(index) }} className="hover:cursor-pointer">
                        <svg
                          width="18"
                          height="20"
                          viewBox="0 0 18 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            id="Vector"
                            d="M14.6256 19.5H14.625H3.375C2.88779 19.5 2.48452 19.3344 2.13785 18.992C1.79142 18.6499 1.62565 18.254 1.625 17.7774V3.89583C1.625 3.30903 1.1493 2.83333 0.5625 2.83333C0.527982 2.83333 0.5 2.80535 0.5 2.77083V2.22222C0.5 1.88471 0.773604 1.61111 1.11111 1.61111H5.06944C5.65241 1.61111 6.125 1.13852 6.125 0.555556C6.125 0.524873 6.14987 0.5 6.18056 0.5H11.8194C11.8501 0.5 11.875 0.524873 11.875 0.555556C11.875 1.13852 12.3476 1.61111 12.9306 1.61111H16.8889C17.2264 1.61111 17.5 1.88471 17.5 2.22222V2.77083C17.5 2.80535 17.472 2.83333 17.4375 2.83333C16.8507 2.83333 16.375 3.30903 16.375 3.89583V17.7778C16.375 18.2534 16.2097 18.6493 15.863 18.9923C15.5165 19.3351 15.1133 19.5006 14.6256 19.5ZM5.125 14.4306C5.125 15.328 5.85254 16.0556 6.75 16.0556C7.64746 16.0556 8.375 15.328 8.375 14.4306V6.68056C8.375 5.78309 7.64746 5.05556 6.75 5.05556C5.85254 5.05556 5.125 5.78309 5.125 6.68056V14.4306ZM9.625 14.4306C9.625 15.328 10.3525 16.0556 11.25 16.0556C12.1475 16.0556 12.875 15.328 12.875 14.4306V6.68056C12.875 5.78309 12.1475 5.05556 11.25 5.05556C10.3525 5.05556 9.625 5.78309 9.625 6.68056V14.4306Z"
                            fill="#242424"
                            stroke="#636363"
                          />
                        </svg>
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
                  Total Amount :- {totalLogisticAmount}
                </div>
      </div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Compensation Budget
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
            {compansationBudget && compansationBudget.map((item, index) => (

              <TableRow className="text-black text-center">
                <TableCell>{item.vendor_type}</TableCell>
                <TableCell>{item.vendor_name}</TableCell>
                <TableCell>{item.est_amount}</TableCell>
                <TableCell>
                  <div><input className='text-black w-5 h-5' type='checkbox' checked={item.gst_included ? true : false} /></div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-around">
                    <div className="hover:cursor-pointer" onClick={() => handleCompensationDelete(index)}>
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="Vector"
                          d="M14.6256 19.5H14.625H3.375C2.88779 19.5 2.48452 19.3344 2.13785 18.992C1.79142 18.6499 1.62565 18.254 1.625 17.7774V3.89583C1.625 3.30903 1.1493 2.83333 0.5625 2.83333C0.527982 2.83333 0.5 2.80535 0.5 2.77083V2.22222C0.5 1.88471 0.773604 1.61111 1.11111 1.61111H5.06944C5.65241 1.61111 6.125 1.13852 6.125 0.555556C6.125 0.524873 6.14987 0.5 6.18056 0.5H11.8194C11.8501 0.5 11.875 0.524873 11.875 0.555556C11.875 1.13852 12.3476 1.61111 12.9306 1.61111H16.8889C17.2264 1.61111 17.5 1.88471 17.5 2.22222V2.77083C17.5 2.80535 17.472 2.83333 17.4375 2.83333C16.8507 2.83333 16.375 3.30903 16.375 3.89583V17.7778C16.375 18.2534 16.2097 18.6493 15.863 18.9923C15.5165 19.3351 15.1133 19.5006 14.6256 19.5ZM5.125 14.4306C5.125 15.328 5.85254 16.0556 6.75 16.0556C7.64746 16.0556 8.375 15.328 8.375 14.4306V6.68056C8.375 5.78309 7.64746 5.05556 6.75 5.05556C5.85254 5.05556 5.125 5.78309 5.125 6.68056V14.4306ZM9.625 14.4306C9.625 15.328 10.3525 16.0556 11.25 16.0556C12.1475 16.0556 12.875 15.328 12.875 14.4306V6.68056C12.875 5.78309 12.1475 5.05556 11.25 5.05556C10.3525 5.05556 9.625 5.78309 9.625 6.68056V14.4306Z"
                          fill="#242424"
                          stroke="#636363"
                        />
                      </svg>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
        <div className='text-black pt-3 font-poppins text-[16px]'>
          Total Amount :- {totalCompansationAmount}
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
            value={totalLogisticAmount + totalCompansationAmount}
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
        <Button className="bg-white text-black border text-md font-normal hover:bg-white" onClick={()=>router.push(`/sponsorship_support?forms=2&refno=${Props.refno}`)}>
          Back
        </Button>
        <Button className="bg-[#4430bf] text-white text-md font-normal border hover:bg-[#4430bf]" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>
          Next
        </Button>

      </div>
    </div>)
  );
}

export default Form3