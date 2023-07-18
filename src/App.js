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
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const UNDO_REDO = sessionStorage.getItem("undoRedo");
    if(!UNDO_REDO) {
      sessionStorage.setItem("undoRedo", "[]")
    }
  }, [])
  return (
    <div className="app">
      {/* <Printer /> */}
      <HomePage />
    </div>
  );
}

export default App;
