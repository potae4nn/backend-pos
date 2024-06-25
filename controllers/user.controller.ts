import User, { UserAttributes } from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Op from "sequelize";


// Retrieve all from the database.
export const findAll = async (req: Request, res: Response) => {
  await User.findAll({
    attributes: { exclude: ["User_password"] },
  }).then((data) => {
    res.send(data);
  });
};

export const findOne = async (req: Request, res: Response) => {
  const User_Username = req.params.name;
  await User.findOne({
    where: { User_Username: User_Username },
    attributes: { exclude: ["User_password"] },
  }).then((data) => {
    res.send(data);
  });
};

export const findById = async (req: Request, res: Response) => {
  const id = req.params.id;
  await User.findByPk(id, {
    attributes: { exclude: ["User_password"] },
  }).then((data) => {
    res.send(data);
  });
};

export const create = async (req: Request, res: Response) => {
  // return console.log(req);
  if (!req.body.User_Username) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const hashedPassword = bcrypt.hashSync(req.body.User_password, 10);
  // Create
  const user: UserAttributes = {
    User_Username: req.body.User_Username,
    User_password: hashedPassword,
    User_contact: req.body.User_contact,
    User_Designation: req.body.User_Designation,
    User_Fullname: req.body.User_Fullname,
    User_Account_Type: req.body.User_Account_Type,
  };
  // Save in the database
  await User.create(user)
    .then(() => {
      res.send({ message: "Create success" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the students.",
      });
    });
};
