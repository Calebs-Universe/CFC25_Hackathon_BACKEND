import { v2 } from "cloudinary";

import dotenv from "dotenv";


export async function ConfigureCloudinary() {

    v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key:    process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
};

export async function UploadToCLoudinary(file) {

    const response = await v2.uploader.upload(file, { resource_type: "auto" });

    return response;
};
