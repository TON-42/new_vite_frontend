// hooks/useAuth.ts
import { useState } from 'react';
import { fetchAccessToken } from '../utils/api.ts';

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    const accessToken = await fetchAccessToken(username, password);
    if (accessToken) {
      setToken(accessToken);
      localStorage.setItem('accessToken', accessToken); // Store token in local storage
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('accessToken'); // Remove token from local storage
  };

  return { token, login, logout };
};

export default useAuth;
