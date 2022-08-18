import React, { useRef } from 'react'


import SignatureCanvas from 'react-signature-canvas'

import Button from 'react-bootstrap/Button';
import { useStateContext } from '../../contexts/contextProvider';

const SignsRightSidebar = () => {

  const {signState, setSignState} = useStateContext();


  let sigPad = useRef({});
  let data = '';

  const clear = () => {
    sigPad.current.clear();
  }

  const save = () => {
    data = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
    setSignState({ trimmedDataURL: data });
  }

console.log(signState.trimmedDataURL);


  return (
    <div>
      <h3>Add Signature</h3>
      <div>
        <div className='signature'>
          <SignatureCanvas penColor='black'
            canvasProps={{ width: 200, height: 200, className: 'sigCanvas' }}
            ref={sigPad} />
        </div>
        <div className='buttons'>
          <Button onClick={clear} variant="secondary">Clear</Button>
          <Button onClick={save} variant="primary">Done</Button>

        </div>

      </div>

    </div>
  )
}

export default SignsRightSidebar