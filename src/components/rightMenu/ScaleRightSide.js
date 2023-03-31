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

    companyId,
    custom1,
    setCustom1,
    custom2,
    setCustom2,
    custom3,
    setCustom3,
  } = useStateContext();
  // const [custom1, setCustom1] = useState('');
  // const [custom2, setCustom2] = useState('');
  // const [custom3, setCustom3] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  var decoded = jwt_decode(token);

  console.log(companyId);

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
  console.log(iframeSrc);

  function removeScale() {
    const focusseddElmnt = document.querySelector('.focussedd');
    if (focusseddElmnt.classList.contains('holderDIV')) {
      document.querySelector('.focussedd').remove();
    }
  }

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
          <Form.Label>Scale Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Scale Type"
            // id="iframe_src"
            // onChange={handleChange}
          />
          {/* <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="Color"
            // id="iframe_src"
            // onChange={handleChange}
          />
          <Form.Label>Orientation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Orientation"
            // id="iframe_src"
            // onChange={handleChange}
          />
          <Form.Label>Time</Form.Label>

          <Form.Control
            type="number"
            placeholder="Time"
            min="1"
            // id="iframe_width"
            className="shadow bg-white rounded mb-4"
          /> */}
        </div>
        <div>
          <Form.Label>Custom Input 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Custom Input 1"
            value={custom1}
            // id="iframe_src"
            onChange={(e) => setCustom1(e.target.value)}
          />
          <Form.Label>Custom Input 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Custom Input 2"
            value={custom2}
            // id="iframe_src"
            onChange={(e) => setCustom2(e.target.value)}
          />
          <Form.Label>Custom Input 3</Form.Label>
          <Form.Control
            type="text"
            placeholder="Custom Input 3"
            value={custom3}
            // id="iframe_src"
            onChange={(e) => setCustom3(e.target.value)}
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
