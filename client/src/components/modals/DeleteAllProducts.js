import React from "react";
import { Modal, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { deleteAllProducts } from "../../http/productAPI";

const DeleteAllProducts = observer(({ show, onHide }) => {
  const wipeProducts = () => {
    deleteAllProducts();
    onHide();
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
          Вы уверены, что хотите удалить все продукты ?
        </Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="danger" onClick={wipeProducts}>
          Удалить
        </Button>
        <Button variant="outline-dark" onClick={onHide}>
          Оставить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteAllProducts;
