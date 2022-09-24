import React, { useRef } from 'react'


import SignatureCanvas from 'react-signature-canvas'

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
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

    const signImage = `<img src=${data} />`


    document.getElementsByClassName('signInput').item(0).innerHTML = signImage
    console.log(signImage);
  }




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
      <hr/>


      <div className='dropdown pt-2'>
            <p><h6>User permissions</h6></p>
            <DropdownButton variant="" id="" title="Nothing Selected" className='shadow bg-white rounded '>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>

          
          <div className='mt-5 text-center'>
            <Button variant="primary"  >Remove Signature</Button>
          </div>
     {/* {signState.trimmedDataURL && <img src={signState.trimmedDataURL} alt="sig" />} */}
    </div>
  )
}

export default SignsRightSidebar