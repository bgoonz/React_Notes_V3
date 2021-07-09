'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});
  Tag.associate = function (models) {
    const tagProductMap = {
      foreignKey: "tagId",
      through: "ProductTag",
      otherKey: "productId"
    }

    Tag.belongsToMany(models.Product, tagProductMap)
  };
  return Tag;
};
