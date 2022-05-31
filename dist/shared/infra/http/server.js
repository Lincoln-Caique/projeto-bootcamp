import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import 'reflect-metadata';
import uploadConfig from '@config/upload';
import '@shared/infra/typeorm';
import '@shared/container';
import AppError from '@shared/errors/AppError';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use((err, req, res, _) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(3333, () => {
    console.log('🚀 Server funcionando on port 3333');
});
