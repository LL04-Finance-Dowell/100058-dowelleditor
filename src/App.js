import { Suspense, lazy } from "react";
import "./App.css";
// import HomePage from "./pages/HomePage";
const HomePage = lazy(() => import("./pages/HomePage"));

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Routes,
//   HashRouter,
// } from "react-router-dom";
// import Printer from "./utils/spinner/Printer";

function App() {
  // useEffect(() => {
  //   const UNDO_REDO = sessionStorage.getItem("undoRedo");
  //   if(!UNDO_REDO) {
  //     sessionStorage.setItem("undoRedo", "[]")
  //   }
  // }, [])
  return (
    <Suspense fallback={"Loading......."}>
      <div className="app">
        {/* <Printer /> */}
        <HomePage />
      </div>
    </Suspense>
  );
}

export default App;
