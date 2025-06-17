
import { PrismaClient, PaymentMethod } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔄 Starting database seed...');

    // Clear existing data with more error handling
    console.log('🧹 Cleaning existing data...');
    try {
      await prisma.$transaction([
        prisma.payment.deleteMany(),
        prisma.cart.deleteMany(),
        prisma.order.deleteMany(),
        prisma.product.deleteMany(),
        prisma.customer.deleteMany(),
      ]);
    } catch (error) {
      console.log('⚠️ Clean up not needed, proceeding with seed...');
    }

    console.log('👤 Creating customer...');
    const customer1 = await prisma.customer.create({
      data: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone_number: '1234567890',
        address: '123 Main St',
        password: 'hashedPassword123'
      }
    });

    console.log('📦 Creating products...');
    const [product1, product2] = await Promise.all([
      prisma.product.create({
        data: {
          product_name: 'Blue Pearl Granite',
          product_price: 199.99,
          product_description: 'Beautiful blue pearl granite countertop',
          product_quantity: '100 sq ft',
          image_url: 'https://example.com/blue-pearl.jpg'
        }
      }),
      prisma.product.create({
        data: {
          product_name: 'Black Galaxy Granite',
          product_price: 299.99,
          product_description: 'Elegant black galaxy granite slab',
          product_quantity: '75 sq ft',
          image_url: 'https://example.com/black-galaxy.jpg'
        }
      })
    ]);

    console.log('🛒 Creating cart...');
    const cart1 = await prisma.cart.create({
      data: {
        customer_id: customer1.customer_id,
        product_id: product1.product_id,
        quantity: 2
      }
    });

    console.log('📝 Creating order...');
    const order1 = await prisma.order.create({
      data: {
        customer_id: customer1.customer_id,
        full_name: 'John Doe',
        email: 'john@example.com',
        address: '123 Main St',
        city: 'New York',
        zip: '10001',
        order_date: new Date(),
        payment_method: PaymentMethod.CREDIT_CARD
      }
    });

    console.log('💳 Creating payment...');
    const payment1 = await prisma.payment.create({
      data: {
        order_id: order1.order_id,
        payment_amount: 399.98,
        payment_method: PaymentMethod.CREDIT_CARD,
        payment_status: 'COMPLETED'
      }
    });

    console.log('✅ Seed completed successfully!');
    console.log('Created:', {
      customer: customer1.email,
      products: [product1.product_name, product2.product_name],
      cart: `Cart ID: ${cart1.cart_id}`,
      order: `Order ID: ${order1.order_id}`,
      payment: `Payment ID: ${payment1.payment_id}`
    });
  } catch (error) {
    console.error(' Seed failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Failed to seed database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });