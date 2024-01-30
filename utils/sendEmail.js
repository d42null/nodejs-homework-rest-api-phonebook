const sgMail = require('@sendgrid/mail')
require("dotenv").config();
sgMail.setApiKey(process.env.SG_API_KEY)

const sendEmail=async(data)=>{
    await sgMail.send({...data,from:process.env.verification_sender_mail})
    return true
}
module.exports=sendEmail;

  