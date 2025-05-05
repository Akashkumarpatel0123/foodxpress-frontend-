import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/RelatedQuery.css';

const RelatedQuery = () => {
  const [transactionId, setTransactionId] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transaction ID:', transactionId);
    console.log('Uploaded Image:', image);
  };

  return (
    <div className="related-query-container">
      <div className="cancel-btn-container">
        <button className="cancel-button" onClick={() => navigate('/home')}>
          Cancel
        </button>
      </div>

      <h2>Related Query</h2>
      <form onSubmit={handleSubmit} className="related-query-form">
        <label htmlFor="transactionId">Transaction ID</label>
        <input
          type="text"
          id="transactionId"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter your Transaction ID"
          required
        />

        <label htmlFor="imageUpload">Upload Image</label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
        />

        <button type="submit">Submit Query</button>
      </form>
    </div>
  );
};

export default RelatedQuery;
