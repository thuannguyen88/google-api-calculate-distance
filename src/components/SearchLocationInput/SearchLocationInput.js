import React, { useState, useEffect, useRef } from "react";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  const options = {
    types: ["address"],
    componentRestrictions: { country: "uk" },
  };
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    options
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
  console.log(autoCompleteRef.current);
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}

// take an address from query and add to database of addresses

function SearchLocationInput() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
//   const [addresses, setAddresses] = useState([""]);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

//   useEffect(() => {
//     setAddresses([...addresses, query]);
//   }, [query]);
//   console.log(addresses);

  return (
    <>
      <div className="search-location-input">
        <form className="form">
          <div className="form-box">
            <label>Location:</label>
            <input
              ref={autoCompleteRef}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Enter your address"
              value={query}
            />
            <input id="location" name="location" required type="hidden" />
          </div>
        </form>
      </div>
      <div className="search-results">
        <h1>Search Results</h1>
        {query && <p>{query}</p>}
      </div>
    </>
  );
}

export default SearchLocationInput;
