import React from 'react';
import { Modal} from 'react-bootstrap';



const PayInfo = ({show, onHide}) => {
return (


<Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='ml-auto'>
          Условия оплаты
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Оплата принимается наличными при самовывозе и посредством перевода на Сбербанк в остальных случаях.
      </Modal.Body>
      
    </Modal>
)
}

export default PayInfo