import './App.css';
import HomePage from './pages/HomePage';

import { BrowserRouter as Router, Switch, Route, Routes, HashRouter } from "react-router-dom";

function App() {

  return (

     <div className="app"> 
          <HomePage />
        </div> 


  );
}

export default App;
