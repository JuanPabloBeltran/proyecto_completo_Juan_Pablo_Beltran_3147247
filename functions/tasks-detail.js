const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

exports.handler = async (event) => {
  const path = event.path;
  const id = path.split('/').pop();

  // PUT update task
  if (event.httpMethod === 'PUT') {
    try {
      const { title, description, completed } = JSON.parse(event.body);
      const { rows } = await pool.query(
        `UPDATE tasks SET title = $1, description = $2, completed = $3, updated_at = NOW() WHERE id = $4 RETURNING *`,
        [title, description, completed, id]
      );
      if (!rows[0]) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Not found' })
        };
      }
      return {
        statusCode: 200,
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

  // PATCH toggle completed
  if (event.httpMethod === 'PATCH') {
    try {
      const { rows } = await pool.query(
        `UPDATE tasks SET completed = NOT completed, updated_at = NOW() WHERE id = $1 RETURNING *`,
        [id]
      );
      if (!rows[0]) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Not found' })
        };
      }
      return {
        statusCode: 200,
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

  // DELETE task
  if (event.httpMethod === 'DELETE') {
    try {
      const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
      if (!rowCount) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Not found' })
        };
      }
      return {
        statusCode: 200,
        headers: {
          'Content-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Deleted' })
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
