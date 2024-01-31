import axios from "axios";

export const findAllProduct = async (searchParam) => {
  const res = await axios.get(
    `http://localhost:8080/product?name_like=${searchParam.name}&category.name_like=${searchParam.category}&_sort=price&_order=${searchParam.sortPrice}`
  );
  return res.data;
};

export const addNewProduct = async (product) => {
  const res = await axios.post("http://localhost:8080/product", product);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`http://localhost:8080/product/${id}`);
  return res.data;
};

export const findById = async (id) => {
  const res = await axios.get(`http://localhost:8080/product/${id}`);
  return res.data;
};

export const editProduct = async (product) => {
  const res = await axios.put(
    `http://localhost:8080/product/${product.id}`,
    product
  );
  return res.data;
};
