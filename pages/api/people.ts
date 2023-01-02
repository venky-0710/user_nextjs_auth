import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {conn} from '../../db'
import {verify} from 'jsonwebtoken'

export const authenticated = (fn:NextApiHandler) => async(req:NextApiRequest,res:NextApiResponse)=>{
    verify(req.cookies.authorization!,process.env.SECRET!,async function(err,decoded){
        if(!err&&decoded){
            return await fn(req,res);
        }
        res.status(401).json({message:"YOU are not authenticated"})
    })
}
export default authenticated(async function getPeople(req:NextApiRequest,res:NextApiResponse){
    const k = (await conn.query('SELECT id,name,email FROM person')).rows;
    console.log(k);
    res.json(k);
})