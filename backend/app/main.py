from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import employees, attendance
from .database import connect_to_mongo, close_mongo_connection, get_database
import asyncio

app = FastAPI(
    title="HRMS Lite API",
    description="HR Management System API",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",  # Local development
    "https://ornate-malasada-aa0482.netlify.app/",  # Your Netlify URL
    # Agar multiple subdomains ho to:
    "https://*.netlify.app",  # All Netlify apps
]
# CORS configuration
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:3000"],
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600,  # Cache preflight requests for 10 minutes
)
# Store database connection status
db_connected = False

@app.on_event("startup")
async def startup_event():
    global db_connected
    print("=" * 50)
    print("🚀 Starting HRMS Lite API Server")
    print("=" * 50)
    
    # Connect to MongoDB
    db_connected = await connect_to_mongo()
    
    if db_connected:
        print("✅ Backend ready! Access:")
        print("   📝 API Docs: http://localhost:8000/docs")
        print("   🩺 Health: http://localhost:8000/health")
    else:
        print("⚠️  Running in limited mode (No database connection)")
        print("⚠️  Check .env file and MongoDB Atlas settings")

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()
    print("👋 Server shutting down...")

# Health check endpoint
@app.get("/health")
async def health_check():
    db = get_database()
    if db is not None:
        try:
            await db.command("ping")
            return {
                "status": "healthy",
                "database": "connected",
                "message": "API and database are working"
            }
        except:
            return {
                "status": "degraded", 
                "database": "disconnected",
                "message": "API working but database connection lost"
            }
    else:
        return {
            "status": "unhealthy",
            "database": "not_connected",
            "message": "Database connection was not established"
        }

# Include routers
app.include_router(employees.router, prefix="/api/employees", tags=["Employees"])
app.include_router(attendance.router, prefix="/api/attendance", tags=["Attendance"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to HRMS Lite API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
        "endpoints": {
            "employees": "/api/employees",
            "attendance": "/api/attendance"
        }

    }
