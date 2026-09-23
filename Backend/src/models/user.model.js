import mongoose,{Schema} from "mongoose";
import config from "../database/config.js";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'


const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:10
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordTokenExpires:{
        type:String
    },
    eamilVerifytoken:{
        type:String
    },
    eamilVerifytokenExpires:{
        type:String
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true
})

// userSchema.pre("save",async function(){
//     if(!this.password.isModified())
// })

userSchema.methods.generateAccessToken = function(){
    const accessToken = jwt.sign({
        id:this._id
    },config.ACCESS_TOKEN_SECRET,
    {expiresIn:"15m"})

    return accessToken
}
userSchema.methods.generateRefreshToken = function(){
    const refreshToken = jwt.sign({
        id:this._id
    },config.REFRESH_TOKEN_SECRET,
    {expiresIn:"1d"})

    return refreshToken
}

userSchema.methods.generateEmailVerifyToken = function(){
    const token = crypto.randomBytes(32).toString("hex")

    return token
}






const User = mongoose.model("user",userSchema)

export default User




