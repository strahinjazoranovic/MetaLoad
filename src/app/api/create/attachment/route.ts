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
    const { name, type } = await request.json();

    // Basic validation
    if (!name || !type) {
      return NextResponse.json(
        { error: "Name and type are required" },
        { status: 400 },
      );
    }

    // Optional: prevent duplicates
    const existing = await client.query(
      "SELECT id FROM attachments WHERE name = $1 AND type = $2",
      [name, type],
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "Attachment already exists" },
        { status: 409 },
      );
    }

    // Insert attachment
    const result = await client.query(
      "INSERT INTO attachments (name, type) VALUES ($1, $2) RETURNING id",
      [name, type],
    );

    return NextResponse.json({
      success: true,
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error("ERROR:", (err as Error).message);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
