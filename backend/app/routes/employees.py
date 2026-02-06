from fastapi import APIRouter, HTTPException, Depends
from ..schemas import EmployeeCreate, EmployeeResponse
from ..database import get_database
from bson import ObjectId
from datetime import datetime
from fastapi.responses import JSONResponse

router = APIRouter()

# Dependency to get database
async def get_db():
    db = get_database()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    return db

# OPTIONS endpoint for CORS preflight
@router.options("/")
async def options_employees():
    return JSONResponse(
        content={"message": "OK"},
        headers={
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
    )

@router.get("/", response_model=list[EmployeeResponse])
async def get_employees(db = Depends(get_db)):
    try:
        employees = await db.employees.find().to_list(1000)
        for emp in employees:
            emp["id"] = str(emp["_id"])
        return employees
    except Exception as e:
        print(f"Error getting employees: {e}")
        raise HTTPException(status_code=500, detail="Database error")

@router.post("/", response_model=EmployeeResponse)
async def create_employee(employee: EmployeeCreate, db = Depends(get_db)):
    try:
        print(f"Creating employee: {employee.employee_id}")
        
        # Check for duplicate employee_id
        existing = await db.employees.find_one({"employee_id": employee.employee_id})
        if existing:
            raise HTTPException(status_code=400, detail="Employee ID already exists")
        
        # Check for duplicate email
        existing_email = await db.employees.find_one({"email": employee.email})
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already exists")
        
        employee_dict = employee.dict()
        employee_dict["created_at"] = datetime.utcnow()
        
        print(f"Inserting employee: {employee_dict}")
        result = await db.employees.insert_one(employee_dict)
        
        created = await db.employees.find_one({"_id": result.inserted_id})
        created["id"] = str(created["_id"])
        print(f"Employee created successfully: {created['employee_id']}")
        
        return created
        
    except HTTPException as he:
        print(f"HTTP Error: {he.detail}")
        raise he
    except Exception as e:
        print(f"Error creating employee: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create employee: {str(e)}")

@router.delete("/{employee_id}")
async def delete_employee(employee_id: str, db = Depends(get_db)):
    try:
        print(f"Deleting employee: {employee_id}")
        
        # Delete employee
        result = await db.employees.delete_one({"employee_id": employee_id})
        
        # Delete attendance records for this employee
        await db.attendance.delete_many({"employee_id": employee_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Employee not found")
        
        return {"message": f"Employee {employee_id} deleted successfully"}
        
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Error deleting employee: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete employee")