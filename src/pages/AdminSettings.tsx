import React from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export const AdminSettings = () => {
  const navigate = useNavigate();
  const userEmail = auth.currentUser?.email || '';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-[#0A192F] mb-2">Налаштування</h2>
        <p className="text-gray-500">Налаштування адміністратора</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-xl">
        <h3 className="font-semibold text-[#0A192F] mb-4">Обліковий запис адміністратора</h3>
        
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-[#0A192F] font-medium">
              {userEmail}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Вийти
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};
