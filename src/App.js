import "./App.css";
import HomePage from "./pages/HomePage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
import Printer from "./utils/spinner/Printer";

function App() {
  return (
    <div className="app">
      {/* <Printer /> */}
      <HomePage />
    </div>
  );
}

export default App;
