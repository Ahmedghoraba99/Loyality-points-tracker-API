//importing modules
// import { Request, Response, NextFunction, query } from 'express';
import jwt from 'jsonwebtoken';
import client from '../database';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

const tokenSecret = process.env.TOKEN_SECRET as string;
const pepper = process.env.BCRYPT_PASSWORD as string;

//auth. function

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const email = req.body.email as unknown as string;
        const password = req.body.password as unknown as string;
        console.log(email + password);

        const connection = await client.connect();
        const sql = 'SELECT * FROM attendees WHERE email = $1';
        const result = await connection.query(sql, [email]);
        const user = result.rows[0];
        console.log(user);

        connection.release();
        const passwordMatch = await bcrypt.compare(
            password + pepper,
            user.password_hash
        );
        console.log(passwordMatch);

        if (passwordMatch) {
            const token = jwt.sign(
                {
                    id: user.id,
                    userName: `${user.first_name} ${user.family_name}`,
                    email: user.email,
                },
                tokenSecret
            );
            res.status(200).setHeader('Authorization', `Bearer ${token}`);
            res.cookie('token', token, {
                httpOnly: true,
                secure: false, // Set to true if using HTTPS
                sameSite: 'lax', // Adjust this based on your requirements
                maxAge: 9900000, // Adjust the expiration time as needed (1 hour in milliseconds)
            });
            console.log(token);
            next();
            return token;
        } else {
            res.redirect('/login');
            return false;
        }
    } catch (err) {
        res.redirect('/login');
        throw new Error(
            'Error from login Middleware ' + (err as Error).message
        );
    }
};

export const createToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = await login(req, res, next);
    if (token) {
        // res.status(200).setHeader('Authorization', `Bearer ${token}`);
        res.status(200);
    } else {
        res.status(401).json({
            message: 'Login Failed',
        });
    }
};
