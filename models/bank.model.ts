import { sequelize } from ".";
import { DataTypes, Model } from "sequelize";

export interface BankAttributes {
  Bank_Name: string;
  Bank_Status?: string;
}

interface BankInstance
  extends Model<BankAttributes>,
  BankAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Bank = sequelize?.define<BankInstance>(
  'bank',
  {
    Bank_Name: {
      type: DataTypes.STRING,
    },
    Bank_Status: {
      type: DataTypes.ENUM,
      values: ['active', 'cancel'],
      defaultValue:'active'
    }
  }
);

(async () => {
  await Bank.sequelize?.sync({ force: false,alter:false });
})();

export default Bank;
