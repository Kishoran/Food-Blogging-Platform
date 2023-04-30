import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

import db from "@/database/db";
import { validatePassHash } from "@/middleware/hasher";

const secret = process.env.JWTSECRET; // secret key for authentication
const cookie_name = process.env.COOKIE_NAME; // cookie name

export default async (req, res) => {
  try {
    let { email, password } = req.body;
    //get user info from email
    let user = await db.query(
      "SELECT name,email,password,salt FROM users WHERE email = $1",
      [email]
    );
    user = user.rows[0];
    if (user) {
      if (validatePassHash(password, user.salt, user.password)) {
        const token = sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // 60 minute cookie validity
            user: { name: user.name, email: user.email },
          },
          secret
        );

        const serialised = serialize(cookie_name, token, {
          httpOnly: false,
          // secure: process.env.NODE_ENV !== "development",
          secure: false,
          sameSite: "strict",
          maxAge: 60 * 70, //70 min cookie lifetime
          path: "/",
        });
        // set cookie
        res.setHeader("Set-Cookie", serialised);

        res.json({
          status: true,
          message: "Login Successful",
         // data: { name: user.name, email: user.email, jwt: token },
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
