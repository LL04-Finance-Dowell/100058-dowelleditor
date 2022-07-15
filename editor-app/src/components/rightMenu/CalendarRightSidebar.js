import React from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



import DatePicker from 'react-datepicker';

const CalendarRightSidebar = (props) => {

  const today = new Date();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched
  } = props;
  return (
    <div>
      <h3>Add Date</h3>
      <Form.Label>Select Date</Form.Label>
      <Form.Control type='text' placeholder="Enter Name" />

      <Form.Group controlId="validationFormik03">
        <Form.Label>Date</Form.Label>

        <DatePicker

          onChange={(e) => {
            setFieldValue('date', e);
            setFieldTouched('date');
          }}
          className="form-control"
          minDate={today}
          customInput={
            <input
              type="text"
              id="validationCustom01"
              placeholder="Choose format"
            />
          }
        />

      </Form.Group>
    </div>
  )
}


export default CalendarRightSidebar