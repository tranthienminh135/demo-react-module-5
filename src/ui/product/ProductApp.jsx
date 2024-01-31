import React, { useEffect, useState } from "react";
import { deleteProduct, findAllProduct } from "../../services/product-service";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import { findAllCategory } from "../../services/category-service";

const initSearchParam = {
  name: "",
  category: "",
  sortPrice: "asc",
};

const Product = () => {
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [categories, setCategories] = useState();
  const [searchParam, setSearchParam] = useState(initSearchParam);

  useEffect(() => {
    getAllProduct(searchParam);
  }, []);

  useEffect(() => {
    const getAllCategories = () => {
      findAllCategory().then((category) => setCategories(category));
    };
    getAllCategories();
  }, []);

  const getAllProduct = (param) => {
    findAllProduct(param).then((res) => setProducts(res));
  };

  const handleNavigateCreateProductApp = () => {
    navigate("/product/create ");
  };

  const handleShowModalDelete = (id) => {
    setIdDelete(id);
    setShow(true);
  };

  const handleEditProduct = (id) => {
    navigate(`/product/edit/${id}`);
  };

  const onDeleteHandler = () => {
    deleteProduct(idDelete).then((res) => {
      getAllProduct();
    });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParam({ ...searchParam, [name]: value });
  };

  const handleSearch = () => {
    getAllProduct(searchParam);
  };

  const handleSortPrice = () => {
    //luu gia tri sort
    if (searchParam.sortPrice === "asc") {
      setSearchParam({ ...searchParam, sortPrice: "desc" });
    } else {
      setSearchParam({ ...searchParam, sortPrice: "asc" });
    }
    //sort
    const sort = {
      ...searchParam,
      sortPrice: searchParam.sortPrice === "asc" ? "desc" : "asc",
    };
    getAllProduct(sort);
  };

  if (!products) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleNavigateCreateProductApp}>Create</button>

      <div>
        <input type="text" name="name" onChange={handleSearchChange} />
        {categories && (
          <select name="category" onChange={handleSearchChange}>
            <option value="" selected>
              All category
            </option>
            {categories.map((category) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
        <button onClick={handleSearch}>Search</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>
              <button onClick={handleSortPrice}>
                Price [{searchParam.sortPrice}]
              </button>
            </th>
            <th>Category</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category.name}</td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => handleShowModalDelete(product.id)}
                >
                  Delete
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-warning"
                  onClick={() => handleEditProduct(product.id)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteModal
        show={show}
        setShow={setShow}
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default Product;
