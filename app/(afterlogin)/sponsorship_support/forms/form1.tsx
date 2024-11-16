import React, { useState } from "react";
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
import {budget_options}  from "@/app/page";
import {business_unit_options} from "@/app/page";
type Props = {
  nextForm: () => void;
};

const Form1 = ({ ...Props }: Props) => {
  const[businessUnit, setBusinessUnit] = useState("");
  const[budget, setBudget] = useState("");  
  return (
    // </div>
    (<div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Basic Detail
      </h1>
      <div className="grid grid-cols-2 gap-12 pb-8">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Company Name <span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Business Unit<span className="text-[#e60000]">*</span>
          </label>
          <Select onValueChange={setBusinessUnit}>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="--Selected--" />
            </SelectTrigger>
            <SelectContent>
              { 
                business_unit_options && business_unit_options.map((item:string,index:number)=>(
                  <SelectItem key={index} value={item}>{item}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Event requester<span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            event cost center<span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Budget<span className="text-[#e60000]">*</span>
          </label>
          <Select onValueChange={setBudget}>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="--Selected--" />
            </SelectTrigger>
            <SelectContent>
              { 
                budget_options && budget_options.map((item:string,index:number)=>(
                  <SelectItem key={index} value={item}>{item}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>

        {
          businessUnit == "Endosurgery" && budget == "National" &&          
          <div className="flex flex-col gap-2">
            <label className="lable">
              Budget Sub Type<span className="text-[#e60000]">*</span>
            </label>
            <Select>
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="--Selected--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">P1</SelectItem>
                <SelectItem value="dark">P2</SelectItem>
                <SelectItem value="system">P3</SelectItem>
                <SelectItem value="system">Trade</SelectItem>
              </SelectContent>
            </Select>
          </div>

        }

        <div className="flex flex-col gap-2">
          <label className="lable">
            Therapy<span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="lable">
            State<span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="lable">
            City<span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="lable">
            Reporting Head<span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Sub Type Of Activity<span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Faculties<span className="text-[#e60000]">*</span>
          </label>
          <Textarea className='text-black shadow-md' placeholder='Type Here' />
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Participants<span className="text-[#e60000]">*</span>
          </label>
          <Textarea className='text-black shadow-md' placeholder='Type Here' />
        </div>
      </div>

      <div className="py-8">
          <h1 className="text-black text-2xl font-normal uppercase pb-8">
            Sponsorship Details
          </h1>
          <div className="grid md:grid-cols-2 md:gap-6">
                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Organizer Name<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="Type Here"
                    ></Input>
                </div>
                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Sponsorship Amount<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="Type Here"
                    ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="lable">
                    Currency<span className="text-[#e60000]">*</span>
                  </label>
                  <Select>
                    <SelectTrigger className="dropdown">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                    Entitlement in Lieu of sponsorship<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="Type Here"
                    ></Input>
                </div>
            </div>
      </div>

      <div className="py-8">
          <h1 className="text-black text-2xl font-normal uppercase pb-8">
            Other Details
          </h1>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                    Comment (If Any)<span className="text-[#e60000]">*</span>
                </label>
                <Input
                    className="text-black shadow md:rounded-xl md:py-5"
                    placeholder="Type Here"
                ></Input>
            </div>
            <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                    Any Additional Expense<span className="text-[#e60000]">*</span>
                </label>
                <Input
                    className="text-black shadow md:rounded-xl md:py-5"
                    placeholder="Type Here"
                ></Input>
            </div>
          </div>
      </div>

      <div className="flex justify-end pt-5 gap-4">
        <Button className="bg-white text-black border text-md font-normal">
          {" "}
          Save as Draft
        </Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={Props.nextForm}>Next</Button>
      </div>
    </div>
    )
  );
};

export default Form1;
