'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    productQty: DataTypes.INTEGER,
    productPrice: DataTypes.NUMBER,
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER
  }, {});
  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Product, { foreignKey: "productId" })
    OrderItem.belongsTo(models.Order, { foreignKey: "orderId" })
  };
  return OrderItem;
};
