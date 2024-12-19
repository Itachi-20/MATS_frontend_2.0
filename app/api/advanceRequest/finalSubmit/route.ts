import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.utils.submit_advance_expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies as string 
            },
            body:JSON.stringify({
                name: body.name,
                event_conclusion: body.event_conclusion,
                vendor: body.vendor
              }),
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