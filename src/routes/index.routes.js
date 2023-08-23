import { Router } from "express";
import payments from "./payment.routes.js"

const router = Router();
router.get('/', (req, res) => {
    res.send('Hola Pianola!👋🏽');
});

// Pagos con mercadopago
router.use('/payment-mercadopago', payments);

export default router;