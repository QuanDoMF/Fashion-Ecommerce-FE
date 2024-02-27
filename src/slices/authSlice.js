import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: !!localStorage.getItem('auth-token'),
  username: '',
  email: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username
      state.email = action.payload.email
      localStorage.setItem('username', action.payload.username);
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.username = '';
      state.email = '';
      localStorage.removeItem('username');
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice