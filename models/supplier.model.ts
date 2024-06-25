import { sequelize } from ".";
import { DataTypes, Model } from "sequelize";

interface SupplierAttributes {
  Supplier_Name: string;
  Supplier_Code: string;
  Supplier_Contact: string;
  Supplier_Address: string;
  Supplier_Email: string;
}

interface SupplierInstance
  extends Model<SupplierAttributes>,
    SupplierAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Supplier = sequelize.define<SupplierInstance>("supplier", {
  Supplier_Name: {
    type: DataTypes.STRING,
  },
  Supplier_Code: {
    type: DataTypes.STRING,
  },
  Supplier_Contact: {
    type: DataTypes.STRING,
  },
  Supplier_Address: {
    type: DataTypes.TEXT,
  },
  Supplier_Email: {
    type: DataTypes.STRING,
  },
});

(async () => {
  await Supplier.sequelize?.sync({ force: false,alter:false });
})();

export default Supplier;
