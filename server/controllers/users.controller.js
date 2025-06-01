import bcrypt from "bcryptjs";

import User from "../models/users.model.js";

const USERS_API_ENDPOINTS = {

    GET_USER: async (request, response) => {

        let id = request.params.id;

        if (!id) { response.status(400).json({ message: `The user id is required'` }); };

        try {
            
            let user = await User.findById(id);

            if (!user) { response.status(400).json({ message: `No such user: ${ id }'` }); }

            response.status(200).json({ message: "User fetched successfully !", data: { ...user } });

        } catch (error) { response.status(500).json({ messgae: `Uncaught Exception | ${ error } !` }); };
    },

    GET_ALL_USERS: async (request, response) => {

        try {

            let result = await User.find();

            response.status(200).json({ message: "Users fetched sucfcessfully !", data: [...result] });

        } catch (error) { response.status(500).json({ messgae: `Uncaught Exception | ${ error } !` }); }
    },

    CREATE_USER: async (request, response) => {

        let requiredFeilds  = ["name", "email", "isOAuth"];

        let auxiliaryFeilds = ["password"];

        requiredFeilds.forEach((feild) => { 

            if (!request.body[feild]) { response.status(400).json({ message: `The '${ feild }' feild is required !` }); }
         });

         try {

            let existingUser = await User.findOne({ email: req.body.email });

            if (existingUser) { response.status(400).json({ message: `The email '${ req.body.email }' is already taken !` }); }

            if (request.body.isOAuth === "false") {

                auxiliaryFeilds.forEach((feild) => {

                    if (!request.body[feild]) { response.status(400).json({ message: `The '${ feild }' feild is required !` }); };
                });

                let hashed_password = await bcrypt.hash(request.body.password, 12);

                let user = new User({ name: request.body.name, email: request.body.email, passwrod: hashed_password, isOAuth: false });

                await user.save();

                response.status(200).json({ message: "User Created succesfully !", user: { ...user._doc } });
                
            } else if ( request.body.isOAuth === "true" ) {

                let user = new User({ name: request.body.name, email: request.body.email, isOAuth: true });

                await user.save();

                response.status(200).json({ message: "User Created succesfully !", user: { ...user } });

            } else { response.status(400).json({ messgae: `Invalid authentification credentials !` }); }
            
         } catch (error) { response.status(500).json({ messgae: `Uncaught Exception | ${ error } !` });  }
    },

    UPDATE_USER: async (request, response) => {

        let id = request.params.id;

        if (!id) { response.status(400).json({ message: `The user id is required'` }); };

        if (!request.body.name) { response.status(400).json({ message: `The 'name' feilds is required'` }); }

        await User.updateOne({ _id: id, name: request.body.name })

            .then ((user)  => { response.status(200).json({ message: `User ${ id } updated successfully !`, user }); })
            .catch((error) => { response.status(500).json({ messgae: `Uncaught Exception | ${ error } !` }); });

    },

    DELETE_USER: async (request, response) => {

        let id = request.params.id;

        if (!id) { response.status(400).json({ message: `The user id is required'` }); };

        await User.findByIdAndDelete(id)

            .then ((users) => { response.status(200).json({ message: `User ${ id } has been deleted successfully` }); })
            .catch((error) => { response.status(500).json({ messgae: `Uncaught Exception | ${ error } !` }); });
    },
};

export default USERS_API_ENDPOINTS;