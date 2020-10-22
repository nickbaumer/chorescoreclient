import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/users/";

export function getUsers() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
