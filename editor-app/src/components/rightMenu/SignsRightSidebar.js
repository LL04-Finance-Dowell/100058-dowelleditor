import React, { useRef } from 'react'

import Signs from '../leftMenu/comp/Signs';

import SignatureCanvas from 'react-signature-canvas'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignsRightSidebar = () => {

  const [state, setState] = React.useState({ trimmedDataURL: null });

  let sigPad = useRef({});
  let data = '';

  const clear = () => {
    sigPad.current.clear();
  }

  const save = () => {
    data = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
    setState({ trimmedDataURL: data });
  }

console.log(state.trimmedDataURL);


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

      {state.trimmedDataURL && <img src={state.trimmedDataURL} alt="sig" />}
      </div>

    </div>
  )
}

export default SignsRightSidebar