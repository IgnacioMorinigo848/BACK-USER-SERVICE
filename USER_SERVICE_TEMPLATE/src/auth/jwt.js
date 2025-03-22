const jwt = require("jsonwebtoken");
require("dotenv").config()

const generateToken = (user) =>{
    return jwt.sign({id: user.id},process.env.JWT_SECRET,{ expiresIn:process.env.JWT_EXPIRES_IN});
};

const tokenTemporal = (email, code) => {
    return jwt.sign({ email:email, code:code }, process.env.JWT_SECRET, { expiresIn: "10m" });
  };

const verifyToken = (token) =>{
    return jwt.verify(token,process.env.JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken,
    tokenTemporal,
};