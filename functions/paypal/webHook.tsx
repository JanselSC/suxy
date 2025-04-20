import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

export const paypalWebhook = async (req: Request, res: Response) => {
  const event = req.body;

  if (event.event_type === 'CHECKOUT.ORDER.COMPLETED') {
    const description = event.resource.purchase_units[0].description;
    const amount = event.resource.purchase_units[0].amount.value;

    const match = description.match(/(\d+)\s+tokens.*usuario\s+(.+)/i);
    if (!match) return res.status(400).send('Formato de descripción inválido');

    const tokens = parseInt(match[1]);
    const userId = match[2];

    try {
      await admin.firestore().collection('users').doc(userId).update({
        tokens: admin.firestore.FieldValue.increment(tokens),
      });

      console.log(`✅ Tokens añadidos a ${userId}: +${tokens}`);
      res.sendStatus(200);
    } catch (error) {
      console.error('❌ Error actualizando Firestore:', error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
};
