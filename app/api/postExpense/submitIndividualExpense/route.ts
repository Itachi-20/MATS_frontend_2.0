import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Response", body.parent);
        const cookies = req.headers.get("cookie")
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.utils.submit_individual_expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies as string 
            },
            body:JSON.stringify({
                parent:body.parent,
                name:body.name
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
