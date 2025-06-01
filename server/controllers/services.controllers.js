import fs   from "fs";
import path from "path";

import Service from "../models/services.model.js";

import { UploadToCLoudinary } from "../configurations/cloudinary.js";

const SERVICES_API_ENDPOINTS = {

    GET_SERVICE: async (request, response) => {

        try {
            
            const results = await Service.find();

            response.status(200).json({ message: "Services fetched successfully !", data: [...results] });

        } catch (error) { response.status(500).json({ message: `Uncaught Exception | ${ error } !` }); }
    },

    CREATE_SERVICE: async (request, response) => {

        let requiredFeilds       = ["name", "category", "website", "description"];
        let requiredDescriptions = ["en", "fr", "pid"];

        requiredFeilds.forEach((feild) => {
            
            if (!request.body[feild]) { response.status(400).json({ message: `The '${ feild } is required !'` }); };
        });
        
        requiredDescriptions.forEach((description) => {

            if (!request.body.description[description]) { response.status(400).json({ message: `The '${ description }' description is required !` }); }
        });

        try {

            let results = await UploadToCLoudinary(`${ request.file.destination }${ request.file.filename }`);

            // console.log(result);
            
            let service = new Service({ 

                name:        request.body.name,
                image:       results.secure_url,
                website:     request.body.website,
                category:    request.body.category,
                description: request.body.description,

            });

            fs.rm(path.join(__dirname, `${ request.file.destination }${ request.file.filename }`));

            await service.save();

            response.status(200).json({ message: "Service added succesfully !", service: { ...service._doc } });

        } catch (error) { response.status(500).json({ message: `Uncaught Exception | ${ error } !` }); }
    },

    DELETE_SERVICE: async (request, response) => {

        if (!request.params.id) { response.status(400).json({ message: "No Post id provided !" }); }

        await Service.findByIdAndDelete(request.params.id)

            .then ((service) => { response.status(200).json({ message: `User ${ request.params.id } has been deleted successfully` }); })
            .catch((error)   => { response.status(500).json({ messgae: `Uncaught Exception | ${ error } !` }); });
    }
};

export default SERVICES_API_ENDPOINTS;