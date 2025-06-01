import User from "../models/users.model.js"
import mongoose from 'mongoose';
import { generateToken } from '../utilities/auth.js'
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let requiredFeilds = ["name", "email", "isOAuth"];

        let auxiliaryFeilds = ["password"];

        requiredFeilds.forEach((feild) => {

            if (!req.body[feild]) { res.status(400).json({ message: `The '${feild}' feild is required !` }); }
        });

        try {

            let existingUser = await User.findOne({ email: req.body.email });

            if (existingUser) { res.status(400).json({ message: `The email '${req.body.email}' is already taken !` }); }

            if (req.body.isOAuth === "false") {

                auxiliaryFeilds.forEach((feild) => {

                    if (!req.body[feild]) { res.status(400).json({ message: `The '${feild}' feild is required !` }); };
                });

                let hashed_password = await bcrypt.hash(req.body.password, 12);

                let user = new User({ name: req.body.name, email: req.body.email, passwrod: hashed_password, isOAuth: false });

                await user.save();

                const token = generateToken(user._id);

                res.status(200).json({ message: "User Created succesfully !", user: { ...user._doc }, token });

            } else if (res.body.isOAuth === "true") {

                let user = new User({ name: req.body.name, email: req.body.email, isOAuth: true });

                await user.save();

                res.status(200).json({ message: "User Created succesfully !", user: { ...user } });

            } else { res.status(400).json({ messgae: `Invalid authentification credentials !` }); }

        } catch (error) { 
            console.log(error);
            res.status(500).json({ messgae: `Uncaught Exception | ${error} !` }); 
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
