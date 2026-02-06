import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# Get MongoDB Atlas connection string
MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = "hrms_lite"

print(f"🔗 Attempting to connect to MongoDB...")
print(f"📁 Database: {DB_NAME}")

# Global database instance
client = None
db = None

async def connect_to_mongo():
    global client, db
    try:
        if not MONGO_URL:
            print("❌ MONGO_URL is not set in .env file")
            return False
            
        print(f"🌐 Connecting to: {MONGO_URL.split('@')[1] if '@' in MONGO_URL else MONGO_URL}")
        
        # Connect to MongoDB
        client = AsyncIOMotorClient(
            MONGO_URL,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=10000
        )
        
        # Check connection with timeout
        await client.admin.command('ping')
        print("✅ MongoDB connection successful!")
        
        # Get database
        db = client[DB_NAME]
        
        # Create collections if they don't exist
        collections = await db.list_collection_names()
        if 'employees' not in collections:
            await db.create_collection('employees')
            print("📁 Created 'employees' collection")
        if 'attendance' not in collections:
            await db.create_collection('attendance')
            print("📁 Created 'attendance' collection")
            
        print(f"✅ Database '{DB_NAME}' is ready!")
        return True
        
    except Exception as e:
        print(f"❌ MongoDB connection failed!")
        print(f"❌ Error: {type(e).__name__}: {str(e)}")
        print(f"❌ Check:")
        print(f"   1. Internet connection")
        print(f"   2. MongoDB Atlas IP whitelist")
        print(f"   3. Credentials in .env file")
        return False

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("🔌 Disconnected from MongoDB")

def get_database():
    return db