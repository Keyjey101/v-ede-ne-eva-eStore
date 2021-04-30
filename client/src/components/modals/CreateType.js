import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createType } from "../../http/productAPI";

const CreateType = ({ show, onHide }) => {
  const [type, setType] = useState("");

  const addType = () => {
    createType({ name: type }).then((data) => {
      setType("");
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
          Добавить новый тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Введите тип"
            onChange={(e) => setType(e.target.value)}
            value={type}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addType}>
          Добавить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
