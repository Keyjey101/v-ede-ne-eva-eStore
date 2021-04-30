import React from 'react';
import { Modal} from 'react-bootstrap';



const About = ({show, onHide}) => {
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
          Мы - семейная фирма
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Производство на кухне. Работа в перчатках. Самовывоз с ул.Батрудинова д.42. По всем вопросам обращаться в инстаграмм - 
        <a href='https://www.instagram.com/v_ede_ne_eva/'> ТЫК)))) </a>
        
      </Modal.Body>
      
    </Modal>
)
}

export default About