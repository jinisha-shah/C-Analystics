import React from "react";

import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

const ModalComponent = ({action, handleAction, title, text, Name, id}) => {
  const [modalOpen, setModalOpen] = React.useState(false);



  return (
    <>
      <button
       className="butt"
        onClick={() => setModalOpen(!modalOpen)}
      >
       {Name}
       </button>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            {title}
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
            {text}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </Button>
          <Button color="info" type="button" onClick={()=>{
              handleAction(id)
              setModalOpen(!modalOpen)
              }}>
              {action}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalComponent;