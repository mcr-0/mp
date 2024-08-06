// middlewares/ip.js
export default function getIp(req, res, next) {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress;
  req.clientIp = ip ? ip.split(",")[0].trim() : undefined;
  next();
}
