import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './app/store.ts';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Paths} from './paths.ts';
import LoginPage from './pages/login/LoginPage.tsx';
import RegisterPage from './pages/register/RegisterPage.tsx';
import Auth from './features/auth/auth.tsx';
import EmployeesPage from './pages/employees/EmployeesPage.tsx';

const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <EmployeesPage />
	},
	{
		path: Paths.login,
		element: <LoginPage />
	},
	{
		path: Paths.register,
		element: <RegisterPage />
	},
	{
		path: '*',
		element: <>not found</>
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Auth>
				<RouterProvider router={router} />
			</Auth>
		</Provider>
	</React.StrictMode>
);
