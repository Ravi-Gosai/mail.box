import { createContext, useState } from "react";
// aa project ma context na badha kam redux thi thay chhe to aano use nathi aa project ma

const AuthContext = createContext({
    token: '',
    isLoggedIn : false,
    login : (token)=>{},
    logout: ()=>{}

})

export const AuthContextProvider = (props)=>{

    const intialTokenState = localStorage.getItem('token')

    // setTimeout(()=>{
    //     localStorage.removeItem('token')
    // },60*5000)


    const [token,setToken] = useState(intialTokenState)

    const userIsloggedIn = !!token;


    const loginHandler = (token)=>{
        setToken(token)
        localStorage.setItem('token',token)
        
    }
    const logoutHandler = ()=>{
        setToken(null)
        localStorage.removeItem('token')
    }

    const contextValue = {
        token :token,
        isLoggedIn : userIsloggedIn,
        login : loginHandler,
        logout : logoutHandler
    }

    
    return(
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;