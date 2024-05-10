import authSlice from './authSlice';
import darkModeSlice from './darkModeSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer : {
      auth : authSlice,
      darkmode : darkModeSlice
    }
  })
  export default store;