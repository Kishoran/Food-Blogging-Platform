import db from "@/database/db";

export default async (req, res) => {
  try {
    const { id } = req.body;
    await db.query(`DELETE FROM comments WHERE id = $1`, [id]);
    res.json({
      status: true,
      message: "Comment Deleted",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
