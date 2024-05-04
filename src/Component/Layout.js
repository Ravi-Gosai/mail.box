import React from 'react'
import { AuthContextProvider } from '../auth-context'

const Layout = (props) => {
  return (
    <>
    <AuthContextProvider>
      {props.children}

    </AuthContextProvider>
    </>
  )
}

export default Layout
