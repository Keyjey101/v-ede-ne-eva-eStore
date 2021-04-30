import React, {  useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";

import { observer } from "mobx-react-lite";
import {  deleteOneProduct, fetchProducts} from "../../http/productAPI";
import { Context } from "../..";

const DeleteChosenProduct = observer(({ show, onHide}) => {
  const {product} = useContext(Context)
  

const [productToDel, setProductToDel] = useState('')
const [idToDel, setIdToDel] = useState(0)

  const wipeProduct = () => {
    deleteOneProduct(idToDel);
    onHide();
  };

   useEffect(() => {
    fetchProducts(null, null, 1, 100).then((data) => {
      product.setProducts(data.rows);
      
    });
  },[product, productToDel] );

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
          Удалить продукт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" className="mb-3">
              {productToDel || "Выберите product для удаления"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.products.map((x) => (
                <Dropdown.Item
                  key={x.id}
                  onClick={() => {
                    setIdToDel(x.id)
                    setProductToDel(x.name)}}
                >
                  {x.name}
                </Dropdown.Item>
              ))} 
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={wipeProduct}>
          Удалить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteChosenProduct;
