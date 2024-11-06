// pages/api/auth/check-session.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type FrappeAuthRequest = NextApiRequest & {
    user?: string;
};

// Handler function for checking Frappe authentication
const handler = async (req: FrappeAuthRequest, res: NextApiResponse) => {
    try {
        // Get session ID from cookies or headers
        const sessionId = req.cookies?.session_id || req.headers['x-frappe-session-id'];

        if (!sessionId) {
            return res.status(401).json({ message: 'Unauthorized. No session found.' });
        }

        // Make an API request to Frappe to validate the session
        const response = await axios.get(`${process.env.FRAPPE_URL}/api/method/frappe.auth.get_logged_user`, {
            headers: {
                'Cookie': `sid=${sessionId}`, // If using session cookie
                'Authorization': `token ${process.env.FRAPPE_API_KEY}:${process.env.FRAPPE_API_SECRET}`, // If using token
            },
        });

        // Check if user is authenticated
        if (response.data && response.data.message) {
            req.user = response.data.message; // Store the logged user data in the request
            return res.status(200).json({ message: 'Authenticated', user: req.user });
        } else {
            return res.status(401).json({ message: 'Unauthorized. Invalid session.' });
        }

    } catch (error) {
        console.error('Error in frappe authentication:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;
