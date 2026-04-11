'use client';

import { useState } from 'react';

interface Order {
  id: number;
  customerName: string;
  coffeeType: string;
  quantity: number;
  size: string;
  milkType: string;
  specialInstructions: string;
  status: string;
  total: number;
  createdAt: string;
}

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [formData, setFormData] = useState({
    customerName: '',
    coffeeType: 'latte',
    quantity: 1,
    size: 'medium',
    milkType: 'regular',
    specialInstructions: ''
  });

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newOrder = await response.json();
        setOrders(prev => [...prev, newOrder]);
        setFormData({
          customerName: '',
          coffeeType: 'latte',
          quantity: 1,
          size: 'medium',
          milkType: 'regular',
          specialInstructions: ''
        });
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>☕ Coffee Order Platform</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h2>Place New Order</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label>Customer Name:</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>

            <div>
              <label>Coffee Type:</label>
              <select
                name="coffeeType"
                value={formData.coffeeType}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem' }}
              >
                <option value="espresso">Espresso</option>
                <option value="latte">Latte</option>
                <option value="cappuccino">Cappuccino</option>
                <option value="americano">Americano</option>
                <option value="mocha">Mocha</option>
              </select>
            </div>

            <div>
              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>

            <div>
              <label>Size:</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem' }}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div>
              <label>Milk Type:</label>
              <select
                name="milkType"
                value={formData.milkType}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem' }}
              >
                <option value="regular">Regular</option>
                <option value="skim">Skim</option>
                <option value="soy">Soy</option>
                <option value="almond">Almond</option>
                <option value="oat">Oat</option>
                <option value="none">None</option>
              </select>
            </div>

            <div>
              <label>Special Instructions:</label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows={3}
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '1rem',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Place Order
            </button>
          </form>
        </div>

        <div>
          <h2>Order History</h2>
          <button
            onClick={fetchOrders}
            style={{
              marginBottom: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Orders
          </button>
          
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {orders.length === 0 ? (
              <p>No orders yet. Place your first order!</p>
            ) : (
              orders.map(order => (
                <div
                  key={order.id}
                  style={{
                    border: '1px solid #ddd',
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '4px'
                  }}
                >
                  <h3>Order #{order.id}</h3>
                  <p><strong>Customer:</strong> {order.customerName}</p>
                  <p><strong>Coffee:</strong> {order.coffeeType} ({order.size})</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Milk:</strong> {order.milkType}</p>
                  <p><strong>Total:</strong> ${order.total}</p>
                  <p><strong>Status:</strong> <span style={{ 
                    color: order.status === 'completed' ? 'green' : 
                           order.status === 'preparing' ? 'orange' : 'gray'
                  }}>
                    {order.status}
                  </span></p>
                  {order.specialInstructions && (
                    <p><strong>Instructions:</strong> {order.specialInstructions}</p>
                  )}
                  <p><small>{new Date(order.createdAt).toLocaleString()}</small></p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}