# Coffee Order Platform

A full-stack coffee ordering platform built with Next.js, featuring a simple frontend and backend API.

## Features

- Place coffee orders with various options (coffee type, size, milk type, special instructions)
- View order history
- Real-time order status updates
- Simple and clean UI
- RESTful API endpoints

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Styling**: CSS (minimal, production-ready)
- **State Management**: React useState hooks

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

### POST /api/orders
Create a new coffee order

**Request Body:**
```json
{
  "customerName": "John Doe",
  "coffeeType": "latte",
  "quantity": 2,
  "size": "medium",
  "milkType": "oat",
  "specialInstructions": "Extra hot"
}
```

### GET /api/orders
Get all orders

### GET /api/orders?id=<orderId>
Get specific order by ID

### PUT /api/orders?id=<orderId>
Update order status

**Request Body:**
```json
{
  "status": "completed"
}
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── orders/
│   │       ├── route.ts          # POST/GET all orders
│   │       └── [id]/route.ts     # GET/PUT specific order
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── tsconfig.json
└── next.config.js
```

## Production Build

```bash
npm run build
npm start
```

## Notes

- Uses in-memory storage for simplicity (orders reset on server restart)
- In production, consider adding a database (PostgreSQL, MongoDB, etc.)
- Add authentication and authorization for real-world usage
- Implement proper error handling and validation