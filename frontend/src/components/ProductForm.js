import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductForm.css"; // Make sure to create this CSS file
import axios from "axios";
import Loader from "./Loader";

const ProductForm = ({ products, setProducts }) => {
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    email: "",
  });
  const [recordId, setRecordId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (id === undefined) {
      axios
        .post("http://localhost:5000/products", formData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setProducts([...products, response.data]);
          setFormData({
            name: "",
            description: "",
            price: "",
            image: "",
            email: "",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      axios
        .post(
          "http://localhost:5000/product/edit",
          { ...formData, recordId },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          // setProducts([...products, response.data]);
          setFormData({
            name: "",
            description: "",
            price: "",
            image: "",
            email: "",
          });
          setLoading(false);
          alert(response.data.message);
          alert("Redirecting to the homepage...");
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      setEditLoading(true);
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/product/${id}`)
        .then((response) => {
          setFormData(response?.data?.data?.fields);
          setRecordId(response?.data?.data?.id);
          setEditLoading(false);
        })
        .catch((error) => {
          console.log("error", error.message);
          setEditLoading(false);
        });
    }
  }, [id]);

  if (editLoading) return <Loader />;

  return (
    <div className="form-container">
      <h2>{id === undefined ? "Add Product" : "Edit Product"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
