import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantDashboard.css';
import { FaUtensils, FaShoppingBag, FaDollarSign, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';


const RestaurantDashboard = () => {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([
    { name: 'Spaghetti Bolognese', price: '₹12.00', image: 'spaghetti.jpg' },
    { name: 'Fettucinne Alfredo', price: '₹14.00', image: 'fettucinne.jpg' },
    { name: 'Penne Arrabbiata', price: '₹11.00', image: 'penne.jpg' },
    { name: 'Lasagna', price: '₹15.00', image: 'lasagna.jpg' },
    { name: 'Ravioli', price: '₹15.00', image: 'ravioli.jpg' },
  ]);

  const [restaurantDetails, setRestaurantDetails] = useState({
    name: 'Pasta Palace',
    caption: 'Authentic Italian Cuisine',
    image: null,
  });

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    image: null,
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 1023, status: 'Completed', total: '₹25.00' },
    { id: 1022, status: 'Pending', total: '₹18.00' },
    { id: 1021, status: 'Completed', total: '₹30.00' },
    { id: 1020, status: 'Pending', total: '₹22.00' },
    { id: 1019, status: 'Completed', total: '₹19.00' },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleRestaurantInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewMenuItem((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleRestaurantImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setRestaurantDetails((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    if (newMenuItem.name && newMenuItem.price && newMenuItem.image) {
      setMenuItems((prevItems) => [
        ...prevItems,
        {
          name: newMenuItem.name,
          price: newMenuItem.price,
          image: newMenuItem.image,
        },
      ]);
      setNewMenuItem({ name: '', price: '', image: null });
      e.target.reset(); // reset file input
      alert('New menu item added!');
    }
  };

  const handleDeleteMenuItem = (index) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems((prevItems) => prevItems.filter((_, i) => i !== index));
      alert('Menu item deleted!');
    }
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setRecentOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      alert('Order deleted!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
    console.log('Logged out!');
  };
  const handleRestaurantSave = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('name', restaurantDetails.name);
      formData.append('caption', restaurantDetails.caption);
  
      // Important: You must append the actual file, not the preview URL
      if (restaurantDetails.image instanceof File) {
        formData.append('image', restaurantDetails.image);
      }
  
      const response = await axios.post('http://localhost:5000/api/restaurant/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        alert('Restaurant details updated successfully!');
      } else {
        alert('Failed to update restaurant details.');
      }
    } catch (error) {
      console.error('Error updating restaurant details:', error);
      alert('An error occurred while updating restaurant details.');
    }
  };
  

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Restaurant</h2>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Menu</li>
            <li>Orders</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <div className="top-section">
          <h1 className="dashboard-title">Welcome, Akash</h1>
          <div className="top-right">
            <img
              src={
                restaurantDetails.image ||
                'https://via.placeholder.com/100x100?text=No+Image'
              }
              alt="Restaurant"
              className="restaurant-top-image"
            />
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt size={20} /> Logout
            </button>
          </div>
        </div>

        <div className="stats">
          <div className="card red">
            <FaUtensils size={30} />
            <div>
              <h2>{menuItems.length}</h2>
              <p>ITEMS</p>
            </div>
          </div>
          <div className="card blue">
            <FaShoppingBag size={30} />
            <div>
              <h2>{recentOrders.length}</h2>
              <p>ORDERS</p>
            </div>
          </div>
          <div className="card green">
            <FaDollarSign size={30} />
            <div>
              <h2>₹4,567</h2>
              <p>EARNINGS</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="left-column">
            <div className="add-menu-item">
              <h3>Add New Menu Item</h3>
              <form onSubmit={handleAddMenuItem}>
                <input
                  type="text"
                  name="name"
                  value={newMenuItem.name}
                  onChange={handleInputChange}
                  placeholder="Dish Name"
                  required
                />
                <input
                  type="text"
                  name="price"
                  value={newMenuItem.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  required
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
                {newMenuItem.image && (
                  <div className="image-preview">
                    <img src={newMenuItem.image} alt="Preview" />
                  </div>
                )}
                <button type="submit">Add Item</button>
              </form>
            </div>

            <div className="edit-restaurant-details">
              <h3>Edit Restaurant Details</h3>
              <form onSubmit={handleRestaurantSave}>
                <input
                  type="text"
                  name="name"
                  value={restaurantDetails.name}
                  onChange={handleRestaurantInputChange}
                  placeholder="Restaurant Name"
                />
                <input
                  type="text"
                  name="caption"
                  value={restaurantDetails.caption}
                  onChange={handleRestaurantInputChange}
                  placeholder="Restaurant Caption"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleRestaurantImageUpload}
                />
                {restaurantDetails.image && (
                  <div className="image-preview">
                    <img src={restaurantDetails.image} alt="Preview" />
                  </div>
                )}
                <button type="submit">Save Changes</button>
              </form>
            </div>
          </div>

          <div className="right-column">
            <div className="menu-items">
              <h3>Menu Items</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="menu-item-image"
                        />
                      </td>
                      <td>
                        <button onClick={() => handleDeleteMenuItem(i)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="recent-orders">
              <h3>Recent Orders</h3>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, i) => (
                    <tr key={i}>
                      <td>{order.id}</td>
                      <td>
                        <span className={`status ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.total}</td>
                      <td>
                        <button onClick={() => handleDeleteOrder(order.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDashboard;
