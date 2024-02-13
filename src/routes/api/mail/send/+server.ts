import nodemailer  from 'nodemailer';
import { json } from '@sveltejs/kit';
import dotenv from 'dotenv'
dotenv.config()

export async function POST({request}){
    const req = await request.json()
    const { to, subject, text,html } = req
    

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: true,
        
        auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"xx.xx" <evgen041083@gmail.com>',
        to,
        subject,
        text,
        html,
    });

   const response = new Response(JSON.stringify(info), {
        headers: { 'content-type': 'application/json' },
    })
    return json(response)
}

