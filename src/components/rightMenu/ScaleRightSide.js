import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStateContext } from '../../contexts/contextProvider';

const ScaleRightSide = () => {
  const { sidebar, scaleId, companyId } = useStateContext();

  console.log(companyId);

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
          <Form.Label>Color</Form.Label>
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
          />
        </div>
        <div>
          <Form.Label>Custom Input 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Custom Input 1"
            // id="iframe_src"
            // onChange={handleChange}
          />
          <Form.Label>Custom Input 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Custom Input 2"
            // id="iframe_src"
            // onChange={handleChange}
          />
          <Form.Label>Custom Input 3</Form.Label>
          <Form.Control
            type="text"
            placeholder="Custom Input 3"
            // id="iframe_src"
            // onChange={handleChange}
          />
        </div>

        <div className="mt-2 text-center pt-5">
          <Button variant="primary" className="px-5">
            Save
          </Button>
          <Button variant="secondary" className="px-5 remove_button">
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
