'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    description: DataTypes.TEXT,
    retailPrice: DataTypes.NUMBER,
    productImg: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {});
  Product.associate = function (models) {
    const ProductTagMap = {
      foreignKey: "productId",
      through: models.ProductTag,
      otherKey: "tagId"
    }

    const ProductSizeMap = {
      foreignKey: "productId",
      through: models.ProductSize,
      otherKey: "sizeId"
    }
    Product.belongsToMany(models.Tag, ProductTagMap)
    Product.belongsToMany(models.Size, ProductSizeMap)
    Product.belongsTo(models.Category, { foreignKey: "categoryId" })
    Product.hasMany(models.Review, { foreignKey: "productId" })
    Product.hasMany(models.OrderItem, { foreignKey: "productId" })
  };
  return Product;
};
