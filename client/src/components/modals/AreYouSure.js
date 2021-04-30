import React from 'react';
import { Modal, Button} from 'react-bootstrap';



const AreYouSure = ({show, onHide, deleteItem, name}) => {
return (


<Modal 
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>Вы точно хотите удалить {name} из корзины?</Modal.Body>
      <Modal.Footer>
    
    <Button variant="danger" onClick={deleteItem}>Абсолютли удалить</Button>
  </Modal.Footer>
    </Modal>
)
}

export default AreYouSure