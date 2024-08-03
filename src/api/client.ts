import axios from "axios";

const client = axios.create({
  baseURL: "http://clownfish-app-8rn5a.ondigitalocean.app",
});

client.interceptors.request.use(function (config) {
  config.withCredentials = true;

  return config;
});

export default client;
