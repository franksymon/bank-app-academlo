import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	transfers: [],
	error: null,
};

const transfersSlice = createSlice({
	initialState,
	name: 'transfers',
	reducers: {
		getTransfers(state, action) {
			state.transfers = action.payload;
		},
		newTransfer(state, action) {
			const updatedTransfers = state.transfers.concat(
				action.payload
			);

			state.transfers = updatedTransfers;
    },
    cleanTransfers(state, action) {
      state.transfers = []
    }
	},
});

export const transfersActions = transfersSlice.actions;
export default transfersSlice.reducer;
