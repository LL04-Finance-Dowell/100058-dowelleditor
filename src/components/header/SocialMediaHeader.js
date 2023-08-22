import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import { FaSave, FaPen } from "react-icons/fa";


function SocialMediaMedia(props) {
    return (
        <div
            className={`header header_bg_document`}
        >
            <Container fluid>
                <Row>

                    <Col>
                        <div className="d-flex align-items-center gap-2 header_p">
                            <div
                                className="title-name px-3"
                                // contentEditable={docMap ? false : true}
                                contentEditable={true}
                                style={{ fontSize: 24 }}
                                spellCheck="false"
                            // ref={inputRef}
                            >
                                {/* {docMap ? iniTitle : title && title} */}
                                Untitle Doc
                            </div>
                            <FaPen className="cursor-pointer"
                            //  onClick={handleTitle}
                            />
                        </div>
                    </Col>

                    <Col>
                        <div className="right_header">
                            <div className={"savee"}>
                                <Button
                                    size="md"
                                    className="rounded"
                                    id="saving-buttonn"
                                //   onClick={submit}
                                //   style={{
                                //     visibility: documentFlag && "hidden",
                                //   }}
                                >
                                    Save <FaSave color="white" />
                                </Button>
                            </div>
                        </div>
                        <ToastContainer size={5} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SocialMediaMedia;