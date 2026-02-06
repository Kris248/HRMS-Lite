# HRMS Lite - Simple HR Management System

A lightweight HR Management System built with React, FastAPI, and MongoDB. This project allows admins to manage employee records and track daily attendance.

## 🚀 Features

- ✅ Add, View, Delete Employees
- ✅ Mark Daily Attendance (Present/Absent)
- ✅ View Attendance Records
- ✅ Simple and Clean UI
- ✅ No Authentication Required (Single Admin)

## 🛠️ Tech Stack

**Frontend:**
- React.js
- HTML/CSS (No UI framework)

**Backend:**
- Python FastAPI
- MongoDB (Atlas or Local)

## 📁 Project Structure

```
hrms-lite/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── App.js           # Main app
│   └── package.json
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── routes/          # API routes
│   │   ├── schemas.py       # Pydantic models
│   │   ├── database.py      # MongoDB connection
│   │   └── main.py          # FastAPI app
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
└── README.md
```

## ⚡ Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB (Atlas account or Local)

### Step 1: Clone and Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/hrms-lite.git
cd hrms-lite
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/hrms_lite" > .env
# OR for local MongoDB:
echo "MONGO_URL=mongodb://localhost:27017" > .env

# Start backend server
uvicorn app.main:app --reload --port 8000
```

### Step 3: Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start React app
npm start
```

### Step 4: Access Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

## 📡 API Endpoints

### Employees
- `GET /api/employees/` - Get all employees
- `POST /api/employees/` - Add new employee
- `DELETE /api/employees/{employee_id}` - Delete employee

### Attendance
- `GET /api/attendance/` - Get all attendance records
- `POST /api/attendance/` - Mark attendance
- `GET /api/attendance/employee/{employee_id}` - Get employee attendance

## 🗄️ Database Schema

### Employees Collection
```json
{
  "employee_id": "EMP001",
  "full_name": "John Doe",
  "email": "john@example.com",
  "department": "IT",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Attendance Collection
```json
{
  "employee_id": "EMP001",
  "date": "2024-01-01",
  "status": "Present"
}
```

## 🔧 Environment Variables

Create `.env` file in `backend/` folder:

```env
# For MongoDB Atlas
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/hrms_lite

# For Local MongoDB
# MONGO_URL=mongodb://localhost:27017
```


## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Upload build folder to hosting
```

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect to Railway/Render
3. Add MongoDB connection string
4. Deploy!

## 📝 Usage Guide

1. **Add Employees**: Go to Employees page → Add Employee
2. **Mark Attendance**: Go to Attendance page → Select Employee → Choose Date → Select Status → Mark Attendance
3. **View Records**: All records displayed in tables
4. **Delete Employee**: Click delete button next to employee

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Error**: Ensure backend is running on port 8000
2. **MongoDB Connection Failed**: 
   - Check `.env` file
   - Verify MongoDB Atlas IP whitelist
   - Test connection: `python backend/test_connection.py`
3. **Port Already in Use**:
   ```bash
   # Kill process on port 8000
   netstat -ano | findstr :8000
   taskkill /PID <PID> /F
   ```

### Check Health:
```bash
curl http://localhost:8000/health
```

## 📈 Future Enhancements

1. Add authentication/login system
2. Add attendance reports (PDF/Excel)
3. Add employee search functionality
4. Add email notifications
5. Add leave management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🙏 Acknowledgments

- Built with FastAPI and React
- MongoDB for database
- Material-UI for components (optional)


---
