import { sequelize } from ".";
import { DataTypes, Model, Optional } from "sequelize";

export interface ProductunitAttributes {
  id?:number;
  Productunit_Name: string;
}

interface ProductunitInstance
  extends Model<ProductunitAttributes>,
    ProductunitAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

type ProductsCreationAttributes = Optional<ProductunitInstance, "id">;

const Productunit = sequelize.define<ProductunitInstance>("productunit", {
  Productunit_Name: {
    type: DataTypes.STRING,
  }
});

(async () => {
  await Productunit.sequelize?.sync({ force: false,alter:false });
})();


export default Productunit;
