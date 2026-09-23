import { Router } from "express";
import { newRefreshToken, register,verifyEmail,login,forgotPassword,resetPassword,changePassword, logout,getMe } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const authRouter = Router()

authRouter.route("/register").post(register)
authRouter.route("/verify/:token").get(verifyEmail)
authRouter.route('/login').post(login)
authRouter.route('/refreshtoken').get(newRefreshToken)
authRouter.route("/forget").post(forgotPassword)
authRouter.route("/reset/:resetToken").post(resetPassword)
authRouter.route('/change').post(isLoggedIn,changePassword)
authRouter.route("/logout").post(isLoggedIn,logout)
authRouter.route("/getMe").get(isLoggedIn,getMe)


export default authRouter