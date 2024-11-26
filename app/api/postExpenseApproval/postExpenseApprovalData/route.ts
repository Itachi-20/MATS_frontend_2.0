import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        const name = body.name;
        const req_no = body.req_no;
        console.log(req_no,name);
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.utils.get_post_expense_request_data?name=${req_no}&expense_name=${name}`, {
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
