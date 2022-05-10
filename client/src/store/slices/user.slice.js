import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuth: false,
	user: null,
  error: null,
  signUp: null,
};

const userSlice = createSlice({
	initialState,
	name: 'users',
	reducers: {
		login(state, action) {
      state.isAuth = true;
      state.user = action.payload;
      state.error = null
		},
		logout(state) {
			state.isAuth = false;
			state.user = null;
    },
    getUserById(state, action) {
			state.user = action.payload;
    },
    setError(state, action) {
      state.error = action.payload
    },
    setSignUp(state, action) {
      state.signUp = action.payload
    }
	},
});

export const usersActions = userSlice.actions;
export default userSlice.reducer;
