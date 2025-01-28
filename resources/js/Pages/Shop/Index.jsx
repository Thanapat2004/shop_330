import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const OrderList = ({ orders }) => {
  return (
    <div>
      <h1>Order List</h1>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer.name}</td>
                {order.orderDetails.map(detail => (
                  <tr key={detail.id}>
                    <td>{detail.product.name}</td>
                    <td>{detail.quantity}</td>
                    <td>{detail.total_price}</td>
                  </tr>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

export default OrderList;
