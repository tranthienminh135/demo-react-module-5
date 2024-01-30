import "./App.css";
import Product from "./ui/product/ProductApp";
import Layout from "./ui/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProductApp from "./ui/product/create/CreateProductApp";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProductApp from "./ui/product/edit/EditProductApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Product />} />
          <Route path="/product/create" element={<CreateProductApp />} />
          <Route path="/product/edit/:id" element={<EditProductApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
