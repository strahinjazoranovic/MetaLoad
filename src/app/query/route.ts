// This is the API route that will be called to fetch data from the database
import { NextResponse, NextRequest } from 'next/server'
import mysql, { RowDataPacket } from 'mysql2/promise';

// This is where the database connection parameters are stored
import { get } from 'http';
let connectionParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  user:  process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}


export async function GET(request: Request) {
  try {
    // 2. connect to database
    const connection = await mysql.createConnection(connectionParams)
    // 3. create a query to fetch data
    let get_exp_query = ''
    get_exp_query = 'SELECT id, name, game FROM guns'
    // we can use this array to pass parameters to the SQL query
    let values: any[] = []
    // 4. exec the query and retrieve the results
    const [results] = await connection.execute<RowDataPacket[]>(get_exp_query, values)
    for (const result of results) {
      get_exp_query = 'select a.* from guns g, guns_attachments ga, attachments a where g.id = ga.gun_id and g.id = ? and ga.attachment_id = a.id';
      values = [result.id];
      const [results_attachments] = await connection.execute<RowDataPacket[]>(get_exp_query, values);
      result.attachments = results_attachments;
      // console.log(result);
    }
    console.log(results);

    // 5. close the connection when done
    connection.end()
    // return the results as a JSON API response
    return NextResponse.json(results)
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message)
    const response = {
      error: (err as Error).message,
      returnedStatus: 200,
    }
    return NextResponse.json(response, { status: 200 })
  }
}
