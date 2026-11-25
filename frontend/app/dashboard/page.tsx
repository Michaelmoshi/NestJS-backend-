'use client'

import UpdateUserForm from "@/components/UpdateUserForm";
import { useAuthStore } from "@/stores/authStore"
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, token, logout } = useAuthStore();
  const router = useRouter();

  useEffect(()=>{
    if (!token) {
      router.push('/')
    }
  },[token,router])

  const handleLogout = () => {
       logout();
       router.push('/')
  }

  if (!user) {
    return(
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin  text-emerald-500"/>
      </div>
    )
  }


  return(
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-10"> 
         <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-white font-semibold">
                  {user.name}
                </h1>
                <p className="text-slate-400 text-sm">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
         </div>
      </header>
      <div className="max-w-md mx-auto px-6 py-10">
        <UpdateUserForm />
      </div>
    </div>
  )
}
