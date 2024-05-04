import React, { useContext, useState } from 'react'
import AuthContext from '../auth-context'
import { useLocation, useNavigate } from 'react-router'

const UpdateProfile = () => {
const [username , setUserame] = useState('')
const [photoUrl, setPhotoUrl] = useState('')

const authCtx = useContext(AuthContext)
const location = useLocation()
console.log(location.state,'loc')
const navigate = useNavigate()
const submitHandler = (e)=>{
    e.preventDefault()
    // console.log(username,photoUrl)

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCur9xCsh35ycJRAqP2U3DynKEpK8MDbj8',{
        method :'POST',
        body : JSON.stringify({
            idToken : authCtx.token,
            displayName : username,
            photoUrl : photoUrl,
            returnSecureToken : true
        }),
        headers : {
            'Content-Type' : 'applicaton/json'
        }
    }).then((res)=>{
        console.log(res)
    })
}
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1>contact details</h1>
        <br></br>
        <label htmlFor='username'>Full name</label>
        <input value={location.state.displayName} id='username' type="text" onChange={(e)=>setUserame(e.target.value)} />
        <br></br>
        <br></br>
        <label htmlFor='photourl'> photo Url</label>
        <input  value={location.state.photoUrl} id='photourl' type="text" onChange={(e)=>setPhotoUrl(e.target.value)} />
        <br></br>
        <br></br>
        <button type='submit'> update</button>
        <br></br>
        <br></br>
        <button type='button' onClick={()=> navigate('/welcome')}> close</button>
      </form>
    </div>
  )
}

export default UpdateProfile
