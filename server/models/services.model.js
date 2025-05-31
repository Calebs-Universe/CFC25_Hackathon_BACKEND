import mongoose from "mongoose";

const constrains = { 

    name:        { type: String, required: true },
    image:       { type: String, required: true },
    website:     { type: String, required: true },
    category:    { type: String, required: true },
    description: {
        
        en: { type: String, required: true },
        fr: { type: String, required: true },
        pid:{ type: String, required: true },
    },
    rating:      { type: Number,  default: 0 }, 
    reviewCount: { type: Number,  default: 0 },
    location:    { type: String },
    isVerified:  { type: Boolean },
    isLoggedIn:  { type: Boolean }
};

const Service = new mongoose.model("services", new mongoose.Schema({ ...constrains }, { timestamps: true }));

export default Service;