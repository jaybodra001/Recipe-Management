import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId: userId }, ENV_VARS.JWT_SECRET, { expiresIn: '15d' });

    res.cookie('jwt-tasks', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true,
        sameSite: 'strict',
        secure: ENV_VARS.NODE_ENV !== 'development',
    });

    console.log("Generated Token Payload:", jwt.decode(token)); 
}

