import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Header.css";
import { headerData } from "../../data/data";
import user from "../../assets/headerIcons/user.png";

import { useStateContext } from "../../contexts/contextProvider";

const Header = () => {

  const { item, setItem } = useStateContext()
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

    var name = prompt("Enter the number of page to delete");
    if (name != null) {
      const index = name - 1
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
    console.log(item);

  }

  function getPosition(el) {
    const rect = el[0].getBoundingClientRect();

    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right
    }
  }

  let contentFile = [];
  let page = [];

  let elem = {}
  function saveDocument() {


    const txt = document.getElementsByClassName("textInput");
    if (txt.length) {
      if (txt[0].parentElement.classList.contains("holderDIV")) {
        for (let h = 0; h < txt.length; h++) {
          elem = {
            width: getPosition(txt).right,
            height: getPosition(txt).bottom,
            top: getPosition(txt).top,
            left: getPosition(txt).left,
            type: 'TEXT_INPUT',
            data: txt[h].innerHTML,
            id: `editTextBox ${h + 1}`
          }

          page.push(elem)
        }
      }
    }


    const img_input = document.getElementsByTagName("input");
    const img = document.getElementsByClassName("imageInput");
    if (img_input.length) {
      console.log('Image_input', img_input[0])
      if (img_input[0].type === 'file') {
        for (let h = 0; h < img_input.length; h++) {
          const reader = new FileReader()
          elem = {
            width: getPosition(img).right,
            height: getPosition(img).bottom,
            top: getPosition(img).top,
            left: getPosition(img).left,
            type: 'IMAGE_INPUT',
            data: reader.result,
            id: `image component ${h + 1}`
          }
          page.push(elem)
        }
      }
    }

    const text2 = document.getElementsByClassName("texttInput");

    if (text2.length) {
      if (text2[0].parentElement.classList.contains("holderDIV")) {
        for (let h = 0; h < text2.length; h++) {
          elem = {
            width: getPosition(text2).right,
            height: getPosition(text2).bottom,
            top: getPosition(text2).top,
            left: getPosition(text2).left,
            type: 'TEXT_FILL',
            data: text2[h].value,
            id: `text component ${h + 1}`
          }
          page.push(elem)
        }
      }
    }

    const date = document.getElementsByClassName("dateInput");
    if (date.length) {
      for (let h = 0; h < date.length; h++) {
        elem = {
          width: getPosition(date).right,
          height: getPosition(date).bottom,
          top: getPosition(date).top,
          left: getPosition(date).left,
          type: 'DATE_INPUT',
          data: date[h].innerHTML,
          id: `date component ${h + 1}`

        }
        page.push(elem)
      }
    }
    // const tablee = document.getElementsByTagName("TABLE")
    // if (tablee.length < 1) {
    //   const img = document.getElementsByTagName("img");
    //   if (img.length) {
    //     const canvas = document.createElement('canvas');
    //     canvas.setAttribute('width', document.style.width);
    //     canvas.setAttribute('height', document.style.height);
    //     const ctx = canvas.getContext('2d');
    //     ctx.drawImage(img[0], 0, 0, parseInt(document.style.width.slice(0, -2)), parseInt(document.style.height.slice(0, -2)));
    //     elem = {
    //       width: getPosition(tablee).style.width,
    //       height: getPosition(tablee).style.height,
    //       top: getPosition(tablee).style.top,
    //       left: getPosition(tablee).style.left,
    //       type: 'IMG_INPUT',
    //       data: canvas.toDataURL(),
    //     }
    //     page.push(elem)
    //   }

    // }









    contentFile.push(page)
    const data = JSON.stringify(contentFile)
    console.log("ContentFile While saveDoc", data);

    return contentFile

  }






  return (
    <div className="header">
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-start lhs-header">

            <div className="header_btn">
              <Button variant="primary" size="md" className="rounded " id='saving-button' onClick={saveDocument}>
                Save
              </Button>
            </div>
            <div className="header_icons">
              <img onClick={handleUndo} src={headerData[0].icon} alt='' />
              <img onClick={handleRedo} src={headerData[1].icon} alt='' />
              <img onClick={handleCut} src={headerData[2].icon} alt='' />
              <img onClick={handleCopy} src={headerData[3].icon} alt='' />
              <img onClick={() => { }} src={headerData[4].icon} alt='' />
              <img onClick={() => { }} src={headerData[5].icon} alt='' />

              {/* {headerData.map((item, index) => {
                return <img src={item.icon} alt="icon" key={index} />;
              })} */}
            </div>

          </Col>
          <Col className="d-flex justify-content-center">
            <button className='new_page_btn' onClick={() => createNewPage()} >New page</button>
            <button className='remove_page_btn' onClick={() => removePage()} >Delete page</button>

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
