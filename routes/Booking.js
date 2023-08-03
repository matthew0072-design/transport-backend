var express = require("express")
var router = express.Router()
const jwt = require("jsonwebtoken")
const Vonage = require('@vonage/server-sdk')

const Booking = require("../src/Model/bookingModel")
const User = require("../src/Model/userModel")

const vonage = new Vonage({
    apiKey: "6959681c",
    apiSecret: "FauDGL2Z1P2OTSIm"
  })

  
  
router.post("/booking", async(req, res) => {
    
    try {
        const booking = await new Booking({
            from: req.body.from,    
            to: req.body.to,
            owner: req.body.bookedUser
        }).save()
       let bookedId = booking._id
        res.status(201).json({booking, bookedId})
        console.log(bookedId)
    } catch (e) {
        console.log(e)
    }
})
   
router.get('/getBooking', async(req,res) => {
   
    // let token = req.cookies.user
    // const decoded= await jwt.verify(token, "neverfearchallenge")
    // console.log(decoded.id)
    if(req.cookies.bookedId) {
        let id = req.cookies.bookedId;
        console.log(id)
        const booking = await Booking.findById(id)
        res.status(200).json({booking}) 
    } else {
        console.log("you idea is not working")
    }
    //const id1 = req.params.id
    //console.log(id) 
    //const bookings = await Booking.findById(decoded).populate('owner')
    //console.log({bookings})
    //res.status(201).json({bookings})
})
  
router.get('/sendMessage', async(req, res) => {
    let from = req.body.from;
    let to = req.to;
     let phone = req.owner


     console.log(from)
     console.log(to)
     console.log(phone)
    
//   const source = "LMTS"
//   const destination = "2348160696670"
//   const text = `There is order for you..... you carry the person from ${from} area to ${to} area.
//    For more clarity try and call the person on ${phone}`

//   const message =   vonage.message.sendSms(source, destination, text, (err, responseData) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if(responseData.messages[0]['status'] === "0") {
//                 console.log("Message sent successfully.");
//             } else {
//                 console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//             }
//         } 
//     })
//      res.status(200).send({message})
})


module.exports = router;