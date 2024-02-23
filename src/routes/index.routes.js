import express from "express";
import payments from "./payment.routes.js";

const router = express.Router();
router.get('/', (req, res) => {
    res.sendStatus(200);
    console.log(res.sendStatus)
});


// Pagos con mercadopago
router.use('/payment-mercadopago', payments);

export default router;

