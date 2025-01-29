"use client";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
type passanger = {
  name: string;
  full_name: string;
  gender: string;
  source: string;
  destination: string;
  date_of_birth: string;
  age: number;
  aadhar_no: string;
  remarks: string;
  event_no: string;
  date_of_journey: string;
  file: file;
  mode_of_transport: string;
  travel_type: string
};
type file = {
  name: string,
  file_name: string,
  file_url: string,
  owner: string;
  creation: string;
}
type Props = {
  handleDialog: () => void;
  fetchData: () => void;
  setEditPassengerData: React.Dispatch<React.SetStateAction<passanger | null>>;
  refno: string | null;
  editpassengerdata: passanger | null
};


const addPassangerDialog = ({ ...Props }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const date_of_birth_ref = useRef<any>(null);
  const date_of_journey = useRef<any>(null);
  const [formdata, setFormData] = useState<passanger | null>(Props?.editpassengerdata);
  const [passengerfileName, setPassengerFileName] = useState<string | null>(null);
  const [passengerfile, setPassenegrFile] = useState<File | null>(null);
  const inputFile = useRef<any>(null);
  const handleStartDateClick = () => {
    if (date_of_birth_ref.current) {
      date_of_birth_ref.current.showPicker(); // For modern browsers
      date_of_birth_ref.current.focus(); // Fallback for older browsers
    }
  };
  const handleJourneyDateClick = () => {
    if (date_of_journey.current) {
      date_of_journey.current.showPicker(); // For modern browsers
      date_of_journey.current.focus(); // Fallback for older browsers
    }
  };
  const handleDialogClose = () => {
    setFormData(null)
    Props.setEditPassengerData(null)
    Props.handleDialog();
  }
  const handlePassangerSubmit = async () => {
    const formData = new FormData();
    Object.entries(formdata ? formdata : '').forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (Props.refno) {
      formData.append('event_no', Props.refno);
    }

    if (passengerfile) {
      formData.append('file', passengerfile);
    }

    console.log(...formData.entries(), 'formData');
    try {
      const response = await fetch("/api/addPassanger", {
        method: "POST",
        headers: {
          //  'Content-Type': 'multipart/form-data',
        },
        credentials: "include",
        body: formData,
      });
      if (response.ok) {
        toast.success("Passanger Added Successfully");
        Props.fetchData();
        Props.handleDialog();
        setFormData(null)
        setPassengerFileName(null)
        setPassenegrFile(null)
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  const handlefieldChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (name === 'date_of_birth') {
      const passenger_age = calculateAge(value);
      setFormData((prev) => ({ ...prev, age: passenger_age } as passanger));
    }

  };
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  const handleReset = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPassenegrFile(e.target.files?.[0]);
      setPassengerFileName(e.target.files[0]?.name);
    } else {
      handleReset();
      setPassengerFileName(null);
    }
  };

  console.log(formdata, "formdata");
  console.log(passengerfile, 'passengerfile')

  return (
    <>
      <div className=" absolute z-50 flex pt-10 items-center justify-center bg-black bg-opacity-50 w-full h-full inset-0 pb-40">
        <div className="bg-white rounded-lg p-4 text-black max-h-[80vh] overflow-hidden w-[80%]">
          <div className="flex justify-between">
            <h1 className="pb-1 text-[20px]">Passenger Details</h1>
            <div
              className="text-black font-bold cursor-pointer"
              onClick={() => {
                handleDialogClose()
              }}
            >
              X
            </div>
          </div>
          <div className="grid grid-cols-3 py-4 gap-6">
            <div className="flex flex-col gap-2">
              <label className="lable">
                Event No
                <span className="text-[#e60000]">*</span>
              </label>
              <Input
                className="text-black shadow"
                placeholder="Type Here"
                name="event_no"
                disabled
                value={Props?.refno as string}
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <label className="lable">
                Full Name
                <span className="text-[#e60000]">*</span>
              </label>
              <Input
                className="text-black shadow"
                placeholder="Type Here"
                name="full_name"
                value={formdata?.full_name ? formdata.full_name : ''}
                onChange={(e) => handlefieldChange(e)}
              ></Input>
            </div>
            <div className="flex flex-col col-span-1 gap-2">
              <label className="lable">
                Gender<span className="text-[#e60000]">*</span>
              </label>
              <Select
                onValueChange={(value) => handleSelectChange(value, "gender")}
                value={formdata?.gender ? formdata.gender : ''}
              >
                <SelectTrigger className="dropdown">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">{"Male"}</SelectItem>
                  <SelectItem value="Female">{"Female"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="lable">
                Source
                <span className="text-[#e60000]">*</span>
              </label>
              <Input
                className="text-black shadow"
                placeholder="Type Here"
                name="source"
                value={formdata?.source ? formdata.source : ''}
                onChange={(e) => {
                  handlefieldChange(e);
                }}
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <label className="lable">
                Destination
                <span className="text-[#e60000]">*</span>
              </label>
              <Input
                className="text-black shadow"
                placeholder="Type Here"
                name="destination"
                value={formdata?.destination ? formdata.destination : ''}
                onChange={(e) => {
                  handlefieldChange(e);
                }}
              ></Input>
            </div>
            <div
              className="flex flex-col gap-2"
              onClick={() => {
                handleJourneyDateClick();
              }}
            >
              <label className="lable">
                Date of Journey
                <span className="text-[#e60000]">*</span>
              </label>
              <Input
                type="date"
                id="date_of_journey"
                ref={date_of_journey}
                className="dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
                name="date_of_journey"
                value={formdata?.date_of_journey ? formdata.date_of_journey : ''}
                onChange={(e) => {
                  handlefieldChange(e);
                }}
              ></Input>
            </div>
            <div
              className="flex flex-col gap-2"
              onClick={() => {
                handleStartDateClick();
              }}
            >
              <label className="lable">
                Date of Birth
                <span className="text-[#e60000]">*</span>
              </label>
              <Input
                type="date"
                id="date_of_birth"
                ref={date_of_birth_ref}
                className="dropdown h-10 rounded-md border border-neutral-200  bg-white px-3 py-2 text-sm"
                name="date_of_birth"
                value={formdata?.date_of_birth ? formdata.date_of_birth : ''}
                onChange={(e) => {
                  handlefieldChange(e);
                }}
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <label className="lable">
                Age
                <span className="text-[#e60000]">*</span>
              </label>
              <Input
                className="text-black shadow"
                placeholder="Type Here"
                name="age"
                value={formdata?.age ? formdata.age : ''}
                onChange={(e) => {
                  handlefieldChange(e);
                }}
              ></Input>
            </div>
            <div className="flex flex-col col-span-1 gap-2">
              <label className="lable">
                Travel Type<span className="text-[#e60000]">*</span>
              </label>
              <Select
                onValueChange={(value) => handleSelectChange(value, "travel_type")}
                value={formdata?.travel_type ? formdata.travel_type : ''}
              >
                <SelectTrigger className="dropdown">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Domestic">{"Domestic"}</SelectItem>
                  <SelectItem value="Internationl">{"Internationl"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col col-span-1 gap-2">
              <label className="lable">
                Mode of Transport<span className="text-[#e60000]">*</span>
              </label>
              <Select
                onValueChange={(value) => handleSelectChange(value, "mode_of_transport")}
                value={formdata?.mode_of_transport ? formdata.mode_of_transport : ''}
              >
                <SelectTrigger className="dropdown">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Flight">{"Flight"}</SelectItem>
                  <SelectItem value="Train">{"Train"}</SelectItem>
                  <SelectItem value="Car">{"Car"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <div className=" grid grid-cols-1  text-nowrap relative">
              <label
                htmlFor="file"
                className="lable hover:cursor-pointer  "
              >
                Do you have filled document?
                <span className="font-semibold"> Upload here</span>
                <div className="bg-[#efedff] mt-2 py-[7px] flex items-center gap-5 pl-5 rounded-md shadow-md mr-10">
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
                  <span className="font-medium truncate  max-w-[250px]">{passengerfileName ? passengerfileName : ' Receipt/Bill'}</span>
                </div>
                <Input type="file" onChange={(e) => { handleFileChange(e) }} id="file" className="hidden"
                  ref={inputFile}
                ></Input>
              </label>
            </div> */}
            <div className="grid grid-cols-1 text-nowrap relative">
              <label
                htmlFor="file"
                className="lable hover:cursor-pointer"
              >
                Do you have filled document?
                <span className="font-semibold"> Upload here</span>
                <div className="bg-[#efedff] mt-2 py-[7px] flex items-center gap-5 pl-5 rounded-md shadow-md mr-10">
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
                  <span className="font-medium truncate max-w-[250px]">
                    {passengerfileName ? passengerfileName : 'Receipt/Bill'}
                  </span>
                </div>
                <Input
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                  id="file"
                  className="hidden"
                  ref={inputFile}
                />
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <label className="lable">
                Remarks<span className="text-[#e60000]">*</span>
              </label>
              <textarea
                className="text-black shadow-md border text-[15px] h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2"
                placeholder="Type Here"
                name="remarks"
                onChange={(e) => {
                  handlefieldChange(e);
                }}
                value={formdata?.remarks ? formdata.remarks : ''}
              />
            </div>
          </div>
          <div className="flex justify-between pb-4">
            <div>
            {formdata?.file?.file_url ? (
                <Link href={formdata?.file.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex gap-2 mt-2 hover:underline">
                    <Image src={'/svg/view.svg'} alt='viewsvg' width={24} height={18} /> <span className="underline">View File</span>
                </Link>
              ) : (
                <>
                </>
              )}
            </div>
            <Button
              className={`bg-blue-400 text-white`}
              onClick={() => {
                handlePassangerSubmit();
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
};

export default addPassangerDialog;
