import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        const city_name = body.city_name;
        const page_no = body.page_no;
        const page_length = body.page_length;
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.common.search_city?city_name=${city_name}&page_no=${page_no}&page_length=${page_length}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies as string
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        console.log(response, 'response -------------------')

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
