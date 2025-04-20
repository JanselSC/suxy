import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import { createOrder } from './paypal/createOrder';
import { paypalWebhook } from './paypal/webHook';

admin.initializeApp();

const app = express();
app.use(express.json());

app.post('/create-order', createOrder);
app.post('/webhook', paypalWebhook);

export const api = functions.https.onRequest(app);
