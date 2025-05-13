const rateLimit=require("express-rate-limit")
const windowMs = 15 * 60 * 1000;
const useRateLimiter = rateLimit({
    max: 100,
    windowMs,
    message: (req, res) => {
      return {
        status: 429,
        err: `Too many requests, try again after ${windowMs / 1000 / 60} minutes.`,
      };
    },
    legacyHeaders: false,
    standardHeaders: true,
  });
  

module.exports=useRateLimiter;