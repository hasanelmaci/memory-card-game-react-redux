import React from "react";
import "./css/index.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Cards />
      </div>
    </Provider>
  );
}

export default App;
