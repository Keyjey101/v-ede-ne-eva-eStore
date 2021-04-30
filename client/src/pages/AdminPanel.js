import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Context } from "../index";
import CreateProduct from "../components/modals/CreateProduct";
import CreateType from "../components/modals/CreateType";
import CreateVegan from "../components/modals/CreateVegan";
import { fetchProducts, fetchTypes, fetchVegans } from "../http/productAPI";
import DeleteType from "../components/modals/DeleteType";
import DeleteVegan from "../components/modals/deleteVegans";
import DeleteAllProducts from "../components/modals/DeleteAllProducts";
import DeleteChosenProduct from "../components/modals/DeleteChosenProduct";
import UpdateProduct from "../components/modals/UpdateProduct";

export const AdminPanel = () => {
  const { product } = useContext(Context);
  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchVegans().then((data) => product.setVegans(data));
    fetchProducts().then((data) => product.setProducts(data.rows));
  }, [product]);

  const [typeVisible, setTypeVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [veganVisible, setVeganVisible] = useState(false);
  const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
  const [deleteVeganVisible, setDeleteVeganVisible] = useState(false);
  const [deleteOneVisible, setDeleteOneVisible] = useState(false);
  const [deleteAllVisible, setDeleteAllVisible] = useState(false);
 const [updateProductVisible ,setUpdateProductVisible] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className={"mt-5 mb-3 p-3"}
        onClick={() => setTypeVisible(true)}
      >
        Добавить тип
      </Button>
      <Button
        variant={"outline-dark"}
        className={"mb-3 p-3"}
        onClick={() => setVeganVisible(true)}
      >
        Добавить веганизм
      </Button>
      <Button
        variant={"outline-dark"}
        className={"mb-3 p-3"}
        onClick={() => setProductVisible(true)}
      >
        Добавить продукт
      </Button>

      <Button
        variant={"outline-success"}
        className={"mb-3 p-3"}
        onClick={() => setUpdateProductVisible(true)}
      >
        Обновить продукт
      </Button>

      <Button
        variant={"outline-danger"}
        className={"mb-3 p-3"}
        onClick={() => setDeleteTypeVisible(true)}
      >
        Удалить тип
      </Button>

      <Button
        variant={"outline-danger"}
        className={"mb-3 p-3"}
        onClick={() => setDeleteVeganVisible(true)}
      >
        Удалить веганизмъ
      </Button>

      <Button
        variant={"outline-danger"}
        className={"mb-3 p-3"}
        onClick={() => setDeleteOneVisible(true)}
      >
        Удалить один продукт
      </Button>

      <Button
        variant={"outline-danger"}
        className={"mb-3 p-3"}
        onClick={() => setDeleteAllVisible(true)}
      >
        Удалить ВСЕ продукты
      </Button>

      <CreateProduct
        show={productVisible}
        onHide={() => {
          setProductVisible(false);
        }}
      />
      <CreateType
        show={typeVisible}
        onHide={() => {
          setTypeVisible(false);
        }}
      />
      <CreateVegan
        show={veganVisible}
        onHide={() => {
          setVeganVisible(false);
        }}
      />

<UpdateProduct
        show={updateProductVisible}
        onHide={() => {
          setUpdateProductVisible(false);
        }}
      />

      <DeleteType
        show={deleteTypeVisible}
        onHide={() => {
          setDeleteTypeVisible(false);
        }}
      />

      <DeleteVegan
        show={deleteVeganVisible}
        onHide={() => {
          setDeleteVeganVisible(false);
        }}
      />

      <DeleteChosenProduct
        show={deleteOneVisible}
        onHide={() => {
          setDeleteOneVisible(false);
        }}
      />

      <DeleteAllProducts
        show={deleteAllVisible}
        onHide={() => {
          setDeleteAllVisible(false);
        }}
      />
    </Container>
  );
};
