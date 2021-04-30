import React, { useContext, useEffect } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { fetchTypes, deleteType} from "../../http/productAPI";

const DeleteType = observer(({ show, onHide }) => {
  const { product } = useContext(Context);



  const id = product.selectedType.id;

  const wipeType = () => {
    deleteType(id)
      onHide()
    
   };

   useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
  }, [product]);

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
          Удалить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" className="mb-3">
              {product.selectedType.name || "Выберите тип для удаления"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.types.map((type) => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() => product.setSelectedType(type)}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={wipeType}>
          Удалить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteType;
