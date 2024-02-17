import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import prisma from '../libs/prismadb'

export default async function handle(
    req : NextApiRequest, 
    res : NextApiResponse)
    {
    if(req.method !== 'POST'){
        return res.status(405).end()
    }

    try {
        const {email, NickName, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma?.user.create({
            data : {
                email,
                NickName,
                hashedPassword
            }
        })
    } catch (error) {
        console.log(error)
    }
}