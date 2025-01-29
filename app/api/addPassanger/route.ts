import { NextResponse} from 'next/server';

export async function POST(req: Request) {
    try {
        const cookie = req.headers.get("cookie");
        const formData = await req.formData();
        console.log(formData,'formData in server')
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.passenger.passenger.save_passenger`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Cookie':cookie as string,
            },
            body:formData
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
