//importing necessary modules
import express from 'express';
import dotenv from 'dotenv';
import https from 'https';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as fs from 'fs';
// importing necessary files
import client from './database';
import usersRoutes from './handlers/users';
import qrRoutes from './handlers/usersQrCodeGenerator';
import loginRoutes from './handlers/login';

//https mode options
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
};

//ENV variables
dotenv.config();
const app: express.Application = express();
const port = process.env.PORT;

//Top level middleware
//cookie parser
app.use(cookieParser());
app.use(express.json());
//Static file server:
app.use(
    express.static(path.join(__dirname, '../../frontend'), {
        extensions: ['html', 'css'],
    })
);
const corsOptions = {
    origin: '*', // Allow all origins (not recommended for production unless necessary)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and credentials
    optionsSuccessStatus: 200, // Use 200 instead of 204 to support more browsers
};

// Use cors middleware with the modified options
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
// Process-level unhandled exception handler
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
});
//Handlers Initiation
usersRoutes(app);

console.log('Sessions routes initiated');
loginRoutes(app);
console.log('login routes initiated');
qrRoutes(app);
console.log('QR routes initiated');
//static file server
app.use('/static', express.static(path.join(__dirname, 'public')));

//spinning the server

//http mode
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

//HTTPS mode
https.createServer(options, app).listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
//check DB connection
client.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error(
            'Error connecting to database: CRITICAL faliure',
            err.message
        );
    } else {
        console.log(`Initiated and connected at: ${res.rows[0].now}`);
    }
});
export default app;
