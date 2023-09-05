// src/utils/auth.js
function checkAuthentication() {
    const token = localStorage.getItem('authToken');
  
    return !!token;
  }
  
  export { checkAuthentication };
  