import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { FaUtensils, FaUsers, FaShoppingBag, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [editingUserIndex, setEditingUserIndex] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: '', email: '', role: '' });
  const handleLogout = () => {
    localStorage.removeItem('token'); // or your auth key
    window.location.href = '/login'; // redirect to login page
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users');
        const data = await res.json();
        setUsers(data);
        setUserCount(data.length);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUserData();
  }, []);

  const handleUserEdit = (index) => {
    setEditingUserIndex(index);
    setEditedUser({ ...users[index] });
  };

  const handleUserDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter((u) => u._id !== id));
      setUserCount((prev) => prev - 1);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleUserSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedUser),
      });
      const updatedUser = await res.json();
      const updatedUsers = [...users];
      updatedUsers[editingUserIndex] = updatedUser;
      setUsers(updatedUsers);
      setEditingUserIndex(null);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const [restaurantList, setRestaurantList] = useState([
    { name: 'Pizza Place', location: 'New York' },
    { name: 'Sushi House', location: 'San Francisco' },
    { name: 'Curry Corner', location: 'Chicago' },
    { name: 'Burger Joint', location: 'Los Angeles' },
    { name: 'Pasta Palace', location: 'Boston' },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedLocation, setEditedLocation] = useState('');

  const handleDelete = (index) => {
    const updatedList = [...restaurantList];
    updatedList.splice(index, 1);
    setRestaurantList(updatedList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedName(restaurantList[index].name);
    setEditedLocation(restaurantList[index].location);
  };

  const handleSave = (index) => {
    const updatedList = [...restaurantList];
    updatedList[index] = { name: editedName, location: editedLocation };
    setRestaurantList(updatedList);
    setEditIndex(null);
  };

  const orders = [
    { id: 1001, user: 'John Doe', restaurant: 'Pizza Place', status: 'Completed', total: '$50.00' },
    { id: 1002, user: 'Jane Doe', restaurant: 'Sushi House', status: 'Completed', total: '$25.00' },
    { id: 1003, user: 'Jane Smith', restaurant: 'Curry Corner', status: 'Pending', total: '$30.00' },
    { id: 1004, user: 'Alice Brown', restaurant: 'Burger Joint', status: 'Pending', total: '$40.00' },
    { id: 1005, user: 'John Doe', restaurant: 'Pasta Burger', status: 'Completed', total: '$25.00' },
  ];

  return (
    <div className="admin-dashboard">
       <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </header>
      <main className="dashboard-main">
        <div className="cards">
          <div className="card red">
            <FaUtensils size={30} />
            <div>
              <h3>{restaurantList.length}</h3>
              <p>RESTAURANTS</p>
            </div>
          </div>
          <div className="card blue">
            <FaUsers size={30} />
            <div>
              <h3>{userCount}</h3>
              <p>USERS</p>
            </div>
          </div>
          <div className="card orange">
            <FaShoppingBag size={30} />
            <div>
              <h3>{orders.length}</h3>
              <p>ORDERS</p>
            </div>
          </div>
        </div>

        <div className="tables-section">
          <div className="table-card">
            <h3>Restaurant List</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurantList.map((r, i) => (
                  <tr key={i}>
                    <td>
                      {editIndex === i ? (
                        <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                      ) : (
                        r.name
                      )}
                    </td>
                    <td>
                      {editIndex === i ? (
                        <input type="text" value={editedLocation} onChange={(e) => setEditedLocation(e.target.value)} />
                      ) : (
                        r.location
                      )}
                    </td>
                    <td>
                      {editIndex === i ? (
                        <button onClick={() => handleSave(i)}>Save</button>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(i)}><FaEdit /></button>
                          <button onClick={() => handleDelete(i)}><FaTrash /></button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-card">
            <h3>Order Table</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Restaurant</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i}>
                    <td>{o.id}</td>
                    <td>{o.user}</td>
                    <td>{o.restaurant}</td>
                    <td><span className={`status ${o.status.toLowerCase()}`}>{o.status}</span></td>
                    <td>{o.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-card">
            <h3>User Table</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id}>
                    <td>
                      {editingUserIndex === i ? (
                        <input value={editedUser.name} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} />
                      ) : (
                        u.name
                      )}
                    </td>
                    <td>
                      {editingUserIndex === i ? (
                        <input value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />
                      ) : (
                        u.email
                      )}
                    </td>
                    <td>
                      {editingUserIndex === i ? (
                        <input value={editedUser.role} onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })} />
                      ) : (
                        u.role
                      )}
                    </td>
                    <td>
                      {editingUserIndex === i ? (
                        <button onClick={() => handleUserSave(u._id)}>Save</button>
                      ) : (
                        <>
                          <button onClick={() => handleUserEdit(i)}><FaEdit /></button>
                          <button onClick={() => handleUserDelete(u._id)}><FaTrash /></button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
