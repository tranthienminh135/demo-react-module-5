import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { findAllCategory } from "../../../services/category-service";
import { editProduct, findById } from "../../../services/product-service";

const validation = Yup.object({
  name: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
});

const EditProductApp = () => {
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const { id } = params;
    if (params && id) {
      findById(id).then((res) => {
        const p = { ...res, category: JSON.stringify(res.category) };
        setProduct(p);
      });
    }
  }, [params]);

  useEffect(() => {
    findAllCategory().then((res) => setCategories(res));
  }, []);

  if (!categories) return <div>Loading...</div>;

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Product</h1>
      <Formik
        initialValues={product}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          const productObj = {
            ...values,
            category: JSON.parse(values.category),
          };
          editProduct(productObj).then((res) => {
            navigate("/");
            setSubmitting(false);
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

export default EditProductApp;
