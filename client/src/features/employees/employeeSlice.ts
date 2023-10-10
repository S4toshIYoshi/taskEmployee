import { createSlice } from '@reduxjs/toolkit';
import { TEmpolyee } from '../../types/employee/employee.type';
import { employeesApi } from '../../app/services/employees';
import { RootState } from '../../app/store';

interface IInitialState {
	employees: TEmpolyee[] | null;
}

const initialState: IInitialState = {
	employees: null,
};

const slice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		logout: () => initialState,
	},
	extraReducers: builder => {
		builder.addMatcher(
			employeesApi.endpoints.getAll.matchFulfilled,
			(state, action) => {
				state.employees = action.payload;
			}
		);
	},
});

export default slice.reducer;

export const selectEmployees = (state: RootState) => state.employees;
