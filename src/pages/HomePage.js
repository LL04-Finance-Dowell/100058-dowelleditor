import React from "react";
import Header from "../components/header/Header";
import EditSection from "../components/editSection/EditSection";
import { useSearchParams } from "react-router-dom"
import SocialMediaHeader from "../components/header/SocialMediaHeader";
import { decodeToken } from "../utils/helper";

const HomePage = () => {
  const homeElem = document.getElementById("homeID");
  //console.log(homeElem);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const decoded = decodeToken(token)
  return (
    <div className="home" id="homeID">
      <div className="home_header fixed">
        {decoded?.product_name && decoded?.product_name === "workflowai"
          ? <Header /> :
          <SocialMediaHeader />}
        {/* <Header /> */}
      </div>
      <div className="home_leftmenu">
        <EditSection homeElem={homeElem} />
      </div>
    </div>
  );
};

export default HomePage;
