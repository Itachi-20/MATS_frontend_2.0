import { NextResponse} from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookie = req.headers.get("cookie");
        const response = await fetch(`http://10.120.140.7:8000/api/method/matsapp.api.event.event.save_event_data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie':JSON.stringify(cookie),
            },
            body:JSON.stringify(body)
            
        });

        if (!response.ok) {
            console.log(response.statusText,"server error message")
            throw new Error(`Error: ${response.statusText}`);
        }

        const Response = await response.json();
        console.log(response,"SERVER RESPONSE")
        return NextResponse.json(Response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}