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
            <header className="header">
        <div className="header-buttons">
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
      </header>
      <main className="main-content">
        <h1>My Online Shop</h1>
        {error && <p>{error}</p>}
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="item-list">
            {items.map((item) => (
              <li key={item.id} className="item">
                <div className="Title">{item.title}</div>
                <img src={item.image.url} alt={item.title} /> 
                <div className='Price'>Full Price: {item.price}</div>
                <div className='discountedPrice'>Discounted Price: {item.discountedPrice}</div>
                <div className="ID">ID: {item.id}</div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <footer className="footer">
        <p>&copy; 2024 My Online Shop</p>
      </footer>
    </div>
  );
}

export default App;
