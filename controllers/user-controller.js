let router = require("express").Router(); //here
let User = require("../db").import("../models/user"); //here
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//USER CREATE
router.post('/create', function(req, res){
    let userModel= {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 13)
    };
    User.create(userModel)
        .then(function (user) {
            let token = jwt.sign({id: user.id}, "i_am_secret", {expiresIn: 60*60*48})
            res.status(200).json({
                user: user,
                token: token
            })
            })
        .catch(function(err) {
            res.status(500).json({error: err})
        })});

//USER LOGIN
router.post('/login', function(req, res) {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(function loginSucess(user) {
            if (user) {
                bcrypt.compare(req.body.password, user.password, function(err, matches){
                    if (matches) {
                        let token = jwt.sign({id: user.id}, "i_am_secret", {expiresIn: 60*60*48})
                        res.status(200).json({
                            user: user,
                            message: "User successfully logged in!",
                            sessionToken: token
                        })
                    }
                    else {
                        res.status(502).send({error: "Login Failed"});
                    }
                }
           )}
        else {
            res.status(500).json({error: "User does not exist"})
        }
    }
) .catch(err => res.status(500).json({err: error}))
});

module.exports = router;
