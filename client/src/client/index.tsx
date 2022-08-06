import axios from "axios";
import { getUserFromStorage } from "services/storage";
import { authHeaders } from "helpers/auth-headers";

const user = getUserFromStorage();

const client = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: { ...authHeaders(user) }
});

export default client;
