import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.login.login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            // credentials: 'include'
        });
        console.log(response.status,response.statusText, 'response.status')
        if (!response.ok) {
            return  response;
        }
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error || 'Something went wrong' }, { status:500});
    }
}
