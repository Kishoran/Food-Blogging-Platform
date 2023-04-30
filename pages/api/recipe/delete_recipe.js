import db from "@/database/db";

export default async (req, res) => {
  try {
    const { id } = req.body;
    await db.query(`DELETE FROM recipe WHERE id=$1`, [id]);

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
