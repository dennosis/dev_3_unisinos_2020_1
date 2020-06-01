const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authConfig = require("../../config/auth");

const User = require('../../models/user');

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
};

exports.signin = async (req, res) => {

    const {email, password}  = req.body
    let filedsErrors = {}
    let emptys = false
    if(email == "" || email == undefined){
        filedsErrors["email"]="Empty email"
    }

    if(password == "" || password == undefined){
        filedsErrors["password"]="Empty password"
    }

    let user
    
    if((Object.keys(filedsErrors).length === 0)){
        user = await User.findOne({email}).select('+password');
        if(!user)
            filedsErrors["email"]="User Not found."
    }

    if((Object.keys(filedsErrors).length === 0)){
        let passwordIsValid =  await bcrypt.compare(password, user.password);
        if(!passwordIsValid)
            filedsErrors["password"]="Invalid Password."
    }

    if(!(Object.keys(filedsErrors).length === 0)){

        return res.status(401).send({
            errors:filedsErrors,
            message:"Error when logging in"
        })

    }else{

        let token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400 // 24 hours
        });
        res.send({
            id: user._id,
            name: user.name,
            email: user.email,
            token: token
        })
    }

};