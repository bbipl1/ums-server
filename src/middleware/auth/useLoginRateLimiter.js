const rateLimit = require("express-rate-limit");
const log = require("../../utils/logger");
const getClientIPs = require("../../utils/clients/getClientIP");
const windowMs = 2 * 60 * 1000;
const logData = (req) => {
  return {
    err: `Too many requests, try again after ${windowMs / 1000 / 60} minutes.`,
    status: 429,
    user: { ipv4: getClientIPs(req).ipv4, ipv6: getClientIPs(req).ipv6 },
  };
};
const useLoginRateLimiter = rateLimit({
  max: 10,
  windowMs,
  message: (req, res) => {
    log(logData(req));
    return {
      status: 429,
      err: `Too many requests, try again after ${
        windowMs / 1000 / 60
      } minutes.`,
    };
  },
  legacyHeaders: false,
  standardHeaders: true,
});

module.exports = useLoginRateLimiter;
