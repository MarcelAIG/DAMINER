import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { 
  Package, 
  Layers, 
  PlusCircle,
  Eye,
  FolderEdit,
  CheckCircle2,
  FileText,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { getFirestoreProducts, calculateProductStats, ProductStats } from '../services/productService';
import { getFirestoreCategoriesCount } from '../services/categoryService';

// NOTE: The one-time catalog migration (services/seedMigration.ts) is intentionally
// NOT exposed in the admin UI anymore. The source is kept for development use only.

export const AdminDashboard = () => {
  const [stats, setStats] = useState<ProductStats>({ total: 0, published: 0, drafts: 0 });
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  const [isLoadingStats, setIsLoadingStats] = useState<boolean>(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const loadStats = async () => {
    setIsLoadingStats(true);
    setStatsError(null);
    try {
      const [products, catCount] = await Promise.all([
        getFirestoreProducts(),
        getFirestoreCategoriesCount(),
      ]);
      setStats(calculateProductStats(products));
      setCategoriesCount(catCount);
    } catch (err: unknown) {
      console.error('Помилка завантаження статистики Firestore:', err);
      setStatsError(err instanceof Error ? err.message : 'Не вдалося завантажити статистику з Firestore');
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  // Value shown in a stat card: spinner while loading, dash on error, real number otherwise
  const renderStatValue = (value: number, spinnerColor: string) => {
    if (isLoadingStats) {
      return (
        <div className="h-9 flex items-center mb-1">
          <Loader2 className={`w-6 h-6 animate-spin ${spinnerColor}`} />
        </div>
      );
    }
    return (
      <div className="text-3xl font-bold text-[#0A192F] mb-1">{statsError ? '—' : value}</div>
    );
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-[#0A192F] mb-2">Панель адміністратора</h2>
        <p className="text-gray-500">Керування сайтом DAMINER</p>
      </div>

      {/* Stats Error */}
      {statsError && !isLoadingStats && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Не вдалося завантажити статистику</h4>
            <p className="text-xs text-red-700">{statsError}</p>
          </div>
          <button
            type="button"
            onClick={loadStats}
            className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors"
          >
            Спробувати знову
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Товари</h3>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-blue" />
            </div>
          </div>
          {renderStatValue(stats.total, 'text-primary-blue')}
          <div className="text-sm text-gray-500">Товарів у каталозі</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Категорії</h3>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
              <Layers className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
          {renderStatValue(categoriesCount, 'text-indigo-500')}
          <div className="text-sm text-gray-500">Категорій у Firestore</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Опубліковано</h3>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          </div>
          {renderStatValue(stats.published, 'text-green-500')}
          <div className="text-sm text-gray-500">Активних товарів</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Чернетки</h3>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          {renderStatValue(stats.drafts, 'text-amber-500')}
          <div className="text-sm text-gray-500">Неопублікованих товарів</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
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
