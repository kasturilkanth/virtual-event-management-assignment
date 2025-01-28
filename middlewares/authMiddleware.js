const jwt=require('jsonwebtoken');
const SECRET_KEY='secretkey';

exports.authenticate=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(403).json({message:'Unauthorized'});
    }
    jwt.verify(token,SECRET_KEY,(err,decoded)=>{
        if(err){
            return res.status(403).json({message:'Invalid token'});
        }
        req.user=decoded;
        next();
    });

}