import axios from "axios";
import { CONSTANTS } from "./constants";

const client = axios.create({
  baseUrl: CONSTANTS.api_url,
});

export default client;
