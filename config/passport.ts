import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import * as passportLocal from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user.model";

import dotenv from "dotenv";
dotenv.config();
const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy(async function verify(
    username: string,
    password: string,
    cb: any
  ) {
    try {
      const user = await User.findOne({
        where: { User_Username: username },
      });

      if (!user?.dataValues) {
        return cb(null, false, { message: "ชื่อผู้ใช้ไม่ถูกต้อง" });
      }
      bcrypt.compare(
        password,
        user.dataValues?.User_password,
        function (_err, res) {
          if (!res) {
            return cb(null, false, { message: "รหัสผ่านไม่ถูกต้อง" });
          }
          const returnStaff = {
            id: user.dataValues.id,
            fullname: user.dataValues.User_Fullname,
            username: user.dataValues.User_Username,
            contact: user.dataValues.User_contact,
          };
          return cb(null, returnStaff, {
            massage: "Logged In Successfully",
          });
        }
      );
    } catch (error) {
      return cb(null, false, {
        massage: error,
      });
    }
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (jwtPayload, cd) => {
      try {
        const user = await User.findOne({ where: { id: jwtPayload.id } });
        if (jwtPayload.id === user?.dataValues.id) {
          return cd(null, true);
        } else {
          return cd(null, false);
        }
      } catch (error) {
        return cd(null, false);
      }
    }
  )
);
