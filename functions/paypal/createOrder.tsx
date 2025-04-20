import axios from 'axios';
import { Request, Response } from 'express';

const PAYPAL_CLIENT_ID = 'TU_CLIENT_ID';
const PAYPAL_SECRET = 'TU_SECRET';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; 

export const createOrder = async (req: Request, res: Response) => {
  const { coins, price, userId } = req.body;

  try {
    const auth = await axios({
      url: `${PAYPAL_API}/v1/oauth2/token`,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_SECRET,
      },
      data: 'grant_type=client_credentials',
    });

    const accessToken = auth.data.access_token;

    const order = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: price.toFixed(2),
          },
          description: `${coins} tokens para el usuario ${userId}`,
        }],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const approveLink = order.data.links.find((link: any) => link.rel === 'approve').href;

    res.status(200).json({ orderID: order.data.id, link: approveLink });
  } catch (err: any) {
    console.error('Error creando orden:', err.response?.data || err.message);
    res.status(500).send('Error al crear la orden de PayPal.');
  }
};
