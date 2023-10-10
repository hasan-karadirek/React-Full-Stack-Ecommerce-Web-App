import React, { useState } from "react";
import { checkout } from "../helpers/checkoutHelper";

function CheckoutAddressForm({ errorHandler }) {
  const [formData, setFormData] = useState({
    postcode: "",
    street_name: "",
    house_number: "",
    floor: "",
    country: "The Netherlands",
    email: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkout(formData, errorHandler);
  };

  return (
    <div className="checkout-form-container">
      <h1>Checkout Address</h1>
      <form id={"checkout-form"} onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-field">
            <label htmlFor="firstName">First Name:</label>
            <br />
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Lastname:</label>
            <br />
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <br />
        <div className="input-field">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <div className="input-field">
            <label htmlFor="postcode">Postcode:</label>
            <br />
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="street_name">Street Name:</label>
            <br />
            <input
              type="text"
              id="street_name"
              name="street_name"
              value={formData.street_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <br />
        <div className="form-group">
          <div className="input-field">
            <label htmlFor="house_number">House Number:</label>
            <br />
            <input
              type="number"
              id="house_number"
              name="house_number"
              value={formData.house_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="floor">Floor:</label>
            <br />
            <input
              type="text"
              id="floor"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <br />
        <div className="input-field">
          <label htmlFor="country">Country:</label>
          <br />
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <br />
        </div>

        <input class="go-to-payment" type="submit" value="Go To Payment" />
      </form>
    </div>
  );
}

export default CheckoutAddressForm;
