import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        // console.log(cookies,"this api cookie")
        const search_name = body.search_name?body.search_name:'';
        const startdate = body.startDate?body.startDate:'';
        const enddate = body.endDate?body.endDate:'';
        const page_no = body.pageNo?body.pageNo:'';
        const status = body.status?body.status:'';
        console.log(search_name,'search_name',startdate,'startdate',enddate,'enddate,',page_no,'page_no',status,'status')
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_event_list?search_name=${search_name}&startdate=${startdate}&enddate=${enddate}&page_no=${page_no}&status=${status}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies as string 
            },
            credentials:'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
