// import jwt from 'jsonwebtoken';
import { login } from '../middleware/login';
import * as path from 'path';
import express, { Request, Response } from 'express';
// import verifyAuthToken from '../middleware/authentication';
//CREATE
/*
const loginFile = async (req: Request, res: Response) => {
    try {
        const filePath = path.join(__dirname, '../../../frontend/login.html');
        res.sendFile(filePath);
    } catch (error) {
        res.send((error as Error).message);
        throw new Error(`${error} , ERR Creating attendees, from handlers `);
    }
};

*/
//CHANGE THIS PLZ
const loginFile = async (req: Request, res: Response) => {
    try {
        const filePath = path.join(__dirname, '../../../frontend/login.html');
        res.sendFile(filePath);
    } catch (error) {
        res.send((error as Error).message);
        throw new Error(`${error} , ERR Creating attendees, from handlers `);
    }
};
const loginFunc = async (req: Request, res: Response) => {
    try {
        res.redirect('./');
    } catch (error) {
        throw new Error(`${error} , ERR selecting attendees, from handlers `);
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        if (!req.cookies.token) {
            res.redirect('./login');
        }
        res.clearCookie('token');
        res.redirect('./login');
    } catch (error) {
        res.send((error as Error).message);
        throw new Error(`${error} , ERR Creating attendees, from handlers `);
    }
};
//Defining routes
const loginRoutes = (app: express.Application) => {
    app.get('/login', loginFile);
    app.get('/logout', logout);
    app.post('/login', login, loginFunc);
};

export default loginRoutes;
