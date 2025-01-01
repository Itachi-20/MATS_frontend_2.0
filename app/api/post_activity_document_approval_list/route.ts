import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        const search_name = body.search_name;
        const startdate = body.startDate;
        const enddate = body.endDate;
        const page_no = body.pageNo;
        const status = body.status;
        const requestor = body.requestor;
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_post_activity_list?search_name=${search_name}&startdate=${startdate}&enddate=${enddate}&page_no=${page_no}&status=${status}&requestor=${requestor}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies as string
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        console.log(response, 'response -------------------')

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
