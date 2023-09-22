import mercadopago from "mercadopago";
import { ACCESS_TOKEN, INTEGRATOR_ID, HOTS, NOTIF_URL } from "../config/config.js";


const controllers = {
    createOrder: async (req, res) => {
        try {

            if (!req.body) {
                throw new Error('El cuerpo de la solicitud está vacío.');
            }

            if (items) {
                console.log(items);
            }

            mercadopago.configure({
                access_token: ACCESS_TOKEN,
                integrator_id: INTEGRATOR_ID,
            });

            // Crea la preferencia del pago
            const result = await mercadopago.preferences.create({

                // Recibe un arreglo de los items de la preferencia de la compra
                items: items,

                // Recibe un arreglo de con los datos de las personas compradara
                payer: {
                    name: 'Lalo',
                    surname: 'Landa',
                    email: 'test_user_36961754@testuser.com',
                    phone: {
                        area_code: "549",
                        number: 1162305649,
                    },
                    address: {
                        zip_code: "1854",
                        street_name: "calle",
                        street_number: 123,
                    }
                },
                external_reference: 'almendraromina1@gmail.com',
                // redirecciona dependiedo el estado del pago
                back_urls: {
                    success: `${HOTS}/success`,
                    failure: `${HOTS}/failure`,
                    pending: `${HOTS}/pending`,
                },
                notification_url: NOTIF_URL,
                auto_return: "approved",
                payment_methods: {
                    excluded_payment_methods: [
                        {

                        }
                    ],
                },
            });

            // Devuelve al front un link de pago de mercadopago
            const initPoint = result.body.init_point;
            res.json({ initPoint });
        }

        catch (error) {
            console.error('Error al crear la orden:');
            res.status(500).json({ message: 'Error al procesar la solicitud' });
        }
    },

    // Notificación 
    resultWebhook: async (req, res) => {
        try {
            const payment = req.query;
            console.log(payment);
            if (payment.type == "payment") {
                const data = await mercadopago.payment.findById(payment["data.id"]);
                console.log(data);
                res.json({ data }); // Envía data como respuesta JSON al frontend
            } else {
                res.sendStatus(204 || 200);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Something goes wrong" });
        }
    }
}


export default controllers;