import React, { useState } from 'react';
import './profile.scss';
import Header from '../../components/header/Header';

const Profile = () => {
  // Get user data from local storage
  const userData = localStorage.getItem('userData');
  let user = null;

  if (userData) {
    user = JSON.parse(userData);
  }

  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState(user ? user.user : {});


  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (field) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.user._id, [field]: formData[field] })
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error);
        return;
      }

      const updatedUser = await response.json();
      localStorage.setItem('userData', JSON.stringify({ ...user, user: updatedUser.user }));
      setEditField(null);
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="profile">
      <Header />
      <div className="profile-content">
        <h3>My Profile</h3>
        {user && (
          <div className="profile-details">
            <h2>User Details</h2>
            {['firstname', 'lastname', 'email', 'phone_number'].map((field) => (
              <div key={field} className="profile-item">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}: </label>
                {editField === field ? (
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{formData[field]}</span>
                )}
                <button onClick={() => (editField === field ? handleSave(field) : handleEditClick(field))}>
                  {editField === field ? 'Save' : 'Edit'}
                </button>
              </div>
            ))}
            <div className="profile-item">
              <label>Address: </label>
              {editField === 'address' ? (
                <div>
                  <input
                    type="text"
                    name="street"
                    value={formData.address.street}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.address.city}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                  />
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.address.postal_code}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, postal_code: e.target.value } })}
                  />
                  <input
                    type="text"
                    name="country"
                    value={formData.address.country}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })}
                  />
                </div>
              ) : (
                <span>{`${formData.address.street}, ${formData.address.city}, ${formData.address.postal_code}, ${formData.address.country}`}</span>
              )}
              <button onClick={() => (editField === 'address' ? handleSave('address') : handleEditClick('address'))}>
                {editField === 'address' ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
