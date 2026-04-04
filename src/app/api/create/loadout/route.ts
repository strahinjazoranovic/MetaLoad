import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function POST(request: Request) {
  const client = await pool.connect();
  try {
    const { name, game, username, attachments } = await request.json();

    // Insert gun
    const gunResult = await client.query(
      'INSERT INTO guns (name, game, "username") VALUES ($1, $2, $3) RETURNING id',
      [name, game, username]
    );
    const gunId = gunResult.rows[0].id;

    // Insert attachments and link them
    for (const att of attachments) {
      // Check if attachment exists
      let attResult = await client.query(
        "SELECT id FROM attachments WHERE name = $1 AND type = $2",
        [att.name, att.type]
      );
      let attId;
      if (attResult.rows.length === 0) {
        // Insert new attachment
        attResult = await client.query(
          "INSERT INTO attachments (name, type) VALUES ($1, $2) RETURNING id",
          [att.name, att.type]
        );
        attId = attResult.rows[0].id;
      } else {
        attId = attResult.rows[0].id;
      }
      // Link gun and attachment
      await client.query(
        "INSERT INTO guns_attachments (gun_id, attachment_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
        [gunId, attId]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ERROR: API - ", (err as Error).message);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
