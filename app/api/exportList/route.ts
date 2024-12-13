import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        console.log(cookies,"this api cookie")
        const search_name = body.activity;
        const startdate = body.startDate;
        const enddate = body.endDate;
        const search_eventname = body.pageNo;
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.export_data.excel_export.export_to_excel?startdate=${startdate}&enddate=${enddate}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies as string 
            },
            // credentials:'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
