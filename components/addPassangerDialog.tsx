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

type Props = {
  handleDialog: () => void;
  refno: string | null;
};

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
};

const addPassangerDialog = ({ ...Props }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const date_of_birth_ref = useRef<any>(null);
  const [formdata, setFormData] = useState<any>();
  const [passangerData, setPassangerData] = useState<passanger[]>();

  const handleStartDateClick = () => {
    if (date_of_birth_ref.current) {
      date_of_birth_ref.current.showPicker(); // For modern browsers
      date_of_birth_ref.current.focus(); // Fallback for older browsers
    }
  };

  const handlePassangerSubmit = async () => {
    const updatedFormData = {
      ...formdata,
    };
    if (Props.refno) {
      updatedFormData.event_no = Props.refno;
    }
    try {
      const response = await fetch("/api/addPassanger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedFormData),
      });
      if (response.ok) {
        toast.success("Passanger Added Successfully");
        fetchData();
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
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fetchPassanger/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ refno: Props.refno }),
      });
      if (response.ok) {
        const data = await response.json();
        setPassangerData(data.data);
        setLoading(false);
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };


  const handleDelete = async(name:string)=>{
    try {
        const response = await fetch(
          "/api/deletePassanger/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({name:name})
          }
        );
        if (response.ok) {
            toast.success("Passanger Deleted Successfully");
            fetchData();
        } else {
          console.log("submission failed");
        }
      } catch (error) {
        console.error("Error during Submission:", error);
      }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(passangerData, "this is pasangers data");

  return (
    <>
      <div className=" absolute z-50 flex pt-10 items-center justify-center bg-black bg-opacity-50 w-full h-full inset-0 pb-40">
        <div className="bg-white rounded-lg p-4 text-black max-h-[80vh] overflow-hidden w-[80%]">
          <div className="flex justify-between">
            <h1 className="pb-1 text-[20px]">Passanger Details</h1>
            <div
              className="text-black font-bold cursor-pointer"
              onClick={() => {
                Props.handleDialog();
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
                onChange={(e) => handlefieldChange(e)}
              ></Input>
            </div>
            <div className="flex flex-col col-span-1 gap-2">
              <label className="lable">
                Gender<span className="text-[#e60000]">*</span>
              </label>
              <Select
                onValueChange={(value) => handleSelectChange(value, "gender")}
              >
                <SelectTrigger className="dropdown">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">{"Male"}</SelectItem>
                  <SelectItem value="Female">{"Female"}</SelectItem>
                  <SelectItem value="Other">{"Prefer Not To Say"}</SelectItem>
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
                className="dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
                name="date_of_birth"
                onChange={(e) => {
                  handlefieldChange(e);
                }}
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <label className="lable">
                Aadhar Card
                <span className="text-[#e60000]">*</span>
              </label>
              <Input
                className="text-black shadow"
                placeholder="Type Here"
                name="aadhar_no"
                onChange={(e) => {
                  handlefieldChange(e);
                }}
              ></Input>
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
              />
            </div>
          </div>
          <div className="flex justify-end pb-4">
            <Button
              className={`bg-blue-400 text-white`}
              onClick={() => {
                handlePassangerSubmit();
              }}
            >
              Add
            </Button>
          </div>
          <div className="overflow-y-scroll max-h-[200px] relative">
            <Table className="">
              <TableHeader className={"bg-[#E0E9FF] sticky top-0 z-20"}>
                <TableRow className={"text-nowrap rounded-r-2xl"}>
                  <TableHead
                    className={
                      "text-center rounded-l-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Event No.
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Full Name
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Gender
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Source
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Destination
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Age
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Date Of Birth
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Aadhar Card
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
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat'] rounded-r-xl"
                    }
                  >
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={9}>
                      <>
                        <div className="flex items-center justify-center">
                          <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </div>
                      </>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : passangerData ? (
                <TableBody className="overflow-y-scroll">
                  {passangerData &&
                    passangerData?.map((data, index) => {
                      return (
                        <TableRow
                          key={index}
                          className="text-center text-nowrap"
                        >
                          <TableCell>{data.name ?? "-"}</TableCell>
                          <TableCell>{data.full_name ?? "-"}</TableCell>
                          <TableCell>{data.gender ?? "-"}</TableCell>
                          <TableCell>{data.source ?? "-"} </TableCell>
                          <TableCell>{data.destination ?? "-"} </TableCell>
                          <TableCell>{data.age ?? "-"}</TableCell>
                          <TableCell>{data.date_of_birth ?? ""}</TableCell>
                          <TableCell>{data.aadhar_no ?? "-"}</TableCell>
                          <TableCell>{data.remarks ?? "-"}</TableCell>
                          <TableCell>
                            <div className="flex justify-center cursor-pointer" onClick={()=>handleDelete(data.name)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#EA3323"
                              >
                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                              </svg>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={9}>
                      <div className="flex justify-center items-center">
                        No Result.
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
};

export default addPassangerDialog;
