import dotenv from 'dotenv';
import client from '../database';
export type User = {
    ID?: number;
    Name: string;
    Phone: string;
    Vip: boolean;
    Points: number;
};
dotenv.config();
//CRUD application
export class UsersFunctions {
    //Create
    async create(user: User): Promise<User> {
        try {
            const sqlConnect = await client.connect();
            const sql =
                'INSERT INTO users (Name,Phone,Vip,Points) VALUES ($1, $2, $3, $4) RETURNING *;';
            const results = await sqlConnect.query(sql, [
                user.Name,
                user.Phone,
                user.Vip,
                user.Points,
            ]);
            const result = results.rows[0];
            sqlConnect.release();
            return result;
        } catch (error) {
            throw new Error(
                'Error creating a user MODULE' + (error as Error).message
            );
        }
    }
    //READ
    async index(): Promise<User[]> {
        try {
            const sqlConnect = await client.connect();
            const sql = 'SELECT * FROM users;';
            const results = await sqlConnect.query(sql);
            const person = results.rows;
            sqlConnect.release();
            return person;
        } catch (error) {
            throw new Error(
                'Error INDEXING attendees MODULE  ' + (error as Error).message
            );
        }
    }
    async show(idOrPhone: number | string): Promise<User | null> {
        try {
            let sql;
            const isPhone = idOrPhone.toString().length >= 10;
            if (!isPhone) {
                sql = 'SELECT * FROM users WHERE id = $1;';
            } else if (isPhone) {
                sql = 'SELECT * FROM users WHERE phone = $1;';
            } else {
                throw new Error(
                    'Invalid parameter type. Please provide either an ID or a phone number.'
                );
            }
            const sqlConnect = await client.connect();
            const results = await sqlConnect.query(sql, [idOrPhone]);
            const result = results.rows[0];
            return result || null; // Return null if no user is found
        } catch (error) {
            throw new Error(
                `Error retrieving user by ID or phone: ${
                    (error as Error).message
                }`
            );
        }
    }
    //UPDATE NOT WORKING ... UPDATE YOUR SQL
    async updateID(user: User): Promise<User> {
        try {
            const sqlConnect = await client.connect();
            const sql = `
            UPDATE users
            SET Name=$2, Phone=$3, Vip=$4, Points=$5
            WHERE id=$1
            RETURNING *;`;
            const results = await sqlConnect.query(sql, [
                user.ID,
                user.Name,
                user.Phone,
                user.Vip,
                user.Points,
            ]);
            const result = results.rows[0];
            console.log(result);
            console.log(user);

            return result;
        } catch (error) {
            throw new Error(
                `Error UPDATING a user of id : ${user.ID} MODULE  ` +
                    (error as Error).message
            );
        }
    }
    async updatePhone(user: User): Promise<User> {
        try {
            const sqlConnect = await client.connect();
            const sql = `
            UPDATE users
            SET Name=$1, Vip=$3, Points=$4
            WHERE Phone=$2
            RETURNING *;`;
            const results = await sqlConnect.query(sql, [
                user.Name,
                user.Phone,
                user.Vip,
                user.Points,
            ]);
            const result = results.rows[0];
            console.log(result);
            console.log(user);

            return result;
        } catch (error) {
            throw new Error(
                `Error UPDATING a user of id : ${user.ID} MODULE  ` +
                    (error as Error).message
            );
        }
    }
    async addPoints(idOrPhone: number | string, Points: number): Promise<User> {
        try {
            const sqlConnect = await client.connect();
            let sql;
            const isPhone = idOrPhone.toString().length >= 10;
            if (!isPhone) {
                sql = `UPDATE users
                        SET Points = Points + $1
                        WHERE id = $2
                        RETURNING *;`;
            } else if (isPhone) {
                sql = `UPDATE users
                        SET Points = Points + $1
                        WHERE Phone = $2
                        RETURNING *;`;
            } else {
                throw new Error(
                    'Invalid parameter type. Please provide either an ID or a phone number.'
                );
            }
            const results = await sqlConnect.query(sql, [Points, idOrPhone]);
            const result = results.rows[0];
            return result;
        } catch (error) {
            throw new Error(
                `Error UPDATING a user of id/phone : ${idOrPhone} MODULE  ` +
                    (error as Error).message
            );
        }
    }
    async deductPoints(
        idOrPhone: number | string,
        Points: number
    ): Promise<User> {
        try {
            const sqlConnect = await client.connect();
            let sql;
            const isPhone = idOrPhone.toString().length >= 10;
            if (!isPhone) {
                sql = `UPDATE users
                        SET Points = Points - $1
                        WHERE id = $2
                        RETURNING *;`;
            } else if (isPhone) {
                sql = `UPDATE users
                        SET Points = Points - $1
                        WHERE Phone = $2
                        RETURNING *;`;
            } else {
                throw new Error(
                    'Invalid parameter type. Please provide either an ID or a phone number.'
                );
            }
            const results = await sqlConnect.query(sql, [Points, idOrPhone]);
            const result = results.rows[0];
            return result;
        } catch (error) {
            throw new Error(
                `Error UPDATING a user of id/phone : ${idOrPhone} MODULE  ` +
                    (error as Error).message
            );
        }
    }
    async delete(idOrPhone: number | string): Promise<User> {
        try {
            {
                const connect = await client.connect();
                let sql = '';
            const isPhone = idOrPhone.toString().length >= 10;

                if (!isPhone) {
                    sql = 'DELETE FROM users WHERE id=($1)';
                } else if (isPhone) {
                    sql = 'SELECT * FROM users WHERE Phone = $1;';
                }
                const results = await connect.query(sql, [idOrPhone]);
                connect.release();
                return results.rows[0];
            }
        } catch (error) {
            throw new Error(
                `Err deleting user of ${idOrPhone} err:` +
                    (error as Error).message
            );
        }
    }
}
export default UsersFunctions;
