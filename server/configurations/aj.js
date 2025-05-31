import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        // Block common attacks e.g. SQL injection, XSS, CSRF
        tokenBucket({
            // Will block requests. Use "DRY_RUN" to log only
            mode: "LIVE",
            // Refill 5 tokens per interval
            refillRate: 5,
            // Refill every 10 seconds
            interval: 10,
            // Bucket maximum capacity of 10 tokens
            capacity: 10,
        }),
        detectBot({
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
            // Block all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                // Uncomment to allow these other common bot categories
                // See the full list at https://arcjet.com/bot-list
                //"CATEGORY:MONITOR", // Uptime monitoring services
                //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
            ],
        }),
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),

    ],
});