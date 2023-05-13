import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
import { Row, Button } from "react-bootstrap";


const ContainerRigntSideBar = () =>
{
  const [borderSize, setBorderSize] = useState(1);
  const [borderColor, setBorderColor] = useState("#000000");
  const [showSlider, setShowSlider] = useState(false);
  function removeContainer()
  {
    // document.querySelector('.focussedd').remove();
    if (document.querySelector(".focussedd").classList.contains("dropp"))
    {
      if (document.querySelector(".focussedd").hasChildNodes())
      {
        const childLength =
          document.querySelector(".focussedd").children.length;
        for (let i = 0; i < childLength; i++)
        {
          document.querySelector(".focussedd").firstElementChild.remove();
        }
      }
    } else
    {
      document.querySelector(".focussedd").remove();
    }
  }
  const handleBorderSizeChange = (e) =>
  {
    setBorderSize(e.target.value);

    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderWidth = `${borderSize}px`;

  };

  const handleBorderColorChange = (e) =>
  {
    setBorderColor(e.target.value);
    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderColor = `${borderColor}`;

  };

  return (
    <>

      <div className="d-flex justify-content-center">
        <hr />
        <Button
          variant="primary"
          onClick={removeContainer}
          className="remove_container text-center mt-5"
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
        {showSlider && (
          <div style={{ display: "flex", alignItems: "center", backgroundColor: "#abab", gap: "10px", height: "40px", width: "90%" }}>
            <input
              type="color"
              value={borderColor}
              onChange={handleBorderColorChange}
              id="color"
              style={{ border: "none", width: "10%", height: "15px" }}
            />
            <input
              type="range"
              min="-10"
              max="20"
              value={borderSize}
              onChange={handleBorderSizeChange}
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
