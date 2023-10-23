import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dbInit from './models';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import router from './routes';
import { seedPath } from 'database';

export class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor() {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;
    }

    public async initialize() {
        await this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    public listen() {
        try {
            this.app.listen(this.port, () => {
                logger.info(`=================================`);
                logger.info(`======= ENV: ${this.env} =======`);
                logger.info(`🚀 App listening on the port ${this.port}`);
                logger.info(`=================================`);
            });
        } catch (e) { logger.error(e) }

    }

    public getServer() {
        return this.app;
    }

    private async initializeDatabase() {
        try {
            await dbInit();
            await seedPath();
        } catch (e) { console.log("SYNC TO DB  " + e) }
    }

    private initializeMiddlewares() {
        this.app.use(morgan(LOG_FORMAT, { stream }));
        this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes() {
        this.app.use('/', router);
    }

    private initializeErrorHandling() {
        this.app.use(ErrorMiddleware);
    }
}

const app = new App();
app.initialize();
app.listen();