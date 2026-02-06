import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

async def test_mongodb():
    MONGO_URL = os.getenv("MONGO_URL")
    print(f"Testing connection to: {MONGO_URL}")
    
    try:
        # Connect
        client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=5000)
        
        # Ping server
        await client.admin.command('ping')
        print("✅ Connected successfully!")
        
        # List databases
        databases = await client.list_database_names()
        print(f"📊 Available databases: {databases}")
        
        # Test your specific database
        db = client["hrms_lite"]
        collections = await db.list_collection_names()
        print(f"📁 Collections in hrms_lite: {collections}")
        
        client.close()
        return True
        
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False

if __name__ == "__main__":
    asyncio.run(test_mongodb())