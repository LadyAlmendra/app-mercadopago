import express  from "express";
import controllers from "../controllers/payment.controller.js";

const router = express.Router();

// Crea la orden de pago con mercadopago
router.post('/create-order', controllers.createOrder);

// Noticaciones de pagos de la aplicación
router.post('/webhook', controllers.resultWebhook);

export default router;