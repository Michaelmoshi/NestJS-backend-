import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, loginFormData, registerFormData, UpdateUserData, User } from '../types/authTypes';
import { authService } from '../services/authServices';

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isloading: false,
            error: null,  
            login  : async(data : loginFormData) => {
                set({ isloading: true, error: null });
                try {
                    const response = await authService.login(data);
                    localStorage.setItem('token', response.token); 
                    set({ 
                        user: response.user as User,
                        token: response.token,
                        isloading: false });
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Login failed';
                    set({ error: message, isloading: false });
                }
            },

            register : async(data : registerFormData) => {
                set({ isloading: true, error: null });
                try {
                    const result =  await authService.register(data);
                    localStorage.setItem('token', result.token);
                    set({ 
                        user: result.user as User,
                        token: result.token,
                        isloading: false });
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Registration failed';
                    set({ error: message, isloading: false });
                }
            },

            logout : () => {
                localStorage.removeItem('token');
                set({ user: null, token: null , isloading: false, error: null });
            },

            clearError : () => {
                set({ error: null });
            },

            setUser : (user : User) => {
                set({ user });
            },

            updateUser : async (data : UpdateUserData) => {
                const { user } = get();
                if (!user) {
                    return; 
                }
                set({ isloading: true, error: null });
                try {
                    const result = await authService.updateUser((useAuthStore.getState().user as User).id, data);
                    // On ne garde jamais le hash du mot de passe renvoyé par l'API
                    const { password: _password, ...safeUser } = result as User & { password?: string };
                    set({ user: safeUser, isloading: false });
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Failed to update user';
                    set({ error: message, isloading: false });
                }
            }
        }),

        { 
            name: 'auth-storage' ,
            partialize: (state) => ({ user: state.user, token: state.token })
            
        }
    )
)
  