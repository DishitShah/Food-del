import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend
const placeOrder = async (req, res) => {
    const fronted_url = "https://food-del-fronted.onrender.com"; // Production URL

    try {
        // Create a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: "false"
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe
        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Stripe expects amount in the smallest currency unit (e.g., paise for INR)
            },
            quantity: item.quantity
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 // Delivery charge in the smallest currency unit (e.g., paise for INR)
            },
            quantity: 1
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${fronted_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${fronted_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Respond with the session URL
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder };
