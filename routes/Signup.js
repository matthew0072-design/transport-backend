var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")
const Booking = require("../src/Model/bookingModel")
const User = require("../src/Model/userModel");


const MAX_AGE =  3 * 24 * 60 * 60;
const generateAuthToken = (id) => {
  return jwt.sign({id}, "neverfearchallenge", {expiresIn: MAX_AGE});

}

router.post("/register-user", async (req, res) => {
  try {
    const user = await new User({
      Surname: req.body.Surname,
      otherNames: req.body.otherNames,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      confirmedPassword: req.body.confirmedPassword,
    }).save();
    
    const token = generateAuthToken(user._id);
    let loggedUserId = user._id
    console.log({token});
    res.status(201).json({token, loggedUserId})
  } catch (e) {
    console.log(e);
    res.send(e).status(400);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    
    const token = generateAuthToken(user._id);
    let loggedUserId = user._id
    console.log(token); 
    res.status(200).json({ token, loggedUserId });
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

router.post("/book", async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    console.log(e);
  }
});


router.get("/user", async (req, res) => {
  let currentUser;
    if (req.cookies.user) {
        const token = req.cookies.user;
        const decoded = await jwt.verify(token, "neverfearchallenge");
        currentUser = await User.findById(decoded.id)
         
      } else {
        currentUser =  null;
      }    

      res.status(200).send({ currentUser});
})


router.get("/logout", async (req, res) => {
  try {
    
    res.status(200).send('user is logged out');
      
    }
    
  catch (e) {
    console.log(e);
    res.status(501).send(e);
  }
});

module.exports = router;
