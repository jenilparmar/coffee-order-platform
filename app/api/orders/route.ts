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
      specialInstructions: orderData.specialInstructions || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      total: calculateTotal(orderData.coffeeType, orderData.quantity, orderData.size)
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

function calculateTotal(coffeeType: string, quantity: number, size: string = 'medium'): number {
  const basePrices: { [key: string]: number } = {
    'espresso': 3.50,
    'latte': 4.50,
    'cappuccino': 4.00,
    'americano': 3.00,
    'mocha': 5.00
  };

  const sizeMultipliers: { [key: string]: number } = {
    'small': 0.8,
    'medium': 1.0,
    'large': 1.2
  };

  const basePrice = basePrices[coffeeType] || 4.00;
  const multiplier = sizeMultipliers[size] || 1.0;
  
  return Number((basePrice * multiplier * quantity).toFixed(2));
}