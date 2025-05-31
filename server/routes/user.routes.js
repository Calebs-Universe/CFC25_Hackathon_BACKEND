import { Router } from "express";

import VALIDATE_REQUEST_BODY from "../middlewares/requestbody.js";
import USERS_API_ENDPOINTS   from "../controllers/users.controller.js";

// Managing the user route:

const USERS_ROUTE = Router();

USERS_ROUTE

    .get   ("/users",     USERS_API_ENDPOINTS.GET_ALL_USERS)
    .get   ("/users/:id", USERS_API_ENDPOINTS.GET_USER)

    .delete("/users/:id", USERS_API_ENDPOINTS.DELETE_USER)

    .post  ("/users",     VALIDATE_REQUEST_BODY, USERS_API_ENDPOINTS.CREATE_USER)
    .put   ("/users/:id", VALIDATE_REQUEST_BODY, USERS_API_ENDPOINTS.UPDATE_USER);

export default USERS_ROUTE;