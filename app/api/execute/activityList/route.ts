import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        const response = await fetch(`${process.env.FRAPPE_URL}/api/resource/Master Document Type?filters=[["activity_type","=","${body.activity_type}"],["event_type","=","${body.event_type}"],["is_deleted","=",0]]&fields=["name","document_name"]&order_by="document_name"`, {
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
