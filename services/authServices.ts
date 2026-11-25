import { loginFormData, registerFormData, AuthResponse } from '../types/authTypes';
import { UpdateUserData, User } from '../types/authTypes';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async login (data: loginFormData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }
    return result;
  },

    async register (data: registerFormData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Registration failed');
    }
    return result;
  },

  async updateUser (userId : number, data: UpdateUserData): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update user');
    }
    return result;
  },
  async getProfile (): Promise<User> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to get user profile');
    }
    return result.user ;
  }
};
