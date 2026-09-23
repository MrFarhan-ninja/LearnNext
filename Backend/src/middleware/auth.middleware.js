

import config from "../database/config.js"
import jwt from "jsonwebtoken"


const isLoggedIn = async (req,res,next)=>{
  try{
    //   const accessToken = req.headers.authorization.split(" ")[1]

    const authHeader = req.headers.authorization

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({
              message: "Access token is missing or malformed",
              success: false,
          });
      }
      //console.log(req.cookies)

      const accessToken = authHeader.split(" ")[1]
   
    const decode = jwt.verify(accessToken,config.ACCESS_TOKEN_SECRET)

    req.user = decode
    return next()
  }
  catch(err){
    return res.status(400).json({
        message:"Invalid",
        success:false
    })
  }
  
}

export{
    isLoggedIn
}