import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { darkModeAction } from '../store/darkModeSlice'
import './Layout.css'
import Header from './Header'



const Layout = (props) => {
  const dispatch = useDispatch()
  const darkModeValue = useSelector(state=>state.darkmode.darkModeIs)
  const isLogin = useSelector(state=>state.auth.isLoggedIn)

  let classNameOfMode = ''
  if(darkModeValue){
    classNameOfMode = 'maindivmode'
  }
  return (
    <>
    {!isLogin && <Header></Header>}
    <div className={classNameOfMode}>
    {/* <AuthContextProvider> */}
    <button onClick={()=>dispatch(darkModeAction.toggleMode())}> {darkModeValue ? 'light ' : 'dark '} mode</button>
      {props.children}

    {/* </AuthContextProvider> */}
    
    </div>
    </>
  )
}

export default Layout
