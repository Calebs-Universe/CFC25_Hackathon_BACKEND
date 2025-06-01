import { unlink } from "node:fs";
import path, { dirname } from "path";

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
        
        let description_json = JSON.parse(request.body.description);

        console.log(description_json);

        requiredDescriptions.forEach((description) => {

            if (!description_json[description]) { response.status(400).json({ message: `The '${ description }' description is required !` }); }
        });

        try {

            let results;

            if (request.file) { results = await UploadToCLoudinary(`${ request.file.destination }${ request.file.filename }`); }
            
            // console.log(result);
            
            let service = new Service({ 

                name:        request.body.name,
                image:       request.file        ? results.secure_url : "data:image/png;base64,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",
                website:     request.body.website? request.body.website : "",
                category:    request.body.category,
                description: description_json,

            });

            // unlink(dirname(request.file.filename), (error) => { if (error) console.log(error); });

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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2JmOTkyMzczNTQ5YTg4NzM3MjVjNSIsImlhdCI6MTc0ODc2MDk3OCwiZXhwIjoxNzQ4ODQ3Mzc4fQ.Vd8t9dRJ71At7X8XbOWxjnEXiemhwVXoTfsP2YBfyZQ