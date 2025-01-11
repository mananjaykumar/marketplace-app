import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onDelete }) => {
  const styles = {
    card: {
      width: "300px",
      height: "400px",
      display: "flex",
      flexDirection: "column",
      border: "1px solid #ddd",
      borderRadius: "8px",
      background: "#fff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      position: "relative", // Required for positioning the delete icon
      transition: "transform 0.3s ease",
    },
    imageContainer: {
      flex: "1",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    content: {
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    title: {
      fontSize: "20px",
      margin: "0 0 8px",
      color: "#333",
    },
    description: {
      fontSize: "14px",
      margin: "0 0 16px",
      color: "#555",
    },
    price: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#e74c3c",
      margin: "0 0 16px",
    },
    button: {
      display: "inline-block",
      width: "100%",
      padding: "10px 0",
      textAlign: "center",
      backgroundColor: "#3498db",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "4px",
      fontWeight: "bold",
      border: "none",
      transition: "background-color 0.3s ease",
      cursor: "pointer",
    },
    deleteIcon: {
      position: "absolute", // Positions it relative to the card
      top: "8px",
      right: "8px",
      width: "24px",
      height: "24px",
      backgroundColor: "#e74c3c",
      color: "#fff",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      transition: "background-color 0.3s ease",
    },
    deleteIconHover: {
      backgroundColor: "#c0392b",
    },
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={styles.deleteIcon}
        onClick={() => onDelete(product.id)}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#c0392b")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#e74c3c")
        }
      >
        ✖
      </div>
      <div style={styles.imageContainer}>
        <img src={product.image} alt={product.name} style={styles.image} />
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.price}>${product.price}</p>
        <Link
          to={`/product/${product.id}`}
          style={styles.button}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#2980b9")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#3498db")
          }
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
