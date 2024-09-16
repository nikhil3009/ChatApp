/** @format */
'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Auth = () => {
	const router = useRouter();
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const signUpFun = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				'http://localhost:8080/auth/signup',
				{
					username: username,
					password: password,
				},
				{
					withCredentials: true,
				}
			);
			if (res.data.message === 'username already exists') {
				alert('username already exists');
			} else {
				router.replace('/chat');
			}
		} catch (error) {
			console.log('Error in signup function:', error.message);
		}
	};
	const signInFun = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				'http://localhost:8080/auth/signin',
				{
					username: username,
					password: password,
				},
				{
					withCredentials: true,
				}
			);

			router.replace('/chat');
		} catch (error) {
			console.log('Error in signin function:', error.message);
		}
	};
	return (
		<div>
			<div class='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
				<div class='sm:mx-auto sm:w-full sm:max-w-sm'>
					<img
						class='mx-auto h-10 w-auto'
						src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
						alt='Your Company'
					/>
					<h2 class='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
						Sign in to your account
					</h2>
				</div>

				<div class='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form
						class='space-y-6'
						action='#'
						method='POST'>
						<div>
							<label
								for='Username'
								class='block text-sm font-medium leading-6 text-gray-900'>
								Username
							</label>
							<div class='mt-2'>
								<input
									id='Username'
									name='Username'
									type='Username'
									value={username}
									onChange={(e) => setUserName(e.target.value)}
									autocomplete='Username'
									required
									class='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						<div>
							<div class='flex items-center justify-between'>
								<label
									for='password'
		