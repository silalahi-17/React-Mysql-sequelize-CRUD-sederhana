'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hapus index unik dengan nama 'code'
    await queryInterface.removeIndex('Products', 'code');

    // Ubah kolom 'code' supaya tidak unique lagi
    await queryInterface.changeColumn('Products', 'code', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback: tambahkan kembali index unik pada 'code'
    await queryInterface.addIndex('Products', ['code'], {
      unique: true,
      name: 'code',
    });

    await queryInterface.changeColumn('Products', 'code', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  }
};
