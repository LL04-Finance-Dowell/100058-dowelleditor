import { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import TextBox from "../leftMenu/comp/TextBox";
import LeftMenu from "../leftMenu/LeftMenu";
import MidSection from "../midSection/MidSection.js";
import RightMenu from "../rightMenu/RightMenu";

import AlignRightSide from "../rightMenu/AlignRightSide";
import CalendarRightSidebar from "../rightMenu/CalendarRightSidebar";
import DropDownRightSide from "../rightMenu/DropDownRightSide";
import ImageRightSidebar from "../rightMenu/ImageRightSidebar";
import SignsRightSidebar from "../rightMenu/SignsRightSidebar";
import TableRightSidebar from "../rightMenu/TableRightSidebar";

import "./EditSection.css";
import { useStateContext } from "../../contexts/contextProvider";

const EditSection = () => {

  const { isClicked, sidebar } = useStateContext();


  // const [sidebar, setSidebar] = useState(false);
  // const showSidebar = () => setSidebar(!sidebar);
  // console.log(sidebar);

  // console.log(typeof isClicked.table2);
  return (
    <div className="editSec">
      <Container fluid>
        <Row>
          <Col md={1}>
            {/* <LeftMenu showSidebar={showSidebar} /> */}
            <LeftMenu />
          </Col>
          <Col md={sidebar ? 8 : 11} as="div" className="editSec_midSec">
            {/* <MidSection showSidebar={showSidebar}/> */}
            <MidSection />
          </Col>

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
