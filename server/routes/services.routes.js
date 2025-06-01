import { Router } from "express";

import Upload from "../configurations/multer.js";

import VALIDATE_REQUEST_BODY  from "../middlewares/requestbody.js";
import SERVICES_API_ENDPOINTS from "../controllers/services.controllers.js";

import { isAuth } from "../middlewares/auth.middleware.js";

const SERVICE_ROUTES = Router();

SERVICE_ROUTES
    .use(isAuth)

    .get   ("/services",     SERVICES_API_ENDPOINTS.GET_SERVICE)
    .delete("/services/:id", SERVICES_API_ENDPOINTS.DELETE_SERVICE)
    
    .post  ("/services", Upload.single("image"), VALIDATE_REQUEST_BODY, SERVICES_API_ENDPOINTS.CREATE_SERVICE);

export default SERVICE_ROUTES;