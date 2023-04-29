import db from "@/database/db";

export default async (req, res) => {
  try {
    const { email, title, replyto, id } = req.body;
    await db.query(
      `DELETE FROM comments WHERE email=$1 AND title = $2 AND replyto=$3 AND id = $4`,
      [email, title, replyto, id]
    );
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
