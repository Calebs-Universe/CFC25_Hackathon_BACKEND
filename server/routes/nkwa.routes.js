import { Router } from "express";
import { payMoney } from "../controllers/nkwa.controller.js";

const nkwaRouter = Router();

nkwaRouter.get('/pay/:number', payMoney);

export default nkwaRouter;