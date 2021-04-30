import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._types = [];
    this._vegans = [];
    this._products = [];
    this._selectedType = {};
    this._selectedVegan = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 6;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setVegans(vegans) {
    this._vegans = vegans;
  }

  setProducts(products) {
    this._products = products;
  }

  setSelectedType(type) {
    this._selectedType = type;
  }
  setSelectedVegan(vegan) {
    this._selectedVegan = vegan;
  }

  setPage(page) {
    this._page = page
}
setTotalCount(count) {
    this._totalCount = count
}

  get types() {
    return this._types;
  }
  get vegans() {
    return this._vegans;
  }
  get products() {
    return this._products;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedVegan() {
    return this._selectedVegan;
  }

  get totalCount() {
    return this._totalCount
}
get page() {
    return this._page
}
get limit() {
    return this._limit
}

}
