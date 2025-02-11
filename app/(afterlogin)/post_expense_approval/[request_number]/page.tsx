import React from 'react';
import { cookies } from 'next/headers';
import TableComp from "@/app/(afterlogin)/post_expense_approval/[request_number]/table";
import TravelVendor from './TravelVendor';
const fetchData = async(names:any)=>{
  try {
    const cookie = await cookies();
    const Cookie = cookie.toString();
    const tableData = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_post_expense_detail_list?name=${names}`,
      {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "Cookie":Cookie
        },
        credentials:'include'
      }
    );
    if(tableData.ok){
      const data = await tableData.json();
      return data.data
    }
    
  } catch (error) {
    console.log(error,"something went wrong");
  }
}
const fetchTable = async(name:any)=>{
    console.log("name",name)
    try {
      const cookie = await cookies();
      const Cookie = cookie.toString();
      const tableData = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_post_expense_request_data?name=${name}`,
        {
          method: "GET",
          headers:{
            "Content-Type": "application/json",
            "Cookie":Cookie
          },
        }
      );
      if(tableData.ok){
        const data = await tableData.json();
        console.log("data ",data)
        return data.data
      }
      
    } catch (error) {
      console.log(error,"something went wrong");
    }
  }
const page = async ({params}:any) => {
  const {request_number} = await params; 
  const tableData = await fetchData(request_number);
  return (
    <>
      <TableComp tableData={tableData} refno = {request_number}/>
      <TravelVendor tabledata={tableData} files={tableData.files}/>
    </>
  )
}

export default page