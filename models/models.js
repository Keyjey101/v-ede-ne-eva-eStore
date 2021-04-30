const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user',
    {
id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
email: {type: DataTypes.STRING, unique: true },
password: {type: DataTypes.STRING },
role: {type: DataTypes.STRING, defaultValue: "USER"}
    }
)

const Product = sequelize.define('product',
    {
id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
name: {type: DataTypes.STRING, unique: true, allowNull: false},
value: {type: DataTypes.INTEGER, allowNull: false },
raiting: {type: DataTypes.INTEGER, defaultValue: 0 },
img: {type: DataTypes.STRING, allowNull: false },
    }
)

const Type = sequelize.define('type',
    {
id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
name: {type: DataTypes.STRING, unique: true, allowNull: false},
    }
)

const Vegan = sequelize.define('vegan',
    {
id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
name: {type: DataTypes.STRING, unique: true, allowNull: false},
    }
)


const ProductInfo = sequelize.define('product_info',
    {
id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
title: {type: DataTypes.STRING, unique: true, allowNull: false},
content: {type: DataTypes.STRING, unique: true, allowNull: false},
    }
)

const Raiting = sequelize.define('raiting',
    {
id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
rate: {type: DataTypes.INTEGER},
    }
)

const Basket = sequelize.define('basket',
    {
id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    }
)

const BasketProduct = sequelize.define('basket_product',
    {
id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    }
)

const VeganType = sequelize.define('vegan_type',
    {
id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    }
)











User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Raiting)
Raiting.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Type.hasMany(Product)
Product.belongsTo(Type)

Vegan.hasMany(Product)
Product.belongsTo(Vegan)

Product.hasMany(Raiting)
Raiting.belongsTo(Product)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

Type.belongsToMany(Vegan, {through: VeganType})
Vegan.belongsToMany(Type, {through: VeganType})

module.exports = {
    User, Product, Type, Vegan, ProductInfo, Raiting, Basket, BasketProduct, VeganType
}