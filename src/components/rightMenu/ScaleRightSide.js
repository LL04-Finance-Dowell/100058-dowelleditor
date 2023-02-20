import React from 'react';
import { Button, Form } from 'react-bootstrap';

const ScaleRightSide = () => {
  return (
    <div>
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
        <Button variant="secondary" className="px-5 mt-3">
          Remove Scale
        </Button>
      </div>

      {/* iframe */}
    </div>
  );
};

export default ScaleRightSide;
// https://100035.pythonanywhere.com/api/nps_settings_create
