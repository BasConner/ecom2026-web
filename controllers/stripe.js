const prisma = require("../config/prisma");
const stripe = require("stripe")(process.env.VITE_STRIPE_SK);

exports.payment = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: req.user.id,
      },
    });

    // ถ้าไม่มีตะกร้าใน database
    if (!cart) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Stripe ต้องการจำนวนเต็ม (สตางค์)
    const amountTHB = Math.round(cart.cartTotal * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTHB,
      currency: "thb",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};