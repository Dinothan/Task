// import {createAsyncThunk} from '@reduxjs/toolkit';
// import {loginSuccess} from '../slices/authSlice';
// import {LOGIN} from '../urls';
// import axiosInstance from '../../axios/config';
// import axios from 'axios';

// interface LoginCredentials {
//   username: string;
//   password: string;
// }

// export const login = createAsyncThunk(
//   'auth/login',
//   async (credentials: LoginCredentials, {dispatch}) => {
//     try {
//       // Make an API call to authenticate the user

//       const response = await axios.post(LOGIN, credentials);
//       console.log('response: ', response);
//       // Assuming the API returns a token
//       const token = response.data.token;

//       // Store the token in the Redux store
//       dispatch(loginSuccess(token));

//       // Return the token as the fulfilled value
//       return token;
//     } catch (error) {
//       // Handle any errors
//       console.error('Login failed:', error);
//       throw error;
//     }
//   },
// );
