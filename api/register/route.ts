import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import prisma from '../../libs/prismadb'

export default async function handler(
    req : NextApiRequest, 
    res : NextApiResponse)
    {
    if(req.method !== 'POST'){
        return res.status(405).end()
    }

    try {
        console.log('egaa')
        const {email, NickName, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma?.user.create({
            data : {
                email,
                NickName,
                hashedPassword,
            }
        })

        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}