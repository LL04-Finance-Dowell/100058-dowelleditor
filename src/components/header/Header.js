import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Header.css";
import { headerData } from "../../data/data";
import user from "../../assets/headerIcons/user.png";

import { useStateContext } from "../../contexts/contextProvider";

const Header = () => {

  const {item, setItem} = useStateContext()
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


  function createNewPage() {
      const current = [...item];
      current.push('newDiv');
      setItem(current);

  }

  function removePage() {

    const current = [...item];

    var name=prompt("Enter the number of page to delete");
     if (name!=null){
      const index = name-1
      if (index >= 0) {
        //remove item from the basket
        current.splice(index, 1);
        setItem(current)
    } else {
      console.warn(
        `Cant remove page`
    );
    }
     }
    console.log(current);

    }




  return (
    <div className="header">
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-start lhs-header">

            <div className="header_btn">
              <Button variant="primary" size="md" className="rounded " id='saving-button'>
                Save
              </Button>
            </div>
            <div className="header_icons">
              <img onClick={handleUndo} src={headerData[0].icon} />
              <img onClick={handleRedo} src={headerData[1].icon} />
              <img onClick={handleCut} src={headerData[2].icon} />
              <img onClick={handleCopy} src={headerData[3].icon} />
              <img onClick={() => { }} src={headerData[4].icon} />
              <img onClick={() => { }} src={headerData[5].icon} />

              {/* {headerData.map((item, index) => {
                return <img src={item.icon} alt="icon" key={index} />;
              })} */}
            </div>

          </Col>
          <Col className="d-flex justify-content-center">
            <button className='new_page_btn' onClick={()=> createNewPage()} >New page</button>
            <button className='remove_page_btn' onClick={()=> removePage()} >Delete page</button>
           
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
