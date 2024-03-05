import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAuthentication} from '../../utils/auth';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | undefined;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string | undefined>) {
      const auth = getAuthentication().then(res => {
        return res;
      });
      state.isAuthenticated =
        auth.toString().length > 0 !== null ? true : false;
      state.userId = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userId = undefined;
    },
  },
});

export const {loginSuccess, logout} = authSlice.actions;

export default authSlice.reducer;
