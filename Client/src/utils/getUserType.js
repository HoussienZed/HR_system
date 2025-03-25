export const getUserType = () => {
    const userData = localStorage.getItem("user");
    
    if (!userData) return null;
  
    const user = JSON.parse(userData);
    return user.type || null; 
  };
  
export default getUserType;