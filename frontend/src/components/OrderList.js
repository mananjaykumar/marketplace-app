import React, { useEffect, useState } from "react";
import "./OrdersList.css";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/orders`)
        .then((response) => {
          setOrders(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="orders-listing">
      <h1 className="title">Orders Listing</h1>
      <div className="orders-container">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h2>{order.buyer_name}</h2>
              <p>
                <strong>Email:</strong> {order.buyer_email}
              </p>
              <p>
                <strong>Product ID:</strong> {order.product_id}
              </p>
            </div>
          ))
        ) : (
          <p className="no-orders">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
