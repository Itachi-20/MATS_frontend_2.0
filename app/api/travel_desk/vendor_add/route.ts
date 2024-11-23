import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formdata = await req.formData();
        const cookies = req.headers.get("cookie")
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.utils.travel_expense_request`, {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                'Cookie': cookies as string 
            },
            credentials:'include',
            body:formdata
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
