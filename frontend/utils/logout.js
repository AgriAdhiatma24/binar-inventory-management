import axios from 'axios';

const logout = async () => {
  try {
    // Remove the access token from local storage
    localStorage.removeItem('access_token');
    
    // Send a logout request to the server (optional)
    await axios.post('http://localhost:9000/api/v1/auth/logout');
    
    // Redirect to the login page or any other page as needed
    window.location.href = '/login'; // Example: Redirect to the login page
  } catch (error) {
    // Handle any errors if the logout fails
    console.error('Logout failed:', error);
  }
};

export default logout;
