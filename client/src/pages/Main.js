import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductList from "../components/ProductList";
import TypeBar from "../components/TypeBar";
import VeganBar from "../components/VeganBar";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { fetchProducts, fetchTypes, fetchVegans } from "../http/productAPI";
import Pages from "../components/Pages";

const Main = observer(() => {
  const { product } = useContext(Context);
 
 
  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchVegans().then((data) => product.setVegans(data));
    fetchProducts(null, null, 1, 6).then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
  }, [product]);

  useEffect(() => {
    fetchProducts(product.selectedType.id, product.selectedVegan.id, product.page, 6).then(data => {
        product.setProducts(data.rows);
      product.setTotalCount(data.count);
    })
}, [product.page, product.selectedType, product.selectedVegan, product])




  return (
    <Container>
      <Row className="mt-5">
        <Col md={3} sm={3}>
          <TypeBar />
        </Col>
        <Col md={9} sm={9}>
          <VeganBar />

          <ProductList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Main;
