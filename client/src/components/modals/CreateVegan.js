import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createVegan } from "../../http/productAPI";

const CreateVegan = ({ show, onHide }) => {
  const [vegan, setVegan] = useState("");

  const addVegan = () => {
    createVegan({ name: vegan }).then((data) => {
      setVegan("");
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый веганизмъ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Введите тип"
            onChange={(e) => setVegan(e.target.value)}
            value={vegan}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addVegan}>
          Добавить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateVegan;
