const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// GET all tasks
exports.handler = async (event) => {
  if (event.httpMethod === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify(rows)
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'DB error' })
      };
    }
  }

  // POST create task
  if (event.httpMethod === 'POST') {
    try {
      const { title, description } = JSON.parse(event.body);
      if (!title) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Title required' })
        };
      }
      const { rows } = await pool.query(
        'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
        [title, description || '']
      );
      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(rows[0])
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'DB error' })
      };
    }
  }

  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};
