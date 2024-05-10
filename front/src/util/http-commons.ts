import axios from "axios";

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: "https://k10c109.p.ssafy.io", // run build
    // baseURL: "http://localhost:8080", // 로컬서버
  });

  const token: string | null = localStorage.getItem('accessToken');
  // Request 발생 시 적용할 내용.
    if (token) {
        instance.defaults.headers.common["Authorization"] = "";
        instance.defaults.headers.post["Content-Type"] = "application/json";
        instance.defaults.headers.put["Content-Type"] = "application/json";
    
        return instance;
    }
    
    else {
        console.error('token is null')
    }
}


export { localAxios };
