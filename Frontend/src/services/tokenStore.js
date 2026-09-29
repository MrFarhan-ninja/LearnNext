const ACCESS_KEY= "accesstoken"
const REFRESH_KEY = "refreshtoken"
const USER_KEY = "user"


const tokenStore = {
    getAccessToken : ()=> localStorage.getItem(ACCESS_KEY) || null,
    getRefreshToken : ()=> localStorage.getItem(REFRESH_KEY) || null,
    getUser : ()=> {
   
         const raw = localStorage.getItem(USER_KEY);
        
        try {
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return null;
        }
    },

    set:({accessToken,refreshToken,user}={})=>{
        if(accessToken){
            localStorage.setItem(ACCESS_KEY,accessToken)
        }
         if(refreshToken){
            localStorage.setItem(REFRESH_KEY,refreshToken)
        }
         if(user){
            localStorage.setItem(USER_KEY,JSON.stringify(user))
        }
    },
    clear:()=>{
        localStorage.removeItem(ACCESS_KEY)
        localStorage.removeItem(REFRESH_KEY)
        localStorage.removeItem(USER_KEY)

    }
}

export default tokenStore