import { makeRequest } from "./makeRequest";

export function signup({profilePicUrl, umpireName, password}) {
  return makeRequest("auth/signup", {
    method: "POST",
    data: { profilePicUrl, umpireName, password },
  });
}


export function login({ umpireName, password }) {
  return makeRequest("auth/login", {
    method: "POST",
    data: { umpireName, password },
  });
}
