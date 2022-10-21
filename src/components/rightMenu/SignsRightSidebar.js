import React, { useRef } from 'react'


import SignatureCanvas from 'react-signature-canvas'

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useStateContext } from '../../contexts/contextProvider';


const SignsRightSidebar = () => {

  const { signState, setSignState } = useStateContext();


  let sigPad = useRef({});
  let data = '';

  const clear = () => {
    sigPad.current.clear();
  }




  const save = () => {
    data = sigPad.current.getTrimmedCanvas().toDataURL('image/png');

    setSignState({ trimmedDataURL: data });

    const signImage = `<img src=${data} />`

    const sign = document.querySelector('.focussed')
    if (sign.parentElement.classList.contains("focussedd")) {
      document.querySelector('.focussed').innerHTML = signImage
    }


    console.log(signImage);
  }


  function removeSign() {
    document.querySelector('.focussedd').remove()
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
        <div className='buttons p-4'>
          <Button onClick={clear} variant="secondary">Clear</Button> &nbsp;
          <Button onClick={save} variant="primary" >Done</Button>

        </div>

      </div>
      <hr />


      <div className='dropdown pt-2'>
        <h6>User permissions</h6>
        <select className='shadow bg-white rounded w-75 h-75'>
          <option value="Nothing Selected" selected="selected">Nothing Selected</option>
          <option value="Action">Action</option>
          <option value="Another action">Another action</option>
          <option value="Something else">Something else</option>
        </select>
      </div>


      <div className='mt-5 '>
        <Button variant="primary" onClick={removeSign} >Remove Signature</Button>
      </div>
      {/* {signState.trimmedDataURL && <img src={signState.trimmedDataURL} alt="sig" />} */}
    </div>
  )
}

export default SignsRightSidebar