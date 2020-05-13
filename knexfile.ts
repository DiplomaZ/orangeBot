// Update with your config settings.
import 'dotenv/config';
import path from 'path';

export const development = {
    client: 'postgresql',
    useNullAsDefault: true,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
    },
    migrations: {
        extenstions: 'ts',
        directory: path.resolve('src', 'db', 'migrations'),
    },

    seeds: {
        directory: path.resolve('src', 'db', 'seeds'),
    },
    pool: {
        min: 2,
        max: 10,
    },
};
export const production = {
    client: 'postgresql',
    connection: {
        database: 'my_db',
        user: 'username',
        password: 'password',
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
    },
};
