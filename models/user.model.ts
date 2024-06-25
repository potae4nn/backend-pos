import { sequelize } from ".";
import { DataTypes, Model } from "sequelize";

export interface UserAttributes {
  id?:number
  User_Username: string;
  User_password: string;
  User_Fullname: string;
  User_Designation: number;
  User_contact: string;
  User_Account_Type?: number;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = sequelize.define<UserInstance>("user", {
  User_Username: {
    type: DataTypes.STRING,
  },
  User_password: {
    type: DataTypes.STRING,
  },
  User_Fullname: {
    type: DataTypes.STRING,
  },
  User_Designation: {
    type: DataTypes.INTEGER("1"),
  },
  User_contact: {
    type: DataTypes.STRING,
  },
  User_Account_Type: {
    type: DataTypes.INTEGER("1"),
  },
});

(async () => {
  await User.sequelize?.sync({ force: false,alter:false });
})();

export default User;
