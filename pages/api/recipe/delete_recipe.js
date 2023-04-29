import db from "@/database/db";

export default async (req, res) => {
  try {
    const { email, title } = req.body;
    const result = await db.query(
      `DELETE FROM recipe WHERE email=$1 AND title = $2`,
      [email, title]
    );

    res.json({
      status: true,
      message: "Recipe Deleted",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
