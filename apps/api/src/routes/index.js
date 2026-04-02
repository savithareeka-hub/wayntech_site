import { Router } from 'express';
import healthCheck from './health-check.js';
import emailNotificationRouter from './order-notification.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.use('/email-notification', emailNotificationRouter);

    return router;
};