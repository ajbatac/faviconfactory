import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import { faviconSubmissions } from '../../db/schema';
import { desc } from 'drizzle-orm';

export default async (req: Request) => {
    if (req.method !== 'GET') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const sql = neon(process.env.NETLIFY_DATABASE_URL!);
        const db = drizzle(sql);

        const submissions = await db.select().from(faviconSubmissions).orderBy(desc(faviconSubmissions.createdAt));

        return new Response(JSON.stringify(submissions), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error fetching submissions:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const config = {
    path: "/api/get-gallery"
};
