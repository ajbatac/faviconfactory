import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import { faviconSubmissions } from '../../db/schema';

export default async (req: Request) => {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const body = await req.json();
        const { websiteUrl, email, faviconImage } = body;

        if (!websiteUrl || !email) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const sql = neon(process.env.NETLIFY_DATABASE_URL!);
        const db = drizzle(sql);

        await db.insert(faviconSubmissions).values({
            websiteUrl,
            email,
            faviconImage: faviconImage || null,
            createdAt: new Date().toISOString()
        });

        return new Response(JSON.stringify({ success: true, message: 'Submission received' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error processing submission:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const config = {
    path: "/api/submit-favicon"
};
