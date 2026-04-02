import axios from "axios";

export const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 5000, // in ms || 1000 ms = 1 seconds
    headers: {
        "Content-Type": "application/json"
    },
});