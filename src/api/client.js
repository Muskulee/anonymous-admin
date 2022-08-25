import axios from "axios";

const client = axios.create({ baseUrl: "http://localhost:2424/api/v1" });

export default client;
