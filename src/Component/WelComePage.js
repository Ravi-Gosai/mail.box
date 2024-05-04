import React from 'react'
import { NavLink } from 'react-router-dom'

const WelComePage = () => {
  return (
    <>
      <header className='header'>
        <h1>welcome to expense treacker</h1> 
        <div><p> your profile is incomplate <NavLink to='/update'> complate now</NavLink></p> </div>
      </header>
    </>
  )
}

export default WelComePage
