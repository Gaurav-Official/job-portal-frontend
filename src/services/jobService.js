import axios from "axios";
const API_URL = "http://localhost:5191/api/Jobs";

// fething jobs
export const getJobs = () => {
  return axios.get(API_URL);
};
