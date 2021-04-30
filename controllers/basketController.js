const { Basket, BasketProduct, User, Product } = require("../models/models");
const ApiError = require("../handlers/ApiError");
const countBy = require("lodash.countby");
var uniq = require("lodash.uniq");

class BasketController {
  //-----------------------------------GET ONE----------------------------------//
  async getOneBasket(req, res, next) {
    try {
      let { email } = req.params;
      const user = await User.findOne({
        where: { email },
      });
      const basketId = user.id;
      const basket = await BasketProduct.findAll({
        where: { basketId },
      });
      const product = [];
      for (let i = 0; i < basket.length; i++) {
        const item = await Product.findOne({
          where: { id: basket[i].productId },
        });
        product.push(item);
      }
      const getCountIds = (target) => {
        const result = new Object();

        target.forEach((item) => {
          return result[item.id] ? result[item.id]++ : (result[item.id] = 1);
        });

        return Object.keys(result).map((item) => {
          return {
            id: item,
            sum: result[item],
          };
        });
      };
      const counted = getCountIds(product);
      const countedProduct = counted.map((o) =>
        Object.assign(
          o,
          product.find(({ id }) => id == o.id)
        )
      );

      return res.json(countedProduct);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //-----------------------------------POST----------------------------------//

  async putInBasket(req, res, next) {
    try {
      let { email, productId } = req.body;
      const user = await User.findOne({
        where: { email },
      });

      const basketId = user.id;
      const basketProduct = await BasketProduct.create({
        basketId,
        productId,
      });
      return res.json(basketProduct);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //-----------------------------------DELETE ONE----------------------------------//

  async deleteFromBasket(req, res, next) {
    try {
      let { email, product } = req.params;
      const user = await User.findOne({
        where: { email },
      });
      const productId = product;
      const basketId = user.id;
      const basket = await BasketProduct.destroy({
        where: { basketId, productId },
        limit: 1,
      });
      return res.json({ message: "product deleted" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

    //-----------------------------------DELETE ALL----------------------------------//

    async deleteProductFromBasket(req, res, next) {
      try {
        let { email, product } = req.params;
        const user = await User.findOne({
          where: { email },
        });
        const productId = product;
        const basketId = user.id;
        const basket = await BasketProduct.destroy({
          where: { basketId, productId }
        });
        return res.json({ message: "product deleted" });
      } catch (e) {
        next(ApiError.badRequest(e.message));
      }
    }

  //-----------------------------------DELETE ALL FROM BASKET----------------------------------//

  async deleteAllFromBasket(req, res, next) {
    try {
      let { email } = req.params;
      const user = await User.findOne({
        where: { email },
      });
      const basketId = user.id;
      const basket = await BasketProduct.destroy({
        where: { basketId },
      });

      return res.json({ message: "basket wiped " });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketController();
