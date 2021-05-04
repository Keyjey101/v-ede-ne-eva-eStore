const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { Product, ProductInfo } = require("../models/models");
const ApiError = require("../handlers/ApiError");
const fs = require("fs-extra");

class ProductController {
  //-----------------------------------CREATE----------------------------------//
  async create(req, res, next) {
    try {
      let { name, value, typeId, veganId, info } = req.body;

      const { img } = req.files;
      let fileName = uuidv4() + ".jpg";

      const product = await Product.create({
        name,
        value,
        typeId,
        veganId,
        img: fileName,
      });
      img.mv(path.resolve(__dirname, "..", "client/build", fileName));

      if (info) {
        info = JSON.parse(info);
        info.forEach((element) => {
          ProductInfo.create({
            title: element.title,
            content: element.content,
            productId: product.id,
          });
        });
      }

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  //-----------------------------------GET ALL----------------------------------//
  async getAll(req, res) {
    let { typeId, veganId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let products;

    if (!typeId && !veganId) {
      products = await Product.findAndCountAll({ limit, offset });
    }
    if (typeId && !veganId) {
      products = await Product.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (!typeId && veganId) {
      products = await Product.findAndCountAll({
        where: { veganId },
        limit,
        offset,
      });
    }
    if (typeId && veganId) {
      products = await Product.findAndCountAll({
        where: { typeId, veganId },
        limit,
        offset,
      });
    }

    return res.json(products);
  }
  //-----------------------------------GET ONE----------------------------------//
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id },
        include: [{ model: ProductInfo, as: "info" }],
      });
      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //-----------------------------------UPDATE----------------------------------//

  async update(req, res, next) {
    try {
      // find product to replace IMG
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id },
      });

      let { name, value, typeId, veganId, info } = req.body;
      
      const { img } = req.files;
      let fileName = product.img;

      const newProduct = await Product.update(
        { name, value, typeId, veganId, img: fileName },
        {
          where: { id },
        }
      );
      img.mv(path.resolve(__dirname, "..", "client/build", fileName));



const delInfo = ProductInfo.destroy(
  {where: {productId: id}}
)



      if (info) {
        info = JSON.parse(info);
        info.forEach((element) => {
          ProductInfo.create(
            {
              title: element.title,
              content: element.content,
            
             productId: id }
          );
        });
      }

      return res.json({ message: `product with id${id} has been updated` });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //-----------------------------------DELETE ONE----------------------------------//
  async deleteOne(req, res, next) {
    //Finding product cz want get file name of image that belongs to product
    try {
      console.log("deleting one product");
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id },
      });

      //deleting image
try {
      const deleteImg = fs.unlinkSync(
        path.resolve(__dirname, "../client/build", product.img)
      );
      }
      catch(e){
        console.log(e)
      }
      //deleting product data
      const deleteProduct = await Product.destroy({ where: { id } });

      const delInfo = ProductInfo.destroy(
        {where: {productId: id}}
      )

      return res.json({ message: "product is successfuly deleted" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  //-----------------------------------DELETE ALL----------------------------------//
  async deleteAll(req, res, next) {
    try {
      console.log("deleting all products");

      const images = await Product.findAll({where: {}})
//deleting images
try {
images.map(x => fs.unlinkSync(path.resolve(__dirname, "../client/build", x.img)))
}
catch(e){
  console.log(e)
}
      const deleteProducts = await Product.destroy({ where: {} });

      const delInfo = ProductInfo.destroy(
        {where: {}}
      )

      

      

      return res.json({ message: "ALL products are successfuly deleted" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ProductController();
