// Importing modules
import qrcode, { QRCodeToFileOptions } from 'qrcode';
import client from '../database';
//QR options
const qrOpts: QRCodeToFileOptions = {
    color: {
        dark: '#000000ff', // Blue dots
        light: '#ffffffff', // Transparent background
    },
    type: 'svg',
    errorCorrectionLevel: 'M',
};

export async function singleQRcodeGeneratorID(id: number) {
    try {
        const result = await client.query('SELECT * FROM users WHERE id = $1', [
            id,
        ]);
        console.log(result.rows);

        // Check if any rows were returned
        if (result.rows.length > 0) {
            const userID = result.rows[0].id;
            const userName = result.rows[0].name;
            const userPhone = result.rows[0].phone;
            //Constructing QR data Object
            const qrData = JSON.stringify({
                ID: userID,
                userName: userName,
                userPhone: userPhone,
            });
            const path = `./users_qr_codes/${userID}_${userName}.svg`;
            qrcode.toFile(path, qrData, qrOpts);
        } else {
            console.log('No user found with the provided phone number');
        }
    } catch (error) {
        console.error('Error executing query:', (error as Error).message);
    }
}
export async function singleQRcodeGeneratorPhone(phone: number) {
    try {
        const result = await client.query(
            'SELECT * FROM users WHERE Phone = $1',
            [phone]
        );

        // Check if any rows were returned
        if (result.rows.length > 0) {
            const userID = result.rows[0].id;
            const userName = result.rows[0].name;
            const userPhone = result.rows[0].phone;
            //Constructing QR data Object
            const qrData = JSON.stringify({
                ID: userID,
                userName: userName,
                userPhone: userPhone,
            });
            const path = `./users_qr_codes/${userID}_${userName}.svg`;
            qrcode.toFile(path, qrData, qrOpts);
        } else {
            console.log('No user found with the provided phone number');
        }
    } catch (error) {
        console.error('Error executing query:', (error as Error).message);
    }
}
