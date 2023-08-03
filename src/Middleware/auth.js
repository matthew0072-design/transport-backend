const jwt = require("jsonwebtoken");


const Auth = (req, res, next) => {
  
      const token = req.data.token;
      
      console.log(token)
      
      if (token) {
        jwt.verify(token, "neverfearchallenge", (err, decodedToken) => {
          if(err) {
            res.send("Problem logging in ")
          }else {
            console.log(decodedToken)
          
            next()
          }
        })
      } else {
        console.log("error in logging")
      }
    

};



module.exports = Auth;
