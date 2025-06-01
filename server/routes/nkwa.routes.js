import { Router } from "express";
import { payMoney, processPay } from "../controllers/nkwa.controller.js";

const nkwaRouter = Router();

nkwaRouter.post('/pay', processPay);

export default nkwaRouter;