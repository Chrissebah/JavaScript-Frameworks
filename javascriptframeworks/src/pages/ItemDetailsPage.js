import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ItemDetailsPage({ addToCart }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { detailId } = useParams();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://v2.api.noroff.dev/online-shop/${detailId}`);
        setItem(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchItemDetails();
  }, [detailId]);

  const handleAddToCart = () => {
    if (item) {
      addToCart(item); 
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2>{item.data.title}</h2>
          <p>Price: ${item.data.price}</p>
          <p>Discounted Price: ${item.data.discountedPrice}</p>
          <p>{item.data.description}</p>
          {item.data.image && (
            <div className="image-container">
              <img src={item.data.image.url} alt={item.data.title} />
            </div>
          )}
          <div className="ID">ID: {item.data.id}</div>
          <p>Overall Rating: {item.data.rating}</p>
          <h3>Reviews</h3>
          <ul>
            {item.data.reviews.map(review => (
              <li key={review.id}>
                <p>{review.username}</p>
                <p>{review.description}</p>
                <p>Rating: {review.rating}</p>
              </li>
            ))}
          </ul>
          <button className="button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
    </div>
  );
}

export default ItemDetailsPage;