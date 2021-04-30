import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import BasketStore from './store/BasketStore';
import ProductStore from './store/ProductStore';
import UserStore from './store/UserStore';


export const Context = createContext(null)


ReactDOM.render(
  
  <Context.Provider value={{
    user: new UserStore(),
    product: new ProductStore(),
    basket: new BasketStore()
  }}>
    <App />
    </Context.Provider>
 ,
  document.getElementById('root')
);


