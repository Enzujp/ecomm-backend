const Queue = require("bull");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: 'smpt.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
    
});

const EmailQueue = new Queue('sendEmail');

EmailQueue.process(async (job, done) => {
    try {
        const {email, html} = job.data;

        transporter.sendMail({
            from: 'Enzu <puurpimpickle@gmail.com>',
            to: email,
            subject: "Welcome, this is it.",
            html

        })
        .then(() => {
            done();
        })
        .catch((err)=> {
            console.log(err);
            done(err)
        })

    } catch (error) {
        done(error);
        res.status(500).json({
            message: "Error occured while sending mail",
            error: error.message
        })
    }
})


module.exports = EmailQueue;