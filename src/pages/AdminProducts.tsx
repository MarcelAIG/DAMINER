import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { Edit, Package, RefreshCw, AlertCircle, Loader2, CheckCircle2, X } from 'lucide-react';
import { getFirestoreProducts, FirestoreProduct } from '../services/productService';

export const AdminProducts = () => {
  const location = useLocation();
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(
    (location.state as { successMessage?: string } | null)?.successMessage || null
  );

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFirestoreProducts();
      setProducts(data);
    } catch (err: unknown) {
      console.error('Помилка завантаження товарів з Firestore:', err);
      setError(err instanceof Error ? err.message : 'Не вдалося завантажити товари з Firestore');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const formatPrice = (product: FirestoreProduct) => {
    if (product.priceMode === 'from' && product.priceAmount) {
      const clean = product.priceAmount.trim();
      if (clean.toLowerCase().includes('грн')) {
        return `Від ${clean}`;
      }
      const num = clean.replace(/\s+/g, '');
      if (!isNaN(Number(num)) && num.length > 0) {
        return `Від ${Number(num).toLocaleString('uk-UA')} грн`;
      }
      return `Від ${clean}`;
    }
    return 'За запитом';
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-3xl font-heading font-bold text-[#0A192F]">Товари</h2>
            {!isLoading && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-primary-blue border border-blue-100">
                {products.length} {products.length === 1 ? 'позиція' : products.length >= 2 && products.length <= 4 ? 'позиції' : 'позицій'}
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm">Керування товарами каталогу DAMINER з Firestore</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadProducts}
            disabled={isLoading}
            title="Оновити список"
            className="p-2.5 border border-gray-200 text-gray-600 hover:text-primary-blue hover:border-primary-blue rounded-md transition-colors bg-white disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-primary-blue' : ''}`} />
          </button>
          <Link 
            to="/admin/products/new" 
            className="bg-primary-blue text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
          >
            + Додати товар
          </Link>
        </div>
      </div>

      {/* Success notification from new product creation */}
      {flashMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-800 animate-fadeIn">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-sm font-medium">{flashMessage}</span>
          </div>
          <button 
            type="button"
            onClick={() => setFlashMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 p-1 rounded-md hover:bg-emerald-100 transition-colors"
            title="Закрити"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Помилка завантаження товарів</h4>
            <p className="text-xs text-red-700">{error}</p>
          </div>
          <button 
            type="button" 
            onClick={loadProducts}
            className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors"
          >
            Спробувати знову
          </button>
        </div>
      )}

      {/* Products Table Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4 whitespace-nowrap w-20">Фото</th>
                <th className="p-4 whitespace-nowrap">Назва</th>
                <th className="p-4 whitespace-nowrap">Категорія</th>
                <th className="p-4 whitespace-nowrap">Ціна</th>
                <th className="p-4 whitespace-nowrap">Статус</th>
                <th className="p-4 whitespace-nowrap text-right">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {/* Loading State */}
              {isLoading && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
                      <span className="text-sm font-medium">Завантаження товарів з Firestore...</span>
                    </div>
                  </td>
                </tr>
              )}

              {/* Empty state */}
              {!isLoading && !error && products.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-md mx-auto">
                      <Package className="w-10 h-10 text-gray-300 mb-1" />
                      <p className="font-semibold text-gray-700">Товари відсутні у Firestore</p>
                      <p className="text-xs text-gray-400 mb-3">
                        У базі даних ще немає жодного товару. Створіть перший товар або зверніться до розробника.
                      </p>
                      <Link 
                        to="/admin/products/new" 
                        className="text-xs font-semibold text-primary-blue hover:underline"
                      >
                        + Додати товар →
                      </Link>
                    </div>
                  </td>
                </tr>
              )}

              {/* Products list */}
              {!isLoading && products.map((product) => {
                const isPublished = product.published !== false;
                const priceText = formatPrice(product);

                return (
                  <tr key={product.id} className="hover:bg-gray-50/60 transition-colors">
                    {/* Primary Image */}
                    <td className="p-4">
                      <div className="w-14 h-14 bg-white border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-1 shadow-2xs">
                        {product.primaryImage ? (
                          <img 
                            src={product.primaryImage} 
                            alt={product.nameUa || 'Товар'} 
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <Package className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                    </td>

                    {/* Ukrainian Name */}
                    <td className="p-4 font-semibold text-[#0A192F]">
                      <div className="flex flex-col">
                        <span>{product.nameUa || 'Без назви'}</span>
                        <span className="text-xs font-mono text-gray-400 font-normal">
                          {product.route || `/product/${product.id}`}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4 text-gray-600 font-medium">
                      {product.category || 'Без категорії'}
                    </td>

                    {/* Price Status */}
                    <td className="p-4">
                      <span className="font-medium text-[#0A192F] text-xs">
                        {priceText}
                      </span>
                    </td>

                    {/* Publication Status */}
                    <td className="p-4">
                      {isPublished ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                          Опубліковано
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          Чернетка
                        </span>
                      )}
                    </td>

                    {/* Actions: Edit button/icon */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link 
                          to={`/admin/products/${product.id}/edit`}
                          className="p-2 text-gray-400 hover:text-primary-blue transition-colors rounded-lg hover:bg-blue-50 inline-flex items-center justify-center"
                          title="Редагувати товар"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
