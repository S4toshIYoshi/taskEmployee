import { TEmpolyee, TEmpolyeeClient } from '../../types/employee/employee.type';
import { ILogin } from '../../types/validateForm/login.interface';
import { api } from './api';

export const employeesApi = api.injectEndpoints({
	endpoints: builder => ({
		getAll: builder.query<TEmpolyee[], void>({
			query: () => ({
				url: '/employees',
				method: 'GET',
			}),
		}),
		getById: builder.query<TEmpolyee, string>({
			query: id => ({
				url: `/employees/${id}`,
				method: 'GET',
			}),
		}),
		edit: builder.mutation<TEmpolyee, TEmpolyee>({
			query: (employee: TEmpolyee) => ({
				url: `/employees/edit/${employee.id}`,
				method: 'PUT',
				body: employee,
			}),
		}),
		remove: builder.mutation<string, string>({
			query: id => ({
				url: `/employees/remove/${id}`,
				method: 'DELETE',
			}),
		}),
		create: builder.mutation<TEmpolyeeClient, TEmpolyee>({
			query: (employee: TEmpolyeeClient) => ({
				url: `/employees/create`,
				method: 'POST',
				body: employee,
			}),
		}),
	}),
});

export const {
	useGetAllQuery,
	useGetByIdQuery,
	useEditMutation,
	useRemoveMutation,
	useCreateMutation,
} = employeesApi;

export const {
	endpoints: { getAll, getById, edit, remove, create },
} = employeesApi;
