var express = require("express");
var router = express.Router();
const Driver = require("../src/Model/driverModel");
//const Auth = require("../src/Middleware/auth");

router.post("/register-driver", async (req, res, next) => {
  try {
    const driver = await new Driver({
      surname: req.body.surname,
      otherNames: req.body.otherNames,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password,
      confirmedPassword: req.body.confirmedPassword,
    }).save();
    const token = await driver.generateAuthToken();
    console.log({ driver, token });
    res.status(201).send(driver);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

router.post("/logout", async (req, res) => {
  try {
    req.driver.tokens = req.driver.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.driver.save();
    res.status(200).send(`User logout successfully`);
  } catch (e) {
    console.log(e);
    res.status(501).send(e);
  }
});

module.exports = router;
