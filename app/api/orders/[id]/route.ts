import { NextResponse } from 'next/server';

let orders: any[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('id');

  if (orderId) {
    const order = orders.find(o => o.id === parseInt(orderId));
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
  }

  return NextResponse.json(orders);
}

export async function PUT(request: Request) {
  try {
    const updateData = await request.json();
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }

    const orderIndex = orders.findIndex(o => o.id === parseInt(orderId));
    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update order status
    if (updateData.status) {
      orders[orderIndex].status = updateData.status;
    }

    return NextResponse.json(orders[orderIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON data' },
      { status: 400 }
    );
  }
}