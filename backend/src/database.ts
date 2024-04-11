//databases connection file
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
    POSTGRES_DB_TEST,
} = process.env;

let database;

if (ENV === 'dev') {
    database = {
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
    };
} else if (ENV === 'test') {
    database = {
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    };
}

const client = new Pool(database);

client.on('connect', () => {
    console.log('Connected to database at: ' + performance.now());
});

client.on('error', (err) => {
    console.error(
        'Error connecting to database: database file running :',
        err.message
    );
});

export default client;
