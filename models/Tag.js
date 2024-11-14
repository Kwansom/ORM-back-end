const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

const Product = require("./Product.js"); // Import Product model
const ProductTag = require("./ProductTag.js"); // Import ProductTag model

class Tag extends Model {}

Tag.init(
  // define columns
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tag_name: {
      type: DataTypes.STRING,
      field: "tag_name",
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

module.exports = Tag;
