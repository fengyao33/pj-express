import { settings } from '@config/settings';
import nodemailer from 'nodemailer';

function mail(email, newPassword) {
    const mailTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: settings.MAILER.USERNAME,
            clientId: settings.MAILER.MAIL_CLIENT_ID,
            clientSecret: settings.MAILER.MAIL_CLIENT_SECRECT,
            refreshToken: settings.MAILER.MAIL_REFRESH_TOKEN,
            accessToken: settings.MAILER.MAIL_ACCESS_TOKEN,
        }
    });
    const options = {
        from: 'cinekkaohsiung@gmail.com',
        to: email,
        subject: 'Cinek新密碼',
        html: `<html><body style="color: black"><h2>Cinek 新密碼</h2><strong>密碼：${newPassword}</strong><p style = "color:red">* 請儘速登入並修改密碼。</p></body></html>`
    }
    mailTransport.sendMail(options, (err, res) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(JSON.stringify(res));
        }
    });
}

export default mail;