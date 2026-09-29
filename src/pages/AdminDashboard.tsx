import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { LogOut } from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0A192F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center border-b border-gray-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">DAMINER</h1>
            <p className="text-gray-600 text-sm">Панель адміністратора</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Вийти
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-100">
          <h2 className="text-2xl font-semibold mb-2">Керування сайтом DAMINER</h2>
          <p className="text-gray-600">Цей розділ знаходиться в розробці.</p>
        </div>
      </div>
    </div>
  );
};
