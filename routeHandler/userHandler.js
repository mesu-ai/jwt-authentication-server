const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const router = express.Router();
const userSchema = require("../userSchema");
const { enabled } = require("express/lib/application");
const user = new mongoose.model("user", userSchema);


//signup

router.post("/signup", async(req, res) => {
    //console.log(req.body);
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new user({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        });
        console.log(newUser);
        await newUser.save();
        res.status(200).json({
            message: "Signup was successful!",
            
        });
    } catch (error) {
        res.status(500).json({
            message: `Signup failed! ${error}`,
        });
    }
});


router.post('/login',async(req,res)=>{
    const findUser=await user.find({username:req.body.username});
    try {

        if(findUser && findUser.length>0){
            const isValidPass=await  bcrypt.compare(req.body.password, findUser[0].password);
      
            if(isValidPass){
      
              const token=jwt.sign({
                  username:findUser[0].username,
                  userId:findUser[0]._id
              },process.env.JWT_SECRET,{
                  expiresIn:'1h'
              })
              res.status(200).json({
                  'access_token':token,
                  'message':"login successfully"
              })
      
      
      
            }
            else{
      
              res.status(401).json({
                  "error":"Authentication Failed"
              })
      
            }
      
      
          }else{
              res.status(401).json({
                  "error":"Authentication Failed "
              })
          }
        
    } catch (error) {
            res.status(401).json({
            "error":"Authentication Failed "
        })
        
    }

    


})


module.exports=router;