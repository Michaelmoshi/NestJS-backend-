'use client';
import { LoginFormData, loginSchema, RegisterFormData, registerSchema } from '@/schemas/authSchemas';
import { useAuthStore } from '@/stores/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Lock, Mail, User } from 'lucide-react';

type FormData = {
    name?: string;
    email: string;
    password: string;
};

export default function SigninAndSignUpForm() {
    const [isLogin, setIsLogin] = useState(false);
    const { login, register: registerUser, isloading: isLoading, error, clearError } = useAuthStore();
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(isLogin ? loginSchema : registerSchema) as never,
        defaultValues: { name: '', email: '', password: '' },
    });

    const onSubmit = async (data: FormData) => {
        if (isLogin) {
            await login(data as LoginFormData);
        } else {
            await registerUser(data as RegisterFormData);
        }
        // Le store n'a pas de throw : on vérifie l'état après l'appel
        if (!useAuthStore.getState().error) {
            router.push('/dashboard');
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        clearError();
        form.reset({ name: '', email: '', password: '' });
    };

    const inputClass = 'pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400';
    const iconClass = 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400';

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            <div className="w-full max-w-md">
                <Card className="bg-slate-800/50 border-slate-700/50">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-white">
                            {isLogin ? 'Connexion' : 'Inscription'}
                        </CardTitle>
                        <CardDescription>
                            {isLogin ? 'Insérez vos identifiants pour vous connecter' : 'Créez un compte pour commencer'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {!isLogin && (
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-slate-300">Nom</Label>
                                    <div className="relative">
                                        <User className={iconClass} />
                                        <Input id="name" type="text" placeholder="Nom" className={inputClass} {...form.register('name' as keyof FormData)} />
                                    </div>
                                    {(form.formState.errors as Record<string, {message?: string}>).name &&(
                                        <p className='text-red-400 text-sm'>
                                            {(form.formState.errors as Record<string, {message?: string}>).name?.message }   
                                        </p> 
                                    )}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-300">Email</Label>
                                <div className="relative">
                                    <Mail className={iconClass} />
                                    <Input id="email" type="email" placeholder="email@exemple.com" className={inputClass} {...form.register('email' as keyof FormData)} />
                                </div>
                                {(form.formState.errors as Record<string, {message?: string}>).email &&(
                                    <p className='text-red-400 text-sm'>
                                        {(form.formState.errors as Record<string, {message?: string}>).email?.message }
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-300">Mot de passe</Label>
                                <div className="relative">
                                    <Lock className={iconClass} />
                                    <Input id="password" type="password" placeholder="••••••" className={inputClass} {...form.register('password' as keyof FormData)} />
                                </div>
                                {(form.formState.errors as Record<string, {message?: string}>).password &&(
                                    <p className='text-red-400 text-sm'>
                                        {(form.formState.errors as Record<string, {message?: string}>).password?.message }
                                    </p>
                                )}
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                                {isLoading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
                            </Button>
                        </form>

                        <p className="mt-4 text-center text-sm text-slate-400">
                            {isLogin ? "Pas encore de compte ?" : 'Déjà un compte ?'}{' '}
                            <button type="button" onClick={toggleMode} className="text-emerald-500 hover:underline">
                                {isLogin ? "S'inscrire" : 'Se connecter'}
                            </button>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
