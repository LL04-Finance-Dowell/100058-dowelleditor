import React from 'react'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useStateContext } from "../../contexts/contextProvider";

const IframeRightSidebar = () => {
    const {
        setSidebar,
        handleClicked,
    } = useStateContext();

    const makeIframe = () => {
        var iframeDiv = document.querySelector(".focussed");
        var iframe = document.createElement("iframe");
        iframe.id = "iframe";
        iframe.src = document.getElementById("iframe_src").value;
        iframe.height = document.getElementById("iframe_height").value;
        iframe.width = document.getElementById("iframe_width").value;

        
        iframeDiv.appendChild(iframe);
    }

    function removeIframe() {
        document.querySelector(".focussedd").remove();
      }
    return (
        <>
            <div>
                <h3>Iframe Settings</h3>
                <Form.Label>Website Link</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Website link"
                    id="iframe_src"
                />
            </div>

            <div>
                <h6 className="pt-4">Iframe Size</h6>
                <Form.Label>Enter Height</Form.Label>
                <Form.Control
                    type="number"
                    placeholder=""
                    min="1"
                    id="iframe_height"
                    className="shadow bg-white rounded mb-4"
                />

                <Form.Label>Enter width</Form.Label>

                <Form.Control
                    type="number"
                    placeholder=""
                    min="1"
                    id="iframe_width"
                    className="shadow bg-white rounded mb-4"
                />
            </div>

            <div className="mt-2 text-center pt-5">
                <Button variant="secondary" className="px-5" onClick={makeIframe}>
                    Create Iframe
                </Button>
            </div>



            <div className="mt-2 text-center pt-5">
                <Button variant="primary" className="px-5" onClick={removeIframe}>
                    Remove Iframe
                </Button>
            </div>
        </>
    )
}

export default IframeRightSidebar