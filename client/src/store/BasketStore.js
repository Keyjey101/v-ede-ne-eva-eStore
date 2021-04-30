import { makeAutoObservable } from "mobx";

export default class BasketStore {
  constructor() {
    this._baskets = [];
    this._basketsProducts = [];
    this._basketsBool = false
    makeAutoObservable(this);
  }

  setBaskets(baskets) {
    this._baskets = baskets;
  }

  setBasketsProducts(basketsProducts) {
    this._basketsProducts = basketsProducts;
  }

  setBasketsBool(bool) {
    this._basketsBool = bool;
  }


  get baskets() {
    return this._baskets;
  }
  get basketsProducts() {
    return this._basketsProducts;
  }
  get basketsBool() {
    return this._basketsBool;
  }


}
