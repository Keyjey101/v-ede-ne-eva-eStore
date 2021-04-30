import { AdminPanel } from "./pages/AdminPanel";
import { Auth } from "./pages/Auth";
import { Basket } from "./pages/Basket";
import  Main  from "./pages/Main";
import { ProductPage } from "./pages/ProductPage";

import {
  
  ADMIN_ROUTE,
  BASKET_ROUTE,
  
  LOGIN_ROUTE,
  MAIN_ROUTE,
  PRODUCT_ROUTE,
  REGISTRATION_ROUTE,
  
} from "./utils/constants";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPanel,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

export const nonAuthRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: PRODUCT_ROUTE + '/:id',
    Component: ProductPage,
  }
];
