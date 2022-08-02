import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";

import "./MidSection.css";


import { dragOver } from "../leftMenu/LeftMenu";
import TextBox from "../leftMenu/comp/TextBox";
import { useStateContext } from "../../contexts/ContextProvider";


import Image from "../leftMenu/comp/Image";
import Table from "../leftMenu/comp/Table";
import Signs from "../leftMenu/comp/Signs";
import Calender from "../leftMenu/comp/Calender";
import DropDown from "../leftMenu/comp/DropDown";
import TextFill from "../leftMenu/comp/TextFill";




// const MidSection = ({showSidebar}) => {
const MidSection = () => {
  const { isDropped, setIsClicked, setSidebar, handleClicked, startDate, signState } = useStateContext();


 

  const midSectionRef = useRef(null);



  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (event.target === midSectionRef.current) {
        setSidebar(false);
        setIsClicked(false);
      }
    })
  }, [midSectionRef, setSidebar, setIsClicked]);

  let resizing = false;

  const isTemplate = JSON.parse(document.getElementById('template'));



  function getResizer(attr1, attr2) {
    const resizer = document.createElement('span');
    resizer.style.width = '5px';
    resizer.style.height = '5px';
    resizer.style.display = 'block';
    resizer.className = 'resizeBtn';
    resizer.style.position = 'absolute';
    resizer.style.backgroundColor = '#00aaff';

    if (attr1 === 'top') {
      resizer.style.top = '-5px';
    } else {
      resizer.style.bottom = '-5px';
    }

    if (attr2 === 'left') {
      resizer.style.left = '-5px';
    } else {
      resizer.style.right = '-5px';
    }

    if (attr1 == 'top' && attr2 === 'right' || attr1 == 'bottom' && attr2 === 'left') {
      resizer.onmouseover = (event) => {
        event.target.style.cursor = 'nesw-resize';
      };
    } else {
      resizer.onmouseover = (event) => {
        event.target.style.cursor = 'nwse-resize';
      };
    }


    resizer.onmousedown = (event) => {

      let initX = event.screenX;
      let initY = event.screenY;
      resizing = true;
      event.preventDefault();

      const holder = event.target.parentNode;

      const holderSize = (function () {
        const holderSize = {
          width: holder.offsetWidth,
          height: holder.offsetHeight,
          top: holder.offsetTop,
          left: holder.offsetLeft
          // width: parseInt(holder.style.width.slice(0, -2)),
          // height: parseInt(holder.style.height.slice(0, -2)),
          // top: parseInt(holder.style.top.slice(0, -2)),
          // left: parseInt(holder.style.left.slice(0, -2))//elemLeft : 0
        }
        return Object.seal(holderSize);
      })();

      window.addEventListener('mousemove', resizeElement);
      function resizeElement(ev) {
        if (attr1 == 'bottom' && attr2 == 'right') {
          holder.style.width = ((ev.screenX - initX) + holderSize.width) + 'px';
          holder.style.height = ((ev.screenY - initY) + holderSize.height) + 'px';

        } else if (attr1 == 'bottom' && attr2 == 'left') {
          holder.style.left = (holderSize.left + (ev.screenX - initX)) + 'px';
          holder.style.width = (holderSize.width - (ev.screenX - initX)) + 'px';
          holder.style.height = ((ev.screenY - initY) + holderSize.height) + 'px';
        } else if (attr1 == 'top' && attr2 == 'left') {
          holder.style.top = (holderSize.top + (ev.screenY - initY)) + 'px';
          holder.style.left = (holderSize.left + (ev.screenX - initX)) + 'px';
          holder.style.width = (holderSize.width - (ev.screenX - initX)) + 'px';
          holder.style.height = (holderSize.height - (ev.screenY - initY)) + 'px';
        } else if (attr1 == 'top' && attr2 == 'right') {
          holder.style.top = (holderSize.top + (ev.screenY - initY)) + 'px';
          holder.style.width = (holderSize.width + (ev.screenX - initX)) + 'px';
          holder.style.height = (holderSize.height - (ev.screenY - initY)) + 'px';
        }

      }

      window.addEventListener('mouseup', stopResizing);
      function stopResizing(ev) {
        window.removeEventListener('mousemove', resizeElement);
        window.removeEventListener('mouseup', stopResizing);
        resizing = false;

      }
    }

    return resizer;
  }





  //Draggin element over page

  const dragElementOverPage = (event) => {

    let holder;
    
    if (!resizing ) {
      let initX = event.screenX;
      let initY = event.screenY;



      /* Ensure That target has changed */
      var counterCheck = true;
      var tempTarget = event.target;
      var hitTarget = "";
      while (counterCheck) {
          // if(tempTarget.className === 'holderDIV'){
          if (tempTarget.classList.contains("holderDIV")) {
              hitTarget = tempTarget;
              counterCheck = false;
          } else if( tempTarget.classList.contains("textInput") ){
            hitTarget = null;
            counterCheck = false;
          }
          tempTarget = tempTarget.parentNode;
      }

      

      holder = hitTarget;
      const holderPos = (function () {
          const holderPos = {
            top: holder.offsetTop,
          left: holder.offsetLeft
              // top: parseInt(holder.style.top.slice(0, -2)),
              // left: parseInt(holder.style.left.slice(0, -2))
          }
          return Object.seal(holderPos);
      })();

      window.addEventListener('mousemove', moveObject);
      function moveObject(ev) {
          ev.preventDefault();
          const diffX = ev.screenX - initX;
          const diffY = ev.screenY - initY;
          holder.style.top = ( holderPos.top + diffY ) + 'px';
          holder.style.left = ( holderPos.left + diffX ) + 'px';

      }

      window.addEventListener('mouseup', stopMove);
      function stopMove(ev){
          window.removeEventListener('mousemove', moveObject);
          window.removeEventListener('mouseup', stopMove);

      }
    }
  }




  function getHolderMenu(auth_user) {
    //putting functional menu on holder

    const HMContainer = document.createElement('div');

    HMContainer.style.height = '100%';
    HMContainer.style.padding = '5px';
    HMContainer.style.display = 'flex';
    HMContainer.style.alignItems = 'center';
    HMContainer.style.justifyContent = 'center';
    HMContainer.style.backgroundColor = 'rgb(129 129 129 / 50%)';

    // HMContainer.append(getSelectOptionsField(auth_user));

    // if (isTemplate) {
    //     HMContainer.append(getDeleteBtn());
    // }



    const holderMenu = document.createElement('div');
    holderMenu.className = 'holder-menu';
    holderMenu.style.height = '35px';
    holderMenu.style.display = 'flex';
    holderMenu.style.justifyContent = 'center';
    holderMenu.style.width = '100%';
    holderMenu.style.borderRadius = '0%';
    holderMenu.style.position = 'absolute';
    holderMenu.style.right = '0px';
    holderMenu.style.top = '-40px';


    holderMenu.append(HMContainer);
    //holderMenu.style.transform = 'translateX(-50%)';

    return holderMenu
  }


  function getHolderDIV(measure) {
    //creating holder for every input field over the page
    const holderDIV = document.createElement('div');
    // holderDIV.style.border = '1px dotted rgb(255 191 0)';
    holderDIV.style.position = 'absolute';
    holderDIV.style.overflow = 'visible';
    holderDIV.style.display = 'flex';
    holderDIV.style.cursor = 'move';
    holderDIV.style.zIndex = 1;
    holderDIV.className = 'holderDIV';
    holderDIV.setAttribute('id', 'holderId');
    holderDIV.setAttribute('data-idD', 'INPUT_HOLDER');
    holderDIV.style.display = 'flex';
    holderDIV.style.flexDirection = 'column';

    holderDIV.style.width = measure.width;
    holderDIV.style.height = measure.height;
    holderDIV.style.left = measure.left;
    holderDIV.style.top = measure.top;


    //Putting resize button on holder

    const resizerTL = getResizer('top', 'left');
    const resizerTR = getResizer('top', 'right');
    const resizerBL = getResizer('bottom', 'left');
    const resizerBR = getResizer('bottom', 'right');
    const holderMenu = getHolderMenu(measure.auth_user);

    // const isTemplate = JSON.parse(document.getElementById('template'));
    // const currUser = JSON.parse(document.getElementById('curr_user'));

    // if (isTemplate) {
    //   holderDIV.style.border = '1px dotted rgb(255 191 0)';
    //              const resizerTL = getResizer('top', 'left');
    // const resizerTR = getResizer('top', 'right');
    // const resizerBL = getResizer('bottom', 'left');
    // const resizerBR = getResizer('bottom', 'right');



    holderDIV.onmousedown = holderDIV.addEventListener('mousedown', (event) => {
      dragElementOverPage(event)
    }, false);


    holderDIV.onresize = (evntt) => {
      console.log('Holder resized')
    }
    // }

    holderDIV.append(holderMenu);

    holderDIV.append(resizerTL, resizerTR, resizerBL, resizerBR);


    holderDIV.style.border = '2px solid gray';

    // if (!isTemplate) {
    //   if (currUser == measure.auth_user) {
    //     console.log("They are equal");
    //     console.log(measure.auth_user);
    //     console.log(currUser);

    //   }


    // }

    return holderDIV
  }





  // const onDrop = (event) => {
  //   event.preventDefault();
  //   const data = event.dataTransfer.getData("text/plain");


  //   if (data === "TEXT_INPUT") {
  //     console.log("text inputtt")

  //     const textInput = document.createElement("textarea");
  //     textInput.className = "textInput";
  //     textInput.placeholder = "Enter text here";
  //     textInput.style.width = "20%";
  //     textInput.style.height = "10%";
  //     textInput.style.resize = 'none';
  //     textInput.style.backgroundColor = '#0000';
  //     textInput.style.borderRadius = '0px';
  //     textInput.style.outline = '0px';
  //     textInput.style.overflow = 'overlay';











  //     document.getElementsByClassName("midSection_container").item(0).appendChild(textInput);
  //   }


  // }

  const onDrop = (event) => {
    event.preventDefault();
    console.log("drop");
    const typeOfOperation = event.dataTransfer.getData("text/plain");
    const curr_user = document.getElementById('current-user');

    const measure = {
      width: '300px',
      height: '50px',
      left: event.offsetX + 'px',
      top: event.offsetY + 'px',
      auth_user: curr_user
    }

    const holderDIV = getHolderDIV(measure);


    // inputField.setAttribute('draggable', false);
    let editButtonField = undefined;

    if (typeOfOperation === "TEXT_INPUT") {
      let inputField = document.createElement('textarea');
      //  inputField.setAttribute('draggable', true);
      inputField.className = "textInput";
      inputField.placeholder = "Enter text here";
      inputField.style.width = "100%";
      inputField.style.height = "100%";
      inputField.style.resize = 'none';
      inputField.style.zIndex = 2; 
      inputField.style.backgroundColor = '#0000';
      inputField.style.borderRadius = '0px';
      inputField.style.outline = '0px';
      inputField.style.overflow = 'overlay';
      inputField.style.position = 'relative';
      inputField.onclick = () => {
        handleClicked('align2')
        setSidebar(true);
      }
      holderDIV.append(inputField);
    }
    else if (typeOfOperation === "IMAGE_INPUT") {
      let imageField = document.createElement('div');
      imageField.className = "imageInput";
      imageField.style.width = "100%";
      imageField.style.height = "100%";
      imageField.style.backgroundColor = '#0000';
      imageField.style.borderRadius = '0px';
      imageField.style.outline = '0px';
      imageField.style.overflow = 'overlay';


      imageField.onclick = () => {
        handleClicked('image2')
        setSidebar(true);
      }
      const para = document.createElement("p");
      para.innerHTML = "Drag and drop image here";
      imageField.append(para);

      const imgBtn = document.createElement("input");
      imgBtn.type = "file";

      imgBtn.style.width = "100%";
      

      

      holderDIV.append(imageField);
      holderDIV.append(imgBtn);
    }
    else if (typeOfOperation === "TEXT_FILL") {
      let texttField = document.createElement('textarea');
      texttField.className = "textInput";
      texttField.placeholder = "input text here";
      texttField.style.width = "100%";
      texttField.style.height = "100%";
      texttField.style.resize = 'none';
      texttField.style.backgroundColor = '#0000';
      texttField.style.borderRadius = '0px';
      texttField.style.outline = '0px';
      texttField.style.overflow = 'overlay';
      holderDIV.append(texttField)
    }
    else if (typeOfOperation === "TABLE_INPUT") {
      let tableField = document.createElement('div');
      tableField.className = "tableInput";
      tableField.style.width = "100%";
      tableField.style.height = "100%";
      tableField.style.backgroundColor = '#0000';
      tableField.style.borderRadius = '0px';
      tableField.style.outline = '0px';
      tableField.style.overflow = 'overlay';
      tableField.onclick = () => {
        handleClicked('table2')
        setSidebar(true);
      }

      const para = document.createElement("p");
      para.innerHTML = "Table";
      tableField.append(para);
      holderDIV.append(tableField);
    }
    else if (typeOfOperation === "SIGN_INPUT") {
      let signField = document.createElement('div');
      signField.className = "signInput";
      signField.style.width = "100%";
      signField.style.height = "100%";
      signField.style.backgroundColor = '#0000';
      signField.style.borderRadius = '0px';
      signField.style.outline = '0px';
      signField.style.overflow = 'overlay';
      signField.onclick = () => {
        handleClicked('signs2')
        setSidebar(true);
      }

      const para = document.createElement("p");
      para.innerHTML = `${signState.trimmedDataURL ? <img src={signState.trimmedDataURL} alt="sig" />: 'Signs'}`
      signField.append(para);
      holderDIV.append(signField);
    }
    else if (typeOfOperation === "DATE_INPUT") {
      let dateField = document.createElement('div');
      dateField.className = "dateInput";
      dateField.style.width = "100%";
      dateField.style.height = "100%";
      dateField.style.backgroundColor = '#0000';
      dateField.style.borderRadius = '0px';
      dateField.style.outline = '0px';
      dateField.style.overflow = 'overlay';
      dateField.onclick = () => {
        handleClicked('calendar2')
        setSidebar(true);
      }
      dateField.innerText = `${startDate ? <div>${startDate.toLocaleDateString()}</div> : 'Date'}`;
     console.log(startDate);
      

      

      const para = document.createElement("p");
      para.innerText = `${startDate ? startDate.toLocaleDateString() : 'Date'}`;
    
      // dateField.append(para)
      holderDIV.append(dateField);
      console.log(para);
    }
    else if (typeOfOperation === "DROPDOWN_INPUT") {
      let dropdownField = document.createElement('div');
      dropdownField.className = "dropdownInput";
      dropdownField.style.width = "100%";
      dropdownField.style.height = "100%";
      dropdownField.style.backgroundColor = '#0000';
      dropdownField.style.borderRadius = '0px';
      dropdownField.style.outline = '0px';
      dropdownField.style.overflow = 'overlay';
      dropdownField.onclick = () => {
        handleClicked('dropdown2')
        setSidebar(true);
      }

      const para = document.createElement("p");
      para.innerHTML = "Dropdown";
      dropdownField.append(para);
      holderDIV.append(dropdownField);
    }


    document.getElementsByClassName("midSection_container").item(0).append(holderDIV);

  }



  return (

    <div className="midSection" >
      <Container as="div" ref={midSectionRef} className="midSection_container" onDragOver={dragOver}
        onDrop={onDrop}

      >


        {/* {isDropped.align && <TextBox /> && <TextBox />}
        {isDropped.textfill && <TextFill />}   */}
        {isDropped.image && <Image />}
        {isDropped.table && <Table />}
        {isDropped.signs && <Signs />}
        {isDropped.calendar && <Calender />}
        {isDropped.dropdown && <DropDown />}


      </Container>
    </div>

  );
}

export default MidSection;
