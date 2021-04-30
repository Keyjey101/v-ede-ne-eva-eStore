import React from 'react';
import { Modal} from 'react-bootstrap';



const Success = ({show, onHide, text}) => {
return (


<Modal 
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>{text}</Modal.Body>
      
    </Modal>
)
}

export default Success