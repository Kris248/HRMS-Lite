from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import date

class EmployeeBase(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    id: str
    
    class Config:
        from_attributes = True

class AttendanceBase(BaseModel):
    employee_id: str
    date: date
    status: str
    
    @validator('status')
    def validate_status(cls, v):
        if v not in ["Present", "Absent"]:
            raise ValueError('Status must be "Present" or "Absent"')
        return v

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceResponse(AttendanceBase):
    id: str
    
    class Config:
        from_attributes = True