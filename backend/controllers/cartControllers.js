import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        if (!userId || !itemId) {
            return res.json({ success: false, message: "userId and itemId are required" });
        }

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Item added to cart" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        if (!userId || !itemId) {
            return res.json({ success: false, message: "userId and itemId are required" });
        }

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.json({ success: false, message: "userId is required" });
        }

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        res.json({ success: true, cartData });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

export { addToCart, removeFromCart, getCart };
