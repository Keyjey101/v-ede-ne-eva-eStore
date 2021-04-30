import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { fetchProducts, fetchTypes, fetchVegans, updateProduct } from "../../http/productAPI";

const UpdateProduct = observer(({ show, onHide }) => {
  const { product } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [file, setFile] = useState(null);

 const [idToChange ,setIdToChange] = useState('')

 const [valueToChange ,setValueToChange] = useState('')

 const [ nameToChange,setNameToChange] = useState('')







  


  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const newInfo = () => {
    setInfo([...info, { title: "", content: "", time: Date.now() }]);
  };

  const delInfo = (time) => {
    setInfo(info.filter((i) => i.time !== time));
  };

  const changeInfo = (key, value, time) => {
    setInfo(info.map((i) => (i.time === time ? { ...i, [key]: value } : i)));
  };


const addProduct = () => {
  const formData = new FormData()
        formData.append('name', name)
        formData.append('value', `${value}`)
        formData.append('img', file)
        formData.append('veganId', product.selectedVegan.id)
        formData.append('typeId', product.selectedType.id)
        formData.append('info', JSON.stringify(info))
       console.log('this is form data', formData)
        updateProduct(idToChange,formData).then(data => onHide())
    }


    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchVegans().then(data => product.setVegans(data))
        fetchProducts(null, null, 1, 100).then((data) => {
            product.setProducts(data.rows);
            
          });
    }, [product, nameToChange])

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
          Обновить продукт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>


        <Dropdown>
            <Dropdown.Toggle variant="secondary" className="mb-3">
              {nameToChange || "Выберите продукт для удаления"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.products.map((x) => (
                <Dropdown.Item
                  key={x.id}
                  onClick={() => {
                    setIdToChange(x.id)
                    
                    setValueToChange(x.value)
                    
                    setNameToChange(x.name)}}
                >
                  {x.name}
                </Dropdown.Item>
              ))} 
            </Dropdown.Menu>
          </Dropdown>










          <Dropdown>
            <Dropdown.Toggle variant="secondary" className="mb-3">
              {product.selectedType.name || 'Новый тип'}
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

          <Dropdown>
            <Dropdown.Toggle variant="secondary" className="mb-3">
              {product.selectedVegan.name || 'Новый веганизм'}
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

          <Form.Control
            placeholder={nameToChange}
            className="mt-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Form.Control
            placeholder={valueToChange}
            className="mt-3"
            value={value === 0 ? "" : value}
            onChange={(e) => setValue(Number(e.target.value))}
          />

          <Form.Control
            type="file"
            className="mt-3 mb-3"
            onChange={selectFile}
          />

          

          {info.map((x) => (
            <Row key={x.time}>
              <Col md={4} sm={3} className="mb-3">
                <Form.Control
                  placeholder="Название характеристики"
                  value={x.title}
                  onChange={(e) => changeInfo("title", e.target.value, x.time)}
                />
              </Col>

              <Col md={4} sm={3} className="mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Описание характеристики"
                  rows={1}
                  value={x.content}
                  onChange={(e) => changeInfo("content", e.target.value, x.time)}
                />
              </Col>

              <Col md={4} sm={3} className="mb-3">
                <Button variant="danger" onClick={() => delInfo(x.time)}>
                  Удалить строчку
                </Button>
              </Col>
            </Row>
          ))}
          <Button variant="info" className="mb-3" onClick={newInfo}>
            {" "}
            Новая характиристика{" "}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addProduct}>
          Обновить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default UpdateProduct;
