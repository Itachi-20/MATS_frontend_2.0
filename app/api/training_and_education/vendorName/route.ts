import { NextResponse} from 'next/server';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const vendor_type = url.searchParams.get('vendor_type');
        const cookie = req.headers.get("cookie");
        const response = await fetch(`http://10.120.140.7:8000/api/resource/Master Vendor?filters={"vendor_type":"${vendor_type}"}&fields=["name","vendor_name"]`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie':JSON.stringify(cookie),
            },
        });
        const Response = await response.json();
        console.log(Response,"this is api response")
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        
        return NextResponse.json(Response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
