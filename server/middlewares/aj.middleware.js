import { aj } from "../configurations/aj.js"
import { isSpoofedBot } from "@arcjet/inspect";


const ajVerify = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.writeHead(429, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Too Many Requests" }));
            } else if (decision.reason.isBot()) {
                res.writeHead(403, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "No bots allowed" }));
            }
        } else if (decision.results.some(isSpoofedBot)) {
            
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Forbidden" }));
        }
        next();
    } catch (error) {
        next(error);
    }
}
export default ajVerify