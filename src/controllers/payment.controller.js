import mercadopago from "mercadopago";
import { ACCESS_TOKEN, INTEGRATOR_ID, NOTIF_URL } from "../config/config.js";

const controllers = {
    createOrder: async (req, res) => {
        try {

            if (!req.body) {
                throw new Error('El cuerpo de la solicitud está vacío.');
            }

            // Extrae items y back_urls del cuerpo de la solicitud
            const { items, back_urls } = req.body;

            // Verifica si items es nulo o está vacío
            if (!items || items.length === 0) {
                throw new Error('El arreglo "items" es nulo o está vacío.');
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
                // payer: {
                //     // name: 'Cafe Toxic',
                //     // surname: 'Muy',
                //     // email: 'hola@hola.com',
                //     phone: {
                //         area_code: "549",
                //         number: 112233445566,
                //     },
                //     address: {
                //         zip_code: '1850',
                //         street_name: "calle",
                //         street_number: 123,
                //     }
                // },
                external_reference: 'p@gmail.com',
                // redirecciona dependiedo el estado del pago
                // Utiliza las back_urls recibidas del frontend,
                back_urls,
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
            const preferenceId = result.body.id;
            res.json({ preferenceId });
        }

        catch (error) {
            console.error('Error al crear la orden:', error);
            res.status(500).json({ message: 'Error al procesar la solicitud' });
        }
    },

    // Notificación 
    resultWebhook: async (req, res) => {
        let paymentId = req.query.id;
        if (!paymentId) {
            paymentId = req.query['data.id']
        }
        console.log(req.query)

        try {
            const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            });
            if (response.ok) {
                const data = await response.json()
                res.status(200).json(data)
                console.log(data);
            }

            res.status(200);
        } catch (error) {
            console.log(error);
        }
    }
}


export default controllers;