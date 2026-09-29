import React from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { 
  Package, 
  Layers, 
  PlusCircle,
  Eye,
  FolderEdit,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-[#0A192F] mb-2">Панель адміністратора</h2>
        <p className="text-gray-500">Керування сайтом DAMINER</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Товари</h3>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-blue" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#0A192F] mb-1">17</div>
          <div className="text-sm text-gray-500">Товарів у каталозі</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Категорії</h3>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
              <Layers className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#0A192F] mb-1">5</div>
          <div className="text-sm text-gray-500">Категорій товарів</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Опубліковано</h3>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#0A192F] mb-1">17</div>
          <div className="text-sm text-gray-500">Активних товарів</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Чернетки</h3>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#0A192F] mb-1">0</div>
          <div className="text-sm text-gray-500">Неопублікованих товарів</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-xl font-heading font-bold text-[#0A192F] mb-6">Швидкі дії</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/products/new" className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-primary-blue hover:shadow-md transition-all group text-left">
            <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
              <PlusCircle className="w-6 h-6 text-gray-400 group-hover:text-primary-blue transition-colors" />
            </div>
            <div>
              <div className="font-semibold text-[#0A192F]">Додати товар</div>
              <div className="text-sm text-gray-500">Створити нову позицію</div>
            </div>
          </Link>
          
          <Link to="/admin/products" className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-primary-blue hover:shadow-md transition-all group text-left">
            <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
              <Eye className="w-6 h-6 text-gray-400 group-hover:text-primary-blue transition-colors" />
            </div>
            <div>
              <div className="font-semibold text-[#0A192F]">Переглянути товари</div>
              <div className="text-sm text-gray-500">Відкрити каталог</div>
            </div>
          </Link>

          <Link to="/admin/categories" className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-primary-blue hover:shadow-md transition-all group text-left">
            <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
              <FolderEdit className="w-6 h-6 text-gray-400 group-hover:text-primary-blue transition-colors" />
            </div>
            <div>
              <div className="font-semibold text-[#0A192F]">Керувати категоріями</div>
              <div className="text-sm text-gray-500">Структура каталогу</div>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};
