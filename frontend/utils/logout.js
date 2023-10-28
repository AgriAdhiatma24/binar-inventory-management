import axios from 'axios';

const logout = async () => {
  try {
   
    localStorage.removeItem('access_token');
   
    await axios.post('http://localhost:9000/api/v1/auth/logout');
    
    window.location.href = '/login'; 
  } catch (error) {
    
    console.error('Logout failed:', error);
  }
};

export default logout;
