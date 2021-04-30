import React from 'react';
import { Modal} from 'react-bootstrap';



const Delivery = ({show, onHide}) => {
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
          Условия доставки
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Доставка по Екатеринбургу и ближайшим населенным пунктам осуществляется службой Яндекс.Такси при условии полной предоплаты продукта. Стоимость доставки в соответстии с тарифом курьерской службы. При заказе от 2000 рублей - доставка по Екатеринбургу осуществляется бесплатно.
      </Modal.Body>
      
    </Modal>
)
}

export default Delivery