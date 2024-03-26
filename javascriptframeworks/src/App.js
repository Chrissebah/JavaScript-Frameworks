import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://v2.api.noroff.dev/online-shop`);
        console.log('Response from API:', response.data);
        setItems(response.data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchItems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {error && <p>{error}</p>}
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
      {items.map((item) => (
        <li key={item.id}>
          <div className="Title">{item.title}</div>
          <img src={item.image.url} alt={item.title} /> 
          <div className='Price'>Full Price: {item.price}</div>
          <div className='discountedPrice'>Discounted Price: {item.discountedPrice}</div>
          <div className="ID">ID: {item.id}</div>
        </li>
      ))}
    </ul>
        )}
      </header>
    </div>
  );
}

export default App;