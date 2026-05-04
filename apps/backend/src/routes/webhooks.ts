import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27-acacia',
});

const prisma = new PrismaClient();
const router = express.Router();

// Stripe requires the raw body to verify webhook signatures
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange(subscription);
      break;
    case 'customer.subscription.deleted':
      const deletedSub = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(deletedSub);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;

  await prisma.user.update({
    where: { stripe_customer_id: customerId },
    data: {
      subscription_status: mapStripeStatus(status),
    },
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  await prisma.user.update({
    where: { stripe_customer_id: customerId },
    data: {
      subscription_status: 'CANCELED',
    },
  });
}

function mapStripeStatus(status: string): any {
  switch (status) {
    case 'active': return 'ACTIVE';
    case 'past_due': return 'PAST_DUE';
    case 'canceled': return 'CANCELED';
    case 'incomplete': return 'INCOMPLETE';
    default: return 'INCOMPLETE';
  }
}

export default router;
