import User, { UserAttributes } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Retrieve all from the database.
export const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (user) {
            const token = jwt.sign(user, process.env.SECRET_KEY!, { expiresIn: '30d' })
            return res.json({ user, token })
        } else {
            return res.status(422).json(info)
        }
    })(req, res, next)
};
