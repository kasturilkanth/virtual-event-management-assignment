const nodemailer=require('nodemailer');

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'your-email@gmail.com',
        pass:'your-password'
    },
});

exports.sendEmail=(to,subject,text)=>{
    const mailOptions={
        from:'your-email@gmail.com',
        to,
        subject,
        text,
    };
   return transporter.sendMail(mailOptions);
}