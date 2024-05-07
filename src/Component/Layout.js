import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { darkModeAction } from '../store/darkmodeSlice'
import './Layout.css'



const Layout = (props) => {
  const dispatch = useDispatch()
  const darkModeValue = useSelector(state=>state.darkmode.darkModeIs)

  let classNameOfMode = ''
  if(darkModeValue){
    classNameOfMode = 'maindivmode'
  }
  return (
    <>
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
