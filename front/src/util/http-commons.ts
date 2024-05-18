import axios from "axios";

// Local Vue API axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: "http://localhost:8080/", // Local server
    // baseURL: "https://k10c109.p.ssafy.io/" // EC2 server
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
