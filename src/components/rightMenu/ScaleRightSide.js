import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStateContext } from '../../contexts/contextProvider';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useSearchParams } from 'react-router-dom';

const ScaleRightSide = () => {
  const {
    sidebar,
    setIsLoading,
    scaleId,
    scaleData,
    data,
    item,
    isDropped,
    companyId,
    custom1,
    setCustom1,
    custom2,
    setCustom2,
    custom3,
    setCustom3,
  } = useStateContext();
  const [selectedElement, setSelectedElement] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  var decoded = jwt_decode(token);
  console.log(data, 'data');
  console.log(companyId);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'label':
        setCustom1(value);
        localStorage.setItem('inputValue1', e.target.value);
        break;
      case 'custom2':
        setCustom2(value);
        localStorage.setItem('inputValue2', e.target.value);
        break;
      case 'custom3':
        setCustom3(value);
        localStorage.setItem('inputValue3', e.target.value);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setCustom1(localStorage.getItem('inputValue1'));
    setCustom2(localStorage.getItem('inputValue2'));
    setCustom3(localStorage.getItem('inputValue3'));
  }, []);
  function sendMessage() {
    const message =
      decoded.details.action === 'document'
        ? 'Document saved'
        : 'Template saved';
    const iframe = document.querySelector('iframe');
    iframe?.contentWindow?.postMessage(message, '*');
  }
  function scaleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    Axios.post('https://100035.pythonanywhere.com/api/nps_custom_data/', {
      template_id: decoded.details._id,
      scale_id: scaleId,
      custom_input_groupings: {
        group1: {
          custom_input_1: custom1,
          custom_input_2: custom2,
          custom_input_3: custom3,
        },
      },
    })
      .then((res) => {
        if (res.status == 200) {
          setIsLoading(false);
          sendMessage();
          console.log(res, 'kk');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  function showIframe() {
    const divIframeRight = document.getElementById('iframeRight');
    const divSettingRight = document.getElementById('settingRight');
    divIframeRight.style.display = 'block';
    divSettingRight.style.display = 'none';
  }
  function showSetting() {
    const divIframeRight = document.getElementById('iframeRight');
    const divSettingRight = document.getElementById('settingRight');
    divIframeRight.style.display = 'none';
    divSettingRight.style.display = 'block';
  }

  const iframeSrc = `https://100035.pythonanywhere.com/nps-editor/settings/${scaleId}`;
  console.log(iframeSrc, 'iframeSrc');

  function removeScale() {
    const focusseddElmnt = document.querySelector('.focussedd');
    if (focusseddElmnt.classList.contains('holderDIV')) {
      document.querySelector('.focussedd').remove();
    }
  }
  const myArray = Object.values(data)[0];

  const handleSelect = (event) => {
    let selectField = document.getElementById('select');

    let selectedOption = selectField.options[selectField.selectedIndex];
    let selectedElementId = selectedOption.id;
    console.log(selectedElementId, 'selectedElementId');
    // const selectedElement = myArray.find(
    //   (element) => element.type === selectedTitle
    // );

    const selectedElements = myArray.find(
      (element) => element.id === selectedElementId
    );
    console.log(selectedElements, 'selectedElement');

    let divElement = document.getElementById(selectedElements.id);
    console.log(divElement.id, 'divElement');

    // divElement.style.border = '4px solid #f00 !important';
    divElement.parentElement.style.border = '2px solid green';
    divElement.focus();

    // if (selectedElementId === divElement.id) {
    //   divElement.style.border = '10px solid #f00 !important';
    //   divElement.style.backgroundColor = '#f00 !important';
    //   divElement.focus();
    // }
  };

  const options = myArray.map((element, index) => (
    <option key={index} value={element.type} id={element.id}>
      {`${element.type} ${element.id}`}
    </option>
  ));

  return (
    <>
      <div>
        <button id="updateScale" onClick={showIframe}>
          Update
        </button>
        <button id="setScale" onClick={showSetting}>
          Settings
        </button>
      </div>
      <div id="iframeRight">
        <h3>Update scale</h3>
        <div className="mb-4">
          <Form.Label>Scale Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Scale Type"
            // id="iframe_src"
            // onChange={handleChange}
          />
        </div>
        <div>
          <iframe
            style={{ border: 'solid 2px black', height: '400px' }}
            src={iframeSrc}
          ></iframe>
        </div>
      </div>
      <div id="settingRight" style={{ display: 'none' }}>
        <h3>Configurations</h3>
        {/* iframe */}
        <div>
          <Form.Label>Scale Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={`${decoded.details._id}_scl1`}
            disabled
            className="mb-4"
            // id="iframe_src"
            // onChange={handleChange}
          />

          <select
            onChange={handleSelect}
            id="select"
            // onChange={handleDateMethod}
            className="select border-0 bg-white rounded w-100 h-75 p-2"
          >
            <option value="select">Select Element</option>
            {options}
          </select>
        </div>
        <div>
          <Form.Label>Scale Label</Form.Label>
          <Form.Control
            type="text"
            placeholder="Scale Label"
            value={custom1}
            name="label"
            // id="iframe_src"
            onChange={handleChange}
          />
          <Form.Label>Custom Input 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Custom Input 2"
            value={custom2}
            name="custom2"
            // id="iframe_src"
            onChange={handleChange}
          />
          <Form.Label>Custom Input 3</Form.Label>
          <Form.Control
            type="text"
            placeholder="Custom Input 3"
            value={custom3}
            name="custom3"
            // id="iframe_src"
            onChange={handleChange}
          />
        </div>

        <div className="mt-2 text-center pt-5">
          <Button variant="primary" className="px-5" onClick={scaleSubmit}>
            Save
          </Button>
          <Button
            variant="secondary"
            className="px-5 remove_button"
            onClick={removeScale}
          >
            Remove Scale
          </Button>
        </div>

        {/* iframe */}
      </div>
    </>
  );
};

export default ScaleRightSide;
// https://100035.pythonanywhere.com/api/nps_settings_create
