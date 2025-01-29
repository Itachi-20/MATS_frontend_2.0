import React from 'react'
import RequestDetails from "@/components/request_details"
import BudgetRequest from '@/components/travel_desk/logistics_budget';
import PassengerList from '../[request_no]/PassengerListPage';
import { passenger_list_data } from '../utility'
import { cookies } from 'next/headers';

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


export default async function BudgetRequestDetail({ ...Props }: any) {
    const { request_no } = await Props.params;
    const cookie = await cookies();
    const role = cookie.get("role")?.value;
    console.log(request_no,'request_no')
    const data: passanger[] = await passenger_list_data(cookie, request_no);
    console.log(data,'data server passenger')
    return (
        <div className='px-9 py-7'>
            <PassengerList
                passenger_list={data}
                refno={request_no}
                role={role}
            />
        </div>
    )
}
