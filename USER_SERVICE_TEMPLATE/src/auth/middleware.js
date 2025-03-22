const {verifyToken} = require("./jwt");

const authenticate = (req,res,next)=>{
    if (req.body.query.includes("previousRegisterData")) { 
        return next();
    }
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({error:"unauthorized access."});
    try{
        const decoded = verifyToken(token);
        req.user = decoded
        next();
    }catch(err){
        return res.status(401).json({err:"token overdue."});
    };

};

module.exports = {
    authenticate
};