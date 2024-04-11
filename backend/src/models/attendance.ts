//importing modules
import client from '../database';
export type AttendanceRecord = {
    id?: number;
    attendee_id: number;
    session_id: number;
};
//CRUD application
export class AttendanceFunctions {
    //Create
    async create(
        attendanceRecord: AttendanceRecord
    ): Promise<AttendanceRecord> {
        try {
            const sqlConnect = await client.connect();
            const sql =
                'INSERT INTO attendees_sessions (attendee_id,session_id) VALUES ($1,$2) returning *;';
            const results = await sqlConnect.query(sql, [
                attendanceRecord.attendee_id,
                attendanceRecord.session_id,
            ]);
            const recordResult = results.rows[0]; //name convention
            return recordResult;
        } catch (error) {
            throw new Error(
                `Error creating an attendance records from MODULE : ${error}`
            );
        }
    }
    //READ
    async index(): Promise<AttendanceRecord[]> {
        try {
            const sqlConnect = await client.connect();
            const sql = 'SELECT * FROM attendees_sessions;';
            const results = await sqlConnect.query(sql);
            const sessions = results.rows;
            return sessions;
        } catch (error) {
            throw new Error('Error INDEXING attendees MODULE');
        }
    }

    async show(id: number): Promise<AttendanceRecord> {
        try {
            const sqlConnect = await client.connect();
            const sql = 'SELECT * FROM attendees_sessions WHERE id=($1);';
            const results = await sqlConnect.query(sql, [id]);
            const attendanceRecord = results.rows[0];
            return attendanceRecord;
        } catch (error) {
            throw new Error(
                `Error SHOWING attendance record of id : ${id} MODULE : ${error}`
            );
        }
    }
    async showSessionAttendance(id: number): Promise<AttendanceRecord[]> {
        try {
            const sqlConnect = await client.connect();
            const sql =
                'SELECT * FROM attendees_sessions WHERE session_id=($1)';
            const results = await sqlConnect.query(sql, [id]);
            const attendanceRecord = results.rows;
            return attendanceRecord;
        } catch (error) {
            throw new Error(
                `Error SHOWING attendance record of id : ${id} MODULE : ${error}`
            );
        }
    }
    async showAttendeeAttendance(id: number): Promise<AttendanceRecord[]> {
        try {
            const sqlConnect = await client.connect();
            const sql =
                'SELECT * FROM attendees_sessions WHERE attendee_id=($1)';
            const results = await sqlConnect.query(sql, [id]);
            const attendanceRecord = results.rows;
            return attendanceRecord;
        } catch (error) {
            throw new Error(
                `Error SHOWING attendance record of id : ${id} MODULE : ${error}`
            );
        }
    }
    //UPDATE
    async update(
        attendanceRecord: AttendanceRecord
    ): Promise<AttendanceRecord> {
        try {
            const sqlConnect = await client.connect();

            const sql =
                'UPDATE attendees_sessions SET attendee_id=($2),session_id=($3) WHERE id =($1);';
            const results = await sqlConnect.query(sql, [
                attendanceRecord.id,
                attendanceRecord.attendee_id,
                attendanceRecord.session_id,
            ]);
            const recordResult = results.rows[0];
            return recordResult;
        } catch (error) {
            throw new Error(
                `Error UPDATING an attendace record of id : ${attendanceRecord.id} MODULE + ${error}`
            );
        }
    }
    async delete(id: number): Promise<AttendanceRecord> {
        try {
            {
                const connect = await client.connect();
                const sql = 'DELETE FROM attendees_sessions WHERE id=($1)';
                const results = await connect.query(sql, [id]);
                connect.release();
                return results.rows[0];
            }
        } catch (error) {
            throw new Error(
                `Err deleting attendance record of ${id} err: + ${error}`
            );
        }
    }
}
export default AttendanceFunctions;
