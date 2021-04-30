import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Table,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Context } from "..";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ClearIcon from "@material-ui/icons/Clear";
import Success from "../components/modals/Success";
import {
  fetchOneBasket,
  deleteFromBasket,
  deleteAllFromBasket,
  putInBasket,
  deleteProductFromBasket,
} from "../http/basketAPI";
import AreYouSure from "../components/modals/AreYouSure";

export const Basket = observer(() => {
  const { basket } = useContext(Context);
  const { user } = useContext(Context);

  const [visible, setVisible] = useState(false);
  const [visibleDel, setVisibleDel] = useState(false);
  const [change, setChange] = useState(false);

  const [delName, setDelName] = useState("");
  const [delId, setDelId] = useState(0);

  const addToCart = (id) => {
    putInBasket({ productId: id, email: user.user.email });
    fetchOneBasket(user.user.email).then((data) => {
      setChange(!change);
      basket.setBasketsProducts(data);
    });
  };

  const delProduct = (id) => {
    deleteFromBasket(user.user.email, id).then(() => setChange(!change));
  };

  const delProducts = (id) => {
    deleteProductFromBasket(user.user.email, id).then(() => setChange(!change));
  };

  const wipeCart = () => {
    console.log("deleting all");
    deleteAllFromBasket(user.user.email).then(() => setChange(!change));
  };

  const areYouSure = (id, name) => {
    setDelId(id);
    setDelName(name);
    setVisibleDel(true);
  };

  const renderTooltipCart = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Удалить всё
    </Tooltip>
  );

  let totalPrice = basket.basketsProducts.reduce((tot, arr) => {
    return tot + arr.dataValues.value * arr.sum;
  }, 0);

  const formOrder = () => {
    console.log("order place");
    setVisible(true);
    //ne dodelanaya chast
    deleteAllFromBasket(user.user.email);
    setChange(!change);
  };

  useEffect(() => {
    fetchOneBasket(user.user.email).then((data) =>
      basket.setBasketsProducts(data)
    );
    console.log("useEffect!!!");
  }, [change, basket, user.user.email]);

  return (
    <div>
      <Container className="d-flex mt-5 ">
        <Success
          text="Ваш заказ размещен"
          show={visible}
          onHide={() => {
            setVisible(false);
          }}
          deleteItem={(id) => delProduct(id)}
        />

        <AreYouSure
          id={delId}
          name={delName}
          deleteItem={() => {
            setVisibleDel(false);
            delProduct(delId);
          }}
          show={visibleDel}
          onHide={() => {
            setVisibleDel(false);
          }}
        />

        {totalPrice !== 0 ? (
          <Table striped hover borderless>
            <thead>
              <tr>
                <th colSpan="3">ВАШ ЗАКАЗ</th>
                <th>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltipCart}
                  >
                    <DeleteForeverIcon
                      style={{ marginLeft: "100%", cursor: "pointer" }}
                      onClick={wipeCart}
                    />
                  </OverlayTrigger>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-weight-bold">Товар</td>
                <td className="font-weight-bold">Кол-во</td>
                <td className="font-weight-bold">Стоимость</td>
                <td className="font-weight-bold">Итог</td>
              </tr>

              {basket.basketsProducts.map((x, id, array) => (
                <tr key={x.dataValues.createdAt}>
                  <td>
                    <ClearIcon
                      fontSize="small"
                      onClick={() => {
                        delProducts(x.dataValues.id);
                      }}
                      style={{ color: "#FD5E53", cursor: "pointer" }}
                    />

                    {x.dataValues.name}
                  </td>
                  <td className="font-weight-bold">
                    <RemoveIcon
                      fontSize="small"
                      className="mr-2"
                      style={{ color: "#FD5E53", cursor: "pointer" }}
                      onClick={
                        x.sum > 1
                          ? () => {
                              delProduct(x.dataValues.id);
                            }
                          : () => {
                              areYouSure(x.dataValues.id, x.dataValues.name);
                            }
                      }
                    />

                    {x.sum}

                    <AddCircleOutlineIcon
                      fontSize="small"
                      className="ml-2"
                      style={{ color: "#4ECC72", cursor: "pointer" }}
                      onClick={() => addToCart(x.dataValues.id)}
                    />
                  </td>

                  <td align="left">{x.dataValues.value}</td>
                  <td align="left">{x.dataValues.value * x.sum}</td>
                </tr>
              ))}

              <tr>
                <td className="font-weight-bold" colSpan="3">
                  Доставка
                </td>

                <td>{totalPrice > 2000 ? "0" : 299}</td>
              </tr>

              <tr>
                <td className="font-weight-bold" colSpan="3">
                  ИТОГО
                </td>
                <td className="font-weight-bold">
                  {totalPrice > 2000 ? totalPrice : totalPrice + 299}
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <Container className="d-flex justify-content-center align-items-center mt-5">
            {" "}
            <h4> Ваша корзина пуста </h4>
          </Container>
        )}
      </Container>
      <Container className="ml-auto navbar">
        {totalPrice !== 0 ? (
          <Button
            size="md"
            className="ml-auto"
            variant="success"
            onClick={formOrder}
          >
            ЗАКАЗАТЬ
          </Button>
        ) : null}
      </Container>
    </div>
  );
});
