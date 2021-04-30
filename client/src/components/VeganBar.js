import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const VeganBar = observer(() => {
  const { product } = useContext(Context);

  return (
    <Row className="d-flex justify-content-end mb-2 mr-4">
      <Card
        style={
          !product.selectedVegan
            ? {
                cursor: "pointer",
                textDecoration: "underline 2px solid green",
                fontWeight: "bold",
              }
            : { cursor: "pointer" }
        }
        onClick={() => {
          product.setSelectedVegan({});
        }}
        className="pl-2 pr-2 mr-2 vegan-card"
      >
        Всеядный
      </Card>

      {product.vegans.map((x) => (
        <Card
          style={
            x.id === product.selectedVegan.id
              ? {
                  cursor: "pointer",
                  textDecoration: "underline 2px solid green",
                }
              : { cursor: "pointer" }
          }
          className="pl-2 pr-2 mr-2 vegan-card"
          key={x.id}
          onClick={() => {
            product.setSelectedVegan(x);
          }}
          active={(x.id === product.selectedVegan.id).toString()}
        >
          {x.name}
        </Card>
      ))}
    </Row>
  );
});

export default VeganBar;
