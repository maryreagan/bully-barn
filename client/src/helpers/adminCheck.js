import jwtDecode from 'jwt-decode';

export const adminCheck = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.isAdmin === true;
    } catch (error) {
      console.log("Error decoding token: ", error);
      return false;
    }
  } else {
    return false;
  }
};