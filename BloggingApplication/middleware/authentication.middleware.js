import { validateToken } from "../utils/Auththentication.utils.js";

function checkCookieForAuthentication(cookieName) {
  return (req, res, next) => {
    const CookieToeknValue = req.cookies[cookieName];
    if (!CookieToeknValue) {
      return next();
    }
    try {
      const userPayload = validateToken(CookieToeknValue);
      req.user = userPayload;
      next();
    } catch (error) {
      return next();
    }
  };
}

export default checkCookieForAuthentication;
