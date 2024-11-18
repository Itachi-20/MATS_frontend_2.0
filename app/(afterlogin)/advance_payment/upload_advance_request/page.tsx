
import React from 'react'
import Table from './table'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from 'next/image'
import { useState } from 'react'
import { cookies } from 'next/headers'
const fetchData = async(name:any)=>{
    console.log("name",name)
    try {
      const cookie = await cookies();
      const Cookie = cookie.toString();
      const tableData = await fetch(
        `http://10.120.140.7:8000/api/method/matsapp.api.utils.utils.get_advance_request_data?name=${name}`,
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


  const Page = async ({ ...params}:any) => {
    const { refno } = await params; // Destructure `refno` from params
    console.log(params.searchParams.refno,"sdfghytfrdfcgvbhnjmhygtfrdfgv")
    const tableData = await fetchData(params.searchParams.refno); // Pass `refno` dynamically
  
    console.log(tableData, 'this is table data');
    return (
        <>
           <Table tableData={tableData} />
        </>
    )
}

export default Page
