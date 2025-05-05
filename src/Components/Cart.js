import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Style/Cart.css"; // Ensure you have this CSS file for styling

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Function to calculate the total cost
  const getTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/payment"); // Redirect to the payment page
  };

  const handleCancel = () => {
    navigate("/home"); // Redirect to home or previous page
  };

  // Group items by restaurant id
  const groupedCart = cart.reduce((acc, item) => {
    const restaurantId = item.restaurantId; // Assuming item has restaurantId
    if (!acc[restaurantId]) {
      acc[restaurantId] = [];
    }
    acc[restaurantId].push(item);
    return acc;
  }, {});

  // Function to remove item from cart
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId); // Call removeFromCart method passed from context
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">
          <p>Your cart is empty</p>
          <button className="btn btn-primary" onClick={handleCancel}>Go Back</button>
        </div>
      ) : (
        <>
          {Object.keys(groupedCart).map((restaurantId) => {
            const restaurantItems = groupedCart[restaurantId];
            return (
              <div key={restaurantId} className="restaurant-cart">
                <h4>Restaurant: {restaurantItems[0].restaurantName}</h4> {/* Assuming each item has restaurantName */}
                <ul className="list-group mb-4">
                  {restaurantItems.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img src={item.image} alt={item.name} className="cart-img me-3" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                        <div>
                          <h5>{item.name}</h5>
                          <p className="mb-0">₹{item.price} x {item.quantity}</p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center">
                        <button className="btn btn-outline-secondary me-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className="badge bg-light text-dark">{item.quantity}</span>
                        <button className="btn btn-outline-secondary ms-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        <button className="btn btn-danger ms-3" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="d-flex justify-content-between align-items-center">
            <h3>Total: ₹{getTotal()}</h3>
            <div>
              <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
              <button className="btn btn-success" onClick={handleCheckout}>Proceed to Payment</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
