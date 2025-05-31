import express from "express";

import { Logs_palette } from "../palette/index.js";

import connectDatabase from "../configurations/database.js";

import ajVerify from "../middlewares/aj.middleware.js";


// Importing inbuilt middlewares :

import cors       from "cors";
import helmet     from "helmet";
import bodyParser from "body-parser";

// Importing custom endpoints :

import USERS_ROUTE from "../routes/user.routes.js";
import nkwaRouter  from "../routes/nkwa.routes.js";
import SERVICE_ROUTES from "../routes/services.routes.js";

// Definition of the server class :

class Server {

    constructor (port, databaseURI) {

        this.Port   = port;
        this.DB_URI = databaseURI;

        this.Application = express();
        this.MiddleWares = [ USERS_ROUTE, SERVICE_ROUTES, nkwaRouter ]; 
    }

    start () {

        this.Application.use(cors());
        this.Application.use(helmet());
        this.Application.use(bodyParser.json());
        // this.Application.use(ajVerify);
        // this.Application.use('/', (req, res) => {res.status(200).json({message: "Working"})});

        this.MiddleWares.forEach((middleware) => { 
            
            this.Application.use("/api", middleware); 
        });

        this.Application.listen(this.Port, () => {

            console.log(`\n${ Logs_palette.caption("[_server]") } Server started at port ${ Logs_palette.warning(this.Port).toString() }, live at ${ Logs_palette.link(`http://localhost:${ this.Port }`) }.`);

            connectDatabase(this.DB_URI);
        });
    }
};

export default Server;