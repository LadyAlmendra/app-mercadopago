import { Router } from "express";
import payments from "./payment.routes.js";
import { HOTS2 } from "../config/config.js";

const router = Router();
router.get('/', (req, res) => {
    console.log(HOTS2)
    res.send(`
    <div style="text-align: center; padding: 1rem;">
        <h1>Pagar con mercadopago</h1> 
        <a href="${HOTS2}/payment-mercadopago/create-order">Crear orden</a>    
    </div>`);
});

// Pagos con mercadopago
router.use('/payment-mercadopago', payments);

export default router;

