'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    orderDate: DataTypes.DATE,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    orderTotal: DataTypes.NUMBER,
    userId: DataTypes.INTEGER
  }, {});
  Order.associate = function (models) {
    Order.belongsTo(models.User, { foreignKey: "userId" })
    Order.hasMany(models.OrderItem, { foreignKey: "orderId" })
  };
  return Order;
};
