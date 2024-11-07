import { NextResponse } from 'next/server';
import frappeAuthMiddleware from './middleware/frappeAuthMiddleware';

export async function middleware(req) {
    const response = NextResponse.next();
    await frappeAuthMiddleware(req, response, () => {});
    
    //console.log(req,"this is middleware user")
    if (!req.user) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    return response;
}

// Optional: Define route matching
export const config = {
    matcher: ['/training_and_education'],
};
