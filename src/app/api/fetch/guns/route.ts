import { NextResponse } from "next/server";
import { Pool } from "pg";

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
    // Fetch guns that have at least 1 attachment to them
    const getGunsQuery = `
      SELECT DISTINCT g.id, g.name, g.game, g."username", g.photos
      FROM guns g
      JOIN guns_attachments ga ON g.id = ga.gun_id
      JOIN attachments a ON ga.attachment_id = a.id
    `;
    const { rows: guns } = await client.query(getGunsQuery);

    // Fetch attachments for each gun
    for (const gun of guns) {
      const getAttachmentsQuery = `
        SELECT a.*
        FROM attachments a
        JOIN guns_attachments ga ON a.id = ga.attachment_id
        WHERE ga.gun_id = $1
      `;
      const { rows: attachments } = await client.query(getAttachmentsQuery, [
        gun.id,
      ]);
      gun.attachments = attachments;
    }

    return NextResponse.json(guns);
  } catch (err) {
    console.error("ERROR: API - ", (err as Error).message);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
