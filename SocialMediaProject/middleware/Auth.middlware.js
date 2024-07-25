import JWT from "jsonwebtoken";

export function checkCookieForSettingUserGlobally(cookieName) {
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

export function createToken(user) {
  const payload = {
    _id: user._id,
    FullName: user.FullName,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    designation: user.designation,
    phoneNo: user.phoneNo,
    bio: user.bio,
  };
  const toekn = JWT.sign(payload, process.env.mySecret);
  return toekn;
}

export function validateToken(token) {
  const payload = JWT.verify(token, process.env.mySecret);
  return payload;
}

export const authenticate = (req, res, next) => {
  const token = req.cookies ? req.cookies.token : null;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = validateToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      console.log(
        "Access Denied. Required Roles:",
        roles,
        "User Role:",
        req.user?.role
      );
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
