# FinTrack - Personal Financial Analytics Platform

FinTrack is a full-stack web application designed to help users take control of their financial health. It provides a secure, intuitive platform for tracking income and expenses, offering powerful visualizations and real-time analytics to promote better financial planning and decision-making.

## Key Features

- **Secure Authentication**: End-to-end user authentication with JWT to ensure all user data and financial records are secure.  
- **Interactive Dashboard**: Central dashboard providing an overview of total income, expenses, and current balance.  
- **Dynamic Data Visualization**: Interactive charts and graphs using Chart.js to visualize spending habits and financial trends.  
- **Full CRUD Functionality**: Users can create, read, update, and delete income and expense transactions seamlessly.  
- **Responsive UI**: Built with Tailwind CSS for a fully responsive experience across desktops, tablets, and mobile devices.  
- **Protected Routes**: Ensures that sensitive financial data is only accessible to authenticated users.  

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Chart.js
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt.js

### Deployment
- **Frontend**: Vercel  
- **Backend**: Render  

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites
- Node.js (includes npm)  
- Git  
- A running instance of MongoDB (local or MongoDB Atlas)  

### Installation & Setup

#### Clone the Repository
```bash
git clone https://github.com/your-username/budget-tracker.git
cd budget-tracker
````

#### Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=8000
```

Start the backend server:

```bash
npm start
```

The server will run on [http://localhost:8000](http://localhost:8000).

#### Setup the Frontend

```bash
cd ..
npm install
```

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
