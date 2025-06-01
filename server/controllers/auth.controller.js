import User from "../models/users.model.js"
import mongoose from 'mongoose';
import { generateToken, comparePassword } from '../utilities/auth.js'
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let requiredFeilds = ["name", "email", "isOAuth"];

        let auxiliaryFeilds = ["password"];

        requiredFeilds.forEach((feild) => {

            if (!req.body[feild]) { return res.status(400).json({ message: `The '${feild}' feild is required !` }); }
        });

        try {

            let existingUser = await User.findOne({ email: req.body.email });

            if (existingUser) { return res.status(400).json({ message: `The email '${req.body.email}' is already taken !` }); }

            if (req.body.isOAuth === "false") {

                auxiliaryFeilds.forEach((feild) => {

                    if (!req.body[feild]) { return res.status(400).json({ message: `The '${feild}' feild is required !` }); };
                });

                let hashed_password = await bcrypt.hash(req.body.password, 12);

                let user = new User({ name: req.body.name, email: req.body.email, password: hashed_password, isOAuth: false });

                await user.save();

                const token = generateToken(user._id);

                return res.status(200).json({ message: "User Created succesfully !", user: { ...user._doc }, token });

            } else if (res.body.isOAuth === "true") {

                let user = new User({ name: req.body.name, email: req.body.email, isOAuth: true });

                await user.save();

                return res.status(200).json({ message: "User Created succesfully !", user: { ...user } });

            } else { return res.status(400).json({ messgae: `Invalid authentification credentials !` }); }

        } catch (error) { 
            console.log(error);
            return res.status(500).json({ messgae: `Uncaught Exception | ${error} !` }); 
        }
    } catch (error) {
        session.abortTransaction();
        session.endSession();
        console.log(error);
        res.status(500).json({
            message: "An error occured",
            error
        });
    }
}


export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email or password not provided", success: false});
        }

        const user = await User.findOne({ email: email });

        console.log(user);

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials", success: false});
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        const token = generateToken(user._id);

        return res.status(200).json({ user, token})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
