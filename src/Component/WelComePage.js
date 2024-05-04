import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../auth-context'
import './WelcomePage.css'

const WelComePage = () => {

  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)
  const [usersDetails, setUserDetails] = useState({
    photoUrl : '',
    displayName : '',
    email :'r'
  })

  useEffect(()=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCur9xCsh35ycJRAqP2U3DynKEpK8MDbj8',{
      method : 'POST',
      body: JSON.stringify({
        idToken : authCtx.token
      }),
      headers : {
        'Content-Type' : 'applicaton/json'
      }
    }).then((res)=>{
      console.log(res)
      if(res.ok){
        return res.json()
      }
    }).then((data)=>{
      // console.log(data.users[0])
      setUserDetails(data.users[0])
    })
      
  },[authCtx.token])
const emailVerifyHandler = ()=>{

  fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCur9xCsh35ycJRAqP2U3DynKEpK8MDbj8',{
    method : 'POST',
    body : JSON.stringify({
      requestType : 'VERIFY_EMAIL',
      idToken : authCtx.token
    }),
    headers :{
      'Content-Type' : 'applicaton/json'
    }
  }).then((res)=>{
    console.log(res,'vvvvv')
  })
}
  
const logoutHandler = ()=>{
  authCtx.logout()
  navigate('/')

}
  return (
    <>
      <header className='header'>
        <h1>welcome to expense treacker </h1> 
        <div><p> your profile is incomplate <NavLink state={usersDetails} to='/update'>update here</NavLink></p> <button onClick={logoutHandler}> logout </button><button onClick={emailVerifyHandler}> verify email {usersDetails.email}</button></div>
        
      </header>
    </>
  )
}

export default WelComePage
