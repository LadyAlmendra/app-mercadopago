import mercadopago from "mercadopago";
import { ACCESS_TOKEN, HOTS, INTEGRATOR_ID, NOTIF_URL } from "../config.js";

export const createOrder = async (req, res) => {
    mercadopago.configure({
        access_token: ACCESS_TOKEN,
        integrator_id: INTEGRATOR_ID,
    });

    const result = await mercadopago.preferences.create({

        // Recibe un arreglo de los items de la preferencia de la compra
        items: [
            {
                id: 1234,
                title: 'Almendritas',
                description: "Dummy description",
                picture_url: "https://ladytoxic.com.ar/assets/LadyToxic%20logo2.png",
                quantity: 1,
                currency_id: 'ARS',
                unit_price: 540.56
            }
        ],

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
};



// Notificación 
export const resultWebhook = async (req, res) => {
    try {
        const payment = req.query;
        console.log(payment);
        if (payment.type == "payment") {
            const data = await mercadopago.payment.findById(payment["data.id"]);
            console.log(data);
            res.json({ data }); // Envía data como respuesta JSON al frontend
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
};