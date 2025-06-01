import {verifyToken} from '../utilities/auth.js'

export const isAuth = (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = verifyToken(token);
        console.log(user);
        res.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error })
    }
}