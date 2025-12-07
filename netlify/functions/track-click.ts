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

        // Atomically increment the clicks count
        const result = await db.update(faviconSubmissions)
            .set({ clicksCount: drizzleSql`${faviconSubmissions.clicksCount} + 1` })
            .where(eq(faviconSubmissions.id, id))
            .returning({ clicksCount: faviconSubmissions.clicksCount });

        if (result.length === 0) {
            return new Response(JSON.stringify({ error: 'Submission not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true, clicksCount: result[0].clicksCount }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error tracking click:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const config = {
    path: "/api/track-click"
};
