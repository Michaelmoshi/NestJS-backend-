import {z} from "zod";

export const loginSchema = z.object({
  email: z.email({message: "Adresse email invalide"}),
  password: z.string().min(6, {message: "Le mot de passe doit contenir au moins 6 caractères"}),
});

export const registerSchema = z.object({
  name: z.string().min(3, {message: "Le nom doit contenir au moins 3 caractères"}).max(20, {message: "Le nom ne doit pas dépasser 20 caractères"}),
  email: z.email({message: "Adresse email invalide"}),
  password: z.string().min(6, {message: "Le mot de passe doit contenir au moins 6 caractères"}),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, {message: "Le nom doit contenir au moins 3 caractères"}).max(20, {message: "Le nom ne doit pas dépasser 20 caractères"}).optional(),
  email: z.email({message: "Adresse email invalide"}).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>; 