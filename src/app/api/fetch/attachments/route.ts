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
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    // Fetch attachments
    let query = "SELECT id, name, type FROM attachments";
    let values: any[] = [];

    // If a type filter is provided, add it to the query
    if (type) {
      query += " WHERE type = $1";
      values.push(type);
    }

    const { rows } = await client.query(query, values);

    return NextResponse.json(rows);
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
