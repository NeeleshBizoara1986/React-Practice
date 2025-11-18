
import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com", // Example API
    timeout: 5000
});

export default api;
