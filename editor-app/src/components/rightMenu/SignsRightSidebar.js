import React from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignsRightSidebar = () => {
  return (
    <div>
      <h3>Add Signature</h3>
      <div>
        <div className='signature'>
        </div>
        <div className='buttons'>
          <Button variant="secondary">Clear</Button>
          <Button variant="primary">Done</Button>

        </div>
      </div>

    </div>
  )
}

export default SignsRightSidebar