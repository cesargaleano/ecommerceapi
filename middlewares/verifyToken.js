const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        console.log(token);
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
            if(err) return res.status(403).json({
                status:'error',
                msg: 'Token is not Valid!'
            });
            req.user = user;
            next();

        });

    }
    else return res.status(401).json({
        status:'error',
        msg: 'You are Not Authenticated!'
    })
};

const verifyTokenAndAuthorization = (req,res, next )=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json({
                status:'error',
                msg: 'You are Not Allowed to do that!'
            });
        }
    })
};

const verifyTokenAndAdmin = (req,res, next )=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json({
                status:'error',
                msg: 'You are Not Allowed to do that!'
            });
        }
    })
};




module.exports = { 
                verifyToken,
                verifyTokenAndAuthorization,
                verifyTokenAndAdmin
                 };