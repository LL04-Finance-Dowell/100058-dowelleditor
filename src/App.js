import './App.css';
import HomePage from './pages/HomePage';

import { BrowserRouter as Router, Switch, Route, Routes, HashRouter } from "react-router-dom";

function App() {

  return (
    <HashRouter>
      <Routes>
        {/* <div className="app"> */}
          {/* <Route path="/">
            <HomePage />
          </Route> */}
          <Route path="/" element={<HomePage />} />
        {/* </div> */}
      </Routes>
    </HashRouter>


  );
}

export default App;
