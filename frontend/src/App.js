// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProductList from "./components/ProductList";
// import Navbar from "./components/Navbar";

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <Router>
//         <Routes>
//           <Route path="/" element={<ProductList />} />
//         </Routes>
//       </Router>
//     </>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import OrderForm from "./components/OrderForm";
import OrdersList from "./components/OrderList";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   description: "",
  //   price: null,
  //   image: "",
  // });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      });
  }, []);

  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]:
  //       e.target.name === "price" ? Number(e.target.value) : e.target.value,
  //   });
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:5000/api/products", formData, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     .then((response) => {
  //       setProducts([...products, response.data]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div>
      <Navbar />

      {/* <h2>Add Product</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleInputChange}
        />
        <button type="submit">Add Product</button>
      </form> */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <ProductForm products={products} setProducts={setProducts} />
                <OrderForm products={products} />
              </div>
              <ProductList
                products={products}
                setProducts={setProducts}
                loading={loading}
              />
            </>
          }
        />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/product/:id" element={<ProductForm />} />
      </Routes>
      {/* <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;
