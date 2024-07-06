import { getUser } from "../utils/authSession.util.js";

export function CheckForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.uid;
  if (!tokenCookie) {
    return next();
  }

  const token = tokenCookie;
  const user = getUser(token); // verfication token is valid or not which is came from cookie

  req.user = user;
  next();
}

export function restrictTo(role = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!role.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
  };
}

// export async function UserAuthentication(req, res, next) {
//   const userUID = req.cookies.uid;

//   if (!userUID) return res.redirect("login");

//   const user = getUser(userUID);

//   if (!user) return res.redirect("login");

//   req.user = user;
//   next();
// }

// export async function checkAuth(req, res, next) {
//   const userUID = req.cookies.uid;

//   const user = getUser(userUID);

//   req.user = user;
//   next();
// }
