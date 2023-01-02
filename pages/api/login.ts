import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../db";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";
export default async function login(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === "POST") {
      const query_res = (await conn.query(`SELECT * FROM person where email = '${req.body.email}'`)).rows[0];
      const db_password = query_res.password;
      const id = query_res.id;
      let validation = await bcrypt.compare(req.body.password, db_password);
      console.log(db_password, validation);
      if (db_password && validation) {
         const jwtRes = sign({ id }, process.env.SECRET!, { expiresIn: "1h" });
         res.setHeader(
            "Set-Cookie",
            cookie.serialize("authorization", jwtRes, {
               httpOnly: true,
               secure: false,
               sameSite: "strict",
               maxAge: 3600,
               path: "/",
            })
         );
         res.json({ message:"Welcome back" });
      } else {
         res.json("OOPs something went wrong");
      }
   } else {
      res.json("We only support POST");
   }
}
