import React, { useEffect, useState } from 'react';
import './Orders.css';
import api from '../../api'; // ✅ Axios instance with VITE_API_URL

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/api/order/list');
        if (res.data.success) {
          setOrders(res.data.orders || []);
        } else {
          alert("❌ Failed to fetch orders from server");
        }
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        alert("❌ Server error while fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>All Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        <div className="orders-table">
          <div className="orders-header">
            <p>User ID</p>
            <p>Amount</p>
            <p>Status</p>
            <p>Date</p>
            <p>Payment</p>
          </div>

          {orders.map((order, index) => (
            <div className="orders-row" key={index}>
              <p>{order.userId || "Guest"}</p>
              <p>₹{order.amount}</p>
              <p>{order.status}</p>
              <p>{new Date(order.date).toLocaleString()}</p>
              <p>{order.payment ? "✅ Paid" : "❌ Unpaid"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: "20px", color: "gray" }}>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
