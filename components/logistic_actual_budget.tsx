'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useRouter } from 'nextjs-toploader/app';
import DialogBox from './dialogbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import FilePopup from '../components/travel_desk/filePopup'
import { useAuth } from "../app/context/AuthContext";
import SimpleFileUpload from "@/components/multiple_file_upload";

type occurrence_history = {
    occurrence_no:number,
    actual_amount:number,
    gst:number,
    total_amount:number,
    occurrence_date:string
}

type file = {
    name:string,
    file_name:string,
    file_url:string
}

type travel_vendors = {
    vendor_type:string,
    vendor_name:string,
    actual_amount:number,
    gst:number,
    total_amount:number,
    upload_bill:number,
    remarks:string
    files:file[]
    name:string
  }

  type vendorName = {
    name:string,
    vendor_name:string
  }

  type vendorType ={
    name:string,
    vendor_type:string
    }
type Props = {
    travel_vendors:travel_vendors[]
    vendor_type:vendorType[]
    dropdown_gst:{
        name:string
    }[]
    refno:string
    occurrence_history:occurrence_history[]
    role:string | undefined
}


export default function LogisticActualBudget({...Props}:Props) {
    const router = useRouter();
    const [fileName, setFileName] = useState();
    const [vendorName,setVendorName] = useState<vendorName[]>();
    const [actualAmount,setActualAmount] = useState<number | any>();
    const [totalAmount,setTotaAmount] = useState<number | any>();
    const [gst,setgst] = useState<any>();
    const [file,setFile] = useState<FileList | null>();
    const [vendorname,setvendorname] = useState<string>();
    const [vendorType,setVendorType] = useState<string>();
    const [remark,setRemarks] = useState<string>();
    const [isFilePopup,setIsFilePopup] = useState<boolean>()
    const [fileData,setFileData] = useState<file[]>()
    const [TravelVendorData,setTravelVendorData] = useState(Props.travel_vendors);
    const { role, name, userid, clearAuthData } = useAuth();
    console.log(TravelVendorData,"88888888888888")
    const [files, setFiles] = useState<File[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null)
  const [fileList, setFileList] = useState<File[]>([]); //added state 2

    console.log(TravelVendorData,"this is the useefec api data")

    const handleFilePopup = (data:file[])=>{
        setFileData(data);
    }

    const handleClose = ()=>{
        setIsFilePopup((prev)=>!prev)
        setFileData([]);
    }


    const getVendorName = async(value:string)=>{
        try {
            const response = await fetch(`/api/training_and_education/vendorName?vendor_type=${value}`,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                },
                credentials:"include"
            })
            if(response.ok){
                const data = await response.json();
                setVendorName(data.data);
            }
        } catch (error) {
            console.log("server error:- ",error)
        }
    }

    const handleTotalAmount = async(value:number)=>{
        if(value == 0){
            setTotaAmount(actualAmount);
        }else{
         const amount = actualAmount?actualAmount * (value / 100):0;
         const totalAmount = amount + (actualAmount?actualAmount:0);
         setTotaAmount(totalAmount);
        }
    }

      const handleAdd = async()=>{
        const formdata = new FormData();
    
        if (uploadedFiles && uploadedFiles.length > 0) {
          for (let i = 0; i < uploadedFiles.length; i++) {
            formdata.append("file", uploadedFiles[i]); 
          }
        } else {
          console.log("No file to upload");
          return;  
        }
          formdata.append("name",Props.refno)
          formdata.append("vendor_type",vendorType as string);
          formdata.append("vendor_name",vendorname as string)
          formdata.append("amount",actualAmount)
          formdata.append("gst",gst)
          formdata.append("total_amount",totalAmount as string)
          formdata.append("remark",remark as string)
        try {
          const response = await fetch(
            `/api/travel_desk/vendor_add/`,
            {
              method: "POST",
              headers: {
                //"Content-Type": "multipart/form-data",
              },
              body:formdata,
              credentials:'include'
            }
          );
    
          
          if(response.ok) {
            setVendorType("");
            setFile(null);
            setRemarks("");
            setActualAmount(0);
            setgst(0);
            setTotaAmount(0);
            travel_desk_data();
            setUploadedFiles(null);
          } else {
            console.log("Login failed");
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      }
      console.log(Props.refno)
      const handleSubmit = async(type:string)=>{
        try {
            const response = await fetch(`/api/travel_desk/submit/`,{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                credentials:"include",
                body:JSON.stringify({
                    name:Props.refno,
                    action:type
                })

            })
            if(response.ok){
                console.log(await response.json());
                console.log("successfully submited");
                router.push("/travel_desk")
                
            }
        } catch (error) {
            console.log(error)
        }
      }


     const travel_desk_data = async()=>{
        try {
            const response = await fetch(`/api/travel_desk/getVendorData/`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                credentials:"include",
                body:JSON.stringify({
                    name:Props.refno
                })
            })
            if(response.ok){
                const data = await response.json();
                setTravelVendorData(data.data.travel_vendors)
            }
        } catch (error) {
            console.log("server error:- ",error)
        }
    }

    const deleteData = async(name:string)=>{
        try {
            const response = await fetch(`/api/deleteVendor/`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                credentials:"include",
                body:JSON.stringify({
                    name:name
                })
            })
            if(response.ok){
                console.log("successfully deleted");
                travel_desk_data();
            }
        } catch (error) {
            console.log("server error:- ",error)
        }
    }


    const handleNext = () => {
    
    }

    useEffect(()=>{
    },[TravelVendorData])
    return (
        <>
        <div className="md:pb-8">
            {
                role == "Event Travel" && 
                <>
            <div className="flex md:gap-6 justify-between items-center">
                <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
                    LOGISTICS Actual BUDGET
                </h1>
                <div className='flex space-x-6'>
                    <button className='flex space-x-[10px] border-[1px] border-[#4430BF] rounded-[8px] items-center py-[6px] px-6'>
                        <svg width="16" height="16" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M14.8571 9.64286H9.14286V15.3571C9.14286 15.6602 9.02245 15.9509 8.80812 16.1653C8.59379 16.3796 8.30311 16.5 8 16.5C7.6969 16.5 7.40621 16.3796 7.19188 16.1653C6.97755 15.9509 6.85714 15.6602 6.85714 15.3571V9.64286H1.14286C0.839753 9.64286 0.549063 9.52245 0.334735 9.30812C0.120408 9.09379 0 8.8031 0 8.5C0 8.1969 0.120408 7.90621 0.334735 7.69188C0.549063 7.47755 0.839753 7.35714 1.14286 7.35714H6.85714V1.64286C6.85714 1.33975 6.97755 1.04906 7.19188 0.834735C7.40621 0.620407 7.6969 0.5 8 0.5C8.30311 0.5 8.59379 0.620407 8.80812 0.834735C9.02245 1.04906 9.14286 1.33975 9.14286 1.64286V7.35714H14.8571C15.1602 7.35714 15.4509 7.47755 15.6653 7.69188C15.8796 7.90621 16 8.1969 16 8.5C16 8.8031 15.8796 9.09379 15.6653 9.30812C15.4509 9.52245 15.1602 9.64286 14.8571 9.64286Z" fill="#4430BF" />
                        </svg>
                        <span className='text-[18px] font-normal leading-normal text-[#4430BF]'>
                            Add New vendor
                        </span>
                    </button>
                    {/* <button className='flex space-x-[10px] border-[1px] border-[#E5E5E5] rounded-[8px] items-center py-[6px] px-6'>
                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M12.5394 9.64286H8.06739V15.3571C8.06739 15.6602 7.97316 15.9509 7.80542 16.1653C7.63769 16.3796 7.41019 16.5 7.17298 16.5C6.93577 16.5 6.70827 16.3796 6.54054 16.1653C6.3728 15.9509 6.27857 15.6602 6.27857 15.3571V9.64286H1.80652C1.56931 9.64286 1.34181 9.52245 1.17408 9.30812C1.00634 9.09379 0.912109 8.8031 0.912109 8.5C0.912109 8.1969 1.00634 7.90621 1.17408 7.69188C1.34181 7.47755 1.56931 7.35714 1.80652 7.35714H6.27857V1.64286C6.27857 1.33975 6.3728 1.04906 6.54054 0.834735C6.70827 0.620407 6.93577 0.5 7.17298 0.5C7.41019 0.5 7.63769 0.620407 7.80542 0.834735C7.97316 1.04906 8.06739 1.33975 8.06739 1.64286V7.35714H12.5394C12.7767 7.35714 13.0041 7.47755 13.1719 7.69188C13.3396 7.90621 13.4338 8.1969 13.4338 8.5C13.4338 8.8031 13.3396 9.09379 13.1719 9.30812C13.0041 9.52245 12.7767 9.64286 12.5394 9.64286Z" fill="#635E5E" />
                        </svg>
                        <span className='text-[18px] font-normal leading-normal text-[#000]'>
                        Add vendor
                        </span>
                        </button> */}
                </div>
            </div>

            <div className="grid md:grid-cols-3 md:gap-6 mt-[35px]">

                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        vendor type<span className="text-[#e60000]">*</span>
                    </label>
                    <Select
                    onValueChange={(value)=>{getVendorName(value); setVendorType(value)}}
                    >
                        <SelectTrigger className="text-black w-34 shadow focus-visible:ring-transparent lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] text-[9px] sm:font-normal sm:leading-[10.97px]">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Props && Props.vendor_type?.filter((data,index)=>{
                                    if(data.vendor_type == "Hotel" || data.vendor_type == "Travel" || data.vendor_type == "Food"){
                                        return(
                                            data
                                        )
                                    }
                                })
                                .map((item,index)=>{
                                    return (
                                        <SelectItem value={item.name}>{item.vendor_type}</SelectItem>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Vendor Name<span className="text-[#e60000]">*</span>
                    </label>
                    <Select
                     onValueChange={(value)=>setvendorname(value)}
                     >
                        <SelectTrigger className="text-black w-34 shadow focus-visible:ring-transparent lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] text-[9px] sm:font-normal sm:leading-[10.97px]">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                vendorName?.map((item,index)=>{
                                    return (
                                        <SelectItem value={item.name}>{item.vendor_name}</SelectItem>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Actual Amount<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="Type Here"
                        type='number'
                        onChange={(e)=>setActualAmount(e.target.valueAsNumber)}
                        ></Input>
                </div>

                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        GST<span className="text-[#e60000]">*</span>
                    </label>
                    <Select
                    onValueChange={async(value:any)=>{ await handleTotalAmount(value); setgst(value)}}
                    >
                        <SelectTrigger className="text-black w-34 shadow focus-visible:ring-transparent lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] text-[9px] sm:font-normal sm:leading-[10.97px]">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                        {
                                Props && Props.dropdown_gst?.map((item,index)=>{
                                    return (
                                        <SelectItem value={item.name}>{item.name}</SelectItem>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Total Amount<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="No data"
                        value={totalAmount}
                        readOnly={true}
                        ></Input>
                </div>

                
                            <div className="flex flex-col gap-3">
            {/* <h1 className="text-2xl font-bold">
              {fileList.length > 0
                ? `${fileList.length} file${
                    fileList.length !== 1 ? "s" : ""
                  } selected`
                : ""}
            </h1> */}
             <label className="text-black text-sm font-normal capitalize">
            Upload Files<span className="text-[#e60000]">*</span>
          </label>
          <SimpleFileUpload files={files} setFiles={setFiles} setUploadedFiles={setUploadedFiles}  onNext={handleNext} buttonText={'Upload Here'} />
          </div>
                        
               

                <div className="flex flex-col gap-2">
                    <label className="lable">
                        Remarks
                    </label>
                    <Textarea onChange={(e)=>setRemarks(e.target.value)} className='text-black shadow-md' placeholder='No Data' />
                </div>
                <div>

                </div>
                <div className='flex justify-end relative'>
                    <button className='px-6 py-[6px] border-[1px] border-[#4430BF] text-[#4430BF] rounded-[5px] flex justify-end absolute bottom-0 text-[18px] font-normal leading-normal'onClick={()=>handleAdd()}>Add</button>
                </div>
            </div>
                        </>
            }
            <div className="border bg-white h-full p-4 mt-[50px] rounded-[18px]">
                <Table >
                    <TableHeader className={"bg-[#E0E9FF]"}>
                        <TableRow className={"text-nowrap rounded-r-2xl"}>
                            <TableHead className={"text-center rounded-l-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"}>
                                vendor type
                            </TableHead>
                            <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                                vendor Name
                            </TableHead>
                            <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                                Actual Amount
                            </TableHead>
                            <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                                GST
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                }
                            >
                                Total Amount
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                }
                            >
                                Upload Bill
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                }
                            >
                                Remarks
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center rounded-r-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat'] sticky right-0 bg-[#E0E9FF]"
                                }
                            >Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {TravelVendorData &&
                            TravelVendorData?.map((data, index) => {
                                return (
                                    <TableRow key={index} className="text-black text-center text-nowrap lg:text-[16px] sm:text-[10px] text-[10px] font-light leading-normal font-['Poppins'] border-b border-slate-200">
                                        <TableCell>{data.vendor_type}</TableCell>
                                        <TableCell>{data.vendor_name}</TableCell>
                                        <TableCell>{data.actual_amount}</TableCell>
                                        <TableCell>{data.gst}</TableCell>
                                        <TableCell>{data.total_amount}</TableCell>
                                        <TableCell>
                                            
                                                        
                                        <div onClick={()=>{handleFilePopup(data.files);setIsFilePopup((prev)=>!prev)}} className='flex justify-center cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4430BF"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg></div>
                                            
                                        </TableCell>
                                        <TableCell>{data.remarks}</TableCell>
                                        <TableCell className="sticky right-0 bg-white flex lg:space-x-7 sm:space-x-5 space-x-2 border-l justify-end mr-4 border-slate-200">
                                            <Image onClick={()=>deleteData(data.name)} src={"/svg/delete.svg"} width={15} height={20} alt="delete-svg" className="mr-1 lg:w-[15px] lg:h-[20px] sm:w-[12px] sm:h-[17px] w-[8px] h-[13px] cursor-pointer" />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-end pt-20 gap-4">
                {/* <Button onClick={()=>{handleSubmit("Draft")}} className={`${Props.role == "Event Accounts"?"hidden":""} bg-white text-black border rounded-[8px] text-lg leading-normal font-normal px-[50px] py-[10px] font-['Poppins']`}>
                    Save as Draft
                </Button> */}
                <Link href="/">
                    <Button className={`bg-white text-black border rounded-[8px] text-lg leading-normal font-normal px-[50px] py-[10px] font-['Poppins']`}>
                        Back
                    </Button>
                </Link>
                <Button onClick={()=>handleSubmit("Submit")} className={`${Props.role == "Event Accounts"?"hidden":""} bg-white text-black border rounded-[8px] text-lg leading-normal font-normal px-[50px] py-[10px] font-['Poppins']`}>
                    Submit
                </Button>
                <Button onClick={()=>handleSubmit("Approve")} className={`${Props.role == "Event Accounts"?"":"hidden"} bg-white text-black border rounded-[8px] text-lg leading-normal font-normal px-[50px] py-[10px] font-['Poppins']`}>
                    Approve
                </Button>
                {/* <DialogBox button={"Submit"} msg={"Submitted Successfully"} /> */}
                
            </div>
           <div>
             <h1 className="text-black md:text-[30px] md:font-medium uppercase">
               occurrence budget history
                </h1>
            <div className="border bg-white h-full p-4 mt-[20px] rounded-[18px]">
                <Table >
                    <TableHeader className={"bg-[#E0E9FF]"}>
                        <TableRow className={"text-nowrap rounded-r-2xl"}>
                            <TableHead className={"text-center rounded-l-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"}>
                               Occurrence
                            </TableHead>
                            <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                               Occurrence date
                            </TableHead>
                            <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                              Actual Amount
                            </TableHead>
                            <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                                GST
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                }
                            >
                                Total Amount
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] rounded-r-xl lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Total Amount */}
                            </TableHead>
                           
                        </TableRow>
                    </TableHeader>
                    <TableBody className='text-black'>
                        {Props && Props.occurrence_history?.map((data, index) => {
                                return (
                                    <TableRow key={index} className="text-center text-nowrap lg:text-[16px] sm:text-[10px] text-[10px] font-light leading-normal font-['Poppins'] border-b border-slate-200">
                                        <TableCell>{data.occurrence_no}</TableCell>
                                        <TableCell>{data.occurrence_date}</TableCell>
                                        <TableCell>{data.actual_amount}</TableCell>
                                        <TableCell>{data.gst}</TableCell>
                                        <TableCell>{data.total_amount}</TableCell>
                                        <TableCell className="sticky right-0 bg-white flex lg:space-x-7 sm:space-x-5 space-x-2 border-l justify-end mr-4 border-slate-200">
                                            <Image src={"/svg/view.svg"} width={15} height={20} alt="delete-svg" className="lg:w-[15px] lg:h-[20px] mr-1 sm:w-[12px] sm:h-[17px] w-[8px] h-[13px] cursor-pointer" />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </div>
           </div>
        </div>
        {
            isFilePopup && 
            <FilePopup
            handleClose={handleClose}
            data = {fileData}
            />
        }
        </>
    )
}