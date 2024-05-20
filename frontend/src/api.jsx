import axios from "axios";
import { baseUrl } from "./urls";

export default axios.create({
  baseURL: baseUrl,
});


