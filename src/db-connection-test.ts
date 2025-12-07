import { neon } from '@netlify/neon';

// Make sure to set NETLIFY_DATABASE_URL in your environment variables
// Example: export NETLIFY_DATABASE_URL='postgresql://user:password@host/db'
const sql = neon();

async function testConnection() {
    try {
        console.log('Testing database connection...');

        // Using a basic query to test connection first
        const [result] = await sql`SELECT 1 as connected`;
        console.log('Connection successful:', result);

        // User's requested query example (commented out as postId is undefined)
        // const postId = 1;
        // const [post] = await sql`SELECT * FROM posts WHERE id = ${postId}`;
        // console.log('Post:', post);

    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

testConnection();
