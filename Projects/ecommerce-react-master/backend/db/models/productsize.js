'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductSize = sequelize.define('ProductSize', {
    inventoryNum: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    sizeId: DataTypes.INTEGER
  }, {});
  ProductSize.associate = function (models) {
  };
  return ProductSize;
};
