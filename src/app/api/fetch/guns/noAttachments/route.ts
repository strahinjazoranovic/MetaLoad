import { NextResponse } from "next/server";
import { Pool } from "pg";

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
    const getGunsQuery = 'SELECT id, name, game, username FROM guns';
    const { rows: guns } = await client.query(getGunsQuery);

    // Return all guns as-is
    return NextResponse.json(guns);
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