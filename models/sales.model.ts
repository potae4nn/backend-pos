import { sequelize } from ".";
import { DataTypes, Model } from "sequelize";
import Products from "./product.model";
import Invoice from "./invoice.model";

export interface SalesAttributes {
  Sales_Quantity: number;
  Sales_Unit_Price: number;
  Sales_Sub_Total: number;
  productId?:number;
  invoiceId?:number;
}

interface SalesInstance
  extends Model<SalesAttributes>,
    SalesAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Sales = sequelize.define<SalesInstance>(
  'sales',
  {
    Sales_Quantity: {
      type: DataTypes.INTEGER,
    },
    Sales_Unit_Price: {
      type: DataTypes.FLOAT,
    },
    Sales_Sub_Total: {
      type: DataTypes.INTEGER,
    },
  }
)

Products.hasMany(Sales);
Sales.belongsTo(Products,{
  foreignKey: 'productId',
  as: 'product'
});

Invoice.hasMany(Sales);
Sales.belongsTo(Invoice,{
  foreignKey: 'invoiceId',
  as: 'invoice'
});

(async () => {
  await Sales.sequelize?.sync({ force: false,alter:false });
})();

export default Sales;