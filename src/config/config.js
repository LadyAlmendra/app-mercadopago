import 'dotenv/config.js';
export const PORT = process.env.PORT || 3000;

// URL del front
export const HOTS = process.env.HOTS;

// Datos de deconexión con de mercadopago
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const INTEGRATOR_ID = process.env.INTEGRATOR_ID;

// URL donde se recibiran las notificaciones
export const NOTIF_URL = process.env.NOTIF_URL;