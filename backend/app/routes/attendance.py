from fastapi import APIRouter, HTTPException, Depends
from ..schemas import AttendanceCreate, AttendanceResponse
from ..database import get_database
from datetime import date
from fastapi.responses import JSONResponse

router = APIRouter()

async def get_db():
    db = get_database()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    return db

# OPTIONS endpoint for CORS preflight
@router.options("/")
async def options_attendance():
    return JSONResponse(
        content={"message": "OK"},
        headers={
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
    )

# OPTIONS for employee-specific attendance
@router.options("/employee/{employee_id}")
async def options_employee_attendance():
    return JSONResponse(
        content={"message": "OK"},
        headers={
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
    )

@router.post("/", response_model=AttendanceResponse)
async def mark_attendance(attendance: AttendanceCreate, db = Depends(get_db)):
    try:
        print(f"Marking attendance for: {attendance.employee_id} on {attendance.date}")
        
        # Check if employee exists
        employee = await db.employees.find_one({"employee_id": attendance.employee_id})
        if not employee:
            raise HTTPException(status_code=404, detail="Employee not found")
        
        # Format date as string for MongoDB
        date_str = attendance.date.isoformat()
        
        # Check if attendance already marked for this date
        existing = await db.attendance.find_one({
            "employee_id": attendance.employee_id,
            "date": date_str
        })
        
        attendance_dict = attendance.dict()
        attendance_dict["date"] = date_str
        
        if existing:
            # Update existing attendance
            print(f"Updating existing attendance for {attendance.employee_id}")
            await db.attendance.update_one(
                {"_id": existing["_id"]},
                {"$set": {"status": attendance.status}}
            )
            updated = await db.attendance.find_one({"_id": existing["_id"]})
        else:
            # Create new attendance record
            print(f"Creating new attendance for {attendance.employee_id}")
            result = await db.attendance.insert_one(attendance_dict)
            updated = await db.attendance.find_one({"_id": result.inserted_id})
        
        updated["id"] = str(updated["_id"])
        print(f"Attendance marked successfully")
        
        return updated
        
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Error marking attendance: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to mark attendance: {str(e)}")

@router.get("/employee/{employee_id}", response_model=list[AttendanceResponse])
async def get_employee_attendance(employee_id: str, db = Depends(get_db)):
    try:
        # Check if employee exists
        employee = await db.employees.find_one({"employee_id": employee_id})
        if not employee:
            raise HTTPException(status_code=404, detail="Employee not found")
        
        records = await db.attendance.find({"employee_id": employee_id}).to_list(1000)
        for record in records:
            record["id"] = str(record["_id"])
        return records
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Error getting attendance: {e}")
        raise HTTPException(status_code=500, detail="Database error")

@router.get("/", response_model=list[AttendanceResponse])
async def get_all_attendance(db = Depends(get_db)):
    try:
        records = await db.attendance.find().to_list(1000)
        for record in records:
            record["id"] = str(record["_id"])
        return records
    except Exception as e:
        print(f"Error getting all attendance: {e}")
        raise HTTPException(status_code=500, detail="Database error")