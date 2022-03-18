import "./App.css";
import SearchLocationInput from "./SearchLocationInput/SearchLocationInput.js";

function App() {
  return (
    <div className="App">
      <h1>google maps api</h1>
      {/* <InputForm /> */}
      <SearchLocationInput onChange={() => null} />
    </div>
  );
}

export default App;
