import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        console.log("body-------------------------",body.company,body.event_type)
        const response = await fetch(`${process.env.FRAPPE_URL}/api/resource/Master General Ledger?filters=[["company","=","${body.company}"],["event_type","=","${body.event_type}"]]&fields=["name","gl_code","gl_name"]`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies as string 
            },
            // body:JSON.stringify(body),
            credentials:'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        console.log("response GL GLGLGLGLGLGLGGL",response)
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
