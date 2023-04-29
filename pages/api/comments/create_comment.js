import db from "@/database/db";
import moment from "moment/moment";

export default async (req, res) => {
  try {
    const { name, email, title, comment, replyto } = req.body;
    let date = moment();
    let datetext = date.format("YYYY-MM-DD");
    date = date;
    await db.query(
      `INSERT INTO comments( name, email, title, comment, replyto, date, datetext ) VALUES($1,$2,$3,$4,$5,$6,$7)`,
      [name, email, title, comment, replyto, date, datetext]
    );
    res.json({
      status: true,
      message: "Comment Created",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
