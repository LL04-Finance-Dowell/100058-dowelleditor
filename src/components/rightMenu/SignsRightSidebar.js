import React, { useRef } from 'react';

import SignatureCanvas from 'react-signature-canvas';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useStateContext } from '../../contexts/contextProvider';
import { useSearchParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const SignsRightSidebar = () => {
  const { signState, setSignState, setIsFinializeDisabled } = useStateContext();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  var decoded = jwt_decode(token);

  let sigPad = useRef({});
  let data = '';

  const clear = () => {
    sigPad.current.clear();
  };

  const save = () => {
    data = sigPad.current.getTrimmedCanvas().toDataURL('image/png');

    setSignState({ trimmedDataURL: data });

    const signImage = `<img src=${data} />`;

    const sign = document.querySelector('.focussed');
    if (sign.parentElement.classList.contains('focussedd')) {
      if (document.querySelector('.focussed').innerHTML != signImage) {
        // console.log("signature right menu", document.querySelector('.focussed').innerHTML,"data", data );
        //setIsFinializeDisabled(false)
        if (sign.parentElement.classList.contains('holderDIV')) {
          sign.parentElement.classList.add('element_updated');
        }
      }
      document.querySelector('.focussed').innerHTML = signImage;
    }

    //console.log(signImage);
  };

  //clicked choose file button
  const chooseFileClick = () => {
    const addImageButtonInput =
      document.getElementsByClassName('addSignButtonInput');
    addImageButtonInput.item(0).click();
  };

  function removeSign() {
    document.querySelector('.focussedd').remove();
  }

  return (
    <div>
      {decoded.details.action === 'document' && (
        <>
          <h3>Add Signature</h3>
          <div>
            <div className="signature">
              <SignatureCanvas
                penColor="black"
                canvasProps={{
                  width: 200,
                  height: 200,
                  className: 'sigCanvas',
                }}
                ref={sigPad}
              />
            </div>
            <div className="mt-5 text-left pt-1">
              <Button
                className="w-75"
                variant="secondary"
                onClick={(e) => chooseFileClick(e)}
              >
                Upload Sign
              </Button>
            </div>
            <div className="buttons p-4">
              <Button onClick={clear} variant="secondary">
                Clear
              </Button>{' '}
              &nbsp;
              <Button onClick={save} variant="primary">
                Done
              </Button>
            </div>
          </div>
          <hr />

          {/* <div className='dropdown pt-2'>
        <h6>User permissions</h6>
        <select className='shadow bg-white rounded w-75 h-75'>
          <option value="Nothing Selected" selected="selected">Nothing Selected</option>
          <option value="Action">Action</option>
          <option value="Another action">Another action</option>
          <option value="Something else">Something else</option>
        </select>
      </div> */}
        </>
      )}
      {/* {signState.trimmedDataURL && <img src={signState.trimmedDataURL} alt="sig" />} */}
      <div className="mt-5 text-center">
        {decoded.details.action === 'template' ? (
          <Button
            variant="primary"
            onClick={removeSign}
            className="remove_button"
          >
            Remove Signature
          </Button>
        ) : (
          <Button
            variant="disabled bg-primary text-white"
            onClick={removeSign}
            className="remove_button disable_button"
          >
            Remove Signature
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignsRightSidebar;
