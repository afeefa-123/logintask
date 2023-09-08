import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedRoute = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/protected', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setMessage(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Protected Route</h2>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedRoute;
