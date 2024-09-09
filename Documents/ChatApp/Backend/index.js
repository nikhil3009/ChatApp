/** @format */
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
dotenv.config();
const PORT = process.env.PORT || 3030;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		allowedHeaders: ['*'],
		origin: '*',
	},
});
io.on('connection', (socket) => {
	console.log('client connected');
	socket.on('chat msg', (msg) => {
		console.log('received msg' + msg);
	});
});
app.get('/', (req, res) => {
	res.send('Hello, World!');
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
