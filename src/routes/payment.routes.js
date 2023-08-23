import { Router } from "express";
import { createOrder, resultWebhook } from "../controllers/payment.controller.js";

const router = Router();

// Crea la orden de pago con mercadopago
router.get('/create-order', createOrder);

// Noticaciones de pagos de la aplicación
router.post('/webhook', resultWebhook);

export default router;