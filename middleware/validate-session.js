const jwt = require("jsonwebtoken");
const User = require("../db").import("../models/user");

const validateSession = (req, res, next) => {
    const token = req.headers.authorization; //token is like a magicband :)
    console.log("token --> ", token);

    if (!token) { //! means not, if no token provided say no token provided
        return res.status(403).send({auth: false, message: "No token provided"})
    } else {
        jwt.verify (token, "i_am_secret", (err, decodeToken) => { //verifies the token/magicband and decrypts it
        console.log("decodeToken --> ", decodeToken);
        if (!err && decodeToken) { //no error when decrypting, unencrypt it and search database
            User.findOne({
                where: { //where are you searching? looking for YOU
                    id: decodeToken.id
                }
            })
            .then (user => {
                console.log("user--> ", user); //found you!!
                if(!user) throw err;
                console.log("req --> ", req) //taking info from db and storing info in req.user
                req.user = user;
                return next(); //exiting the validateSession and going back to original function
            })
            .catch(err => next(err));
    } else {
        req.errors = err;
        return res.status(500).send("Not Authorized"); //if token is expired it jumps here
    }
    });
  }
};

module.exports = validateSession;