import jsonWebToken from "jsonwebtoken";

// const sessionIdUserMap = new Map();

export function setUser(user) {
  return jsonWebToken.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.secret_key
  );
}

export function getUser(token) {
  if (!token) return null;
  try {
    return jsonWebToken.verify(token, process.env.secret_key);
  } catch (error) {
    return null;
  }
}
