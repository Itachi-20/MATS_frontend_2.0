"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import Documents from "@/components/documents";
import { Button } from "@/components/ui/button";
import EventDetails from "@/components/event_Details";
import TotalExpense from "@/components/total_Expense";
import BasicDetails from "@/components/basic_Details";
import LogisticBudget from "@/components/logistics_budget";
import CompensationBudget from "@/components/compensation_budget";

export default function EventListPage () {

  const router = useRouter();

  const handlClick = () => {
    router.push("/audit_trail/${id}")
  }

  return (
    
        <div className="md:px-7 md:pb-7 md:pt-4 w-full relative z-20 text-black">
          <div className="pb-5">
            <div className="flex justify-between">
                <h1 className=" md:text-[30px] md:font-medium capitalize md:pb-4"> Training and Education</h1>
                <div className="flex gap-4 bg-white">
                  <Button className="border border-[#4430bf] text-[#4430bf] px-6" onClick={handlClick}>Audit Trail</Button>
                  <Button className="bg-white text-black border px-8 hover:bg-white">Back</Button>
                </div>
              </div>
            <div className="flex border rounded-xl justify-between p-3 bg-white gap-4">
              <div className="grid grid-cols-2 w-full gap-4">
              <div className="col-span-1">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Number</h1>
                <h1 className="text-center">1234567</h1>
              </div>
              <div className="col-span-1 ">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Date</h1>
                <h1 className="text-center">11/11/24</h1>
              </div>
              </div>
            </div>
          </div>
        <BasicDetails />
        <EventDetails />
       <LogisticBudget />
       <CompensationBudget />
        <TotalExpense />            
        <Documents /> 
        </div>
  )}
