import React from 'react';
import { cookies } from 'next/headers';
import ExpensePage from "./expenseDetail";


const page = async ({params}:any) => {
  const fetchData = async(request_number:any,name:any)=>{
    try {
      const cookie = await cookies();
      const Cookie = cookie.toString();
      const tableData = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.utils.get_advance_request_data?name=${request_number}&expense_name=${name}`,
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
        return data.data
      }
      
    } catch (error) {
      console.log(error,"something went wrong");
    }
  }

  const fetchDropData = async()=>{
    try {
      const cookie = await cookies();
      const Cookie = cookie.toString();
      const tableData = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.utils.get_expense_dropdown_data`,
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
        return data.message
      }
      
    } catch (error) {
      console.log(error,"something went wrong");
    }
  }
  
  const {request_number,expense_name} = await params; 
  const tableData = await fetchData(params.request_number,params.expense_name);
  const Dropdown = await fetchDropData();
  return (
    <>
      <ExpensePage expensedata={tableData} dropdownData={Dropdown}/>
    </>
  )
}

export default page