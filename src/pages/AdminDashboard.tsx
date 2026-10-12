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
  Database,
  Loader2,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { importCurrentCatalogToFirestore, MigrationProgress, MigrationResult } from '../services/seedMigration';
import { getFirestoreProducts, calculateProductStats, ProductStats } from '../services/productService';

export const AdminDashboard = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState<MigrationProgress | null>(null);
  const [result, setResult] = useState<MigrationResult | null>(null);

  const [stats, setStats] = useState<ProductStats>({ total: 0, published: 0, drafts: 0 });
  const [isLoadingStats, setIsLoadingStats] = useState<boolean>(true);

  const loadStats = async () => {
    setIsLoadingStats(true);
    try {
      const products = await getFirestoreProducts();
      setStats(calculateProductStats(products));
    } catch (err: unknown) {
      console.error('Помилка завантаження статистики Firestore:', err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleStartImport = async () => {
    // 1. show confirmation
    const confirmed = window.confirm(
      'Підтвердження міграції:\n\nВи впевнені, що хочете імпортувати поточний каталог (32 товари) у Firestore?\n\n- Колекція: products\n- Існуючі документи НЕ будуть перезаписані\n- Поточний сайт та локальні дані залишаються без змін'
    );
    if (!confirmed) return;

    // 2. import the current products into Firestore (skipping existing)
    setIsImporting(true);
    setProgress(null);
    setResult(null);

    try {
      const migrationResult = await importCurrentCatalogToFirestore((p) => {
        setProgress(p);
      });
      // 4. show final result (imported count, skipped count, errors)
      setResult(migrationResult);
      // Refresh dashboard counters from Firestore
      await loadStats();
    } catch (err: unknown) {
      setResult({
        total: 32,
        imported: 0,
        skipped: 0,
        errors: [err instanceof Error ? err.message : String(err)]
      });
    } finally {
      setIsImporting(false);
    }
  };

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
          {isLoadingStats ? (
            <div className="h-9 flex items-center mb-1">
              <Loader2 className="w-6 h-6 animate-spin text-primary-blue" />
            </div>
          ) : (
            <div className="text-3xl font-bold text-[#0A192F] mb-1">{stats.total}</div>
          )}
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
          {isLoadingStats ? (
            <div className="h-9 flex items-center mb-1">
              <Loader2 className="w-6 h-6 animate-spin text-green-500" />
            </div>
          ) : (
            <div className="text-3xl font-bold text-[#0A192F] mb-1">{stats.published}</div>
          )}
          <div className="text-sm text-gray-500">Активних товарів</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Чернетки</h3>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          {isLoadingStats ? (
            <div className="h-9 flex items-center mb-1">
              <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
            </div>
          ) : (
            <div className="text-3xl font-bold text-[#0A192F] mb-1">{stats.drafts}</div>
          )}
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

      {/* Migration Dev Card */}
      <div className="bg-white border-2 border-dashed border-blue-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary-blue">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#0A192F]">
                Міграція поточного каталогу у Firestore
              </h3>
              <span className="text-[11px] font-semibold uppercase tracking-wider bg-blue-100 text-primary-blue px-2 py-0.5 rounded-full">
                Dev Only
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Безпечний одноразовий імпорт 32 перевірених товарів DAMINER у колекцію Firestore <code className="px-1.5 py-0.5 bg-gray-100 text-[#0A192F] font-mono text-xs rounded border border-gray-200">products</code>. Документи, які вже існують в базі даних, автоматично пропускаються і ніколи не перезаписуються.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              id="btn-import-catalog"
              disabled={isImporting}
              onClick={handleStartImport}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                isImporting
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-blue text-white hover:bg-blue-700 hover:shadow active:scale-[0.98]'
              }`}
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  <span>Імпортування...</span>
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  <span>Імпортувати поточний каталог</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress Display */}
        {isImporting && progress && (
          <div className="mt-6 pt-6 border-t border-blue-100">
            <div className="flex justify-between items-center text-xs text-gray-600 mb-2 font-medium">
              <span>Обробка товару: <span className="text-[#0A192F] font-semibold">{progress.productName}</span></span>
              <span>{progress.current} з {progress.total} ({Math.round((progress.current / progress.total) * 100)}%)</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-primary-blue h-2.5 rounded-full transition-all duration-200 ease-out"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Migration Result Display */}
        {result && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              {result.errors.length === 0 ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              )}
              <h4 className="text-sm font-bold text-[#0A192F]">
                Результат імпорту каталогу:
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-green-50/70 border border-green-200 rounded-xl">
                <div className="text-xs text-green-700 font-medium mb-1">Успішно імпортовано</div>
                <div className="text-2xl font-bold text-green-800">{result.imported}</div>
                <div className="text-[11px] text-green-600 mt-1">Нові документи у Firestore</div>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
                <div className="text-xs text-amber-700 font-medium mb-1">Пропущено (вже існують)</div>
                <div className="text-2xl font-bold text-amber-800">{result.skipped}</div>
                <div className="text-[11px] text-amber-600 mt-1">Збережено без перезапису</div>
              </div>

              <div className={`p-4 rounded-xl border ${result.errors.length > 0 ? 'bg-red-50/70 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className={`text-xs font-medium mb-1 ${result.errors.length > 0 ? 'text-red-700' : 'text-gray-500'}`}>Помилки</div>
                <div className={`text-2xl font-bold ${result.errors.length > 0 ? 'text-red-800' : 'text-gray-700'}`}>{result.errors.length}</div>
                <div className="text-[11px] text-gray-500 mt-1">{result.errors.length === 0 ? 'Жодних помилок' : 'Потребують уваги'}</div>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-800">
                <div className="font-semibold mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Деталі помилок:
                </div>
                <ul className="list-disc pl-5 space-y-1 max-h-40 overflow-y-auto font-mono">
                  {result.errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
