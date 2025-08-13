import { stripe } from "@/lib/stripe";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { products } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.'});
  }

  if (!products || products.length === 0){
    return res.status(400).json({ error: 'Products not found.'});
  }

  const successUrl = `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${req.headers.origin}/`;

  const lineItems = products.map((product: any) => ({
    price: product.defaultPriceId,
    quantity: 1,
  }));

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItems
  })
  
  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}