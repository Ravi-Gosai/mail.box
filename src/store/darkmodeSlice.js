import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   darkModeIs : false
}

export const darkModeSlice = createSlice({
    name :'darkmode',
    initialState,
    reducers :{
        toggleMode(state){
            state.darkModeIs = !state.darkModeIs
        }
    }
})

export const darkModeAction = darkModeSlice.actions

export default darkModeSlice.reducer