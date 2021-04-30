import React, { useContext, useEffect } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { deleteVegan, fetchVegans} from "../../http/productAPI";

const DeleteVegan = observer(({ show, onHide }) => {
  const { product } = useContext(Context);



  const id = product.selectedVegan.id;

  const wipeVegan = () => {
    deleteVegan(id)
      onHide()
    
   };

   useEffect(() => {
    fetchVegans().then((data) => product.setVegans(data));
  },[product]);

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
          Удалить веганизмъ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" className="mb-3">
              {product.selectedVegan.name || "Выберите веганство для удаления"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.vegans.map((vegan) => (
                <Dropdown.Item
                  key={vegan.id}
                  onClick={() => product.setSelectedVegan(vegan)}
                >
                  {vegan.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={wipeVegan}>
          Удалить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteVegan;
