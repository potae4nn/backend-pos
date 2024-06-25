import { sequelize } from ".";
import { DataTypes, Model } from "sequelize";
import Customer from "./customer.model";
import User from "./user.model";
import Bank from "./bank.model";

export interface InvoiceAttributes {
  id?:number;
  Invoice_Total_Amount: number;
  Invoice_Payment_Type: number;
  Invoice_Sub_Total: number;
  Invoice_Amount_Tendered: number;
  Invoice_Bank_Account_Name: string;
  Invoice_Bank_Account_Number: string;
  customerId?:number;
  userId?:number;
  bankId?:number;
  createdAt?: Date;
}

interface InvoiceInstance extends Model<InvoiceAttributes>, InvoiceAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Invoice = sequelize.define<InvoiceInstance>("invoice", {
  Invoice_Total_Amount: {
    type: DataTypes.FLOAT,
  },
  Invoice_Payment_Type: {
    type: DataTypes.INTEGER,
  },
  Invoice_Sub_Total: {
    type: DataTypes.INTEGER,
  },
  Invoice_Amount_Tendered: {
    type: DataTypes.FLOAT,
  },
  Invoice_Bank_Account_Name: {
    type: DataTypes.STRING,
  },
  Invoice_Bank_Account_Number: {
    type: DataTypes.STRING,
  },
});

Customer.hasMany(Invoice);
Invoice.belongsTo(Customer,{
  foreignKey: 'customerId',
  as: 'customer'
});

User.hasMany(Invoice);
Invoice.belongsTo(User,{
  foreignKey: 'userId',
  as: 'user'
});

Bank.hasMany(Invoice);
Invoice.belongsTo(Bank,{
  foreignKey: 'bankId',
  as: 'bank'
});

(async () => {
  await Invoice.sequelize?.sync({ force: false,alter:true });
})();

export default Invoice;
