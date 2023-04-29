import db from "@/database/db";
import { validatePassHash } from "@/middleware/hasher";

export default async (req, res) => {
  try {
    let { email, password } = req.body;
    //get user info from email
    let user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    user = user.rows[0];
    console.log(user);
    if (user) {
      if (validatePassHash(password, user.salt, user.password)) {
        res.json({
          status: true,
          message: "Login Successful",
        });
      } else {
        res.json({
          status: false,
          message: "Incorrect Password",
        });
      }
    } else {
      res.json({
        status: false,
        message: "User Not Found, Invalid email",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
