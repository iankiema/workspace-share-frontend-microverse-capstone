import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signupSlice';
import loginSlice from './loginSlice';
import logoutReducer from './logoutSlice';


const store = configureStore({
  reducer: {
    signup_auths: signupSlice,
    login_auths: loginSlice,
    logout_auths: logoutReducer,
  },
});

export default store;