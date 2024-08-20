import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

export function makeRequest(url, options) {
  return api(url, {
    ...options,
    headers: {
      "Authorization": JSON.parse(localStorage.getItem("UMPIRE_AUTH_STATE")).token,
    },
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return Promise.reject(error?.response?.data?.message ?? error.message);
    });
}
