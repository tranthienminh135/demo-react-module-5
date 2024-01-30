import axios from "axios";

export const findAllCategory = async () => {
  const res = await axios.get("http://localhost:8080/category");
  return res.data;
};
