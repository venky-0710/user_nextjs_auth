import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../db";
import bcrypt from 'bcrypt';
export default async function signUp(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "POST"){
        const salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash(req.body.password, salt);
        console.log(req.body)
        const query = `INSERT INTO PERSON (name,email,password) 
                        values ('${req.body.name}', '${req.body.email}', '${password}')`
        const res1 = await conn.query(query);
        console.log(res1);
        res.json("done")
        
    }
    else{
        res.json("We only support POST")
    }
}