import {
    //generateAllQrCodes,
    singleQRcodeGeneratorID,
    singleQRcodeGeneratorPhone,
} from '../models/usersQrCodeGenerator';
import verifyAuthToken from '../middleware/authentication';
//import * as path from 'path';
import express, { Request, Response } from 'express';

const singleQRId = async (req: Request, res: Response) => {
    try {
        singleQRcodeGeneratorID(req.params.id as unknown as number);
        res.status(200).send('QR code generated');
    } catch (error) {
        res.status(400).send(
            'Error Generating qr code ' + (error as Error).message
        );
        throw new Error(`Can't create QR code for user`);
    }
};
const singleQRPhone = async (req: Request, res: Response) => {
    try {
        singleQRcodeGeneratorPhone(req.params.phone as unknown as number);
        res.status(200).send('QR code generated');
    } catch (error) {
        res.status(400).send(
            'Error Generating qr code ' + (error as Error).message
        );
        throw new Error(`Can't create QR code for user`);
    }
};
/*
const allQR = async (_req: Request, res: Response) => {
    try {
        generateAllQrCodes();
        res.send('Sessions QR codes generated');
    } catch (error) {
        res.send(
            'Error Generating Sessions qr code' + (error as Error).message
        );
        throw new Error(`Can't create QR code for session`);
    }
};
*/
const qrRoutes = (app: express.Application) => {
    app.get('/api/genqrid/:id', singleQRId);
    app.get('/api/genqrphone/:phone', singleQRPhone);
    //app.get('/api/allqrcodes/', allQR);
};
//exporting routes
export default qrRoutes;
