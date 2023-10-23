import { Sequelize } from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '@config';

console.log("DB_HOST " + DB_HOST);

console.log("DB_PORT " + DB_PORT);

console.log("DB_USER " + DB_USER);

console.log("DB_PASSWORD " + DB_PASSWORD);

import { seedTournaments } from './seeders/dev/tournamentSeed';
const dbPort = parseInt(DB_PORT);

const sequelizeConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'mysql',
    host: DB_HOST,
    port: dbPort,
});

export const seedPath = async () => {
    switch (NODE_ENV) {
        case 'development':
            await seedTournaments();
        case 'prod':
            await seedTournaments();
        case 'test':
            await seedTournaments();
        default:
            console.error('Unknown environment');
    }
}

export default sequelizeConnection