import axios from "axios";

export function setToken(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; //`Bearer ${token}`,
}

export function clearToken() {
    axios.defaults.headers.common["Authorization"] = null;
}
