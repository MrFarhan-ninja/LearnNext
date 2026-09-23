import jwt from 'jsonwebtoken'
import config from '../database/config.js'


const verifyRefreshToken=(refresToken)=>{
   
    const decode  = jwt.verify(refresToken,config.REFRESH_TOKEN_SECRET)

    return decode

}
const verifyAccessToken = (accessToken) => {
    try {
        
        const decode = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
        return decode; 
    } catch (error) {
        
        console.error("JWT Verification Error:", error.message);
        return null; 
    }
};

export { 
    verifyRefreshToken,
    verifyAccessToken,
}