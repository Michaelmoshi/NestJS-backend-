export interface AuthState {
  user : User | null
  token : string | null
  isloading : boolean
  error : string | null
  login : (data: loginFormData) => Promise<void>;
  register : (data: registerFormData) => Promise<void>;
  logout : () => void;
  clearError : () => void;
  updateUser : (data: UpdateUserData) => Promise<void>;
  setUser : (user: User) => void;

}

export interface User {
  id: number
  name: string
  email: string
  role : 'ADMIN' | 'USER'
  createdAt: string
  updatedAt: string
}

export interface loginFormData {
  email: string
  password: string
}

export interface registerFormData {
  name: string
  email: string
  password: string
}

export interface UpdateUserData {
  name?: string
  email?: string
}

export interface AuthResponse {
  user: Omit<User, 'password'>
  token: string
}