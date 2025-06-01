import mongoose from "mongoose";

const constrains = {

    name:     { type: String, min: 3, required: true },
    email:    { type: String,  required: true, unique: true },
    isOAuth:  { type: Boolean, required: true  },
    password: { type: String,  required: false }
};

const User = new mongoose.model("users", new mongoose.Schema({ ...constrains }, { timestamps: true }));

export default User;