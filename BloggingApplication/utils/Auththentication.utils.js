import JWT from "jsonwebtoken";

export function createToken(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
  };
  const toekn = JWT.sign(payload, process.env.mySecret);
  return toekn;
}

export function validateToken(token) {
  const payload = JWT.verify(token, process.env.mySecret);
  return payload;
}
