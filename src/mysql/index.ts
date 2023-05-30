import mysql from 'mysql';

require('dotenv').config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  timezone: process.env.DB_TIMEZONE,
  multipleStatements: true,
  useConnectionPooling: true,
};

const pool = mysql.createPool(config);

export const sqlQuery = (sql: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(sql, (error, results, fields) => {
        connection.release();

        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
};

export const connection = mysql.createConnection(config);
