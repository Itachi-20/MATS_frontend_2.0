import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        console.log(body.event_requestor)
        const response = await fetch(`${process.env.FRAPPE_URL}/api/resource/City List?filters=[["state", "=", "${body.state}"]]&fields=["name","city"]`, {
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
