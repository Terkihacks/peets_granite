# Peet's Granite E-commerce Platform

A powerful backend e-commerce platform for selling granite products, built with Node.js, React, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- PostgreSQL v14 or higher
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd peets_granite
```

2. **Set up the server**
```bash
cd server
npm install
```

Create a `.env` file in the server directory with:
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/peets_granite"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
PORT=5004
```

3. **Set up the database**
```bash
npx prisma generate
npx prisma migrate dev
```

4. **Set up the client**
```bash
cd ../client
npm install
```

## 🏃‍♂️ Running the Application

1. **Start the server**
```bash
cd server
npm run dev
```

2. **Start the client**
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5004 or your preffered port

## 🌐 API Endpoints

### Authentication
- POST `/auth/register` - Register new user
- POST `/auth/login` - User login

### Products
- GET `/products/get-products` - Fetch all products
- POST `/products/add-product` - Add new product
- PUT `/products/:id` - Update product
- DELETE `/products/:id` - Delete product

### Cart
- GET `/cart` - View cart items
- POST `/cart/add` - Add item to cart
- DELETE `/cart/:id` - Remove item from cart

## 🛠️ Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Image Storage**: Cloudinary
- **Authentication**: JWT

## 📁 Project Structure
```
peets_granite/
├── client/              # React frontend
│   ├── src/
│   └── package.json
├── server/              # Node.js backend
│   ├── src/
│   ├── prisma/
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.