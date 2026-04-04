import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: Request) {
  const client = await pool.connect();
  try {
    // Use the Web API formData() method
    const formData = await req.formData();
    const name = formData.get("name")?.toString() || "";
    const game = formData.get("game")?.toString() || "";
    const username = formData.get("username")?.toString() || "";
    const imageFile = formData.get("image") as File | null;

    if (!name || !game || !username || !imageFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Prevent duplicates
    const existing = await client.query(
      "SELECT id FROM guns WHERE name=$1 AND game=$2",
      [name, game],
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "Gun already exists" },
        { status: 409 },
      );
    }

    const result = await client.query(
      "INSERT INTO guns (name, game, username, photos) VALUES ($1, $2, $3, $4) RETURNING id",
      [name, game, username, imageFile.name],
    );

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
