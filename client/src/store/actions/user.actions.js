import axios from 'axios';

import { usersActions } from '../slices/user.slice';

const API_URL = 'http://localhost:4000/api/v1/users';

export const login = (data) => {
  
	return async dispatch => {
		try {
			// API REQUEST
      const response = await axios.post(`${API_URL}/login`, data)
      const { accountLogin } = response.data;
      
			dispatch(usersActions.login(accountLogin));
    } catch (error) {
      dispatch(usersActions.setError(error.response.data.message));
		}
	};
};

export const signup = (data) => {
	return async dispatch => {
		try {
			// API REQUEST
      const response = await axios.post(`${API_URL}/signup`, data)
      dispatch(usersActions.setSignUp(response.data));
    } catch (error) {
			dispatch(usersActions.setSignUp(error.response.data));
		}
	};
};

export const logout = () => {
	return async dispatch => {
		try {
			dispatch(usersActions.logout());
		} catch (error) {
			console.log(error);
		}
	};
};

export const getUserById = (id) => {
	return async dispatch => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      
			dispatch(usersActions.getUserById(response.data.user));
		} catch (error) {
			console.log(error);
		}
	};
};
