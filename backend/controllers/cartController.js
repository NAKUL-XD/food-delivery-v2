import userModel from "../models/userModel.js";

// ✅ Add item to cart
const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId;

    if (!itemId || !userId) {
      return res.status(400).json({ success: false, message: "Missing itemId or userId" });
    }

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { $set: { cartData } });
    res.json({ success: true, message: "Item added to cart", cartData });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId;

    if (!itemId || !userId) {
      return res.status(400).json({ success: false, message: "Missing itemId or userId" });
    }

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { $set: { cartData } });
    res.json({ success: true, message: "Item removed from cart", cartData });
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Get user's cart data (POST version to include headers)
const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, removeFromCart, getCart };
