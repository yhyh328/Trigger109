import axios from "axios";

// Local Vue API axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: "http://localhost:8080/", // Local server
  });

  // const token: string | null = localStorage.getItem('accessToken');
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcxNTQzMjgxOCwiZW1haWwiOiJleGFtcGxlMUBleGFtcGxlLmNvbSJ9.wOYtp2_h3-qAQM1tAMSnsuHRsbJFfXE6FfQ9OdyOPpdxGC1U-UMlaQUa1l9q8XX3Pj7TtcOR5n7TTLV6pGm5WQ";
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
