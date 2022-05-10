import axios from 'axios';

import { transfersActions } from '../slices/transfers.slice';
import { getUserById } from './user.actions';

const API_URL = 'http://localhost:4000/api/v1/users/';

export const getUsersTransfers = userId => {
	return async dispatch => {
		try {
			// API REQUEST
      const res = await axios.get(`${API_URL}${userId}/history`)
      
			dispatch(transfersActions.getTransfers(res.data.transfers));
		} catch (error) {
			console.log(error);
		}
	};
};

export const newTransfer = (transferInfo) => {
	return async dispatch => {
		try {
			// API REQUEST
      const res = await axios.post('http://localhost:4000/api/v1/transfers', transferInfo)
      
      dispatch(transfersActions.newTransfer(res.data.newTransfer));
      dispatch(getUserById(localStorage.getItem('id')))
		} catch (error) {
			console.log(error);
		}
	};
};

export const cleanTransfers = () => {
  return async dispatch => {
    try {
			dispatch(transfersActions.cleanTransfers());
		} catch (error) {
			console.log(error);
		}
	};
}