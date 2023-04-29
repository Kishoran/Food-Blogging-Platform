import { serialize } from "cookie";

const cookie_name = process.env.COOKIE_NAME; // cookie name
export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const serialised = serialize(cookie_name, null, {
        httpOnly: true,
        //   secure: process.env.NODE_ENV !== "development",
        secure: false,
        sameSite: "strict",
        maxAge: 1,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialised);

      res.json({
        status: true,
        message: "User Logged Out",
      });
    } catch (error) {
      res.json({
        status: false,
        message: error.message,
      });
    }
  }
};
