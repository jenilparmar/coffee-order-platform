import { NextResponse } from 'next/server';

// In-memory storage for orders (in production, use a database)
let orders: any[] = [];
let orderIdCounter = 1;

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    
    // Validate required fields
    if (!orderData.customerName || !orderData.coffeeType || !orderData.quantity) {
      return NextResponse.json(
        { error: 'Missing required fields: customerName, coffeeType, quantity' },
        { status: 400 }
      );
    }

    const order = {
      id: orderIdCounter++,
      customerName: orderData.customerName,
      coffeeType: orderData.coffeeType,
      quantity: orderData.quantity,
      size: orderData.size || 'medium',
      milkType: orderData.milkType || 'regular',
      snackType: orderData.snackType || 'none',
      snackQuantity: orderData.snackQuantity || 1,
      specialInstructions: orderData.specialInstructions || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      total: calculateTotal(
        orderData.coffeeType,
        orderData.quantity,
        orderData.size,
        orderData.snackType,
        orderData.snackQuantity
      )
    };

    orders.push(order);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON data' },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json(orders);
}

function calculateTotal(
  coffeeType: string,
  quantity: number,
  size: string = 'medium',
  snackType: string = 'none',
  snackQuantity: number = 0
): number {
  const basePrices: { [key: string]: number } = {
    'espresso': 3.50,
    'latte': 4.50,
    'cappuccino': 4.00,
    'americano': 3.00,
    'mocha': 5.00,
    'chai': 4.25,
    'matcha': 5.25,
    'green-tea': 3.50,
    'black-tea': 3.25,
    'herbal-tea': 3.75
  };

  const snackPrices: { [key: string]: number } = {
    'croissant': 3.25,
    'muffin': 2.75,
    'cookie': 2.25,
    'bagel': 2.50,
    'sandwich': 5.50
  };

  const sizeMultipliers: { [key: string]: number } = {
    'small': 0.8,
    'medium': 1.0,
    'large': 1.2
  };

  const basePrice = basePrices[coffeeType] || 4.00;
  const multiplier = sizeMultipliers[size] || 1.0;
  const snackPrice = snackType && snackType !== 'none' ? (snackPrices[snackType] || 0) : 0;
  const drinkTotal = basePrice * multiplier * quantity;
  const snackTotal = snackPrice * (snackQuantity || 0);

  return Number((drinkTotal + snackTotal).toFixed(2));
}
