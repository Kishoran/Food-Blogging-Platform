import db from "@/database/db";

export default async (req, res) => {
  try {
    const { email, title, date } = req.body;
    const result = await db.query(
      `SELECT * FROM comments WHERE email=$1 AND title = $2 AND date =$3 `,
      [email, title, date]
    );
    if (result.rows[0]) {
      res.json({
        status: true,
        message: "Comment Retrieved",
        data: result.rows[0],
      });
    } else {
      res.json({
        status: true,
        message: "Comment Not Found",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
