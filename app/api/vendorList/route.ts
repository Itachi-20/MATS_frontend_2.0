import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const cookies = req.headers.get("cookie")
        const response = await fetch(`${process.env.FRAPPE_URL}/api/resource/Master%20Vendor?fields=[%22name%22,%22vendor_type%22,%22vendor_name%22,%22remark%22,%22pan_number%22,%22vendor_code%22,%22email%22,%22contact_number%22]`, {
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
