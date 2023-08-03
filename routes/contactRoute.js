const express = require("express");
const Auth = require("../src/Middleware/Auth");
const nodemailer = require("nodemailer");
const router = express.Router();


router.post("/contact", Auth, (req, res, next) => {
  
  let {name, email, subject, number, message} = req.body
     


    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "amfagoroye97@student.lautech.edu.ng",
        pass: "matthew0072",
      },
    });

    try {
      const info = transporter.sendMail({
        from: `from ${name}, ${email}`,
        to: `amfagoroye97@student.lautech.edu.ng`,
        subject: `${subject}`,
        text: `${message} and their contact is ${number}`,
  
      });

      console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
    }catch(err) {
      console.log(err)
    }
    
    res.status(200).json(req.body)


})

  module.exports = router;
