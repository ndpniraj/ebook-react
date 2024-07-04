import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8989",
});

client.interceptors.request.use(function (config) {
  config.withCredentials = true;

  return config;
});

export default client;
