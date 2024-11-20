"use client"
import React, { useState,useEffect } from 'react'
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
  import { Input } from '@/components/ui/input';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useRouter } from 'next/navigation';

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

  type Props = {
    activityDropdown:activityDropdown| null
}
const form4 = ({...Props}:Props) => {
  const router = useRouter();
  const [file,setFile] = useState<FileList | null>();
  const [activityType,setActivityType] = useState("");
  const [refno,setRefno] = useState(localStorage.getItem("refno")?localStorage.getItem("refno"):"");
  const [documentType,setDocumentType] = useState("");
  const [formdata, setFormData] = useState<formData | {}>({});
  const [refNo,setRefNo] = useState<string | null>(localStorage.getItem("refno")?localStorage.getItem("refno"):"");
  const handleFileUpload = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const files = (e.target as HTMLInputElement).files;
    setFile(files);
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedFormData = {
        ...formdata

    };

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

        setTimeout(() => {
          router.push(`/hcp_services?forms=5`);
        }, 1000)
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };

  useEffect(() => {
    setFormData({ ...formdata, name: refNo })
  }, [refNo])

console.log(formdata,"this is form data")

  const FileUpload = async()=>{
    const formdata = new FormData();

    if (file && file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        formdata.append("file", file[i]); 
      }
    } else {
      console.log("No file to upload");
      return;  
    }
      formdata.append("docname",refno as string)
      formdata.append("activity_type",activityType);
      formdata.append("document_type",documentType)
    try {
      const response = await fetch(
        `/api/training_and_education/fileUpload`,
        {
          method: "POST",
          headers: {
            //"Content-Type": "multipart/form-data",
          },
          body:formdata,
          credentials:'include'
        }
      );

      
      if (response.ok) {
        const data = await response.json();
       
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }


  const handleActivityTypeChange = (value:string)=>{
    setActivityType(value);
  }

  console.log(file,"this is files");
  return (
    // </div>
    (<div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Documents
      </h1>
      <div className="grid grid-cols-3 gap-12 pb-7 text-black">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Document Type <span className="text-[#e60000]">*</span>
          </label>
          <Select
          onValueChange={(value)=>handleActivityTypeChange(value)}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {
                  Props.activityDropdown && Props.activityDropdown.activity.map((item,index)=>{
                    return (
                      <SelectItem value={item.name}>
                        {item.activity_name}
                      </SelectItem>
                    )
                  })
                }
                    
              </SelectContent>
            </Select>
        </div>
        <div className="flex flex-col gap-2 col-span-1">
          <label className="text-black text-sm font-normal capitalize">
            Supporting Documents<span className="text-[#e60000]">*</span>
          </label>
          <Select
           onValueChange={(value)=>setDocumentType(value)}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {
                  Props.activityDropdown && Props.activityDropdown.document.filter((item,index)=>{
                    if(item.activity_type == activityType){
                      return item
                    }
                  }).map((item,index)=>{
                    return (
                      <SelectItem value={item.name}>{item.document_name}</SelectItem>
                    )
                  })
                }
                    
              </SelectContent>
            </Select>
        </div>
        <div className="flex justify-around col-span-1 text-nowrap">
          <label
            htmlFor="file"
            className="lable hover:cursor-pointer "
          >
            Do you have filled document?
            <span className="font-semibold"> Upload here</span>
            <div className="bg-[#efedff] mt-2 py-[7px] flex gap-5 pl-5 rounded-md shadow-md mr-10">
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector"
                  d="M16.6432 2.82358e-05C15.545 -0.00275969 14.457 0.200933 13.4423 0.599335C12.4275 0.997738 11.506 1.58295 10.7311 2.32116L0.491261 12.037C0.177131 12.3344 0.000418662 12.738 7.42955e-07 13.159C-0.000417176 13.5801 0.175493 13.984 0.489033 14.282C0.802572 14.58 1.22806 14.7476 1.67189 14.748C2.11572 14.7484 2.54154 14.5815 2.85567 14.2841L13.0999 4.56408C14.0529 3.73299 15.3076 3.28337 16.6018 3.30915C17.896 3.33494 19.1297 3.83414 20.0451 4.70247C20.9604 5.57079 21.4867 6.74106 21.5138 7.96879C21.541 9.19651 21.067 10.3867 20.1909 11.2907L8.37336 22.5011C8.05653 22.7812 7.63747 22.9336 7.20448 22.9264C6.77148 22.9191 6.35836 22.7527 6.05214 22.4622C5.74592 22.1718 5.57051 21.7799 5.56287 21.3691C5.55523 20.9584 5.71595 20.5608 6.01118 20.2603L17.8288 9.04992C18.1429 8.75221 18.3195 8.34832 18.3197 7.9271C18.3199 7.50587 18.1437 7.10182 17.8299 6.80383C17.516 6.50584 17.0903 6.33832 16.6462 6.33812C16.2022 6.33793 15.7763 6.50507 15.4621 6.80278L3.64232 18.0174C2.76621 18.9214 2.29223 20.1116 2.31941 21.3393C2.3466 22.567 2.87284 23.7373 3.7882 24.6056C4.70355 25.474 5.93721 25.9732 7.23143 25.9989C8.52566 26.0247 9.78032 25.5751 10.7333 24.744L22.5509 13.5337C23.3296 12.7992 23.947 11.9256 24.3674 10.9633C24.7878 10.0009 25.0028 8.96908 25 7.92741C24.9976 5.82562 24.1164 3.81056 22.5497 2.32438C20.983 0.838189 18.8588 0.00226656 16.6432 2.82358e-05Z"
                  fill="#4430BF"
                />
              </svg>
              <h1 className="mt-[2px]">{"Upload File"}</h1>
            </div>
            <Input type="file" onChange={(e)=>{handleFileUpload(e)}} id="file" className="hidden" multiple></Input>
          </label>
          <Button className="bg-white text-black border text-md font-normal" onClick={()=>FileUpload()}>
          Add
        </Button>
        </div>
      </div>
      <div className="border border-[#848484] p-4 rounded-2xl w-full grid grid-cols-2 gap-4 bg-white">
        <div className="col-span-1 flex flex-col gap-3">
          <h1 className="text-black pl-4">
            Document type:{" "}
            <span className="font-semibold">Pre-Activity</span>
          </h1>
          <Table>
            <TableHeader>
              <TableRow className="text-black">
                <TableHead
                  className={"bg-[#E0E9FF] rounded-l-2xl text-[15px]"}
                >
                  Documents Uploded
                </TableHead>
                <TableHead className="bg-[#E0E9FF] rounded-r-2xl"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="text-black">
                <TableCell>No Data</TableCell>
                <TableCell>
                  <div className="flex justify-around">
                    <div className="hover:cursor-pointer">
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.6256 19.5H14.625H3.375C2.88779 19.5 2.48452 19.3344 2.13785 18.992C1.79142 18.6499 1.62565 18.254 1.625 17.7774V3.89583C1.625 3.30903 1.1493 2.83333 0.5625 2.83333C0.527982 2.83333 0.5 2.80535 0.5 2.77083V2.22222C0.5 1.88471 0.773604 1.61111 1.11111 1.61111H5.06944C5.65241 1.61111 6.125 1.13852 6.125 0.555556C6.125 0.524873 6.14987 0.5 6.18056 0.5H11.8194C11.8501 0.5 11.875 0.524873 11.875 0.555556C11.875 1.13852 12.3476 1.61111 12.9306 1.61111H16.8889C17.2264 1.61111 17.5 1.88471 17.5 2.22222V2.77083C17.5 2.80535 17.472 2.83333 17.4375 2.83333C16.8507 2.83333 16.375 3.30903 16.375 3.89583V17.7778C16.375 18.2534 16.2097 18.6493 15.863 18.9923C15.5165 19.3351 15.1133 19.5006 14.6256 19.5ZM5.125 14.4306C5.125 15.328 5.85254 16.0556 6.75 16.0556C7.64746 16.0556 8.375 15.328 8.375 14.4306V6.68056C8.375 5.78309 7.64746 5.05556 6.75 5.05556C5.85254 5.05556 5.125 5.78309 5.125 6.68056V14.4306ZM9.625 14.4306C9.625 15.328 10.3525 16.0556 11.25 16.0556C12.1475 16.0556 12.875 15.328 12.875 14.4306V6.68056C12.875 5.78309 12.1475 5.05556 11.25 5.05556C10.3525 5.05556 9.625 5.78309 9.625 6.68056V14.4306Z"
                          fill="#D1D1D1"
                          stroke="#D1D1D1"
                        />
                      </svg>
                    </div>
                    <div className="hover:cursor-pointer">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask id="path-1-inside-1_605_28668" fill="white">
                          <path d="M3.52929 4.70557H2.35286C1.72884 4.70557 1.13038 4.95346 0.689136 5.3947C0.24789 5.83595 0 6.43441 0 7.05842V17.6463C0 18.2703 0.24789 18.8688 0.689136 19.31C1.13038 19.7512 1.72884 19.9991 2.35286 19.9991H12.9407C13.5647 19.9991 14.1632 19.7512 14.6044 19.31C15.0457 18.8688 15.2936 18.2703 15.2936 17.6463V16.4699" />
                        </mask>
                        <path
                          d="M2.35286 4.70557V3.70557V4.70557ZM0 7.05842H-1H0ZM0 17.6463H-1H0ZM3.52929 3.70557H2.35286V5.70557H3.52929V3.70557ZM2.35286 3.70557C1.46362 3.70557 0.610812 4.05881 -0.0179709 4.6876L1.39624 6.10181C1.64995 5.8481 1.99406 5.70557 2.35286 5.70557V3.70557ZM-0.0179709 4.6876C-0.646754 5.31638 -1 6.16919 -1 7.05842H1C1 6.69962 1.14253 6.35552 1.39624 6.10181L-0.0179709 4.6876ZM-1 7.05842V17.6463H1V7.05842H-1ZM-1 17.6463C-1 18.5355 -0.646754 19.3883 -0.0179709 20.0171L1.39624 18.6029C1.14253 18.3492 1 18.0051 1 17.6463H-1ZM-0.0179709 20.0171C0.610811 20.6459 1.46362 20.9991 2.35286 20.9991V18.9991C1.99406 18.9991 1.64995 18.8566 1.39624 18.6029L-0.0179709 20.0171ZM2.35286 20.9991H12.9407V18.9991H2.35286V20.9991ZM12.9407 20.9991C13.8299 20.9991 14.6828 20.6459 15.3115 20.0171L13.8973 18.6029C13.6436 18.8566 13.2995 18.9991 12.9407 18.9991V20.9991ZM15.3115 20.0171C15.9403 19.3883 16.2936 18.5355 16.2936 17.6463H14.2936C14.2936 18.0051 14.151 18.3492 13.8973 18.6029L15.3115 20.0171ZM16.2936 17.6463V16.4699H14.2936V17.6463H16.2936Z"
                          fill="#D1D1D1"
                          mask="url(#path-1-inside-1_605_28668)"
                        />
                        <path
                          d="M19.2765 4.21762C19.7398 3.75429 20.0001 3.12588 20.0001 2.47063C20.0001 1.81538 19.7398 1.18696 19.2765 0.72363C18.8131 0.260297 18.1847 8.45587e-09 17.5295 0C16.8742 -8.45587e-09 16.2458 0.260297 15.7825 0.72363L6.61636 9.85705C6.14677 10.325 5.88281 10.9606 5.88281 11.6235C5.88281 13.0008 6.9993 14.1173 8.37655 14.1173C9.03947 14.1173 9.67511 13.8533 10.143 13.3837L19.2765 4.21762ZM14.1178 2.35298L17.6471 5.88227L14.1178 2.35298Z"
                          fill="#D1D1D1"
                        />
                      </svg>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="col-span-1 flex flex-col gap-3">
          <h1 className="text-black pl-4">
            Document type:{" "}
            <span className="font-semibold">Pre-Activity</span>
          </h1>
          <Table>
            <TableHeader>
              <TableRow className="text-black">
                <TableHead
                  className={"bg-[#E0E9FF] rounded-l-2xl text-[15px]"}
                >
                  Documents Uploded
                </TableHead>
                <TableHead className="bg-[#E0E9FF] rounded-r-2xl"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="text-black">
                <TableCell>No Data</TableCell>
                <TableCell>
                  <div className="flex justify-around">
                    <div className="hover:cursor-pointer">
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.6256 19.5H14.625H3.375C2.88779 19.5 2.48452 19.3344 2.13785 18.992C1.79142 18.6499 1.62565 18.254 1.625 17.7774V3.89583C1.625 3.30903 1.1493 2.83333 0.5625 2.83333C0.527982 2.83333 0.5 2.80535 0.5 2.77083V2.22222C0.5 1.88471 0.773604 1.61111 1.11111 1.61111H5.06944C5.65241 1.61111 6.125 1.13852 6.125 0.555556C6.125 0.524873 6.14987 0.5 6.18056 0.5H11.8194C11.8501 0.5 11.875 0.524873 11.875 0.555556C11.875 1.13852 12.3476 1.61111 12.9306 1.61111H16.8889C17.2264 1.61111 17.5 1.88471 17.5 2.22222V2.77083C17.5 2.80535 17.472 2.83333 17.4375 2.83333C16.8507 2.83333 16.375 3.30903 16.375 3.89583V17.7778C16.375 18.2534 16.2097 18.6493 15.863 18.9923C15.5165 19.3351 15.1133 19.5006 14.6256 19.5ZM5.125 14.4306C5.125 15.328 5.85254 16.0556 6.75 16.0556C7.64746 16.0556 8.375 15.328 8.375 14.4306V6.68056C8.375 5.78309 7.64746 5.05556 6.75 5.05556C5.85254 5.05556 5.125 5.78309 5.125 6.68056V14.4306ZM9.625 14.4306C9.625 15.328 10.3525 16.0556 11.25 16.0556C12.1475 16.0556 12.875 15.328 12.875 14.4306V6.68056C12.875 5.78309 12.1475 5.05556 11.25 5.05556C10.3525 5.05556 9.625 5.78309 9.625 6.68056V14.4306Z"
                          fill="#D1D1D1"
                          stroke="#D1D1D1"
                        />
                      </svg>
                    </div>
                    <div className="hover:cursor-pointer">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask id="path-1-inside-1_605_28668" fill="white">
                          <path d="M3.52929 4.70557H2.35286C1.72884 4.70557 1.13038 4.95346 0.689136 5.3947C0.24789 5.83595 0 6.43441 0 7.05842V17.6463C0 18.2703 0.24789 18.8688 0.689136 19.31C1.13038 19.7512 1.72884 19.9991 2.35286 19.9991H12.9407C13.5647 19.9991 14.1632 19.7512 14.6044 19.31C15.0457 18.8688 15.2936 18.2703 15.2936 17.6463V16.4699" />
                        </mask>
                        <path
                          d="M2.35286 4.70557V3.70557V4.70557ZM0 7.05842H-1H0ZM0 17.6463H-1H0ZM3.52929 3.70557H2.35286V5.70557H3.52929V3.70557ZM2.35286 3.70557C1.46362 3.70557 0.610812 4.05881 -0.0179709 4.6876L1.39624 6.10181C1.64995 5.8481 1.99406 5.70557 2.35286 5.70557V3.70557ZM-0.0179709 4.6876C-0.646754 5.31638 -1 6.16919 -1 7.05842H1C1 6.69962 1.14253 6.35552 1.39624 6.10181L-0.0179709 4.6876ZM-1 7.05842V17.6463H1V7.05842H-1ZM-1 17.6463C-1 18.5355 -0.646754 19.3883 -0.0179709 20.0171L1.39624 18.6029C1.14253 18.3492 1 18.0051 1 17.6463H-1ZM-0.0179709 20.0171C0.610811 20.6459 1.46362 20.9991 2.35286 20.9991V18.9991C1.99406 18.9991 1.64995 18.8566 1.39624 18.6029L-0.0179709 20.0171ZM2.35286 20.9991H12.9407V18.9991H2.35286V20.9991ZM12.9407 20.9991C13.8299 20.9991 14.6828 20.6459 15.3115 20.0171L13.8973 18.6029C13.6436 18.8566 13.2995 18.9991 12.9407 18.9991V20.9991ZM15.3115 20.0171C15.9403 19.3883 16.2936 18.5355 16.2936 17.6463H14.2936C14.2936 18.0051 14.151 18.3492 13.8973 18.6029L15.3115 20.0171ZM16.2936 17.6463V16.4699H14.2936V17.6463H16.2936Z"
                          fill="#D1D1D1"
                          mask="url(#path-1-inside-1_605_28668)"
                        />
                        <path
                          d="M19.2765 4.21762C19.7398 3.75429 20.0001 3.12588 20.0001 2.47063C20.0001 1.81538 19.7398 1.18696 19.2765 0.72363C18.8131 0.260297 18.1847 8.45587e-09 17.5295 0C16.8742 -8.45587e-09 16.2458 0.260297 15.7825 0.72363L6.61636 9.85705C6.14677 10.325 5.88281 10.9606 5.88281 11.6235C5.88281 13.0008 6.9993 14.1173 8.37655 14.1173C9.03947 14.1173 9.67511 13.8533 10.143 13.3837L19.2765 4.21762ZM14.1178 2.35298L17.6471 5.88227L14.1178 2.35298Z"
                          fill="#D1D1D1"
                        />
                      </svg>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex justify-end pt-5 gap-4">
        <Button className="bg-white text-black border text-md font-normal">
          {" "}
          Save as Draft
        </Button>
        <Button className="bg-white text-black border text-md font-normal">
          Back
        </Button>
        <Button className="bg-[#4430bf] text-white text-md font-normal border" onClick={(e)=>handleSubmit(e)}>
          Next
        </Button>
      </div>
    </div>)
  );
}

export default form4