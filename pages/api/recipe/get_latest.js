import db from "@/database/db";

export default async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM recipe ORDER BY id DESC LIMIT 5`
    );
    if (result.rows[0]) {
      res.json({
        status: true,
        message: "Recipe Retrieved",
        data: result.rows,
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
