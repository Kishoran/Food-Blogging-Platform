import db from "@/database/db";

export default async (req, res) => {
  try {
    const { email, title } = req.body;
    const result = await db.query(
      `SELECT * FROM recipe WHERE email=$1 AND title = $2`,
      [email, title]
    );
    if (result.rows[0]) {
      res.json({
        status: true,
        message: "Recipe Retrieved",
        data: result.rows[0],
      });
    } else {
      res.json({
        status: true,
        message: "Recipe Not Found",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
