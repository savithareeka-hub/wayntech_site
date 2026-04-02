import express from 'express';
import logger from '../utils/logger.js';
import pb from '../utils/pocketbaseClient.js';

const router = express.Router();

// Helper function to format order items into readable text
const formatOrderItems = (items) => {
  return items
    .map((item) => `• ${item.name} x${item.quantity} - ₹${item.price.toFixed(2)}`)
    .join('\n');
};

// POST /email-notification
router.post('/', async (req, res) => {
  const {
    orderId,
    customerName,
    customerEmail,
    customerPhone,
    deliveryAddress,
    items,
    totalAmount,
    orderDate,
  } = req.body;

  // Validate required fields
  if (
    !orderId ||
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    !deliveryAddress ||
    !items ||
    totalAmount === undefined ||
    !orderDate
  ) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: orderId, customerName, customerEmail, customerPhone, deliveryAddress, items, totalAmount, orderDate',
    });
  }

  // Validate items array
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Items must be a non-empty array with {name, quantity, price}',
    });
  }

  // Validate each item has required fields
  for (const item of items) {
    if (!item.name || item.quantity === undefined || item.price === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Each item must have name, quantity, and price',
      });
    }
  }

  logger.info('Processing email notification for order:', orderId);

  // Create order record in PocketBase
  // PocketBase hooks will automatically send the emails
  const orderData = {
    orderId,
    customerName,
    customerEmail,
    customerPhone,
    deliveryAddress,
    items: JSON.stringify(items),
    totalAmount,
    orderDate,
    status: 'pending',
  };

  // Create the order in PocketBase
  // This will trigger PocketBase hooks that send the emails
  const createdOrder = await pb.collection('orders').create(orderData);

  logger.info('Order created successfully with ID:', createdOrder.id);

  res.json({
    success: true,
    message: 'Emails sent successfully',
    orderId: createdOrder.id,
    customer: {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
    },
    orderDetails: {
      itemCount: items.length,
      totalAmount,
    },
  });
});

export default router;