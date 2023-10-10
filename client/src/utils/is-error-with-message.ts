import { TErrorWithMessage } from '../types/commonTypes/error.type';

export const isErrorWithMessage = (
	error: unknown
): error is TErrorWithMessage => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'data' in error &&
		typeof (error as Record<string, unknown>).data === 'object'
	);
};
