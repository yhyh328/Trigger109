import axios from "axios";

// Local Vue API axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: "http://localhost:8080/", // Local server
  });

  // const token: string | null = localStorage.getItem('accessToken');
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcxNTYwMzkxNiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIn0.WqDkqysGLo5AevhfCSg0AQNjwGUoIHoT5GLepPrWAbq4fu1JYx3CvgJPCwY6NRTNzxSVaS3IlwcwWHULQR4Tbw";
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
