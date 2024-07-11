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

export function AuthUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Please Login" });
  }
  try {
    const userPayload = validateToken(token);
    req.user = userPayload;
    next();
  } catch (error) {
    console.log(error);
    return next();
  }
}

export default checkCookieForAuthentication;
