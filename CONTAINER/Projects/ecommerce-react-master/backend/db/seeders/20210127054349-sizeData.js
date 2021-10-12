'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sizes', [
      { size: 'n/a' },
      { size: 'Newborn' },
      { size: '0-3mo' },
      { size: '6-9mo' },
      { size: '9-12mo' },
      { size: '12-18mo' },
      { size: '18-24mo' },
      { size: '24mo' },
      { size: '36mo' },
      { size: '2t' },
      { size: '3t' },
      { size: '4t' },
      { size: '4' },
      { size: '5' },
      { size: '6' },
      { size: '7' },
      { size: '8' },
      { size: '9' },
      { size: '10' },
      { size: '11' },
      { size: 'XS' },
      { size: 'S' },
      { size: 'M' },
      { size: 'L' },
      { size: 'XL' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sizes', null, {});
  }
};
