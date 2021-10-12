'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductTags', [
      { tagId: 1, productId: 1 },
      { tagId: 1, productId: 2 },
      { tagId: 8, productId: 3 },
      { tagId: 6, productId: 4 },
      { tagId: 9, productId: 5 },
      { tagId: 3, productId: 6 },
      { tagId: 5, productId: 7 },
      { tagId: 1, productId: 8 },
      { tagId: 5, productId: 9 },
      { tagId: 1, productId: 10 },
      { tagId: 2, productId: 11 },
      { tagId: 6, productId: 12 },
      { tagId: 6, productId: 13 },
      { tagId: 6, productId: 14 },
      { tagId: 6, productId: 15 },
      { tagId: 13, productId: 16 },
      { tagId: 13, productId: 17 },
      { tagId: 15, productId: 18 },
      { tagId: 11, productId: 19 },
      { tagId: 11, productId: 20 },
      { tagId: 11, productId: 21 },
      { tagId: 14, productId: 22 },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductTags', null, {});
  }
};
