'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [
      { name: 'Tops' },
      { name: 'Bottoms' },
      { name: 'Dresses' },
      { name: 'Suits' },
      { name: 'Outerwear' },
      { name: 'Shoes' },
      { name: 'Soft Accessories' },
      { name: 'Hats' },
      { name: 'Bags' },
      { name: 'Furniture' },
      { name: 'Strollers' },
      { name: 'Car Seats' },
      { name: 'Cribs & Bassinets' },
      { name: 'Nursing & Feeding' },
      { name: 'Monitors' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
