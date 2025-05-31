import { Pay } from "@nkwa-pay/sdk";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.NKWA_API_KEY)
const payObj = new Pay({
    apiKeyAuth: process.env.NKWA_API_KEY
});

export default payObj