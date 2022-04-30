const mongoose =require('mongoose');

const userSchema= mongoose.Schema({
    name:{
        type:String,
        // required:true,
    },
    username:{
        type:String,
        // required:true,
    },
    password:{
        type:String,
        // required:true,
    },
    status:{
        type:String,
        enum:["active","inactive"],
    },
    date:{
        type:Date,
        default: Date.now,
    }
})

module.exports= userSchema;
// module.exports= mongoose.model("user",userSchema);