const nodemailer = require('nodemailer')

class MailService {
    transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            requireTLS: true,
            secure: false,
        })
    }

    async sendEmail(data) {
        await this.transporter.sendMail({
            from: `${data.name} <${data.email}>`, // sender address
            to: process.env.SMTP_USER, // list of receivers
            subject: 'WORK ✔', // Subject line
            text: `${data.message}`, // plain text body
            html: `<b>${data.message}</b>`, // html body
        })
    }
}

module.exports = new MailService()