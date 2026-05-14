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

  const totalOrders = orders.length;
  const preparingOrders = orders.filter(order => order.status === 'preparing').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">Brew Lab</p>
          <h1>Coffee Order Platform</h1>
          <p className="lead">
            A streamlined queue for baristas and caffeine lovers. Track every order, keep the flow steady,
            and make every cup intentional.
          </p>
          <div className="hero-actions">
            <button className="button primary" type="button" onClick={fetchOrders}>
              Refresh orders
            </button>
            <div className="pill">Live queue: {totalOrders}</div>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-header">
            <h2>Today at a glance</h2>
            <span className="badge">Realtime</span>
          </div>
          <div className="hero-stats">
            <div>
              <p className="stat-label">Total orders</p>
              <p className="stat-value">{totalOrders}</p>
            </div>
            <div>
              <p className="stat-label">Preparing</p>
              <p className="stat-value">{preparingOrders}</p>
            </div>
            <div>
              <p className="stat-label">Completed</p>
              <p className="stat-value">{completedOrders}</p>
            </div>
          </div>
          <div className="hero-note">
            <p>Tip: refresh the queue after each rush to keep the timeline accurate.</p>
          </div>
        </div>
      </header>

      <main className="content-grid">
        <section className="panel form-panel">
          <div className="panel-header">
            <div>
              <h2>Place a new order</h2>
              <p className="panel-subtitle">Capture every detail before it hits the bar.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="order-form">
            <label className="field">
              <span>Customer name</span>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                placeholder="Avery Johnson"
              />
            </label>

            <label className="field">
              <span>Drink type</span>
              <select
                name="coffeeType"
                value={formData.coffeeType}
                onChange={handleInputChange}
              >
                <option value="espresso">Espresso</option>
                <option value="latte">Latte</option>
                <option value="cappuccino">Cappuccino</option>
                <option value="americano">Americano</option>
                <option value="mocha">Mocha</option>
                <option value="chai">Chai</option>
                <option value="matcha">Matcha</option>
                <option value="green-tea">Green tea</option>
                <option value="black-tea">Black tea</option>
                <option value="herbal-tea">Herbal tea</option>
              </select>
            </label>

            <div className="field-row">
              <label className="field">
                <span>Quantity</span>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                />
              </label>

              <label className="field">
                <span>Size</span>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </label>
            </div>

            <label className="field">
              <span>Milk type</span>
              <select
                name="milkType"
                value={formData.milkType}
                onChange={handleInputChange}
              >
                <option value="regular">Regular</option>
                <option value="skim">Skim</option>
                <option value="soy">Soy</option>
                <option value="almond">Almond</option>
                <option value="oat">Oat</option>
                <option value="none">None</option>
              </select>
            </label>

            <label className="field">
              <span>Special instructions</span>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows={3}
                placeholder="Extra hot, no foam, cinnamon on top"
              />
            </label>

            <button className="button primary" type="submit">
              Place order
            </button>
          </form>
        </section>

        <section className="panel history-panel">
          <div className="panel-header">
            <div>
              <h2>Order history</h2>
              <p className="panel-subtitle">A quick snapshot of the current queue.</p>
            </div>
            <button className="button ghost" type="button" onClick={fetchOrders}>
              Refresh
            </button>
          </div>

          <div className="order-list">
            {orders.length === 0 ? (
              <div className="empty-state">
                <p>No orders yet.</p>
                <span>Create the first ticket to kickstart the flow.</span>
              </div>
            ) : (
              orders.map(order => (
                <article key={order.id} className="order-card">
                  <div className="order-card-header">
                    <div>
                      <h3>Order #{order.id}</h3>
                      <p className="order-meta">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <span className={`status ${order.status}`}>{order.status}</span>
                  </div>
                  <div className="order-details">
                    <p>
                      <strong>Customer</strong>
                      <span>{order.customerName}</span>
                    </p>
                    <p>
                      <strong>Drink</strong>
                      <span>{order.coffeeType} ({order.size})</span>
                    </p>
                    <p>
                      <strong>Milk</strong>
                      <span>{order.milkType}</span>
                    </p>
                    <p>
                      <strong>Quantity</strong>
                      <span>{order.quantity}</span>
                    </p>
                    <p>
                      <strong>Total</strong>
                      <span>${order.total.toFixed(2)}</span>
                    </p>
                  </div>
                  {order.specialInstructions && (
                    <p className="order-note">{order.specialInstructions}</p>
                  )}
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
