import React, { useEffect, useRef, useState } from "react";

import { useSearchParams } from 'react-router-dom';


import FileBase from 'react-file-base64';

import { Container } from "react-bootstrap";

import "./MidSection.css";


import { dragOver } from "../leftMenu/LeftMenu";
import TextBox from "../leftMenu/comp/TextBox";
import { useStateContext } from "../../contexts/contextProvider";


import Image from "../leftMenu/comp/Image";
import Table from "../leftMenu/comp/Table";
import Signs from "../leftMenu/comp/Signs";
import Calender from "../leftMenu/comp/Calender";
import DropDown from "../leftMenu/comp/DropDown";
import TextFill from "../leftMenu/comp/TextFill";
import Axios from "axios";


const dummyData = {
  "normal": {
    "is_error": false,
    "data": [
      [
        {
          "_id": "61e50b063623fc65b472e6eb",
          "title": "Livinglab did not create wonderful applications.",
          "paragraph": "When you\u2019re programming in Python, , your data will be structured as a float.\r\n\r\nThis is important we will focus on two of these data types: strings and numbers.",
          "source": "https://careerkarma.com/blog/python-string-to-int/#:~:text=To%20convert%20a%20string%20to,as%20an%20int%20%2C%20or%20integer.",
          "subject": "Livinglab",
          "dowelltime": "32941222",
          "edited": 0,
          "eventId": "FB1010000000016424005125815918"
        }
      ]
    ],
    "sampling_status": false,
    "sampling_status_text": "Not expected"
  }
}

// const MidSection = ({showSidebar}) => {
const MidSection = () => {
  const { isDropped, setIsClicked, setSidebar, handleClicked, startDate, signState, bold, italic, underline, strikethrough } = useStateContext();

  function boldCommand() {
    const strongElement = document.createElement("strong");
    const userSelection = window.getSelection();
    const selectedTextRange = userSelection.getRangeAt(0);
    selectedTextRange.surroundContents(strongElement);
  }


  const midSectionRef = useRef(null);

  const getDate = () => {
    let Date = startDate.toLocaleDateString()
    return (
      Date
    )
  }


  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (event.target === midSectionRef.current) {
        setSidebar(false);
        setIsClicked(false);
      }
    })
  }, []);

  const [postData, setPostData] = useState([])
  //   editTextField: { value: "", xcoordinate: "", ycoordinate: "" }
  //   , textField: { value: "", xcoordinate: 0, ycoordinate: 0 },
  //   imageField: { value: "", xcoordinate: 0, ycoordinate: 0 },
  //   tableField: { value: "4", xcoordinate: 0, ycoordinate: 0 },
  //   signField: { value: "", xcoordinate: 0, ycoordinate: 0 },
  //   calenderField: { value: "", xcoordinate: 0, ycoordinate: 0 },
  //   dropdownField: { value: "", xcoordinate: 0, ycoordinate: 0 },
  // });





  const [searchParams] = useSearchParams();

  const d_name = searchParams.get('d_name');
  const col_name = searchParams.get('col_name');
  const id = searchParams.get('id');
  const fields = searchParams.get('fields');



  const [data, setData] = useState([]);
  const getPostData = async () => {
    const response = await Axios.post("https://100058.pythonanywhere.com/api/get-data-by-collection/", {
      database: d_name,
      collection: col_name,
      fields: fields,
      id: id
    })
      .then(res => {
        setData(res.data);
      }).catch(err => {
        console.log(err);
      }
      );
  }
  getPostData();


  // console.log(data);
  // console.log(JSON.stringify(postData));


  useEffect(() => {
    if (data.title !== undefined) {
      console.log(data);
      onPost()
      onParagraphPost()
    } else {
      console.log('loading data');
    }

  }, [data.title])








  let resizing = false;
  let contentFile = [];

  // const isTemplate = JSON.parse(document.getElementById('template'));



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

    if (!resizing) {
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
        } else if (tempTarget.classList.contains("textInput")) {
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
        holder.style.top = (holderPos.top + diffY) + 'px';
        holder.style.left = (holderPos.left + diffX) + 'px';

      }

      window.addEventListener('mouseup', stopMove);
      function stopMove(ev) {
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





  const onPost = () => {
    const curr_user = document.getElementById('curr_user');

    const measure = {
      width: '300px',
      height: '50px',
      auth_user: curr_user
    }

    const holderDIV = getHolderDIV(measure);

    let inputField = document.createElement('div');
    inputField.setAttribute('contenteditable', true)
    //  inputField.setAttribute('draggable', true);
    inputField.className = "textInput";
    inputField.style.width = "100%";
    inputField.style.height = "100%";
    inputField.style.resize = 'none';
    inputField.style.zIndex = 2;
    inputField.style.backgroundColor = '#0000';
    inputField.style.borderRadius = '0px';
    inputField.style.outline = '0px';
    inputField.style.overflow = 'overlay';
    inputField.style.position = 'relative';
    inputField.style.cursor = 'text'
    inputField.onclick = () => {
      handleClicked('align2')
      setSidebar(true);
    }



    inputField.innerText = `${data.title}`;
    // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

    holderDIV.append(inputField);
    // holderDIV.append(paragraphField);

    document.getElementsByClassName("midSection_container").item(0).append(holderDIV);

  }


  const onParagraphPost = () => {
    const curr_user = document.getElementById('curr_user');

    const measure = {
      width: '300px',
      height: '100px',
      top: '100px',
      auth_user: curr_user
    }

    const holderDIV = getHolderDIV(measure);

    let paragraphField = document.createElement('div');
    //  inputField.setAttribute('draggable', true);
    paragraphField.setAttribute('contenteditable', true)
    paragraphField.className = "textInput";
    paragraphField.style.width = "100%";
    paragraphField.style.height = "100%";
    paragraphField.style.resize = 'none';
    paragraphField.style.zIndex = 3;
    paragraphField.style.backgroundColor = '#0000';
    paragraphField.style.borderRadius = '0px';
    paragraphField.style.outline = '0px';
    paragraphField.style.overflow = 'overlay';
    paragraphField.style.position = 'relative';
    paragraphField.style.cursor = 'text'
    paragraphField.onclick = () => {
      handleClicked('align2')
      setSidebar(true);
    }



    paragraphField.innerText = `${data.paragraph}`;
    // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

    holderDIV.append(paragraphField);

    document.getElementsByClassName("midSection_container").item(0).append(holderDIV);
  }






  function getOffset(el) {
    const parent = document.getElementsByClassName('midSection_container');
    const parentPos = parent[0].getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top - parentPos.top,
      left: rect.left - parentPos.left,
      bottom: rect.bottom - parentPos.top,
      right: rect.right - parentPos.left
      // left: rect.left + window.scrollX,
      // top: rect.top + window.scrollY
    };
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





  const onDrop = (event) => {
    event.preventDefault();
    console.log("drop");
    const typeOfOperation = event.dataTransfer.getData("text/plain");
    const curr_user = document.getElementById('current-user');


    const measure = {
      width: '200px',
      height: '60px',
      left: event.clientX - 350 + 'px',
      top: event.clientY - 150 + 'px',
      auth_user: curr_user
    }

    const holderDIV = getHolderDIV(measure);


    // inputField.setAttribute('draggable', false);
    // let editButtonField = undefined;

    if (typeOfOperation === "TEXT_INPUT") {

      let inputField = document.createElement('div');
      //  inputField.setAttribute('draggable', true);
      inputField.setAttribute('contenteditable', true)
      inputField.className = "textInput";
      inputField.innerHTML = 'Enter text here'
      inputField.style.width = "100%";
      inputField.style.height = "100%";
      inputField.style.resize = 'none';
      inputField.style.backgroundColor = '#0000';
      inputField.style.borderRadius = '0px';
      inputField.style.outline = '0px';
      inputField.style.overflow = 'overlay';
      inputField.style.position = 'relative';
      inputField.style.cursor = 'text'

      // inputField.innerText = `${postData.editTextField.value}`

      // inputField.onchange = (event) => {
      //   event.preventDefault();
      if (inputField.innerHTML[0]) {
        const editTextField = {
          editTextField: {
            value: inputField.innerHTML,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top
          }

        };


        postData.push(editTextField);
        // setPostData({
        //   ...postData,
        //   editTextField: { value: event.target.value, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        // })

      }


      if (inputField.value !== "") {

        // setPostData({
        //   ...postData,
        //   editTextField: { value: inputField.value, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        // })
      }

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
      // imageField.innerHTML = `<img src="${postData.imageField.value}" alt="">`;
      imageField.style.position = 'relative';



      imageField.onclick = () => {
        handleClicked('image2')
        setSidebar(true);
      }


      // const para = document.createElement("p");
      // para.innerHTML = "Drag and drop image here";
      // imageField.append(para);

      const imgBtn = document.createElement("input");
      imgBtn.type = "file";
      imgBtn.style.objectFit = 'cover';
      var uploadedImage = "";

      imgBtn.addEventListener('input', () => {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          uploadedImage = reader.result;
          imageField.style.backgroundImage = `url(${uploadedImage})`;
        })
        reader.readAsDataURL(imgBtn.files[0]);
        if (imgBtn.files[0]) {
          const imageField = {
            imageField: {
              value: uploadedImage,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top
            }
          };

          postData.push(imageField);
          // setPostData({
          //   ...postData,
          //   imageField: { value: uploadedImage, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
          // })
        }
        console.log(uploadedImage);
      })


      // imgBtn.style.width = "100%";

      holderDIV.append(imageField);
      holderDIV.append(imgBtn);
    }
    else if (typeOfOperation === "TEXT_FILL") {
      let texttField = document.createElement('textarea');
      texttField.className = "texttInput";
      texttField.placeholder = "input text here";
      texttField.style.width = "100%";
      texttField.style.height = "100%";
      texttField.style.resize = 'none';
      texttField.style.backgroundColor = '#0000';
      texttField.style.borderRadius = '0px';
      texttField.style.outline = '0px';
      texttField.style.overflow = 'overlay';
      // texttField.innerText = `${postData.textField.value}`
      texttField.style.position = 'relative';

      texttField.onchange = (event) => {
        event.preventDefault();
        const textField = {
          textField: {
            value: event.target.value,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top
          }
        };

        postData.push(textField);
        // setPostData({
        //   ...postData,
        //   textField: { value: event.target.value, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        // })
      }


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
      // tableField.innerHTML = `<table><tr><td>${postData.tableField.value}</td></tr></table>`;
      tableField.style.position = 'absolute';

      tableField.onchange = (event) => {
        event.preventDefault();

        setPostData({
          ...postData,
          tableField: { value: event.target.value, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        })
      }

      if (tableField) {
        const tableField = {
          tableField: {
            value: event.target.value,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top
          }
        };

        postData.push(tableField);
        // setPostData({
        //   ...postData,
        //   tableField: { value: tableField.innerHTML, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        // })
      }

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
      // signField.innerHTML = `<img src="${postData.signField.value}" alt="">`;
      signField.style.position = 'absolute';

      signField.onchange = (event) => {
        event.preventDefault();
        setPostData({
          ...postData,
          signField: { value: event.target.value, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        })
      }

      if (signField) {
        const signField = {
          signField: {
            value: event.target.value,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top
          }
        };

        postData.push(signField);
        // setPostData({
        //   ...postData,
        //   signField: { value: signField.innerHTML, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        // })
      }

      signField.onclick = () => {
        handleClicked('signs2')
        setSidebar(true);
      }

      const para = document.createElement("p");
      para.innerHTML = `${signState.trimmedDataURL ? <img src={signState.trimmedDataURL} alt="sig" /> : 'Signs'}`
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
      // dateField.innerText = `${postData.calenderField.value}`
      dateField.style.position = 'absolute';

      dateField.onchange = (event) => {
        event.preventDefault();
        setPostData({
          ...postData,
          calenderField: { value: event.target.value, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        })
      }

      if (dateField) {
        const dateField = {
          dateField: {
            value: event.target.value,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top
          }
        };

        // postData.push(dateField);
        // setPostData({
        //   ...postData,
        //   calenderField: { value: dateField.innerHTML, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        // })
      }

      dateField.onclick = () => {
        handleClicked('calendar2')
        setSidebar(true);
      }
      dateField.innerText = 'Date';



      console.log(startDate);
      const para = document.createElement("p");


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
      // dropdownField.innerHTML = `<select><option>${postData.dropdownField.value}</option></select>`;
      dropdownField.style.position = 'absolute';

      dropdownField.onchange = (event) => {
        event.preventDefault();
        setPostData({
          ...postData,
          dropdownField: { value: event.target.value, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        })
      }

      if (dropdownField) {
        const dropdownField = {
          dropdownField: {
            value: event.target.value,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top
          }
        };

        postData.push(dropdownField);
        // setPostData({
        //   ...postData,
        //   dropdownField: { value: dropdownField.innerHTML, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        // })
      }

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

    contentFile = [];
    let page = [];

    let elem = {}
  function saveDocument() {


    const txt = document.getElementsByClassName("textInput");
    if (txt.length) {
      if (txt[0].parentElement.classList.contains("holderDIV")) {
        elem = {
          width: getPosition(txt).right,
          height: getPosition(txt).bottom,
          top: getPosition(txt).top,
          left: getPosition(txt).left,
          type: 'TEXT_INPUT',
          data: txt[0].innerHTML,

        }
        page.push(elem)
      }
    }


      const img_input = document.getElementsByTagName("input");
      if (img_input.length) {
        console.log('Image_input', img_input[0])
        if (img_input[0].type === 'file') {
          elem = {
            width: getPosition(img_input).right,
            height: getPosition(img_input).bottom,
            top: getPosition(img_input).top,
            left: getPosition(img_input).left,
            type: 'IMAGE_INPUT',
            data: img_input[0].value,

          }
          page.push(elem)
        }
      }

      const text2 = document.getElementsByClassName("texttInput");

      if (text2.length) {
        if (text2[0].parentElement.classList.contains("holderDIV")) {
          elem = {
            width: getPosition(text2).right,
            height: getPosition(text2).bottom,
            top: getPosition(text2).top,
            left: getPosition(text2).left,
            type: 'TEXT_FILL',
            data: text2[0].value,

          }
          page.push(elem)
        }
      }

      const date = document.getElementsByClassName("dateInput");
      if (date.length) {
        elem = {
          width: getPosition(date).right,
          height: getPosition(date).bottom,
          top: getPosition(date).top,
          left: getPosition(date).left,
          type: 'DATE_INPUT',
          data: date[0].innerHTML,

        }
        page.push(elem)
      }


    

    



    contentFile.push(page)
    console.log("ContentFile While saveDoc", contentFile);

    return contentFile

  }




  return (

    <div className="midSection" >
      <Container as="div" ref={midSectionRef} className="midSection_container" onDragOver={dragOver}
        onDrop={onDrop}

      >
        {/* <button onClick={saveDocument}>
          Save
        </button> */}
        {/* {isDropped.align && <TextBox />}  */}
        {/* {isDropped.textfill && <TextFill />}   
        {isDropped.image && <Image />}
        {isDropped.table && <Table />}
        {isDropped.signs && <Signs />}
        {isDropped.calendar && <Calender />}
        {isDropped.dropdown && <DropDown />}  */}


      </Container>
    </div>

  );
}

export default MidSection;
