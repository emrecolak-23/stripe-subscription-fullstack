import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import { User } from "../models/user.model";
import { NotAuthorizedError } from "../errors/not-authorized.error";
import { hashPassword, comparePassword } from "../utils/auth";
import { BadRequestError } from "../errors/bad-request.error";

class AuthController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email is in use");
    }

    const hashedPassword: string = await hashPassword(password);
    const customer = await stripe.customers.create({ email: email });
    const user = User.build({
      name,
      email,
      password: hashedPassword,
      customerId: customer.id,
      subscriptions: [],
    });
    await user.save();

    const { password: storedPassword, ...rest } = user.toJSON();
    res.status(201).json({ user: rest });
  }

  async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new NotAuthorizedError("Invalid credentials");
    }

    const passwordsMatch = await comparePassword(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      throw new NotAuthorizedError("Invalid credentials");
    }

    const { password: storedPassword, ...rest } = existingUser.toJSON();

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    res.status(200).json({ user: { ...rest, token } });
  }

  async signout(req: Request, res: Response) {
    res.status(200).json({ message: "Signout successful" });
  }

  async me(req: Request, res: Response) {
    const { currentUser } = req;

    if (!currentUser) {
      throw new NotAuthorizedError("Authentication required");
    }

    const user = await User.findById(currentUser.id);
    if (!user) {
      throw new NotAuthorizedError("Authentication required");
    }

    const { password: storedPassword, ...rest } = user.toJSON();

    res.status(200).json({ user: rest });
  }
}

export { AuthController };
