import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const cookies = req.headers.get("cookie");
        const body = await req.json();
        const name = body.name;
        const response = await fetch(`${process.env.FRAPPE_URL}/api/resource/Master General Ledger?filters=[["company","=","${body.company_name}"],["event_type","=","${body.event_type}"]]&fields=["name","gl_code","gl_name"]`, {
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
