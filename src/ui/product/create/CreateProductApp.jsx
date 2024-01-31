import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { findAllCategory } from "../../../services/category-service";
import { addNewProduct } from "../../../services/product-service";
import { useNavigate } from "react-router-dom";

const validation = Yup.object({
  name: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
});

const initProduct = { name: "", price: "", category: "" };

const CreateProductApp = () => {
  const [categories, setCategories] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    findAllCategory().then((res) => setCategories(res));
  }, []);

  if (!categories) return <div>Loading...</div>;

  return (
    <div>
      <h1>Create Product</h1>
      <Formik
        initialValues={initProduct}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          const product = {
            ...values,
            category: JSON.parse(values.category),
            price: +values.price,
          };
          addNewProduct(product).then((res) => {
            console.log(res);
            setSubmitting(false);
            navigate("/");
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name: </label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" />
            </div>

            <div>
              <label htmlFor="price">Price: </label>
              <Field name="price" type="text" />
              <ErrorMessage name="price" />
            </div>

            <div>
              <label htmlFor="price">Category: </label>
              <Field name="category" as="select" className="my-select">
                <option value="" disabled>
                  Choice category
                </option>
                {categories.map((category) => (
                  <option value={JSON.stringify(category)} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductApp;
