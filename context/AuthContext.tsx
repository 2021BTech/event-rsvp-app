import { useRequest } from '@/hooks/useRequest';
import { AuthContextType, User } from '@/models/user';
import { Endpoints } from '@/utils/enums';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { request } = useRequest();

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('access_token');
      if (storedToken) {
        setToken(storedToken);
        // Fetch user data
        await fetchUserData(storedToken);
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async (userToken: string) => {
    try {
      await request({
        method: 'GET',
        url: Endpoints.GET_USER,
        onSuccess: (data) => {
          setUser(data.user);
        },
        onError: () => {
          // Token might be invalid, clear it
          SecureStore.deleteItemAsync('access_token');
          setToken(null);
        }
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await request({
        method: 'POST',
        url: Endpoints.LOGIN,
        data: { email, password },
        onSuccess: (data) => {
          setToken(data.token);
          setUser(data.user);
          SecureStore.setItemAsync('access_token', data.token);
          return true;
        },
        onError: () => {
          return false;
        }
      });
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const result = await request({
        method: 'POST',
        url: Endpoints.REGISTER,
        data: { name, email, password, role: 'user' },
        onSuccess: (data) => {
          setToken(data.token);
          setUser(data.user);
          SecureStore.setItemAsync('access_token', data.token);
          return true;
        },
        onError: () => {
          return false;
        }
      });
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await SecureStore.deleteItemAsync('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};