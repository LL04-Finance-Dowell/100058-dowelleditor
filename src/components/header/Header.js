import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Header.css";
import { headerData } from "../../data/data";
import user from "../../assets/headerIcons/user.png";

const Header = () => {
  //   console.log(headerData);

  const handleUndo = () => {
    document.execCommand("undo")
  }
  const handleRedo = () => {
    document.execCommand("redo")
  }
  const handleCut = () => {
      document.querySelector('.focussedd').remove()
  }
  const handleCopy = () => {
    document.execCommand("copy")
  }
  return (
    <div className="header">
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-start ">
            
            <div className="header_btn">
              <Button variant="primary" size="md" className="rounded " id='saving-button'>
                Save
              </Button>
            </div>
            <div className="header_icons">
              <img onClick={handleUndo} src={headerData[0].icon}/>
              <img onClick={handleRedo} src={headerData[1].icon}/>
              <img onClick={handleCut} src={headerData[2].icon}/>
              <img onClick={handleCopy} src={headerData[3].icon}/>
              <img onClick={()=>{}} src={headerData[4].icon}/>
              <img onClick={()=>{}} src={headerData[5].icon}/>
              {/* {headerData.map((item, index) => {
                return <img src={item.icon} alt="icon" key={index} />;
              })} */}
            </div>
          </Col>
          <Col className="d-flex justify-content-center header_p">
            <p>Untitled-File</p>
          </Col>
          <Col className="d-flex justify-content-end header_user">
            <img src={user} alt="" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
