

import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';
import nodemailer from "nodemailer";
import config from '../database/config.js';
import {verifyRefreshToken,verifyAccessToken} from '../utils/auth.js';
import crypto from 'crypto'

const register = async (req,res)=>{

    const {userName,email,password}=req.body;

    //console.log(req.body)

    if(!userName || !email || !password ){
        return res.status(400).json({
            success:false,
            message:"Enter the required inputs"
        })
    }
    const existEmail = await User.findOne({email})

    if(existEmail){
        return res.status(409).json({
            success:false,
            message:"Your Email is already registered"
        })
    }

    const user=await User.create({
        userName,email,password:await bcrypt.hash(password,10)
    })
    // const eamilVerifytoken = 

    const accessToken=user.generateAccessToken({userId:user._id})
    //console.log(accessToken)

    const refreshToken=user.generateRefreshToken({userId:user._id})
    //console.log(refreshToken)
   const token = user.generateEmailVerifyToken()

    user.eamilVerifytoken = token

    
    //user.accessToken = accessToken
    user.refreshToken = refreshToken
    await user.save()

   const cookieoptions = {
        httpOnly:true,
    
    }
    res.cookie("RefreshToken",refreshToken,cookieoptions)

//Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host:config.MAILTRAP_HOST,
  port: config.MAILTRAP_PORT,
  secure: false, 
  auth: {
    user: config.MAILTRAP_USER,
    pass: config.MAILTRAP_PASS,
  },
});


  const mailOptions = {
    from: config.MAILTRAP_SENDERAMAIL, // sender address
    to: user.email, // list of recipients
    subject: "Hello", // subject line
    text: "Hello world?", // plain text body
    html: `${config.BASE_URL}/api/v1/auth/verify/${token}`
  };


  await transporter.sendMail(mailOptions,(err,info)=>{

    if(err){
        console.log(err,"Email not sent")
    }else{
        console.log(info.messageId)
        // console.log(`Email has sent to ${user.email}`)
        // user.isEmailVerified = true
    
    }
    })

   console.log(`Email has sent to ${user.email}`)
    //user.isEmailVerified = true
   // await user.save()


   res.status(200).json({
        success:true,
        message:'User successfully created',
        data:{
            user:{
                name:user.userName,
                email:user.email,
            }

        },
        accessToken,
        
    })  
    


}

const verifyEmail = async(req,res)=>{
    const {token} = req.params

    if(!token){
        return res.status(404).json({
            success:false,
            message:"Invalid token"
        })
    }


    const user = await User.findOne({eamilVerifytoken:token})

    if(!user){
        return res.status(401).json({
            success:false,
            message:"Your email verification code is wrong"
        })
    }

    user.eamilVerifytoken = undefined
    user.isEmailVerified = true
    await user.save()

    res.status(200).json({
        success:true,
        message:"Your email is verified"
    })
}

const newRefreshToken = async(req,res)=>{
    const RefreshToken = req.cookies.RefreshToken

    if(!RefreshToken){
        res.status(401).json({
            success:false,
            message:"Invalid token"
        })
    }

    const decoded=verifyRefreshToken(RefreshToken)

    const user = await User.findById(decoded.id)

    if(RefreshToken !== user.refreshToken){
        
        user.refreshToken = undefined
        await user.save()

        return res.status(404).json({
            success:false,
            message:"Your refresh token is being invalid"
        })

        
    }

    const newaccessToken = user.generateAccessToken()
    const newrefrestToken = user.generateRefreshToken()

     const cookieoptions = {
        httpOnly:true
    }
    res.cookie("RefreshToken",newrefrestToken,cookieoptions)

     user.refreshToken = newrefrestToken

    await user.save()

   
    res.status(200).json({
        success:true,
        message:"New refresh token is generated successfully"
    })


}

const login = async (req,res)=>{
    const {email,password } = req.body
    const headeraccessToken = req.headers.authorization?.split(" ")[1]

    if (!headeraccessToken) {
    return res.status(401).json({ message: "Access token is required" });
}
    // if(!isEmailVerified){
    //     return res.status(404).json({
    //         success:false,
    //         message:"Please verify your email"
    //     })
    // }

    if(!email || !password){
        return res.status(401).json({
            success:false,
            message:"Enter the required field"
        })
    }

    const decoded = verifyAccessToken(headeraccessToken)

    console.log(decoded)

    const id = await User.findById(decoded.id)

    if(!id){
        return res.status(400).json({
            success:false,
            message:"Your access token is invalid"
        })
    }


    

    const user = await User.findOne({email})

     if(user.isEmailVerified  === false){
        return res.status(404).json({
            success:false,
            message:"Please verify your email"
        })
    }

    if(!user){
        return res.status(400).json({
            success:false,
            message:"Your email is invalid and Please register"
        })
    }

    const validPassword = await bcrypt.compare(password,user.password)

    if(!validPassword){
         return res.status(400).json({
            success:false,
            message:"Your Password is invalid"
        })
    }


    const accessToken=user.generateAccessToken({userId:user._id})
    //console.log(accessToken)

    const refreshToken=user.generateRefreshToken({userId:user._id})

       const cookieoptions = {
        httpOnly:true,
    
    }
    res.cookie("RefreshToken",refreshToken,cookieoptions)

    user.isLoggedIn = true
    user.refreshToken = refreshToken
    await user.save()

    res.status(200).json({
    success:true,
    message:"User login successfully",
    accessToken
})

}
    
const forgotPassword = async (req,res)=>{
    const {email} = req.body

    if(!email){
        return res.status(401).json({
            success:false,
            message:"Enter the email"
        })
    }

     const user = await User.findOne({email})

    if(!user){
         return res.status(401).json({
            success:false,
            message:"Enter the email"
        })
    }

    if(user.isEmailVerified === false){
         return res.status(401).json({
            success:false,
            message:"Please verify your email"
        })
    }

      if(user.isLoggedIn === false){
         return res.status(401).json({
            success:false,
            message:"Please logout"
        })
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    console.log(resetToken)

    const resettime = Date.now() + 10 * 60 * 1000;

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')



    user.resetPasswordToken = hashedToken
    user.resetPasswordTokenExpires = resettime

    await user.save()


    const transporter = nodemailer.createTransport({
  host:config.MAILTRAP_HOST,
  port: config.MAILTRAP_PORT,
  secure: false, 
  auth: {
    user: config.MAILTRAP_USER,
    pass: config.MAILTRAP_PASS,
  },
});


  const mailOptions = {
    from: config.MAILTRAP_SENDERAMAIL, // sender address
    to: user.email, // list of recipients
    subject: "Hello", // subject line
    text: "Hello world?", // plain text body
    html: `${config.BASE_URL}/api/v1/auth/reset/${resetToken}`
  };


  await transporter.sendMail(mailOptions,(err,info)=>{

    if(err){
        console.log(err,"Email not sent")
    }else{
        console.log(info.messageId)
        console.log(`Email has sent to ${user.email}`)
        console.log(`Email has sent to ${user.userName}`)
    }
    })


      res.status(200).json({
        success:true,
        message:'resetpassword has sent successfully',
        data:{
            user:{
                name:user.userName,
                email:user.email,
            }

        },
        
    })  
    



    
}


const resetPassword = async(req,res)=>{
    const {resetToken} = req.params
    const {changepass} = req.body
    console.log(resetToken)
    console.log(changepass)
    


    if(!resetToken){
          return res.status(401).json({
            success:false,
            message:"invalid reset Token"
        })


    }

    
     if(!changepass){
          return res.status(401).json({
            success:false,
            message:"invalid new password"
        })
    }

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken:hashedToken,
        resetPasswordTokenExpires: { $gt: Date.now() }
    })

  
    if (!user) {
    return res.status(400).json({ message: "Token is invalid or has expired." });
   }

   const hashedPassword = await bcrypt.hash(changepass,10)

   user.password = hashedPassword
   user.resetPasswordToken = undefined
   user.resetPasswordTokenExpires = undefined

   await user.save()


   res.status(200).json({ message: "Password updated successfully!" });
}

const logout = async (req, res) => {
    try {
        
        const cookieOptions = {
            httpOnly: true,
            sameSite: "strict" // Match whatever you used in your login setup
        };

        
        res.clearCookie("RefreshToken", cookieOptions);

        

        return res.status(200).json({
            success: true,
            message: "Logged out successfully! Cookies cleared."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error during logout"
        });
    }
};



const changePassword = async(req,res)=>{
    
    const id = req.user.id
    const{password ,newPassword} = req.body

      if (!password || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Both current password and new password are required"
            });
        }

    const user = await User.findById(id)

    if(!user){
        return res.status(401).json({
            success:false,
            message:"User not found"
        })
    }

    if(user.isLoggedIn === false){
        return  res.status(401).json({
             success:false,
             message:"Please login"
         })
    }

    if(password === newPassword){
          return  res.status(401).json({
             success:false,
             message:"give different password for the new password"
         })
    }

   // const hashedPassword = await bcrypt.hash(password,10)

    const isValidPassword = await bcrypt.compare(password,user.password)

    if(!isValidPassword){
          return res.status(401).json({
            success:false,
            message:"Incorrect current Password"
        })
    }

    const hashednewPassword = bcrypt.hash(newPassword,10)
    
    user.password = hashednewPassword

    await user.save()


    
  return res.status(201).json({
            success:true,
            message:"Changed Password successfully"
        })
    




}


const getMe = async (req,res)=>{
  try{
      const decode = req.user.id
      console.log(decode)
    
    const user = await userModel.findById(decode).select('-hashedPassword')

    if(!user){
        return res.status(401).json({
            success:false,
            message:"User not found"
        })
    }
     console.log(`${user.userName} accessed their profile.`);
     res.status(200).json({
      success: true,
      message: "user enter in profile!",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });

    //console.log(`${user.userName} enter own profile!`)

  }
   catch (error) {
    return res.status(401).json({
      success: false,
      message: "User is unauthorized!",
    });
  }

}
  

// const logoutfromalldevices = async(req,res)=>{

// }


export {
    register,
    newRefreshToken,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword,
    changePassword,
    logout,
    getMe,
}



//   return res.status(401).json({
//             success:false,
//             message:"Enter the email"
//         })