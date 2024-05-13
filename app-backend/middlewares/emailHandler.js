import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, //TLS
    secure: false, // Use `true` for port 465 (SSL), `false` for all other ports
    auth: {
        user: "noreplyautomated999@gmail.com",
        pass: "chzk nzdq nooq jvjl",
    },
});

export default transporter;