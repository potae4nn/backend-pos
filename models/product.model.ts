import { sequelize } from ".";
import { DataTypes, Model, Optional } from "sequelize";
import Category from "./category.model";
import Productunit from "./productunit.model";

export interface ProductsAttributes {
  id?: string;
  Product_Name: string;
  Product_Code: string;
  Product_Stock: number;
  Product_Price: number;
  Product_Status?: boolean;
  Product_Description: string;
  Product_Image?:string;
  categoryId?: number;
  productunitId?: number;
}

interface ProductsInstance
  extends Model<ProductsAttributes>,
    ProductsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

type ProductsCreationAttributes = Optional<ProductsInstance, "id">;

const Products = sequelize.define<ProductsCreationAttributes>("product", {
  Product_Name: {
    type: DataTypes.STRING,
  },
  Product_Code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  Product_Stock: {
    type: DataTypes.INTEGER,
  },
  Product_Price: {
    type: DataTypes.FLOAT,
  },
  Product_Status: {
    type: DataTypes.TINYINT("1"),
    defaultValue:1
  },
  Product_Description: {
    type: DataTypes.STRING,
  },
  Product_Image:{
    type: DataTypes.STRING,
  }
});

Category.hasMany(Products);
Products.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Productunit.hasMany(Products);
Products.belongsTo(Productunit, {
  foreignKey: "productunitId",
  as: "productunit",
});

(async () => {
  await Products.sequelize?.sync({ force: false,alter:false });
})();


export default Products;
