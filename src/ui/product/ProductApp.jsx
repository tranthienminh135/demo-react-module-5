import React, { useEffect, useState } from "react";
import { deleteProduct, findAllProduct } from "../../services/product-service";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import DeleteModal from "./DeleteModal";

const Product = () => {
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [idDelete, setIdDelete] = useState();

  useEffect(() => {
    getAllProduct();
  }, []);
  const getAllProduct = () => {
    findAllProduct().then((res) => setProducts(res));
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

  if (!products) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleNavigateCreateProductApp}>Create</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Price</th>
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
