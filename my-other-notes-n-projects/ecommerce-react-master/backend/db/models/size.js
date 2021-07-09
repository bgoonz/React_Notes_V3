'use strict';
module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define('Size', {
    size: DataTypes.STRING
  }, {});
  Size.associate = function (models) {
    const sizeProductMap = {
      foreignKey: "sizeId",
      through: "ProductSize",
      otherKey: "productId"
    }

    Size.belongsToMany(models.Product, sizeProductMap)
  };
  return Size;
};
