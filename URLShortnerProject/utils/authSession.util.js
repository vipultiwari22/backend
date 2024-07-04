const sessionIdUserMap = new Map();

export function setUser(id, user) {
  sessionIdUserMap.set(id, user);
}

export function getUser(id) {
  return sessionIdUserMap.get(id);
}

