import React from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { Edit, Trash2 } from 'lucide-react';

export const AdminProducts = () => {
  const demoProducts = [
    { id: '1', photo: 'https://placehold.co/100x100?text=Photo', name: 'ЩР-1', category: 'Щупи', status: 'Опубліковано' },
    { id: '2', photo: 'https://placehold.co/100x100?text=Photo', name: 'ЗД-1', category: 'Дзеркала', status: 'Опубліковано' },
    { id: '3', photo: 'https://placehold.co/100x100?text=Photo', name: 'ЕОД-1', category: 'Набори', status: 'Опубліковано' },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-heading font-bold text-[#0A192F] mb-2">Товари</h2>
          <p className="text-gray-500">Керування товарами каталогу</p>
        </div>
        <Link 
          to="/admin/products/new" 
          className="bg-primary-blue text-white px-5 py-2.5 rounded-md hover:bg-opacity-90 transition-colors font-medium text-sm flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
        >
          + Додати товар
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="p-4 whitespace-nowrap">Фото</th>
                <th className="p-4 whitespace-nowrap">Назва</th>
                <th className="p-4 whitespace-nowrap">Категорія</th>
                <th className="p-4 whitespace-nowrap">Статус</th>
                <th className="p-4 whitespace-nowrap text-right">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {demoProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center text-xs text-gray-400">
                      Фото
                    </div>
                  </td>
                  <td className="p-4 font-medium text-[#0A192F]">{product.name}</td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary-blue transition-colors rounded-md hover:bg-blue-50">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
