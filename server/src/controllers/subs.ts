import { Request, Response } from "express";
import { User } from "../models/user.model";
import Stripe from "stripe";

class SubsController {
  constructor() {}

  async getAllSubsPrices(req: Request, res: Response) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const prices = await stripe.prices.list({
      active: true,
      limit: 10,
    });
    res.status(200).json(prices.data.reverse());
  }

  async createSubscription(req: Request, res: Response) {
    const { priceId } = req.body;
    const { id: userId } = req.currentUser!;
    const user = await User.findById(userId);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: user?.customerId,
      success_url: process.env.STRIPE_SUCCESS_URL!,
      cancel_url: process.env.STRIPE_CANCEL_URL!,
    });

    res.status(200).json(session.url);
  }

  async subscriptionStatus(req: Request, res: Response) {
    const { id: userId } = req.currentUser!;
    const user = await User.findById(userId);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const subscriptions = await stripe.subscriptions.list({
      customer: user?.customerId,
      status: "all",
      expand: ["data.default_payment_method"],
    });
    console.log(subscriptions.data);
    console.log(user?.customerId);

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        subscriptions: subscriptions.data,
      },
      { new: true }
    );

    res.status(200).json(updated?.subscriptions);
  }

  async subscriptions(req: Request, res: Response) {
    const { id: userId } = req.currentUser!;
    const user = await User.findById(userId);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const subscriptions = await stripe.subscriptions.list({
      customer: user?.customerId,
      status: "all",
      expand: ["data.default_payment_method"],
    });
    res.status(200).json(subscriptions.data);
  }
}

export { SubsController };
