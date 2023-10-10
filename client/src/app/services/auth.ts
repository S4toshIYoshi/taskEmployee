import { TUser } from '../../types/user/user.type';
import { ILogin } from '../../types/validateForm/login.interface';
import { IRegister } from '../../types/validateForm/register.interface';
import { api } from './api';

export type UserData = Omit<TUser, 'id'>;
type ResponseLoginData = TUser & { token: string };

export const authApi = api.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<ResponseLoginData, ILogin>({
			query: userData => ({
				url: '/user/login',
				method: 'POST',
				body: userData,
			}),
		}),
		register: builder.mutation<ResponseLoginData, IRegister>({
			query: userData => ({
				url: '/user/register',
				method: 'POST',
				body: userData,
			}),
		}),
		current: builder.query<ResponseLoginData, void>({
			query: () => ({
				url: '/user/current',
				method: 'GET',
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
	authApi;

export const {
	endpoints: { login, register, current },
} = authApi;
