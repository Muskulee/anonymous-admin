import axios from "axios";

const client = axios.create({
  baseUrl: "https://beamblog.herokuapp.com/api/v1",
});

export default client;
