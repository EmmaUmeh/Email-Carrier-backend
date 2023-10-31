
const Email = require("../models/email.model");
const sgMail = require('@sendgrid/mail');


const SendEmail = async (req, res) => {
 sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const {to, subject, text} = req.body;

   try{
    const msg = new Email({
        to,
        subject,
        text
    })

    await sgMail.send(msg)
    res.status(204).json({msg: "Email Created Successfully"})
   }catch(error) {
    res.status(500).json({error: "Error why creating Email"})
   }

    

}

module.exports = { SendEmail }