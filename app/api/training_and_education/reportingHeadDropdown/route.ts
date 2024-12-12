import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        console.log(body.event_requestor)
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_reporting_head?event_requestor=${body.event_requestor}&business_unit=${body.business_unit}&division_category=${body.division_category}&division_sub_category=${body.division_sub_category?body.division_sub_category:''}&state=${body.state}`, {
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
