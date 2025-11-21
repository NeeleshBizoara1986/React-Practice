// // src/api/axiosInstance.js
// import axios from 'axios';
// import { RBAC_API_MAP } from '../utils/rbacConfig';
// // import { RBAC_API_MAP, getRole } from '../utils/rbacConfig';

// const api = axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com',
// });

// // Request Interceptor for RBAC
// api.interceptors.request.use(
//   (config) => {
//     const role = getRole();
//     config.url = RBAC_API_MAP[role]; // Dynamically set endpoint based on role
//     config.headers['X-User-Role'] = role;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor for Error Handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     let message = 'Unexpected error occurred';
//     if (error.response) {
//       message = `Error ${error.response.status}: ${error.response.statusText}`;
//     } else if (error.request) {
//       message = 'Server is not reachable. Check your network.';
//     } else {
//       message = error.message;
//     }
//     return Promise.reject(message);
//   }
// );

// export default api;