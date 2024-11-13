// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");
const Category = require("./Category"); // Import Category model
const Tag = require("./Tag"); // Import Tag model
const ProductTag = require("./ProductTag"); // Import ProductTag model

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  // define columns
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDeceimal: true, // validates that the value is a decimal
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10, // sets default value of 10 for stock
      validate: {
        isNumeric: true, // validates that the value is numeric
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category", //References 'category' model, foreign key refers to the 'id' of the category model
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);


module.exports = Product;
