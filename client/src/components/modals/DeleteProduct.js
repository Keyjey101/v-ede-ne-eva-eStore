import React from "react";
import { Modal, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { deleteOneProduct } from "../../http/productAPI";

const DeleteProduct = observer(({ show, onHide, product }) => {
  const id = product.id;

  const wipeProduct = () => {
    deleteOneProduct(id);
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
          Вы уверены, что хотите удалить {product.name} ?
        </Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="danger" onClick={wipeProduct}>
          Удалить
        </Button>
        <Button variant="outline-dark" onClick={onHide}>
          Оставить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteProduct;
