//importing modules
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const tokenSecret = process.env.TOKEN_SECRET as string;
//auth. function
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        // const authorizationHeader = req.headers.authorization as string;

        ///MODIFIED TO WORK WITH COOKIES INSTEAD !!!
        const authorizationHeader = ('Bearer ' + req.cookies.token) as string;
        //console.log('token from req header:  ' + authorizationHeader);
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, tokenSecret);
        next();
        return;
    } catch (err) {
        return res.status(401).send(err + '  access denied!');
    }
};

export default verifyAuthToken;
