'use server'
import React from 'react'
import Table from './detail'
import { cookies } from 'next/headers'
const fetchData = async(name:any)=>{
    console.log("name",name)
    try {
      const cookie = await cookies();
      const Cookie = cookie.toString();
      const tableData = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_event_data?name=${name}`,
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


  const Page = async ({params}:any) => {
    const refno = await params
    console.log("refno--------------------------  ",refno.refno)
    const tableData = await fetchData(refno.refno);
    console.log(tableData,'tableData')
    return (
        <>
           <Table tableData={tableData}  refno={refno.refno}/>
        </>
    )
}

export default Page
