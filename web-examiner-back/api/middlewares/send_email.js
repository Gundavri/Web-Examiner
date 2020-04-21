const nodemailer = require('nodemailer');

module.exports.sendEmail = async (mailToSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.EMAIL_PASSWORD 
            }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail(mailToSend);
    transporter.sendMail(info, (err, inf) => {
        if(err)
            console.log(err)
        else
            console.log(inf);     
    })
};