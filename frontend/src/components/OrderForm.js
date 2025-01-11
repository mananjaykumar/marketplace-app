import React, { useState } from "react";
import "./OrderForm.css"; // Make sure to create this CSS file
import axios from "axios";

const OrderForm = ({ products, setProducts }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product_id: "",
    buyer_name: "",
    buyer_email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // [name]: name === "productId" ? Number(value) : value,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      product_id: [formData.product_id],
    };
    console.log("updatedFormData", updatedFormData);
    axios
      .post("http://localhost:5000/orders", updatedFormData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // setProducts([...products, response.data]);
        setFormData({
          product_id: "",
          buyer_name: "",
          buyer_email: "",
        });
        setLoading(false);
        alert("Order Placed successfully");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="form-container">
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <select
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
          >
            <option value="">Select a Product</option>
            {products?.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="buyer_name">Name:</label>
          <input
            id="buyer_name"
            name="buyer_name"
            value={formData.buyer_name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="buyer_email">Email:</label>
          <input
            type="email"
            id="buyer_email"
            name="buyer_email"
            value={formData.buyer_email}
            onChange={handleChange}
            placeholder="Your Email"
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

export default OrderForm;
