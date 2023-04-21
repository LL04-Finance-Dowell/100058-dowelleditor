import React, { useEffect } from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useStateContext } from '../../contexts/contextProvider';
const ButtonRightSide = () => {

    const { buttonLink, setButtonLink, buttonPurpose, setButtonPurpose } = useStateContext();

    const button = document.querySelector('.focussed');
    const purpose = buttonPurpose;
    const link = buttonLink;

    const finalizeButton = document.getElementById("finalize-button");
    const select = document.getElementById("selectt");
    const rejectButton = document.getElementById("reject-button");

    useEffect(() => {
        if (button) {
            button.addEventListener('click', function () {
                console.log(purpose);
                const selectedValue = select?.value;
                if (purpose === 'finalize') {
                    console.log('finalize selected');
                    finalizeButton?.click();
                } else if (purpose === 'reject') {
                    console.log('reject 2 selected');
                    rejectButton?.click();
                } else if (purpose === 'custom' && link != "") {
                    console.log('custom 3 selected');
                    window.open(link, '_blank');

                } else {
                    console.log('No option selected');
                }
            });
        }
    }, [purpose])

    // useEffect(() => {
    //     if (button) {

    //         console.log(purpose);
    //         if (purpose == "custom") {
    //             button.addEventListener('click', function () {
    //                 console.log(link)
    //                 window.open(link, '_blank');
    //             })
    //         } 
    //          if (purpose == "finalize" && finalizeButton !== null) {
    //             button.addEventListener('click', function () {
    //                 finalizeButton.click();
    //             })

    //         } 
    //          if (purpose == "reject" && rejectButton !== null) {
    //             button.addEventListener('click', function () {
    //                 rejectButton.click();
    //             })

    //         }
    //     };


    // }, [])

    const handleUpdate = () => {
        const btnName = document.getElementById("button_name");
        const button = document.querySelector('.focussed');
        console.log(button);
        if (btnName.value != "") {
            button.textContent = btnName.value;
        }

        const link = document.getElementById("link").value;
        if (link.value != "") {
            setButtonLink(link);
        }

    }

    const handleSelect = (event) => {
        let selectField = document.getElementById('selectt');
        const linkDiv = document.getElementById('website_link')

        let selectedOption = selectField.options[selectField.selectedIndex];

        setButtonPurpose(selectedOption.value)
        if (selectedOption.value == "custom") {
            linkDiv.style.display = "block";
        } else if (selectedOption.value !== "custom") {
            setButtonLink("");
        } else {
            console.log('No option selected');
        }
    }

    const removeButton = () => {
        document.querySelector('.focussedd').remove();
    }
    return (
        <>
            <div className='mt-2 mb-3 w-100'>
                <h3>Button Settings</h3>
                <Form.Label>Button Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Button name"
                    id="button_name"
                    onChange={() => { }}
                />
            </div>
            <select
                onChange={handleSelect}
                id='selectt'
                // onChange={handleDateMethod}
                className="select border-0 bg-white rounded w-100 h-75 p-2"
            >

                <option value="">Select</option>
                <option value="finalize">Finalize</option>
                <option value="reject">Reject</option>
                <option value="custom">Custom</option>

            </select>


            <div id='website_link' className='mt-5 mb-5 w-100' style={{ display: 'none' }}>
                <Form.Label>Website Link</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Website link"
                    id="link"
                    onChange={() => { }}
                />
            </div>

            <div className="mt-2 text-center pt-5">
                <Button variant="secondary" className="px-5" onClick={handleUpdate}>
                    Update Changes
                </Button>
            </div>

            <div className="mt-2 text-center pt-5">
                <Button
                    variant="primary"
                    className="px-5 remove_button"
                    onClick={removeButton}
                >
                    Remove Button
                </Button>
            </div>
        </>

    )
}

export default ButtonRightSide