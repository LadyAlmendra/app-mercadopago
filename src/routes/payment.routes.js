import { Router } from "express";
import { createOrder, resultWebhook } from "../controllers/payment.controller.js";

const router = Router();

// Crea la orden de pago
router.get('/create-order', createOrder);

router.get('/success', (req, res) => res.send('success'));

router.get('/failure', (req, res) => res.send('failure'));

router.get('/pending', (req, res) => res.send('pending'));

router.post('/webhook', resultWebhook);


export default router;