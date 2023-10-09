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
    <div>
      <h1>Checkout Address</h1>
      <form id={"checkout-form"} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Lastname:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="postcode">Postcode:</label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          value={formData.postcode}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="street_name">Street Name:</label>
        <input
          type="text"
          id="street_name"
          name="street_name"
          value={formData.street_name}
          onChange={handleChange}
          required
        />
        <br />
        <div className="form-group">
          <label htmlFor="house_number">House Number:</label>
          <input
            type="number"
            id="house_number"
            name="house_number"
            value={formData.house_number}
            onChange={handleChange}
            required
          />

          <label htmlFor="floor">Floor:</label>
          <div className=""></div>
          <input
            type="text"
            id="floor"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CheckoutAddressForm;
