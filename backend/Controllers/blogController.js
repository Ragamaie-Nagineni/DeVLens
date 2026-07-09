import pool from "../db/db.js";

/*
    GET /api/blogs
*/
export const getAllBlogs = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT
        b.*,
        u.username AS author_name
      FROM blogs b
      JOIN users u
        ON b.author_id = u.id
      WHERE b.status = 'published'
      ORDER BY b.published_at DESC
    `);

    res.status(200).json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch blogs",
    });

  }
};


/*
    GET /api/blogs/:id
*/
export const getBlogById = async (req, res) => {

  try {

    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        b.*,
        u.username AS author_name
      FROM blogs b
      JOIN users u
        ON b.author_id = u.id
      WHERE b.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch blog",
    });

  }
};