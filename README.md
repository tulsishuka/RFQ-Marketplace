# RFQ Marketplace

A full-stack B2B Request for Quotation (RFQ) Marketplace that connects **buyers and suppliers** through a structured quotation workflow.

Buyers can create and manage RFQs, while suppliers can discover relevant requirements and submit quotations. The application includes authentication, role-based authorization, MongoDB persistence, quotation management, validation, and responsive dashboards.

---

<img width="1516" height="718" alt="Screenshot 2026-09-14 235741" src="https://github.com/user-attachments/assets/b613fe9c-0e06-4320-a891-fec85600dcfd" />

<img width="1517" height="726" alt="Screenshot 2026-09-14 235946" src="https://github.com/user-attachments/assets/b1936785-37a3-4ef0-857a-e096a81187cc" />

  
  <img width="1521" height="727" alt="Screenshot 2026-09-15 000019" src="https://github.com/user-attachments/assets/fe2911f3-31b8-4b08-8921-de8c311faa98" />

 
 <img width="1518" height="727" alt="Screenshot 2026-09-15 000044" src="https://github.com/user-attachments/assets/ec1931cd-9b33-47bc-a162-c0afe00df3e1" />


## 🚀 Project Overview

Traditional B2B sourcing often relies on emails, spreadsheets, and disconnected communication.

**RFQ Marketplace** provides a centralized platform where:

* **Buyers** publish product/service requirements.
* **Suppliers** browse available RFQs.
* Suppliers submit structured quotations.
* Buyers can review received quotations.
* Users access features based on their assigned role.

The project was built as a full-stack application with a separate React frontend and Node.js/Express backend.

---

## ✨ Key Features

### 👤 Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes
* Role-based authorization
* Secure password hashing with bcrypt

### 🏢 Buyer Features

* Create RFQs
* Edit/manage RFQs
* View published RFQs
* View received quotations
* Review supplier proposals
* Track RFQ status
* Manage RFQ deadlines

### 🏭 Supplier Features

* Browse available RFQs
* View RFQ details
* Search/filter RFQs
* Submit quotations
* Add pricing and delivery time
* Add proposal messages
* View previously submitted quotations
* Prevent duplicate quotations for the same RFQ

### 📋 RFQ Management

Each RFQ can contain:

* Product/service name
* Description
* Quantity
* Unit
* Delivery location
* Submission deadline
* Status
* Buyer information

### 💰 Quotation Management

Suppliers can submit:

* Price
* Delivery time
* Proposal/message

The backend validates quotations and checks:

* Authentication
* Valid RFQ ID
* RFQ availability
* RFQ deadline
* Duplicate quotation submissions
* Valid quotation price

### 📱 Responsive UI

The frontend is designed to work across:

* Desktop
* Tablet
* Mobile

---

# 🛠️ Tech Stack

## Frontend

* React.js
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Lucide React
* Framer Motion

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS

## Development Tools

* Git
* GitHub
* VS Code
* Postman
* npm

---

# 📁 Project Structure

```text
RFQ Marketplace/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   └── ...
│   │   │
│   │   ├── pages/
│   │   │   ├── buyer/
│   │   │   ├── supplier/
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── buyerController.ts
│   │   └── supplierController.ts
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── RFQ.ts
│   │   └── Quote.ts
│   │
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── buyerRoutes.ts
│   │   └── supplierRoutes.ts
│   │
│   ├── middleware/
│   │   └── authMiddleware.ts
│   │
│   ├── server.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Then:

```bash
cd "RFQ Marketplace"
```

---

# 🖥️ Frontend Setup

Open a terminal inside the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Open another terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Then start the backend:

```bash
npm run dev
```

The backend will normally run at:

```text
http://localhost:3000
```

---

# 🔐 Environment Variables

The backend requires the following environment variables:

| Variable     | Description                        |
| ------------ | ---------------------------------- |
| `PORT`       | Backend server port                |
| `MONGO_URI`  | MongoDB connection string          |
| `JWT_SECRET` | Secret used for JWT authentication |

Example:

```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rfq-marketplace
JWT_SECRET=your_secure_secret
```

> Never commit the `.env` file to GitHub.

---

# 🔄 Application Flow

## Buyer Flow

```text
Signup/Login
     ↓
Buyer Dashboard
     ↓
Create RFQ
     ↓
Publish RFQ
     ↓
Suppliers View RFQ
     ↓
Suppliers Submit Quotes
     ↓
Buyer Reviews Quotations
```

## Supplier Flow

```text
Signup/Login
     ↓
Supplier Dashboard
     ↓
Browse RFQs
     ↓
View RFQ Details
     ↓
Submit Quotation
     ↓
View Submitted Quotations
```

---

# 🔑 Role-Based Access

The application supports two user roles:

### Buyer

Can:

* Create RFQs
* Manage RFQs
* View received quotations

### Supplier

Can:

* Browse RFQs
* View RFQ details
* Submit quotations
* View submitted quotations

Protected backend routes verify the authenticated user before allowing access to role-specific operations.

---

# 🔌 API Overview

## Authentication

```text
POST /api/auth/signup
POST /api/auth/login
```

## Supplier

```text
GET  /api/supplier/rfqs
GET  /api/supplier/rfqs/:id
POST /api/supplier/rfqs/:id/quotes
GET  /api/supplier/quotes
```

## Buyer

Example buyer operations include:

```text
POST   /api/buyer/rfqs
GET    /api/buyer/rfqs
GET    /api/buyer/rfqs/:id
PUT    /api/buyer/rfqs/:id
DELETE /api/buyer/rfqs/:id
```

> Exact API routes may vary depending on the current backend route configuration.

---

# 🧪 Testing with Postman

The backend APIs can be tested using Postman.

### Typical Authentication Flow

1. Register a user.
2. Login with the registered account.
3. Copy the JWT token.
4. Add it to protected requests.

Authorization:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example Supplier Request

```http
POST /api/supplier/rfqs/:id/quotes
```

Request body:

```json
{
  "price": 75000,
  "deliveryTime": "7-10 days",
  "message": "We can supply the requested products with warranty and delivery support."
}
```

---

# 🗄️ Database Models

The application uses MongoDB with Mongoose.

### User

```text
User
├── name
├── email
├── password
└── role
```

### RFQ

```text
RFQ
├── productService
├── description
├── quantity
├── unit
├── deliveryLocation
├── deadline
├── buyer
├── status
└── createdAt
```

### Quote

```text
Quote
├── rfq
├── supplier
├── price
├── deliveryTime
├── message
└── createdAt
```

Relationships:

```text
User
 ├── Buyer ──────→ RFQs
 │                    ↓
 │                 Quotes
 │
 └── Supplier ───→ Quotes
```

---

# 🛡️ Validation & Error Handling

The backend includes validation for important operations.

Examples:

* Authentication required
* Invalid RFQ ID
* RFQ not found
* Closed RFQ
* Expired RFQ deadline
* Missing quotation price
* Missing delivery time
* Negative quotation price
* Duplicate quotation submission

API errors return appropriate HTTP status codes and messages.

---

# 🎨 UI & UX

The application focuses on a clean B2B-oriented interface with:

* Responsive layouts
* Role-specific dashboards
* Persistent sidebar navigation
* Loading states
* Empty states
* Error messages
* Form validation
* Mobile navigation
* Interactive UI animations
* Structured information cards

---

# 🚀 Production Considerations

For production deployment, the following can be configured:

* MongoDB Atlas
* Backend deployment on Render/Railway/etc.
* Frontend deployment on Vercel
* Production environment variables
* HTTPS
* Secure JWT configuration
* Production CORS configuration

---

# 📌 Future Improvements

Possible future enhancements include:

* Supplier verification
* Email notifications
* Real-time quotation updates
* Advanced RFQ filtering
* Buyer/supplier messaging
* Quote comparison
* Supplier ratings and reviews
* File/document attachments
* Admin dashboard
* Cloud file storage
* Pagination and advanced search
* Deployment with production CI/CD

---

# 💡 What This Project Demonstrates

This project demonstrates practical full-stack development skills including:

* React application architecture
* TypeScript development
* REST API development
* Node.js and Express
* MongoDB database integration
* Mongoose relationships
* JWT authentication
* Role-based authorization
* CRUD operations
* API validation
* Error handling
* Responsive UI development
* Frontend/backend integration
* Git/GitHub workflow
* API testing with Postman

---

# 👩‍💻 Developer

**Tulasi Shukla**

Full Stack Developer | React.js | Node.js | MongoDB | TypeScript

* LinkedIn: https://www.linkedin.com/in/tulsishukla/
* GitHub: https://github.com/tulsishuka

---

