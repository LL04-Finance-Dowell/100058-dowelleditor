import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import './Header.css';
import { headerData } from '../../data/data';
import user from '../../assets/headerIcons/user.png';
import { FaCopy } from 'react-icons/fa';
import { BiImport, BiExport } from 'react-icons/bi';
import CryptoJS from 'crypto-js';

import { useStateContext } from '../../contexts/contextProvider';
import Axios from 'axios';
import { CgPlayListRemove } from 'react-icons/cg';
import {
  MdOutlinePostAdd,
  MdSignalCellular0Bar,
  MdOutlineFlipCameraAndroid,
} from 'react-icons/md';

import { useSearchParams } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { current } from '@reduxjs/toolkit';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const {
    item,
    setItem,
    setIsLoading,
    isFlipClicked,
    setIsFlipClicked,
    fetchedData,
    setFetchedData,
    deletePages,
    setDeletepages,
    title,
    setTitle,
    setData,
    setIsDataRetrieved,
  } = useStateContext();
  //   //console.log(headerData);

  const handleUndo = () => {
    document.execCommand('undo');
  };
  const handleRedo = () => {
    document.execCommand('redo');
  };
  const handleCut = () => {
    document.querySelector('.focussedd').remove();
  };
  const handleCopy = () => {
    document.execCommand('copy');
  };
  let createPageNumber = item[item.length - 1].split('_')[1];
  function createNewPage() {
    createPageNumber++;
    const current = [...item];
    current.push(`div_${createPageNumber}`);
    //console.log("create page click", current);
    setItem(current);
    //console.log("create page click after", current);
  }

  function removePage() {
    const current = [...item];

    var pageNumber = prompt('Enter the number of page to delete');
    if (pageNumber != null) {
      const index = pageNumber - 1;
      const page = document.getElementsByClassName('midSection_container')[
        index
      ];

      //console.log(page);
      // page.innerHTML = "";
      if (index > 0 && index < item?.length) {
        //remove item from the basket
        // //console.log("fetchedData", fetchedData, "nameofpage", pageNumber);
        // delete fetchedData[pageNumber];
        // //console.log("after fetchedData", fetchedData);
        // const currentPges = [...deletePages];
        // currentPges.push(pageNumber);
        // setDeletepages(currentPges);
        // //console.log("deletePages", deletePages);
        // setFetchedData(fetchedData);

        // let allPageElement = document.getElementsByClassName(
        //   `page${pageNumber}`
        // );
        // let elementLength = allPageElement?.length;
        // for (let i = 0; i < elementLength; i++) {
        //   allPageElement[0].remove();
        // }
        // //console.log("allPageElement", allPageElement, current.splice(index, 1));
        // current.splice(index, 1);

        page.parentElement.remove();
        item.pop();
        // setItem(item);
      } else {
        console.warn(`Cant remove page`);
      }
    }
  }

  // Adding a new branch comment

  function getPosition(el) {
    // const rect = el[0].getBoundingClientRect();
    // //console.log(el);
    const midSec = document.getElementById('midSection_container');

    const rect = el.getBoundingClientRect();
    const midsectionRect = midSec.getBoundingClientRect();

    // "[[{"width":584.1484375,"height":170.9921875,"top":90.9921875,"left":384.1484375,"type":"TEXT_INPUT","data":"left test text","id":"editTextBox 1"},{"width":1177.1484375,"height":169.9921875,"top":89.9921875,"left":977.1484375,"type":"TEXT_INPUT","data":"right test text","id":"editTextBox 2"}]]"

    //     {width: 584.1484375, height: 170.9921875, top: 90.9921875, left: 384.1484375, type: 'TEXT_INPUT', …}
    // {width: 1177.1484375, height: 169.9921875, top: 89.9921875, left: 977.1484375, type: 'TEXT_INPUT', …}

    return {
      top: rect.top - midsectionRect.top,
      left: rect.left - midsectionRect.left,
      bottom: rect.bottom,
      right: rect.right,
      width: rect.width,
      height: rect.height,
    };
  }

  let contentFile = [];
  let page = [{}];

  for (let i = 1; i <= item?.length; i++) {
    const element = { [i]: [] };
    page[0] = { ...page[0], ...element };
  }

  const dataInsertWithPage = (tempPosn, elem) => {
    let low = 0;
    let high = 1122;
    for (let i = 1; i <= item?.length; i++) {
      if (tempPosn.top >= low && tempPosn.top < high) {
        page[0][i].push(elem);
      }
      low += 1122;
      high += 1122;
    }
  };
  function savingTableData() {
    const tables = document.getElementsByClassName('tableInput');
    let tables_tags = [];

    if (tables.length) {
      for (let t = 0; t < tables.length; t++) {
        var new_table = document.getElementsByTagName('table')[0];
        //console.log("New Table");
        //console.log(new_table);
        tables_tags.push(new_table);
        //console.log("table_tags");
        //console.log(tables_tags);
      }
    }
  }

  // let url = "https://100058.pythonanywhere.com/api/save-data-into-collection/";
  // https://100058.pythonanywhere.com/api/post-data-into-collection/
  let elem = {};
  function saveDocument() {
    const txt = document.getElementsByClassName('textInput');
    if (txt.length) {
      if (txt[0].parentElement.classList.contains('holderDIV')) {
        for (let h = 0; h < txt.length; h++) {
          let tempElem = txt[h].parentElement;
          let tempPosn = getPosition(tempElem);
          //console.log(txt[h].parentElement.style.top);
          //console.log(txt[h].innerText);
          //console.log(txt[h].innerHTML);
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: txt[h].parentElement.style.top,
            left: tempPosn.left,
            type: 'TEXT_INPUT',
            data: txt[h].innerText,
            raw_data: txt[h].innerHTML,
            id: `t${h + 1}`,
          };
          dataInsertWithPage(tempPosn, elem);

          // page.push(elem);
        }
      }
    }

    const img_input = document.getElementsByTagName('input');
    const img = document.getElementsByClassName('imageInput');
    if (img) {
      //console.log("Image_input", img_input[0]);
      // if (img_input[0].type === "file") {
      for (let h = 0; h < img.length; h++) {
        const reader = new FileReader();
        let tempElem = img[h].parentElement;
        let tempPosn = getPosition(tempElem);
        elem = {
          width: tempPosn.width,
          height: tempPosn.height,
          top: tempPosn.top,
          topp: img[h].parentElement.style.top,
          left: tempPosn.left,
          type: 'IMAGE_INPUT',
          data: img[h].style.backgroundImage,
          id: `i${h + 1}`,
        };
        dataInsertWithPage(tempPosn, elem);

        // page.push(elem);
      }
      // }
    }

    const date = document.getElementsByClassName('dateInput');
    if (date.length) {
      for (let h = 0; h < date.length; h++) {
        let tempElem = date[h].parentElement;
        let tempPosn = getPosition(tempElem);
        elem = {
          width: tempPosn.width,
          height: tempPosn.height,
          top: tempPosn.top,
          topp: date[h].parentElement.style.top,
          left: tempPosn.left,
          type: 'DATE_INPUT',
          data: date[h].innerHTML,
          id: `d${h + 1}`,
        };
        dataInsertWithPage(tempPosn, elem);
      }
    }

    const sign = document.getElementsByClassName('signInput');
    if (sign.length) {
      for (let h = 0; h < sign.length; h++) {
        let tempElem = sign[h].parentElement;
        let tempPosn = getPosition(tempElem);
        //console.log(sign[h].innerHTML);
        //console.log(sign[h].firstElementChild);
        elem = {
          width: tempPosn.width,
          height: tempPosn.height,
          top: tempPosn.top,
          topp: sign[h].parentElement.style.top,
          left: tempPosn.left,
          type: 'SIGN_INPUT',
          data:
            sign[h].firstElementChild === null
              ? // decoded.details.action === "document"
                sign[h].innerHTML
              : sign[h].firstElementChild.src,
          id: `s${h + 1}`,
        };
        dataInsertWithPage(tempPosn, elem);

        // page.push(elem);
      }
    }

    const tables = document.getElementsByClassName('tableInput');

    if (tables.length) {
      for (let t = 0; t < tables.length; t++) {
        // var new_table = document.getElementsByTagName("table")[0];
        let tempElem = tables[t].parentElement;
        let tempPosn = getPosition(tempElem);
        //console.log(tables[t].firstElementChild.innerHTML);
        elem = {
          width: tempPosn.width,
          height: tempPosn.height,
          top: tempPosn.top,
          topp: tables[t].parentElement.style.top,
          left: tempPosn.left,
          type: 'TABLE_INPUT',
          data: tables[t].firstElementChild.innerHTML,
          id: `tab${t + 1}`,
        };
        dataInsertWithPage(tempPosn, elem);

        // page.push(elem);
      }
    }
    const iframes = document.getElementsByClassName('iframeInput');

    if (iframes.length) {
      for (let i = 0; i < iframes.length; i++) {
        // var new_table = document.getElementsByTagName("table")[0];
        let tempElem = iframes[i].parentElement;
        let tempPosn = getPosition(tempElem);
        //console.log(iframes[i].innerText);
        elem = {
          width: tempPosn.width,
          height: tempPosn.height,
          top: tempPosn.top,
          topp: iframes[i].parentElement.style.top,
          left: tempPosn.left,
          type: 'IFRAME_INPUT',
          data: iframes[i].innerText
            ? 'iFrame here'
            : iframes[i].firstElementChild.src,
          id: `ifr${i + 1}`,
        };
        dataInsertWithPage(tempPosn, elem);

        // page.push(elem);
      }
    }
    const dropDowns = document.getElementsByClassName('dropdownInput');

    if (dropDowns.length) {
      for (let d = 0; d < dropDowns.length; d++) {
        // var new_table = document.getElementsByTagName("table")[0];
        let tempElem = dropDowns[d].parentElement;
        let tempPosn = getPosition(tempElem);
        //console.log(dropDowns[d].firstElementChild.innerHTML);
        //console.log(dropDowns[d].lastElementChild.innerHTML);
        elem = {
          width: tempPosn.width,
          height: tempPosn.height,
          top: tempPosn.top,
          topp: dropDowns[d].parentElement.style.top,
          left: tempPosn.left,
          type: 'DROPDOWN_INPUT',
          data1: dropDowns[d].firstElementChild.innerHTML,
          data2: dropDowns[d].lastElementChild.innerHTML,
          id: `dd${d + 1}`,
        };
        dataInsertWithPage(tempPosn, elem);

        // page.push(elem);
      }
    }

    contentFile.push(page);
    const data = JSON.stringify(contentFile);
    // //console.log("ContentFile While saveDoc", data);

    return contentFile;
  }

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  var decoded = jwt_decode(token);
  const actionName = decoded?.details?.action;
  //console.log("In header.js", decoded);

  function submit(e) {
    e.preventDefault();
    setIsLoading(true);
    const dataa = saveDocument();

    const titleName = document.querySelector('.title-name').innerHTML;

    const field = {
      _id: decoded.details._id,
    };
    let updateField = {};
    if (decoded.details.action === 'template') {
      updateField = {
        template_name: titleName,
        content: JSON.stringify(dataa),
        page: item,
      };
    } else if (decoded.details.action === 'document') {
      updateField = {
        document_name: titleName,
        content: JSON.stringify(dataa),
        page: item,
      };
    }

    //console.log(updateField);
    //console.log(field);

    <iframe src="http://localhost:5500/"></iframe>;

    function sendMessage() {
      const message =
        decoded.details.action === 'document'
          ? 'Document saved'
          : 'Template saved';
      const iframe = document.querySelector('iframe');
      iframe?.contentWindow?.postMessage(message, '*');
    }

    Axios.post(
      'https://100058.pythonanywhere.com/api/save-data-into-collection/',
      {
        cluster: decoded.details.cluster,
        collection: decoded.details.collection,
        command: decoded.details.command,
        database: decoded.details.database,
        document: decoded.details.document,
        field: field,
        function_ID: decoded.details.function_ID,
        team_member_ID: decoded.details.team_member_ID,
        update_field: updateField,
        page: item,
      }
    )
      .then((res) => {
        if (res.status == 200) {
          setIsLoading(false);
          // alert("Data saved successfully");
          toast.success('Saved successfully');
          sendMessage();
        }
        //console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        //console.log(err);
      });
  }

  const handleFlipClick = (e) => {
    setIsFlipClicked(!isFlipClicked);
  };

  // token creation code
  function base64url(source) {
    // Encode in classical base64
    var encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
  }

  var header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  var encodedHeader = base64url(stringifiedHeader);

  var dataa = {
    document_id: decoded.details._id,
    action: actionName,
  };

  var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(dataa));
  var encodedData = base64url(stringifiedData);

  var exportToken = encodedHeader + '.' + encodedData;
  console.log('test token', exportToken);
  // token creation end

  const getPostData = async () => {
    const response = await Axios.post(
      'https://100058.pythonanywhere.com/api/get-data-from-collection/',
      {
        document_id: decoded.details._id,
        action: decoded.details.action,
      }
    )
      .then((res) => {
        // Handling title
        const loadedDataT = res.data;
        console.log(res);

        if (decoded.details.action === 'template') {
          setTitle(loadedDataT.template_name);
        } else if (decoded.details.action === 'document') {
          setTitle(loadedDataT.document_name);
        }

        //Handling content
        const loadedData = JSON.parse(res.data.content);
        const pageData = res.data.page;
        setItem(pageData);
        console.log(loadedData);
        console.log(loadedData[0][0]);
        setData(loadedData[0][0]);
        setIsDataRetrieved(true);
        // setSort(loadedData[0][0]);
        setIsLoading(false);
        setFetchedData(loadedData[0][0]);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getPostData();
  }, []);

  // copy text function

  function copyText() {
    let div = document.querySelector('.token_text');
    let text = div.innerText;
    let textArea = document.createElement('textarea');
    textArea.width = '1px';
    textArea.height = '1px';
    textArea.background = 'transparents';
    textArea.value = text;
    document.body.append(textArea);
    textArea.select();
    document.execCommand('copy'); //No i18n
    document.body.removeChild(textArea);
    toast('Text coppied', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
  // copy text function end

  function handleToken() {
    setData([]);
    setIsLoading(true);
    var tokenn = prompt('Paste your token here');
    if (tokenn != null) {
      const decodedTok = jwt_decode(tokenn);
      console.log('tokkkkkkennn', tokenn);
      const getPostData = async () => {
        const response = await Axios.post(
          'https://100058.pythonanywhere.com/api/get-data-from-collection/',
          {
            document_id: decodedTok.document_id,
            action: decodedTok.action,
          }
        )
          .then((res) => {
            // Handling title
            const loadedDataT = res.data;
            console.log(res);

            if (decoded.details.action === 'template') {
              setTitle('Untitle-File');
            } else if (decoded.details.action === 'document') {
              setTitle('Untitle-File');
            }

            //Handling content
            const loadedData = JSON.parse(res.data.content);
            const pageData = res.data.page;
            setItem(pageData);
            console.log(loadedData);
            console.log(loadedData[0][0]);
            setData(loadedData[0][0]);
            setIsDataRetrieved(true);
            // setSort(loadedData[0][0]);
            setIsLoading(false);
            setFetchedData(loadedData[0][0]);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      };
      getPostData();
    }
  }

  console.log('page count check', item);

  return (
    <div
      className={`header ${
        actionName == 'template' ? 'header_bg_template' : 'header_bg_document'
      }`}
    >
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-start lhs-header">
            <div className="header_btn">
              <Button
                variant="primary"
                size="md"
                className="rounded "
                id="saving-button"
                onClick={submit}
              >
                Save
              </Button>
              {/* {actionName == "template" && (
                <>
                  <Button
                    variant="success"
                    size="md"
                    className="rounded "
                    id="saving-button"
                    onClick={() => alert("Finilize Clicked")}
                  >
                    Finalize
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    className="rounded "
                    id="saving-button"
                    onClick={() => alert("Rejcet Clicked")}
                  >
                    Reject
                  </Button>
                </>
              )} */}
            </div>
            <div className="header_icons">
              <img onClick={handleUndo} src={headerData[0].icon} alt="" />
              <img onClick={handleRedo} src={headerData[1].icon} alt="" />
              <img onClick={handleCut} src={headerData[2].icon} alt="" />
              <img onClick={handleCopy} src={headerData[3].icon} alt="" />
              <img onClick={() => {}} src={headerData[4].icon} alt="" />
              <img onClick={() => {}} src={headerData[5].icon} alt="" />

              {actionName == 'template' && (
                <button className="page_btn" onClick={() => createNewPage()}>
                  <MdOutlinePostAdd color="white" size={32} />
                </button>
              )}
              {actionName == 'template' && (
                <CgPlayListRemove
                  color="white"
                  size={32}
                  onClick={() => removePage()}
                />
              )}
              <div className="d-flex">
                <BiImport
                  color="white"
                  size={32}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                />

                <BiExport
                  color="white"
                  size={32}
                  id="saving-button"
                  onClick={handleToken}
                />
              </div>
              {/* {headerData.map((item, index) => {
                return <img src={item.icon} alt="icon" key={index} />;
              })} */}
            </div>
          </Col>

          <Col className="d-flex justify-content-center  header_p text-center">
            {/* <div style={{ color: "white", fontSize: 30 }}>Title</div> */}
            <div
              className="title-name"
              contentEditable={true}
              style={{ color: 'white', fontSize: 20 }}
              spellCheck="false"
            >
              {/* {(decoded.details.action == "template") ? ((data.data.template_name == "") ? ("Untitled-File"): (data.data.template_name) )
               : ((data.data.document_name == "") ? ("Untitled-File"): (data.data.document_name))} */}
              {title && title}
            </div>
          </Col>
          <Col>
            <div className="right_header">
              <div className="mt-1 text-center p-2">
                {/* <button
                  type="button"
                  class="btn btn-warning rounded px-5"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Export
                </button> */}

                {/* <!-- Modal --> */}
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Token
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body token_text">{exportToken}</div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={copyText}
                          type="button"
                          data-bs-dismiss="modal"
                          class="copyBtn"
                        >
                          <FaCopy color="gray" size={32} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="mt-1 text-center p-2 head_btn">
                <Button
                  variant="primary"
                  size="md"
                  className="btn rounded px-5"
                  id="saving-button"
                  onClick={handleToken}
                >
                  Import
                </Button>
              </div> */}
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-end header_user">
            <ToastContainer size={5} />
            <span className="badge bg-warning">
              {actionName == 'template' ? 'Template' : 'Document'}
            </span>
            {/* <MdOutlineFlipCameraAndroid
              className="ms-2 cursor_pointer"
              color="white"
              size={32}
              onClick={handleFlipClick}
            /> */}
            {/* <img src={user} alt="" /> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
