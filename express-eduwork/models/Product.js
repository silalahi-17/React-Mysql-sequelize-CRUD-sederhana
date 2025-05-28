
module.exports = (sequelize, DataTypes) => {
  const Product =  sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    images: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'products', // <== tambahkan ini agar cocok dengan nama tabel di DB
    timestamps: true
  });

  return Product;

};