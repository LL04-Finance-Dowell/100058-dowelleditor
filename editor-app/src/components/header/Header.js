import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Header.css";
import { headerData } from "../../data/data";
import user from "../../assets/headerIcons/user.png";

const Header = () => {
  //   console.log(headerData);
  return (
    <div className="header">
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-start ">
            
            <div className="header_btn">
              <Button variant="primary" size="md" className="rounded">
                Save
              </Button>
            </div>
            <div className="header_icons">
              {headerData.map((item, index) => {
                return <img src={item.icon} alt="icon" key={index} />;
              })}
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
