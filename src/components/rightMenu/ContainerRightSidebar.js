import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import { Row, Button } from "react-bootstrap";
import { useStateContext } from "../../contexts/contextProvider";

import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useSelectedAnswer from "../../customHooks/useSelectedAnswers";
import SelectAnsAndQuestion from "../selectAnsAndQuestion";




const ContainerRigntSideBar = () => {

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);

  // const [borderSize, setBorderSize] = useState(
  //   Number(localStorage.getItem("borderSize")) || 0
  // );
  // const [borderColor, setBorderColor] = useState(
  //   localStorage.getItem("borderColor") || "#000000"
  // );

  const {
    containerBorderSize,
    setContainerBorderSize,
    containerBorderColor,
    setContainerBorderColor,
    setConfirmRemove, confirmRemove
  } = useStateContext()
  const [showSlider, setShowSlider] = useState(false);
  const [selectedType, setSelectedType] = useState('')
  const { addedAns, setAddedAns } = useSelectedAnswer()
  function removeContainer() {
    // document.querySelector('.focussedd').remove();
    if (document.querySelector(".focussedd").classList.contains("dropp")) {
      if (document.querySelector(".focussedd").hasChildNodes()) {
        const childLength =
          document.querySelector(".focussedd").children.length;
        for (let i = 0; i < childLength; i++) {
          document.querySelector(".focussedd").firstElementChild.remove();
        }
      }
    } else {
      document.querySelector(".focussedd").remove();
    }
  }
  const handleBorderSizeChange = (e) => {
    setContainerBorderSize(e.target.value);

    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderWidth = `${e.target.value}px`;

  };

  const handleBorderColorChange = (e) => {
    setContainerBorderColor(e.target.value);
    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderColor = `${e.target.value}`;

  };
  const handleRangeBlur = (e) => {
    e.target.focus();
  };
  // useEffect(() =>
  // {
  //   localStorage.setItem("borderSize", borderSize === "0")
  //   localStorage.setItem("borderColor", borderColor === "black")
  // }, [borderSize, borderColor]);
  return (
    <>

      <div className="d-flex justify-content-center">
        <hr />
        <Button
          variant="primary"
          // onClick={removeContainer}
          onClick={() => setConfirmRemove(!confirmRemove)}
          className={decoded.details.action === "template" ? "remove_container text-center mt-5" : "remove_container text-center mt-5 disable_button"}
        >
          Remove Container
        </Button>

      </div>
      <hr />
      <Row className="pt-4">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h6 style={{ marginRight: "10rem" }}>Border</h6>
          <label className="switch">
            <input type="checkbox" onClick={() => setShowSlider(!showSlider)} />
            <span className="slider round"></span>
          </label>
        </div>
        <SelectAnsAndQuestion
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          addedAns={addedAns}
          setAddedAns={setAddedAns}
        />
        {showSlider && (
          <div style={{ display: "flex", alignItems: "center", backgroundColor: "#abab", gap: "10px", height: "40px", width: "90%" }}>
            <input
              type="color"
              value={containerBorderColor}
              onChange={handleBorderColorChange}
              id="color"
              style={{ border: "none", width: "10%", height: "15px" }}
            />
            <input
              type="range"
              min="0"
              max="20"
              value={containerBorderSize}
              onChange={handleBorderSizeChange}
              onBlur={handleRangeBlur}
              id="range"
              className="range-color"

            />

          </div>
        )}
      </Row>
    </>
  );
};

export default ContainerRigntSideBar;
