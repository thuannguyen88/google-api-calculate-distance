import React from "react";

function InputForm() {
  return (
    <div class="container">
      <h1 class="input-heading">Calculate distance between two addresses</h1>
      <form class="form">
        <div class="form-field">
          <label for="location">Origin:</label>
          <input
            type="text"
            placeholder="enter your location"
            id="location"
            required
          ></input>
        </div>
        <div class="form-field">
          <label for="destination">Destination:</label>
          <input
            type="text"
            placeholder="enter your destination"
            id="destination"
            required
          ></input>
        </div>
      </form>
    </div>
  );
}

export default InputForm;
