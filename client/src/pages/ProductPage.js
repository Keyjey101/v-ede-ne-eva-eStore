import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Image,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useHistory, useParams } from "react-router-dom";
import Fab from "@material-ui/core/Fab";

import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchOneProduct } from "../http/productAPI";
import DeleteProduct from "../components/modals/DeleteProduct";
import { fetchOneBasket, putInBasket } from "../http/basketAPI";
import Success from "../components/modals/Success";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { MAIN_ROUTE } from "../utils/constants";
export const ProductPage = observer(() => {
  const { user, basket } = useContext(Context);
  const {basketsBool} = useContext(Context)
  const [product, setProduct] = useState({ info: [] });
const history = useHistory()
const [visible, setVisible] = useState(false)

  const {id} = useParams()
  
  useEffect(() => {

fetchOneProduct(id).then(data => setProduct(data))

  }, [id]);

const [delVisible, setDelVisible] = useState(false)

  const renderTooltipCart = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Добавить в корзину
    </Tooltip>
  );

  const renderTooltipRaiting = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Оценка пользователей
    </Tooltip>
  );

  const handleRaitig = () => {
    alert("Сперва товар необходимо купить :)");
  };

const {info} = product


const addToCart = () => {
  setVisible(true)
  putInBasket({
    productId : id,
    email: user.user.email
  })
  fetchOneBasket(user.user.email).then((data) =>
      basket.setBasketsProducts(data)
    )
    basket.setBasketsBool(!basketsBool)
}



useEffect(()=> {
  fetchOneBasket(user.user.email).then((data) =>
  basket.setBasketsProducts(data)
)

console.log('useEffect!!!')
},[visible, basket, user.user.email])




  return (
    <Container>

    <Success 
text='Товар успешно добавлен в корзину'
show={visible}
        onHide={() => {
          setVisible(false);
          
        }}

    />
      <Row className="mt-5">
        <Col md={3} sm={3} >
        <Fab variant="extended" onClick={() => history.push(MAIN_ROUTE)}>
  <KeyboardBackspaceIcon style={{marginRight: '5'}} />
  Назад
</Fab>
        </Col>
        <Col md={9} sm={9}>
          <Row>
            <Col md={10}>
              <h2> {product.name}</h2>

              <Image
                src={
                 process.env.REACT_APP_API_URL + product.img
                }
                width={"100%"}
              />
            </Col>

            <Col md={2} xs={5} sm={5}>
              <h6 className="mt-5" style={{ fontSize: "1.5rem" }}>
                  {product.value}.0 ₽
              </h6>
              
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipCart}
              >

              
                <Fab size="large" variant="extended" className="mt-1"
                
                onClick={user.isAuth ?  addToCart : () => alert('пожалуйста авторизируйтесь, чтобы продолжить покупки')}
                >
                  <AddShoppingCartIcon
                    size="medium"
                    style={{
                      fontSize: 40,
                      cursor: "pointer",
                      color: "#21BF73",
                    }}
                  />
                  <h6>купить</h6>{" "}
                </Fab>
              </OverlayTrigger>
              
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipRaiting}
              >
                <Fab
                  size="large"
                  variant="extended"
                  className="mb-2 mt-5"
                  onClick={handleRaitig}
                >
                  {product.raiting}/5
                  <StarBorderIcon style={{ fontSize: 40, color: "#FEFEAE" }} />
                </Fab>
              </OverlayTrigger>

              {user.user.role === "ADMIN" && (
                <Fab size="large" variant="extended" className="mb-2 mt-5"
                
                onClick={() => setDelVisible(true)}
                
                >
                  УДАЛИТЬ
                </Fab>
              )}
            </Col>
          </Row>

          <Col>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Характерирстики продукта</th>
                </tr>
              </thead>
              <tbody>

{info.map(x => <tr
key={x.id}
>

<td>{x.title}</td>
<td align="left">{x.content}</td>


</tr>)}


              </tbody>
            </Table>
          </Col>
        </Col>
      </Row>

      <DeleteProduct
        show={delVisible}
        product={product}
        onHide={() => {
          setDelVisible(false);
        }}
      />


    </Container>
  );
});

export default ProductPage;
