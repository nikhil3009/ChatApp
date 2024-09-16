/** @format */

import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import generateJWTandSetCookie from '../utils/generateToken.js';

const signup = async (req, res) => {
	try {
		const { username, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const userFound = await User.findOne({ username });
		if (userFound) {
			res.status(201).json({ message: 'username already exists' });
		} else {
			const user = new User({ username: username, password: hashedPassword });
			console.log('user', user);
			generateJWTandSetCookie(user._id, res);
			await user.save();
			res.status(201).json({ message: 'username registered successfulyy' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'user registration failed' });
	}
};
export const signin = as