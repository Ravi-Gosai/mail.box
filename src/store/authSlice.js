import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   token : localStorage.getItem('token'),
   isLoggedIn : false,
   totalExpense : 0
}

export const authSlice = createSlice({
    name :'auth',
    initialState,
    reducers :{
       login(state,action){
        state.token = action.payload
        localStorage.setItem('token',state.token)
        state.isLoggedIn = true
       },
       logout(state){
        state.token = ''
        localStorage.removeItem('token')
        state.isLoggedIn = false
       },
       expenseCounter(state, action){
        state.totalExpense = action.payload
       }
    }
})

export const authAction = authSlice.actions

export default authSlice.reducer