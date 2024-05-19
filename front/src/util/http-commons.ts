import axios from "axios";

// Local Vue API axios instance
function localAxios() {
  // Determine the correct baseURL; this can be based on any condition or configuration
  const isDevelopment = window.location.hostname === 'localhost';
  const baseURL = isDevelopment ? "http://localhost:8080/" : "https://k10c109.p.ssafy.io/";

  const instance = axios.create({
    baseURL: baseURL
  });

  const token: string | null = localStorage.getItem('token');
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.put["Content-Type"] = "application/json";

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    console.error('Token is null, proceeding without Authorization header');
  }

  return instance;
}

export { localAxios };
