'use client';
import { UpdateUserData, updateUserSchema } from '@/schemas/authSchemas';
import { useAuthStore } from '@/stores/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Mail, User } from 'lucide-react';

export default function UpdateUserForm() {
    // Même logique que SigninAndSignUpForm : on récupère tout depuis le store
    const { user, updateUser, isloading: isLoading, error, clearError } = useAuthStore();
    const [success, setSuccess] = useState(false);

    // useForm gère les champs, zodResolver applique les règles de updateUserSchema
    const form = useForm<UpdateUserData>({
        resolver: zodResolver(updateUserSchema) as never,
        defaultValues: { name: user?.name ?? '', email: user?.email ?? '' },
    });

    // Si l'utilisateur change dans le store (ex : après rechargement), on remplit le formulaire
    useEffect(() => {
        if (user) form.reset({ name: user.name, email: user.email });
    }, [user, form]);

    const onSubmit = async (data: UpdateUserData) => {
        clearError();
        setSuccess(false);

        // On n'envoie que ce qui a changé
        const changes: UpdateUserData = {};
        if (data.name !== user?.name) changes.name = data.name;
        if (data.email !== user?.email) changes.email = data.email;
        if (Object.keys(changes).length === 0) return;

        await updateUser(changes);
        // Le store ne lance pas d'exception : on vérifie l'état après l'appel
        if (!useAuthStore.getState().error) {
            setSuccess(true);
        }
    };

    const inputClass = 'pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400';
    const iconClass = 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400';
    const errors = form.formState.errors;

    return (
        <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader className="pb-4">
                <CardTitle className="text-white">Modifier votre profil</CardTitle>
                <CardDescription>Mettez à jour votre nom et votre adresse email</CardDescription>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Profil mis à jour avec succès
                    </div>
                )}

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-300">Nom</Label>
                        <div className="relative">
                            <User className={iconClass} />
                            <Input id="name" type="text" placeholder="Nom" className={inputClass} {...form.register('name')} />
                        </div>
                        {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">Email</Label>
                        <div className="relative">
                            <Mail className={iconClass} />
                            <Input id="email" type="email" placeholder="email@exemple.com" className={inputClass} {...form.register('email')} />
                        </div>
                        {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                        {isLoading ? 'Chargement...' : 'Enregistrer'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
