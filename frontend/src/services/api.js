// import axios from 'axios';

// // Production backend URL (Render)
// const RENDER_BACKEND_URL = 'https://hrms-lite-2-yb7g.onrender.com';

// // Development backend URL
// const LOCAL_BACKEND_URL = 'http://localhost:8000';

// // Auto-detect environment
// const getBaseURL = () => {
//   // If we're on Netlify (production)
//   if (window.location.hostname.includes('netlify.app')) {
//     return RENDER_BACKEND_URL;
//   }
//   // If we're on localhost (development)
//   return LOCAL_BACKEND_URL;
// };

// const API = axios.create({
//   baseURL: getBaseURL(),
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000, // 10 second timeout
// });

// // Add request interceptor for debugging
// API.interceptors.request.use(
//   (config) => {
//     console.log(`🌐 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor
// API.interceptors.response.use(
//   (response) => {
//     console.log(`✅ API Response: ${response.status}`);
//     return response;
//   },
//   (error) => {
//     console.error('❌ API Error:', {
//       status: error.response?.status,
//       message: error.message,
//       url: error.config?.url
//     });
    
//     // Network error (backend not reachable)
//     if (error.code === 'ERR_NETWORK') {
//       alert('⚠️ Backend server is not reachable. Please check if backend is running.');
//     }
    
//     return Promise.reject(error);
//   }
// );

// export const employeeAPI = {
//   getAll: () => API.get('/api/employees/'),
//   create: (employee) => API.post('/api/employees/', employee),
//   delete: (employeeId) => API.delete(`/api/employees/${employeeId}`),
// };

// export const attendanceAPI = {
//   mark: (attendance) => API.post('/api/attendance/', attendance),
//   getByEmployee: (employeeId) => API.get(`/api/attendance/employee/${employeeId}`),
//   getAll: () => API.get('/api/attendance/'),
// };

// // Test connection
// export const testBackendConnection = async () => {
//   try {
//     const response = await API.get('/health');
//     console.log('✅ Backend Connection:', response.data);
//     return { success: true, data: response.data };
//   } catch (error) {
//     console.error('❌ Backend Connection Failed:', error.message);
//     return { 
//       success: false, 
//       error: error.message,
//       backendURL: API.defaults.baseURL
//     };
//   }
// };



// CHANGE THESE LINES ONLY:

const RENDER_BACKEND_URL = 'https://hrms-lite-2-yb7g.onrender.com'; // No trailing slash

const getBaseURL = () => {
  return RENDER_BACKEND_URL; // ALWAYS use Render URL
  // DELETE the if-else logic completely
};

// Also CHANGE the health test function:
export const testBackendConnection = async () => {
  try {
    // Use fetch instead of axios for simple check
    const response = await fetch(`${RENDER_BACKEND_URL}/health`);
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend Connection:', data);
      return { success: true, data: data };
    } else {
      console.error('❌ Backend Health Check Failed:', response.status);
      return { 
        success: false, 
        error: `HTTP ${response.status}`,
        backendURL: RENDER_BACKEND_URL
      };
    }
  } catch (error) {
    console.error('❌ Backend Connection Failed:', error.message);
    return { 
      success: false, 
      error: error.message,
      backendURL: RENDER_BACKEND_URL
    };
  }
};

