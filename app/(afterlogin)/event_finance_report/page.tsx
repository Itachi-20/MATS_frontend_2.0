"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/pagination";
import { useState } from "react";
import EventFinanceReportPopup from "@/components/event_finance_report_popup";
import {Table, TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";

type FinanceReportTable = {
    request_number: string;
    event_type: string;
    event_date: string;
    event_end_date:string;
    vendor_code: number;
    vendor_name:string;
    total_expense:number;
    region:string;
    expense_status:string;
    evenet_requester: string;
    created_by:string;
    date:string;
    pre_activity_approved_by_final_approver:string;
    post_activity_approved_by_final_approver:string;
    post_activity_approved_by_finance:string;
    pre_activity_approved_by_finance:string;
    document_number:number;
    posting_date:string;
    invoice_number:string;
    date2:string;
    basic_amount:number;
    division:string;
    gl_number:string;
    gl_name:string;
    cost_center:string;
    cc_name:string;
    nature:string;
    company_name:string;
    gst:string;
    invoice_amount:number;
    invoice_documnet:string;
    tds:string;
    net_amount:number;
    utr:string;
    payment_date:string;
    budget:number;
    therapy:string;
    zone:string;
    state:string;
    city:string;
    narration:string;
  };

export default function FinanceReport () {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;    
  const handlePageChange = (page: React.SetStateAction<number>) => {
      setCurrentPage(page);
      // Fetch your data for the new page here
    };

    const financeDatas: FinanceReportTable[] = [
        {
            request_number:"Lorem ipsum",
            event_type: "type-1",
            event_date: "11/11/23",
            event_end_date:"11/11/23",
            vendor_code: 217317,
            vendor_name:"abc",
            total_expense:3300,
            region:"Name 0001",
            expense_status:"Name 0001",
            evenet_requester: "Name 0001",
            created_by:"Name 0001",
            date:"11/11/23",
            pre_activity_approved_by_final_approver:"Name 0001",
            post_activity_approved_by_final_approver:"Name 0001",
            post_activity_approved_by_finance:"Name 0001",
            pre_activity_approved_by_finance:"Name 0001",
            document_number:127621,
            posting_date:'11/11/23',
            invoice_number:'abc123',
            date2:"11/11/23",
            basic_amount:127112,
            division:"division",
            gl_number:"125cc",
            gl_name:"glname",
            cost_center:'tewtew',
            cc_name:'Name 0001',
            nature:'Name 0001',
            company_name:'Name 0001',
            gst:'Name 0001',
            invoice_amount:2165327,
            invoice_documnet:'ffff',
            tds:'asfhsa',
            net_amount:1265126,
            utr:'asdjujsad',
            payment_date:"11/11/23",
            budget:52517172,
            therapy:'asghsa',
            zone:'asghas',
            state:"uttar pradesh",
            city:'lukhnow',
            narration:'remarks'
          },
          {
            request_number:"Lorem ipsum",
            event_type: "type-1",
            event_date: "11/11/23",
            event_end_date:"11/11/23",
            vendor_code: 217317,
            vendor_name:"abc",
            total_expense:3300,
            region:"Name 0001",
            expense_status:"Name 0001",
            evenet_requester: "Name 0001",
            created_by:"Name 0001",
            date:"11/11/23",
            pre_activity_approved_by_final_approver:"Name 0001",
            post_activity_approved_by_final_approver:"Name 0001",
            post_activity_approved_by_finance:"Name 0001",
            pre_activity_approved_by_finance:"Name 0001",
            document_number:127621,
            posting_date:'11/11/23',
            invoice_number:'abc123',
            date2:"11/11/23",
            basic_amount:127112,
            division:"division",
            gl_number:"125cc",
            gl_name:"glname",
            cost_center:'tewtew',
            cc_name:'Name 0001',
            nature:'Name 0001',
            company_name:'Name 0001',
            gst:'Name 0001',
            invoice_amount:2165327,
            invoice_documnet:'ffff',
            tds:'asfhsa',
            net_amount:1265126,
            utr:'asdjujsad',
            payment_date:"11/11/23",
            budget:52517172,
            therapy:'asghsa',
            zone:'asghas',
            state:"uttar pradesh",
            city:'lukhnow',
            narration:'remarks'
          },
          {
            request_number:"Lorem ipsum",
            event_type: "type-1",
            event_date: "11/11/23",
            event_end_date:"11/11/23",
            vendor_code: 217317,
            vendor_name:"abc",
            total_expense:3300,
            region:"Name 0001",
            expense_status:"Name 0001",
            evenet_requester: "Name 0001",
            created_by:"Name 0001",
            date:"11/11/23",
            pre_activity_approved_by_final_approver:"Name 0001",
            post_activity_approved_by_final_approver:"Name 0001",
            post_activity_approved_by_finance:"Name 0001",
            pre_activity_approved_by_finance:"Name 0001",
            document_number:127621,
            posting_date:'11/11/23',
            invoice_number:'abc123',
            date2:"11/11/23",
            basic_amount:127112,
            division:"division",
            gl_number:"125cc",
            gl_name:"glname",
            cost_center:'tewtew',
            cc_name:'Name 0001',
            nature:'Name 0001',
            company_name:'Name 0001',
            gst:'Name 0001',
            invoice_amount:2165327,
            invoice_documnet:'ffff',
            tds:'asfhsa',
            net_amount:1265126,
            utr:'asdjujsad',
            payment_date:"11/11/23",
            budget:52517172,
            therapy:'asghsa',
            zone:'asghas',
            state:"uttar pradesh",
            city:'lukhnow',
            narration:'remarks'
          },
          {
            request_number:"Lorem ipsum",
            event_type: "type-1",
            event_date: "11/11/23",
            event_end_date:"11/11/23",
            vendor_code: 217317,
            vendor_name:"abc",
            total_expense:3300,
            region:"Name 0001",
            expense_status:"Name 0001",
            evenet_requester: "Name 0001",
            created_by:"Name 0001",
            date:"11/11/23",
            pre_activity_approved_by_final_approver:"Name 0001",
            post_activity_approved_by_final_approver:"Name 0001",
            post_activity_approved_by_finance:"Name 0001",
            pre_activity_approved_by_finance:"Name 0001",
            document_number:127621,
            posting_date:'11/11/23',
            invoice_number:'abc123',
            date2:"11/11/23",
            basic_amount:127112,
            division:"division",
            gl_number:"125cc",
            gl_name:"glname",
            cost_center:'tewtew',
            cc_name:'Name 0001',
            nature:'Name 0001',
            company_name:'Name 0001',
            gst:'Name 0001',
            invoice_amount:2165327,
            invoice_documnet:'ffff',
            tds:'asfhsa',
            net_amount:1265126,
            utr:'asdjujsad',
            payment_date:"11/11/23",
            budget:52517172,
            therapy:'asghsa',
            zone:'asghas',
            state:"uttar pradesh",
            city:'lukhnow',
            narration:'remarks'
          },
          {
            request_number:"Lorem ipsum",
            event_type: "type-1",
            event_date: "11/11/23",
            event_end_date:"11/11/23",
            vendor_code: 217317,
            vendor_name:"abc",
            total_expense:3300,
            region:"Name 0001",
            expense_status:"Name 0001",
            evenet_requester: "Name 0001",
            created_by:"Name 0001",
            date:"11/11/23",
            pre_activity_approved_by_final_approver:"Name 0001",
            post_activity_approved_by_final_approver:"Name 0001",
            post_activity_approved_by_finance:"Name 0001",
            pre_activity_approved_by_finance:"Name 0001",
            document_number:127621,
            posting_date:'11/11/23',
            invoice_number:'abc123',
            date2:"11/11/23",
            basic_amount:127112,
            division:"division",
            gl_number:"125cc",
            gl_name:"glname",
            cost_center:'tewtew',
            cc_name:'Name 0001',
            nature:'Name 0001',
            company_name:'Name 0001',
            gst:'Name 0001',
            invoice_amount:2165327,
            invoice_documnet:'ffff',
            tds:'asfhsa',
            net_amount:1265126,
            utr:'asdjujsad',
            payment_date:"11/11/23",
            budget:52517172,
            therapy:'asghsa',
            zone:'asghas',
            state:"uttar pradesh",
            city:'lukhnow',
            narration:'remarks'
          },
          {
            request_number:"Lorem ipsum",
            event_type: "type-1",
            event_date: "11/11/23",
            event_end_date:"11/11/23",
            vendor_code: 217317,
            vendor_name:"abc",
            total_expense:3300,
            region:"Name 0001",
            expense_status:"Name 0001",
            evenet_requester: "Name 0001",
            created_by:"Name 0001",
            date:"11/11/23",
            pre_activity_approved_by_final_approver:"Name 0001",
            post_activity_approved_by_final_approver:"Name 0001",
            post_activity_approved_by_finance:"Name 0001",
            pre_activity_approved_by_finance:"Name 0001",
            document_number:127621,
            posting_date:'11/11/23',
            invoice_number:'abc123',
            date2:"11/11/23",
            basic_amount:127112,
            division:"division",
            gl_number:"125cc",
            gl_name:"glname",
            cost_center:'tewtew',
            cc_name:'Name 0001',
            nature:'Name 0001',
            company_name:'Name 0001',
            gst:'Name 0001',
            invoice_amount:2165327,
            invoice_documnet:'ffff',
            tds:'asfhsa',
            net_amount:1265126,
            utr:'asdjujsad',
            payment_date:"11/11/23",
            budget:52517172,
            therapy:'asghsa',
            zone:'asghas',
            state:"uttar pradesh",
            city:'lukhnow',
            narration:'remarks'
          },
    ]
 

  return (
        <div className="p-7 w-full relative z-20 text-black">
          <div className="flex lg:justify-between flex-col-reverse lg:flex-row pb-5 gap-5 lg:gap-0">
            <Input
              className="lg:w-[40%] md:w-full sm:w-full rounded-[50px] bg-[#ecf2ff]"
              placeholder="Search"
            />
            
            <div className="flex justify-end lg:gap-5 sm:gap-[10px] gap-[8px] items-center">
              <Select>
                <SelectTrigger className="text-black w-34 shadow focus-visible:ring-transparent lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px]  gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]">
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">Pdf</SelectItem>
                  <SelectItem value="print">Print</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="text-black w-34 shadow focus-visible:ring-transparent lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px]  gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]">
                  <SelectValue placeholder="Filter" className="cursor-pointer"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="awaitingApproval">Awaitting Approval</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="approved">Draft</SelectItem>
                  <SelectItem value="sendback">Sendback</SelectItem>
                  <SelectItem value="executed">Executed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="postactivity">PostActivity Document Uploaded</SelectItem>
                </SelectContent>
              </Select>
             
              <Button className="text-black text-md font-normal bg-white hover:bg-white border lg:px-7 lg:py-4 sm:px-[20px] sm:py-[10px] shadow lg:text-sm rounded-[50px] sm:text-[9px] sm:font-normal sm:leading-normal font-['Montserrat'] text-[9px]">
                Back
              </Button>
            </div>
          </div>
          
          <div className="border bg-white h-full p-4 rounded-[18px]">
            <Table>
              <TableHeader className={"bg-[#E0E9FF]"}>
                <TableRow className={"text-nowrap rounded-r-2xl"}>
                  <TableHead className={"text-center rounded-l-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"}>
                  Request Number
                  </TableHead>
                  <TableHead  className={ "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                  Event Type
                  </TableHead>
                  <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']" } >
                  Event Date
                  </TableHead>
                  <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                  Event End Date
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Vendor Code
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Vendor name
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Total Expense
                  </TableHead>
                 
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Region
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                  Expense Status
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Event Requester
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Created By
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Date
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Pre Activity Approved by Final Approver
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Post Activity Approved by Final Approver
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Post Activity Approved by Finance
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Post Activity Approved by Finance
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                  Document Number
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Posting Date
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                  Invoice Number
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Date
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Basic Amount
                  </TableHead>


                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Division
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   GL Number
                  </TableHead>
                  
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   GL Name
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Cost Center
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   CC Name
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Nature
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                  Company Name
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    GST
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Invoice Amount
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                  Invoice Document
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                  TDS
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                 Net Amount
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                  UTR
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                 Payment Date
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                 Budget
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                 Therapy
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                Zone
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                State
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                City
                  </TableHead>
                  
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                Narration
                  </TableHead>
                
                  <TableHead
                    className={
                      "text-center rounded-r-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat'] sticky right-0 bg-[#E0E9FF]"
                    }
                  >Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {financeDatas &&
                    financeDatas.map((financeData, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap">
                          <TableCell>{financeData.request_number}</TableCell>
                          <TableCell>{financeData.event_type}</TableCell>
                          <TableCell>{financeData.event_date}</TableCell>
                          <TableCell>{financeData.event_end_date}</TableCell>
                          <TableCell>{financeData.vendor_code}</TableCell>
                          <TableCell>{financeData.vendor_name}</TableCell>
                          <TableCell>{financeData.total_expense}</TableCell>
                          <TableCell>{financeData.region}</TableCell>
                          <TableCell >{financeData.expense_status}</TableCell>
                          <TableCell >{financeData.evenet_requester}</TableCell> 
                          <TableCell >{financeData.created_by}</TableCell>                        
                          <TableCell >{financeData.date}</TableCell>                        
                          <TableCell >{financeData.pre_activity_approved_by_final_approver}</TableCell>                        
                          <TableCell >{financeData.post_activity_approved_by_final_approver}</TableCell>                        
                          <TableCell >{financeData.post_activity_approved_by_finance}</TableCell>                        
                          <TableCell >{financeData.post_activity_approved_by_finance}</TableCell>                        
                          <TableCell >{financeData.document_number}</TableCell>                        
                          <TableCell >{financeData.posting_date}</TableCell>                        
                          <TableCell >{financeData.invoice_number}</TableCell>                        
                          <TableCell >{financeData.date2}</TableCell>                        
                          <TableCell >{financeData.basic_amount}</TableCell>                        
                          <TableCell >{financeData.division}</TableCell>                        
                          <TableCell >{financeData.gl_number}</TableCell>                        
                          <TableCell >{financeData.gl_name}</TableCell>                        
                          <TableCell >{financeData.cost_center}</TableCell>                        
                          <TableCell >{financeData.cc_name}</TableCell>                        
                          <TableCell >{financeData.nature}</TableCell>                        
                          <TableCell >{financeData.company_name}</TableCell>                        
                          <TableCell >{financeData.gst}</TableCell>                        
                          <TableCell >{financeData.invoice_documnet}</TableCell>                        
                          <TableCell >{financeData.tds}</TableCell>                        
                          <TableCell >{financeData.net_amount}</TableCell> 
                          <TableCell >{financeData.utr}</TableCell>                        
                          <TableCell >{financeData.payment_date}</TableCell>                        
                          <TableCell >{financeData.budget}</TableCell>                        
                          <TableCell >{financeData.therapy}</TableCell>                        
                          <TableCell >{financeData.zone}</TableCell>                        
                          <TableCell >{financeData.state}</TableCell>                        
                          <TableCell >{financeData.city}</TableCell>                        
                          <TableCell >{financeData.narration}</TableCell>
                          <TableCell >{financeData.narration}</TableCell>
                          <TableCell className="sticky right-0 bg-[white] z-50 flex space-x-8 border-l border-slate-200 px-7">                               
                                <EventFinanceReportPopup />                       
                          </TableCell>
                       </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end">
             <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
             />
            </div>
        </div>
  );
};