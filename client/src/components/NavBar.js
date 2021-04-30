import React, {  useEffect, useState } from "react";
import { Context } from "../index";
import { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  
} from "../utils/constants";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import Delivery from "./modals/Delivery";
import PayInfo from "./modals/PayInfo";
import About from "./modals/About";

import Badge from "@material-ui/core/Badge";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PhoneIcon from "@material-ui/icons/Phone";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Fab } from "@material-ui/core";
import { logout } from "../http/userAPI";
import { fetchOneBasket } from "../http/basketAPI";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const {basket} = useContext(Context)
  const history = useHistory();

  const [count, setCount] = useState(0);



  let k = 0





  const [deliveryVisible, setDeliveryVisible] = useState(false);
  const [payInfoVisible, setPayInfoVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    logout()
  };
 


  for (let i = 0; i<basket.basketsProducts.length; i++) {
    const j = basket.basketsProducts[i].sum
    k=k+j
    
  }
  //basket.setBaskets(k)
  useEffect(() => {

  if (user.isAuth) {
    fetchOneBasket(user.user.email).then((data) =>
    basket.setBasketsProducts(data))
    setCount(k)}
  },[basket, user.isAuth, user.user.email, basket.basketsProducts.length, k, basket.baskets])



  return (
    <Container>
      <Navbar>
        <Fab
          href="tel:+7 908 906-23-45"
          size="small"
          className="mr-1"
          style={{ opacity: "0.6", color: "#4ECC72" }}
        >
          <PhoneIcon fontSize="small" />
        </Fab>

        <Fab
          href="https://api.whatsapp.com/send/?phone=%2B79089062345&text&app_absent=0"
          size="small"
          className="mr-1"
          style={{ opacity: "0.6", color: "#FEFEAE" }}
        >
          <WhatsAppIcon fontSize="small" />
        </Fab>

        <Fab
          href="https://www.instagram.com/v_ede_ne_eva/"
          size="small"
          className="mr-1"
          style={{ opacity: "0.6", color: "#FD5E53" }}
        >
          <InstagramIcon fontSize="small" />
        </Fab>

        {user.user.role === "ADMIN" && (
          <Nav className="ml-auto navbar">
            <Nav.Link href={MAIN_ROUTE} className="ml-3">
              Каталог
            </Nav.Link>

            <Nav.Link onClick={() => setDeliveryVisible(true)} className="ml-3">
              Доставка
            </Nav.Link>
            <Nav.Link onClick={() => setPayInfoVisible(true)} className="ml-3">
              Оплата
            </Nav.Link>
            <Nav.Link onClick={() => setAboutVisible(true)} className="ml-3">
              О нас
            </Nav.Link>
            <Button
              className="ml-3"
              variant="outline-dark"
              onClick={() => history.push(ADMIN_ROUTE)}
            >
              Админка
            </Button>
            <Nav.Link className="ml-3" onClick={() => logOut()}>
              Выйти
            </Nav.Link>
          </Nav>
        )}

        {user.user.role === "USER" && (
          <Nav className="ml-auto navbar">
            <Nav.Link href={MAIN_ROUTE} className="ml-3">
              Каталог
            </Nav.Link>

            <Nav.Link onClick={() => setDeliveryVisible(true)} className="ml-3">
              Доставка
            </Nav.Link>
            <Nav.Link onClick={() => setPayInfoVisible(true)} className="ml-3">
              Оплата
            </Nav.Link>
            <Nav.Link onClick={() => setAboutVisible(true)} className="ml-3">
              О нас
            </Nav.Link>
            <Button
              className="ml-3 shop-button"
              variant="outline-dark"
              onClick={() => history.push(BASKET_ROUTE)}
            >

<Badge
badgeContent={count}
color="secondary"
>
<ShoppingBasketIcon size='large'/>
</Badge>

              
            </Button>
            
            <Nav.Link className="ml-3" onClick={() => logOut()}>
              Выйти
            </Nav.Link>
          </Nav>
        ) }
        
        
        {user.isAuth === false && (
          <Nav className="ml-auto navbar">
            <Nav.Link href={MAIN_ROUTE} className="ml-3">
              Каталог
            </Nav.Link>
            <Nav.Link onClick={() => setDeliveryVisible(true)} className="ml-3">
              Доставка
            </Nav.Link>
            <Nav.Link onClick={() => setPayInfoVisible(true)} className="ml-3">
              Оплата
            </Nav.Link>
            <Nav.Link onClick={() => setAboutVisible(true)} className="ml-3">
              О нас
            </Nav.Link>
            <Nav.Link
              className="ml-5"
              onClick={() => {
                history.push(LOGIN_ROUTE);
              }}
            >
              Вход
            </Nav.Link>
          </Nav>
        )}
      </Navbar>
      <Delivery
        show={deliveryVisible}
        onHide={() => {
          setDeliveryVisible(false);
        }}
      />

      <PayInfo
        show={payInfoVisible}
        onHide={() => {
          setPayInfoVisible(false);
        }}
      />

      <About
        show={aboutVisible}
        onHide={() => {
          setAboutVisible(false);
        }}
      />
    </Container>
  );
});

export default NavBar;
