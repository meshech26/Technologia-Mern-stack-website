const useAuth = () => {
  const token = localStorage.getItem('token');
  return !!token; // returns true if token exists
};

export default useAuth;