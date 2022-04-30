const jwt=require('jsonwebtoken');

const checkLogin=(req,res,next)=>{
    const {authorization}=req.headers;

    try {

        const token=authorization.split(' ')[1];
        const decoder=jwt.verify(token,env.process.JWT_SECRET);
        const {username,userId}=decoder;
        req.username=username;
        req.userId=userId;
        next()
        
    } catch (error) {
        next('Authorization Failed !')
        
    }



}

module.exports=checkLogin;