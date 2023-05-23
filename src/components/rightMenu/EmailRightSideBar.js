/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import { Row, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const EmailRightSideBar = () =>
{
    const [borderSize, setBorderSize] = useState(
        Number(localStorage.getItem("borderSize")) || 0
    );
    const [borderColor, setBorderColor] = useState(
        localStorage.getItem("borderColor") || "#000000"
    );
    const [showSlider, setShowSlider] = useState(false);
    const [fromEmail, setFromEmail] = useState("");
    const [fromName, setFromName] = useState("");
    const [toName, setToName] = useState("");
    const [toEmail, setToEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    // const [emailInfo, setEmailInfo] = useState({
    //     name: "",
    //     name1: "",
    //     email: "",
    //     email1: "",
    //     subject: "",
    //     message: "",

    // });
    const [isChecked, setIsChecked] = useState(false);

    function removeContainer()
    {
        // document.querySelector('.focussedd').remove();
        if (document.querySelector(".focussedd").classList.contains("dropp"))
        {
            if (document.querySelector(".focussedd").hasChildNodes())
            {
                const childLength =
                    document.querySelector(".focussedd").children.length;
                for (let i = 0; i < childLength; i++)
                {
                    document.querySelector(".focussedd").firstElementChild.remove();
                }
            }
        } else
        {
            document.querySelector(".focussedd").remove();
        }
    }
    const handleBorderSizeChange = (e) =>
    {
        setBorderSize(e.target.value);

        const box = document.getElementsByClassName("focussedd")[0];
        box.style.borderWidth = `${borderSize}px`;

    };

    const handleBorderColorChange = (e) =>
    {
        setBorderColor(e.target.value);
        const box = document.getElementsByClassName("focussedd")[0];
        box.style.borderColor = `${borderColor}`;

    };
    const handleRangeBlur = (e) =>
    {
        e.target.focus();
    };

    // const handleSubmit = (e) =>
    // {
    //     e.preventDefault();

    //     const formData = {
    //         topic: "EditorMailComponent",
    //         toName: toName,
    //         fromName: fromName,
    //         toEmail: toEmail,
    //         fromEmail: fromEmail,
    //         subject: subject,
    //         email_body: message,
    //     };
    //     // Handle validations
    //     Axios.post(
    //         "https://100085.pythonanywhere.com/api/editor-component/",
    //         formData
    //     ).then((response) =>
    //     {
    //         console.log(response);
    //     });
    //     //alert("Mail sent!");
    //     console.log(formData);
    //     // setEmailInfo({
    //     //     name: "",
    //     //     name1: "",
    //     //     email: "",
    //     //     email1: "",
    //     //     subject: "",
    //     //     message: "",
    //     // });
    //     setMessage("");
    //     setSubject("");
    //     setToEmail("");
    //     setToName("");
    //     setFromName("");
    //     setFromEmail("");

    // };
    // const handleChange = (event) =>
    // {
    //     const { name, value } = event.target;
    //     setEmailInfo((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: value,
    //     }));
    // };
    // const submitForm = (event) =>
    // {
    //     event.preventDefault();
    //     const formData = {
    //         topic: "EditorMailComponent",
    //         toName: toName,
    //         fromName: fromName,
    //         toEmail: toEmail,
    //         fromEmail: fromEmail,
    //         subject: subject,
    //         email_body: message,
    //     };
    //     if (isChecked)
    //     {
    //         // Check if the form is valid
    //         // const form = event.target;
    //         const form = document.getElementById('myForm');
    //         if (form.checkValidity())
    //         {
    //             // Make the POST request using Axios
    //             axios
    //                 .post("https://100085.pythonanywhere.com/api/editor-component/", formData)
    //                 .then((response) =>
    //                 {
    //                     // Handle the response data
    //                     console.log('POST request successful:', response.data);
    //                     toast.success('Post request successful!');
    //                     // Reset isChecked after 2 seconds
    //                     setTimeout(() =>
    //                     {
    //                         setIsChecked(false);
    //                     }, 2000);

    //                 })
    //                 .catch((error) =>
    //                 {
    //                     // Handle the error
    //                     console.error('Error making POST request:', error);
    //                     toast.error('Error making the post request!', error);
    //                     // Reset isChecked after 2 seconds
    //                     setTimeout(() =>
    //                     {
    //                         setIsChecked(false);
    //                     }, 2000);

    //                 });
    //         } else
    //         {
    //             // Display an alert if the form is invalid
    //             alert('Please fill in all fields before submitting.');
    //         }
    //     }
    //     setMessage("");
    //     setSubject("");
    //     setToEmail("");
    //     setToName("");
    //     setFromName("");
    //     setFromEmail("");
    // };
    // useEffect(() =>
    // {
    //     if (isChecked)
    //     {
    //         // Make the POST request when the radio button is checked
    //         submitForm();
    //     }
    // }, [isChecked]);

    const handleRadioChange = (event) =>
    {
        setIsChecked(event.target.checked);

        if (event.target.checked)
        {
            const formData = {
                topic: "EditorMailComponent",
                toName: toName,
                fromName: fromName,
                toEmail: toEmail,
                fromEmail: fromEmail,
                subject: subject,
                email_body: message,
            };

            // Check if the form is valid
            const form = document.getElementById("myForm");
            if (form.checkValidity())
            {
                // Make the POST request using Axios
                axios
                    .post("https://100085.pythonanywhere.com/api/editor-component/", formData)
                    .then((response) =>
                    {
                        // Handle the response data
                        console.log("POST request successful:", response.data);
                        toast.success("Post request successful!");

                        // Reset isChecked after 2 seconds
                        setTimeout(() =>
                        {
                            setIsChecked(false);
                        }, 2000);
                    })
                    .catch((error) =>
                    {
                        // Handle the error
                        console.error("Error making POST request:", error);
                        toast.error("Error making the post request!", error);

                        // Reset isChecked after 2 seconds
                        setTimeout(() =>
                        {
                            setIsChecked(false);
                        }, 2000);
                    });
            } else
            {
                // Display an alert if the form is invalid
                alert("Please fill in all the required fields.");
            }
        }
        setMessage("");
        setSubject("");
        setToEmail("");
        setToName("");
        setFromName("");
        setFromEmail("");
    };

    useEffect(() =>
    {

        localStorage.setItem("borderSize", borderSize === "0")
        localStorage.setItem("borderColor", borderColor === "black")
    }, [borderSize, borderColor,]);
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", maxWidth: "500px", padding: "5%", border: "1px solid #000", margin: "20px", }}>
                <form id="myForm" >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <input
                            type="text"
                            name="text"
                            placeholder="To Name"
                            value={toName}
                            // value={emailInfo.name}
                            style={{ width: "48%", padding: "5px" }}
                            onChange={(e) => setToName(e.target.value)}
                            // onChange={handleChange}
                            required />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={toEmail}
                            // value={emailInfo.email}
                            style={{ width: "48%", padding: "5px" }}
                            onChange={(e) => setToEmail(e.target.value)}
                            // onChange={handleChange}
                            required />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <input
                            type="text"
                            name="text"
                            placeholder="From Name"
                            value={fromName}
                            // value={emailInfo.name1}
                            style={{ width: "48%", padding: "5px" }}
                            onChange={(e) => setFromName(e.target.value)}
                            // onChange={handleChange}
                            required />
                        <input
                            type="email"
                            name="email"
                            placeholder="From Email"
                            value={fromEmail}
                            // value={emailInfo.email1}
                            style={{ width: "48%", padding: "5px" }}
                            onChange={(e) => setFromEmail(e.target.value)}
                            // onChange={handleChange}
                            required />
                    </div>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={subject}
                        // value={emailInfo.subject}
                        style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
                        onChange={(e) => setSubject(e.target.value)}
                        // onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        value={message}
                        // value={emailInfo.message}
                        style={{ marginBottom: "10px", padding: "5px" }}
                        onChange={(e) => setMessage(e.target.value)}
                        // onChange={handleChange}
                        required
                    />

                    {/* <button type="submit" style={{ marginBottom: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", padding: "10px 20px", width: "100%", }}>
                        Send
                    </button> */}
                    <label>
                        <input
                            type="radio"
                            checked={isChecked}
                            onChange={handleRadioChange}
                            style={{ marginRight: "2rem" }}
                        // onChange={() => setIsChecked(!isChecked)}
                        />
                        Send Email
                    </label>
                </form>
                <ToastContainer size={5} />

            </div>
            <hr />
            <Row className="pt-4">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h6 style={{ marginRight: "10rem" }}>Border</h6>
                    <label className="switch">
                        <input type="checkbox" onClick={() => setShowSlider(!showSlider)} />
                        <span className="slider round"></span>
                    </label>
                </div>
                {showSlider && (
                    <div style={{ display: "flex", alignItems: "center", backgroundColor: "#abab", gap: "10px", height: "40px", width: "90%" }}>
                        <input
                            type="color"
                            value={borderColor}
                            onChange={handleBorderColorChange}
                            id="color"
                            style={{ border: "none", width: "10%", height: "15px" }}
                        />
                        <input
                            type="range"
                            min="-10"
                            max="20"
                            value={borderSize}
                            onChange={handleBorderSizeChange}
                            onBlur={handleRangeBlur}
                            id="range"
                            className="range-color"

                        />

                    </div>
                )}
            </Row>
            <hr />
            <div className="d-flex justify-content-center">
                <Button
                    variant="primary"
                    onClick={removeContainer}
                    className="remove_container text-center mt-5"
                >
                    Remove Container
                </Button>

            </div>
        </>
    );
};

export default EmailRightSideBar;
