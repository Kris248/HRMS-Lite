import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('📦 Data:', config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    console.log('📥 Response:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.message);
    if (error.response) {
      console.error('📥 Error Response:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export const employeeAPI = {
  getAll: () => API.get('/api/employees/'),
  create: (employee) => API.post('/api/employees/', employee),
  delete: (employeeId) => API.delete(`/api/employees/${employeeId}`),
};

export const attendanceAPI = {
  mark: (attendance) => API.post('/api/attendance/', attendance),
  getByEmployee: (employeeId) => API.get(`/api/attendance/employee/${employeeId}`),
  getAll: () => API.get('/api/attendance/'),
};

// Test connection on startup
export const testConnection = async () => {
  try {
    const response = await API.get('/health');
    console.log('✅ Backend connection:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    return { status: 'error', message: 'Backend not reachable' };
  }
};