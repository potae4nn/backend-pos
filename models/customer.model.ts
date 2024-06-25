import { sequelize } from ".";
import { DataTypes, Model } from "sequelize";

export interface CustomerAttributes {
  Customer_Name: string;
  Customer_Code: string;
  Customer_Contact: string;
  Customer_Address:string;
}

interface CustomerInstance
  extends Model<CustomerAttributes>,
  CustomerAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Customer = sequelize.define<CustomerInstance>(
  'customer',
  {
    Customer_Name: {
      type: DataTypes.STRING,
    },
    Customer_Code: {
      type: DataTypes.STRING,
    },
    Customer_Contact: {
      type: DataTypes.STRING,
    },
    Customer_Address: {
      type: DataTypes.STRING,
    }
  }
);

(async () => {
  await Customer.sequelize?.sync({ force: false,alter:false });
})();


export default Customer;

