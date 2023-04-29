import db from "@/database/db";
import { createPassHash } from "@/middleware/hasher";

export default async (req, res) => {
  try {
    let { name, email } = req.body;
    let { password, salt } = createPassHash(req.body.password);
    await db.query(
      `INSERT INTO users(name,email,password,salt) VALUES($1,$2,$3,$4)`,
      [name, email, password, salt]
    );
    res.json({
      status: true,
      message: "User Created",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
