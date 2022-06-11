import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftMenu from "../leftMenu/LeftMenu";
import MidSection from "../midSection/MidSection";
import RightMenu from "../rightMenu/RightMenu";
import "./EditSection.css";
const EditSection = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  console.log(sidebar);
  return (
    <div className="editSec">
      <Container fluid>
        <Row>
          <Col md={1}>
            <LeftMenu showSidebar={showSidebar} />
          </Col>
          <Col md={sidebar ? 8 : 11} as="div" className="editSec_midSec"><MidSection/></Col>
          <Col
            style={sidebar ? { display: "block" } : { display: "none" }}
            md={sidebar ? 3 : 0}
            as="div"
            className="editSec_rightMenu"
          >
            <RightMenu />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default EditSection;
