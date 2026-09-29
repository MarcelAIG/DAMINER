import React from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Edit, Trash2 } from 'lucide-react';

export const AdminCategories = () => {
  const demoCategories = [
    'Щупи',
    'Дзеркала',
    'Набори',
    'Сіткомети протидронові',
    'Саперні пристосування'
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-heading font-bold text-[#0A192F] mb-2">Категорії</h2>
          <p className="text-gray-500">Керування категоріями товарів</p>
        </div>
        <button className="bg-primary-blue text-white px-5 py-2.5 rounded-md hover:bg-opacity-90 transition-colors font-medium text-sm flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto">
          + Додати категорію
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
        {demoCategories.map((category, index) => (
          <div key={index} className="flex items-center justify-between p-4 md:p-6 hover:bg-gray-50/50 transition-colors">
            <div className="font-medium text-[#0A192F]">{category}</div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-primary-blue transition-colors rounded-md hover:bg-blue-50">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};
