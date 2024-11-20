import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const cookies = req.headers.get("cookie")
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_advance_expense_list`, {
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

