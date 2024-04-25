import React, { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    body: ''
  });
  const [submitted, setSubmitted] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
   
    setSubmitted(true); 
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      {submitted ? ( 
        <p>Thank you for contacting us!</p>
      ) : ( 
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              minLength={3}
              required
              className="input-field" 
            />
          </div>
          <div className="input-container">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              minLength={3}
              required
              className="input-field"
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              minLength={3}
              className="input-field" 
            />
          </div>
          <div className="input-container">
            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
              minLength={10}
              className="input-field"
            />
            {console.log("Body length:", formData.body.length)}
            {formData.body.length < 10 && (
              <p className="error-message">Minimum 10 characters required</p>
            )}
          </div>
          <button type="submit" className="button" >Submit</button>
        </form>
      )}
    </div>
  );
}

export default ContactPage;