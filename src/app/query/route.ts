import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function GET(request: Request) {
  const client = await pool.connect();

  try {
    const getGunsQuery = 'SELECT id, name, game, "user", photos FROM guns';
    const { rows: guns } = await client.query(getGunsQuery);

    for (const gun of guns) {
      const getAttachmentsQuery = `
        SELECT a.*
        FROM guns g
        JOIN guns_attachments ga ON g.id = ga.gun_id
        JOIN attachments a ON ga.attachment_id = a.id
        WHERE g.id = $1
      `;
      const { rows: attachments } = await client.query(getAttachmentsQuery, [gun.id]);
      gun.attachments = attachments;
    }

    return NextResponse.json(guns);
  } catch (err) {
    console.error('ERROR: API - ', (err as Error).message);
    return NextResponse.json(
      { error: (err as Error).message, returnedStatus: 200 },
      { status: 200 }
    );
  } finally {
    client.release(); // Always release the client back to the pool
  }
}
