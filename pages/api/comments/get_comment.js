import db from "@/database/db";

export default async (req, res) => {
  try {
    const { email, title } = req.body;
    const result = await db.query(
      `SELECT * FROM comments WHERE email=$1 AND title = $2`,
      [email, title]
    );
    if (result.rows[0]) {
      res.json({
        status: true,
        message: "Comment Retrieved",
        data: result.rows,
      });
    } else {
      res.json({
        status: true,
        message: "Comment Not Found",
        data: [],
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
