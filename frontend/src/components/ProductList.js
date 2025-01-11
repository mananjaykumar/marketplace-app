import React from "react";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import axios from "axios";

const ProductList = ({ products, loading, setProducts }) => {
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProducts(products.filter((product) => product.id !== id));
          alert("Product deleted successfully!");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete the product. Please try again.");
      });
  };
  return (
    // <div>
    //   <h1>Products</h1>
    //   <ul>
    //     {products.map((product) => (
    //       <li key={product.id}>
    //         {/* <h2>{product.name}</h2>
    //         <p>{product.description}</p>
    //         <p>${product.price}</p>
    //         <p>
    //           <img src={product.image[0].url} />{" "}
    //         </p> */}
    //         <ProductCard
    //           name={product.name}
    //           description={product.description}
    //           price={product.price}
    //           image={product.image[0].url}
    //         />
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div style={{ display: "flex", flexDirection: "column", padding: "2rem" }}>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Products</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            {products?.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
