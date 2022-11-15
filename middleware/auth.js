const jwt = require("jsonwebtoken");
const key = "jassi";

const auth = (req, res, next) => {
  try {
    let token = req.params.token || req.cookies.token;
    if (token) {
      let user = jwt.verify(token,key);
      if (user) {
        req.userid = user.id;
        req.useremail = user.email;
        
        next();
      }
    } else {
        return res.status(401).json({
        message: "samjhe daya ye bina token ke ki hi login karna chah raha hai"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "kuchh to gadbad hai daya",
    });
  }
};

module.exports = auth;
