import axios from "axios";

// Local Vue API axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: "http://localhost:8080/", // Local server
    // baseURL: "k10c109.p.ssafy.io:10912" // EC2 server
  });

  // const token: string | null = localStorage.getItem('accessToken');
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcxNTY1OTIzOCwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIn0.6tnWm4jLwQOS-FhYx9gLtTnZwsb9jDjaKHyN86Tdsp-1CGMIvi171tXmQgd3B2M47uOXSQAhdZ5wBMDw7Hy3Gw";
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
