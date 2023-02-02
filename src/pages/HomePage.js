import React from "react";
import Header from "../components/header/Header";
import EditSection from "../components/editSection/EditSection";

const HomePage = () => {
  const homeElem = document.getElementById("homeID");
  //console.log(homeElem);
  return (
    <div className="home" id="homeID">
      <div className="home_header fixed">
        <Header />
      </div>
      <div className="home_leftmenu">
        <EditSection homeElem={homeElem} />
      </div>
    </div>
  );
};

export default HomePage;
