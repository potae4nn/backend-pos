import { sequelize } from ".";
import { DataTypes, Model } from "sequelize";

export interface CategoryAttributes {
  Category_Name: string;
  Category_Status?: boolean;
  Category_Description: string;
}

interface CategoryInstance
  extends Model<CategoryAttributes>,
  CategoryAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Category = sequelize?.define<CategoryInstance>(
  'category',
  {
    Category_Name: {
      type: DataTypes.STRING,
    },
    Category_Status: {
      type: DataTypes.BOOLEAN,
    },
    Category_Description: {
      type: DataTypes.STRING,
    }
  }
);

(async () => {
  await Category.sequelize?.sync({ force: false,alter:false });
})();

export default Category;
