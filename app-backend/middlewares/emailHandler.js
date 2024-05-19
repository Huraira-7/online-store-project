import nodemailer from "nodemailer"
import dotenv from 'dotenv';
dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, //TLS
    secure: false, // Use `true` for port 465 (SSL), `false` for all other ports
    auth: {
        user:process.env.EMAIL,
        pass:process.env.PASS,
    },
});

export default transporter;