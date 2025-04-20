import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const paypalWebhook = functions
  .region('us-central1') // 🟢 fuerza uso correcto con región compatible
  .https
  .onRequest(async (req, res) => {
    if (req.method !== 'POST') {
      res.status(200).send('ok');
      return;
    }

    const body = req.body;

    try {
      const payerEmail = body?.payer?.email_address;
      const amountPaid = parseFloat(body?.purchase_units?.[0]?.amount?.value);
      const transactionID = body?.id;

      if (!payerEmail || !amountPaid || !transactionID) {
        res.status(400).send('Datos incompletos');
        return;
      }

      const userSnapshot = await db
        .collection('usuarios')
        .where('email', '==', payerEmail)
        .limit(1)
        .get();

      if (userSnapshot.empty) {
        res.status(404).send('Usuario no encontrado');
        return;
      }

      const userRef = userSnapshot.docs[0].ref;

      let tokens = 0;
      if (amountPaid >= 6.99) tokens = 1000;
      else if (amountPaid >= 3.99) tokens = 500;
      else if (amountPaid >= 2.49) tokens = 300;
      else if (amountPaid >= 0.99) tokens = 100;

      if (tokens === 0) {
        res.status(400).send('Monto insuficiente');
        return;
      }

      await userRef.update({
        tokens: admin.firestore.FieldValue.increment(tokens),
        historial: admin.firestore.FieldValue.arrayUnion({
          tipo: 'compra',
          cantidad: tokens,
          metodo: 'paypal',
          transaccion: transactionID,
          fecha: new Date().toISOString(),
        }),
      });

      res.status(200).send('Tokens acreditados correctamente');
    } catch (err) {
      console.error('Error en el webhook:', err);
      res.status(500).send('Error interno');
    }
  });
