import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import { faviconSubmissions } from '../../db/schema';
import { eq, sql as drizzleSql } from 'drizzle-orm';

export default async (req: Request) => {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const body = await req.json();
        const { id } = body;

        if (!id) {
            return new Response(JSON.stringify({ error: 'Missing submission ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const sql = neon(process.env.NETLIFY_DATABASE_URL!);
        const db = drizzle(sql);

        // Atomically increment the loves count
        const result = await db.update(faviconSubmissions)
            .set({ lovesCount: drizzleSql`${faviconSubmissions.lovesCount} + 1` })
            .where(eq(faviconSubmissions.id, id))
            .returning({ lovesCount: faviconSubmissions.lovesCount });

        if (result.length === 0) {
            return new Response(JSON.stringify({ error: 'Submission not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true, lovesCount: result[0].lovesCount }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error loving favicon:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const config = {
    path: "/api/love-favicon"
};
