import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; 
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const generateToken = (userId) => {
    console.log(JWT_SECRET, JWT_EXPIRES_IN);
    return jwt.sign({ id: userId}, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

