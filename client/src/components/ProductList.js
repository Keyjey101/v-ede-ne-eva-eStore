import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import ProductItem from "./ProductItem";

const ProductList = observer(() => {
  const { product } = useContext(Context);

  return (
    <Row className="d-flex">
      {product.products.map((x) => (
        <ProductItem key={x.id} products={x} image={x.img} />
      ))}
    </Row>
  );
});

export default ProductList;
