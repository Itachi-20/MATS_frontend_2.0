import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const response = await fetch('http://10.120.140.7:8000/api/method/matsapp.api.event.event.get_field_data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}