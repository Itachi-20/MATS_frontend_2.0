import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        const search_name = body.search_name;
        const page_no = body.pageNo;
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_travel_expense_list?search_name=${search_name}&page_no=${page_no}`, {
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
