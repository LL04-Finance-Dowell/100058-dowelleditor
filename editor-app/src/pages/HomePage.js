import React from "react";
import Header from "../components/header/Header";
import EditSection from "../components/editSection/EditSection";

const HomePage = () => {
  return (
    <div className="home">
      <div className="home_header">
        <Header />
      </div>
      <div className="home_leftmenu">
        <EditSection />
      </div>
    </div>
  );
};

export default HomePage;
