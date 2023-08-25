import { Router } from "express";
import payments from "./payment.routes.js";

const router = Router();
router.get('/', (req, res) => {
    res.send(`
    <div style="text-align: center; padding: 1rem;">
        <h1>Pagar con mercadopago</h1> 
        <a href="http://localhost:3000/payment-mercadopago/create-order">Crear orden</a>    
    </div>`);
});

// Pagos con mercadopago
router.use('/payment-mercadopago', payments);

export default router;
