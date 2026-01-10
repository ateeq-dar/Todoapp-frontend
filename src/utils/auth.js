// Save token after login
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token for API requests
export const getToken = () => {
  return localStorage.getItem("token");
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
};
