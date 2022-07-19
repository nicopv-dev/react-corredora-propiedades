import { ACCESS_TOKEN } from "./constants";

export function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function deleteAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}
