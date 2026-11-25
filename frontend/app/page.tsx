'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';
import SigninAndSignUpForm from '@/components/SigninAndSignUpForm';

export default function HomePage() {
    const { token } = useAuthStore();
    const router = useRouter();


  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    }
  }, [token, router]);

  if(token) {
    return; // or a loading spinner
  }

  return (
      <SigninAndSignUpForm/>
  );
}
