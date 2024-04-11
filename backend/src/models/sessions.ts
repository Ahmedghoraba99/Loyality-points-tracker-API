//importing modules
import client from '../database';

export type Session = {
    id?: number;
    session_name: string;
    lecturer: string;
    session_date: string;
    place: string;
};
//CRUD application
export class SessionsFunctions {
    //Create
    async create(session: Session): Promise<Session> {
        try {
            const sqlConnect = await client.connect();
            const sql =
                'INSERT INTO sessions (session_name,lecturer,session_date,place) VALUES ($1,$2,$3,$4)';
            const results = await sqlConnect.query(sql, [
                session.session_name,
                session.lecturer,
                session.session_date,
                session.place,
            ]);
            const sessionResult = results.rows[0]; //name convention
            return sessionResult;
        } catch (error) {
            throw new Error(`Error creating an attendee MODULE : ${error}`);
        }
    }
    //READ Note that it returns an array of results to the user
    async index(): Promise<Session[]> {
        try {
            const sqlConnect = await client.connect();
            const sql = 'SELECT * FROM sessions;';
            const results = await sqlConnect.query(sql);
            const sessions = results.rows;
            return sessions;
        } catch (error) {
            throw new Error('Error INDEXING attendees MODULE');
        }
    }
    async show(id: number): Promise<Session> {
        try {
            const sqlConnect = await client.connect();
            const sql = 'SELECT * FROM sessions WHERE id=($1);';
            const results = await sqlConnect.query(sql, [id]);
            const session = results.rows[0];
            return session;
        } catch (error) {
            throw new Error(
                `Error INDEXING sessions of id : ${id} MODULE : ${error}`
            );
        }
    }
    //UPDATE TO TEST
    async update(session: Session): Promise<Session> {
        try {
            const sqlConnect = await client.connect();

            const sql =
                'UPDATE sessions SET session_name=($2),lecturer=($3),session_date=($4),place=($5) WHERE id =($1);';
            const results = await sqlConnect.query(sql, [
                session.id,
                session.session_name,
                session.lecturer,
                session.session_date,
                session.place,
            ]);
            const person = results.rows[0];
            return person;
        } catch (error) {
            throw new Error(
                `Error UPDATING an attendee of id : ${session.id} MODULE`
            );
        }
    }
    async delete(id: number): Promise<Session> {
        try {
            {
                const connect = await client.connect();
                const sql = 'DELETE FROM sessions WHERE id=($1) RETURNING *';
                const results = await connect.query(sql, [id]);
                connect.release();
                return results.rows[0];
            }
        } catch (error) {
            throw new Error(`Err deleting attendee of ${id} err:` + error);
        }
    }
}
export default SessionsFunctions;
