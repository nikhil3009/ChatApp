/** @format */

'use client';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
	const [msgs, setMsgs] = useState([]);
	const [msg, setMsg] = useState('');
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		// Establish WebSocket connection
		const newSocket = io('http://localhost:8080');
		setSocket(newSocket);

		// Listen for incoming msgs
		newSocket.on('chat msg', (msg) => {
			console.log('received msg on client ' + msg);
			setMsgs((prevMsgs) => [...prevMsgs, msg]);
		});

		// Clean up function
		return () => newSocket.close();
	}, []);

	const sendMsg = (e) => {
		e.preventDefault();
		if (socket) {
			socket.emit('chat msg', msg);
			setMsgs((prevMsgs) => [...prevMsgs, msg]);
			setMsg('');
		}
	};
	return (
		<div className='h-screen flex flex-col'>
			<div className='msgs-container h-4/5 overflow-scroll'>
				{msgs.map((msg, index) => (
					<div
						key={index}
						className='m-5 text-right'>
						{msg}
					</div>
				))}
			</div>
			<div className='h-1/5 flex items-center justify-center'>
				<form
					onSubmit={sendMsg}
					class='w-1/2'>
					<div class='relative'>
						<input
							type='text'
							value={msg}
							onChange={(e) => setMsg(e.target.value)}
							placeholder='Type your text here'
							required
							class='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						/>
						<button
							type='submit'
							class='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							Send
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Chat;
