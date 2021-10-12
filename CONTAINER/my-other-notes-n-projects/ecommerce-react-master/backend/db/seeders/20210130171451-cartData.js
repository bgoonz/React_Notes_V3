'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('OrderItems', [
      { productQty: 1, productPrice: 36, productId: 1, orderId: 1 },
      { productQty: 1, productPrice: 272, productId: 5, orderId: 1 },
      { productQty: 1, productPrice: 40, productId: 2, orderId: 1 },
      { productQty: 1, productPrice: 60, productId: 12, orderId: 1 },
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OrderItems', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
