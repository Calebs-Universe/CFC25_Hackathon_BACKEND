import Service from "../models/services.model.js";

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

            console.log(request.file);
            
            let service = new Service({ 

                name:        request.body.name,
                image:       request.body.image,
                website:     request.body.website,
                category:    request.body.category,
                description: request.body.description,

            });

            // await service.save();

            response.status(200).json({ message: "Service added succesfully !", service: { ...service._doc } });

        } catch (error) { response.status(500).json({ message: `Uncaught Exception | ${ error } !` }); }
    },
    DELETE_SERVICE: async (request, response) => {},
    GET_SERVICE_BASED_ON_CATEGORY: async (request, response) => {},
};

export default SERVICES_API_ENDPOINTS;