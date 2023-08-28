import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useStateContext } from "../contexts/contextProvider";

const RemoveElmentModal = ({ handleRemoveInput }) => {
    const { setConfirmRemove, confirmRemove } = useStateContext()
    return (
        <div
            // className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            {/* <Modal show={confirmRemove}> */}
            <Modal.Dialog>
                <Modal.Header
                >
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure ?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setConfirmRemove(false)
                    }}>No</Button>
                    <Button variant="primary" onClick={() => {
                        document.querySelector(".focussedd").remove();
                        setConfirmRemove(false)
                    }}>yes</Button>
                </Modal.Footer>
            </Modal.Dialog>
            {/* </Modal> */}

        </div>
    );
}

export default RemoveElmentModal;