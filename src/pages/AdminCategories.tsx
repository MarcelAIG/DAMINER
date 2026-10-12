import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { 
  getFirestoreCategories, 
  importInitialCategories, 
  createFirestoreCategory, 
  updateFirestoreCategory,
  FirestoreCategory,
  CategoryImportResult
} from '../services/categoryService';
import { 
  Edit, 
  Plus, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Database, 
  Layers, 
  Lock, 
  X, 
  Check, 
  Eye, 
  EyeOff,
  AlertTriangle
} from 'lucide-react';
import { collection, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const AdminCategories = () => {
  const [categories, setCategories] = useState<FirestoreCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Import state
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importResult, setImportResult] = useState<CategoryImportResult | null>(null);

  // Edit Modal State
  const [editingCategory, setEditingCategory] = useState<FirestoreCategory | null>(null);
  const [editNameUa, setEditNameUa] = useState<string>('');
  const [editNameEn, setEditNameEn] = useState<string>('');
  const [editEnabled, setEditEnabled] = useState<boolean>(true);
  const [editSortOrder, setEditSortOrder] = useState<number>(1);
  const [isSavingEdit, setIsSavingEdit] = useState<boolean>(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newCategoryId, setNewCategoryId] = useState<string>('');
  const [newNameUa, setNewNameUa] = useState<string>('');
  const [newNameEn, setNewNameEn] = useState<string>('');
  const [newEnabled, setNewEnabled] = useState<boolean>(false); // default: enabled = false
  const [newSortOrder, setNewSortOrder] = useState<number>(1);
  const [isSavingAdd, setIsSavingAdd] = useState<boolean>(false);
  const [addError, setAddError] = useState<string | null>(null);

  const loadCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFirestoreCategories();
      setCategories(data);
    } catch (err: unknown) {
      console.error('Помилка завантаження категорій з Firestore:', err);
      setError(err instanceof Error ? err.message : 'Не вдалося завантажити категорії з Firestore');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // TASK 1: Initial Import
  const handleImportInitial = async () => {
    setIsImporting(true);
    setImportResult(null);
    setError(null);
    try {
      const result = await importInitialCategories();
      setImportResult(result);
      await loadCategories();
      if (result.imported > 0) {
        setSuccessMessage(`Успішно імпортовано ${result.imported} категорій у Firestore!`);
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err: unknown) {
      console.error('Помилка імпорту категорій:', err);
      setError(err instanceof Error ? err.message : 'Помилка при імпорті категорій');
    } finally {
      setIsImporting(false);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (category: FirestoreCategory) => {
    setEditingCategory(category);
    setEditNameUa(category.nameUa);
    setEditNameEn(category.nameEn);
    setEditEnabled(category.enabled);
    setEditSortOrder(category.sortOrder);
    setEditError(null);
  };

  // Submit Edit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    if (!editNameUa.trim()) {
      setEditError('Назва категорії (UA) є обов\'язковою.');
      return;
    }

    setIsSavingEdit(true);
    setEditError(null);
    try {
      await updateFirestoreCategory(editingCategory.id, {
        nameUa: editNameUa.trim(),
        nameEn: editNameEn.trim(),
        enabled: editEnabled,
        sortOrder: Number(editSortOrder) || 1,
      });

      setSuccessMessage(`Категорію "${editNameUa.trim()}" успішно оновлено!`);
      setTimeout(() => setSuccessMessage(null), 3000);
      setEditingCategory(null);
      await loadCategories();
    } catch (err: unknown) {
      console.error('Помилка збереження змін категорії:', err);
      setEditError(err instanceof Error ? err.message : 'Не вдалося зберегти зміни');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    // Generate stable unique Firestore ID upfront
    const generatedId = doc(collection(db, 'categories')).id;
    setNewCategoryId(generatedId);
    setNewNameUa('');
    setNewNameEn('');
    setNewEnabled(false); // default: enabled = false
    
    // Default sortOrder = current highest + 1
    const highestSort = categories.reduce((max, c) => Math.max(max, c.sortOrder || 0), 0);
    setNewSortOrder(highestSort + 1);
    
    setAddError(null);
    setIsAddModalOpen(true);
  };

  // Submit Add
  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newNameUa.trim()) {
      setAddError('Назва категорії (UA) є обов\'язковою.');
      return;
    }

    setIsSavingAdd(true);
    setAddError(null);
    try {
      await createFirestoreCategory({
        id: newCategoryId,
        nameUa: newNameUa.trim(),
        nameEn: newNameEn.trim(),
        enabled: newEnabled,
        sortOrder: Number(newSortOrder) || 1,
      });

      setSuccessMessage(`Категорію "${newNameUa.trim()}" успішно створено!`);
      setTimeout(() => setSuccessMessage(null), 3000);
      setIsAddModalOpen(false);
      await loadCategories();
    } catch (err: unknown) {
      console.error('Помилка створення нової категорії:', err);
      setAddError(err instanceof Error ? err.message : 'Не вдалося створити категорію');
    } finally {
      setIsSavingAdd(false);
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-3xl font-heading font-bold text-[#0A192F]">Категорії</h2>
            {!isLoading && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
                {categories.length} {categories.length === 1 ? 'категорія' : categories.length >= 2 && categories.length <= 4 ? 'категорії' : 'категорій'}
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm">
            Керування категоріями товарів DAMINER у Firestore (колекція <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">categories</code>)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadCategories}
            disabled={isLoading}
            title="Оновити список"
            className="p-2.5 border border-gray-200 text-gray-600 hover:text-primary-blue hover:border-primary-blue rounded-md transition-colors bg-white disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-primary-blue' : ''}`} />
          </button>
          
          <button
            type="button"
            onClick={handleOpenAdd}
            className="bg-primary-blue text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Додати категорію
          </button>
        </div>
      </div>

      {/* Global Success Banner */}
      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-800 animate-fadeIn">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
          <button 
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 p-1 rounded-md hover:bg-emerald-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Global Error Banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Помилка</h4>
            <p className="text-xs text-red-700">{error}</p>
          </div>
          <button 
            type="button"
            onClick={() => setError(null)}
            className="text-red-700 hover:text-red-900 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Import Result Notification */}
      {importResult && (
        <div className="mb-6 p-5 bg-blue-50/70 border border-blue-200 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary-blue" />
              <h4 className="font-bold text-sm text-[#0A192F]">Результат імпорту категорій:</h4>
            </div>
            <button
              type="button"
              onClick={() => setImportResult(null)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-2">
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <span className="text-gray-500 block mb-0.5">Створено нових:</span>
              <strong className="text-emerald-700 text-lg">{importResult.imported}</strong>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <span className="text-gray-500 block mb-0.5">Пропущено (вже були):</span>
              <strong className="text-amber-700 text-lg">{importResult.skipped}</strong>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <span className="text-gray-500 block mb-0.5">Помилки:</span>
              <strong className="text-red-700 text-lg">{importResult.errors.length}</strong>
            </div>
          </div>

          {importResult.errors.length > 0 && (
            <div className="mt-2 text-xs text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
              {importResult.errors.map((e, idx) => (
                <div key={idx}>• {e}</div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TASK 1: Empty State with DEV ONLY Initial Import Button */}
      {!isLoading && !error && categories.length === 0 && (
        <div className="mb-8 bg-white rounded-xl border-2 border-dashed border-indigo-200 p-8 md:p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mx-auto mb-4">
            <Database className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold font-heading text-[#0A192F] mb-2">
            Категорії відсутні у Firestore
          </h3>
          <p className="text-sm text-gray-500 max-w-lg mx-auto mb-6">
            Колекція <code className="font-mono text-gray-700 bg-gray-100 px-1 py-0.5 rounded">categories</code> порожня. 
            Виконайте безпечний початковий імпорт 5 канонічних категорій DAMINER зі стабільними ID:
            <br />
            <span className="font-mono text-xs text-gray-600 mt-2 block">
              probes, mirrors, kits, nets, tools
            </span>
          </p>

          <button
            type="button"
            onClick={handleImportInitial}
            disabled={isImporting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-blue text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
          >
            {isImporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Імпортування...</span>
              </>
            ) : (
              <>
                <Database className="w-4 h-4" />
                <span>Імпортувати 5 категорій</span>
              </>
            )}
          </button>
          <div className="text-[11px] text-gray-400 mt-3">
            DEV ONLY • Не перезаписує існуючі документи
          </div>
        </div>
      )}

      {/* TASK 2: Category List Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4 whitespace-nowrap w-16 text-center">№</th>
                <th className="p-4 whitespace-nowrap">Назва (UA)</th>
                <th className="p-4 whitespace-nowrap">Назва (EN)</th>
                <th className="p-4 whitespace-nowrap">ID категорії</th>
                <th className="p-4 whitespace-nowrap">Статус</th>
                <th className="p-4 whitespace-nowrap text-right">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {isLoading && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
                      <span className="text-sm font-medium">Завантаження категорій з Firestore...</span>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50/60 transition-colors">
                  {/* Sort Order */}
                  <td className="p-4 text-center font-mono text-xs text-gray-500 font-semibold">
                    {category.sortOrder}
                  </td>

                  {/* Name UA */}
                  <td className="p-4 font-semibold text-[#0A192F]">
                    {category.nameUa}
                  </td>

                  {/* Name EN */}
                  <td className="p-4 text-gray-600">
                    {category.nameEn ? (
                      category.nameEn
                    ) : (
                      <span className="text-gray-300 italic text-xs">—</span>
                    )}
                  </td>

                  {/* ID */}
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-100 font-mono text-xs text-gray-700 border border-gray-200">
                      <Lock className="w-3 h-3 text-gray-400" />
                      {category.id}
                    </span>
                  </td>

                  {/* Enabled Status */}
                  <td className="p-4">
                    {category.enabled ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3 h-3" />
                        Активна
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <EyeOff className="w-3 h-3" />
                        Прихована
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(category)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-primary-blue bg-white hover:bg-blue-50 border border-gray-200 hover:border-primary-blue rounded-lg transition-colors shadow-sm"
                      title="Редагувати категорію"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Редагувати</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TASK 3: Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-primary-blue" />
                <h3 className="text-xl font-bold font-heading text-[#0A192F]">
                  Редагування категорії
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-5">
              {/* Category ID (NEVER EDITABLE) */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  ID категорії (незмінний)
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-mono text-gray-700">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span>{editingCategory.id}</span>
                  <span className="ml-auto text-[11px] text-gray-400">Фіксований ключ</span>
                </div>
              </div>

              {/* Error message */}
              {editError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{editError}</span>
                </div>
              )}

              {/* Name UA */}
              <div>
                <label className="block text-sm font-semibold text-[#0A192F] mb-1.5">
                  Назва (UA) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editNameUa}
                  onChange={(e) => setEditNameUa(e.target.value)}
                  placeholder="Назва українською"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                  required
                />
              </div>

              {/* Name EN */}
              <div>
                <label className="block text-sm font-semibold text-[#0A192F] mb-1.5">
                  Назва (EN)
                </label>
                <input
                  type="text"
                  value={editNameEn}
                  onChange={(e) => setEditNameEn(e.target.value)}
                  placeholder="Name in English"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A192F] mb-1.5">
                    Порядок (sortOrder)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editSortOrder}
                    onChange={(e) => setEditSortOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                  />
                </div>

                {/* Enabled Status */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A192F] mb-1.5">
                    Статус відображення
                  </label>
                  <select
                    value={editEnabled ? 'true' : 'false'}
                    onChange={(e) => setEditEnabled(e.target.value === 'true')}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                  >
                    <option value="true">Активна (enabled)</option>
                    <option value="false">Прихована (hidden)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-800">
                <span className="font-semibold block mb-0.5">Примітка:</span>
                Зміни стосуються виключно колекції <code className="font-mono">categories</code> у Firestore. Існуючі товари та публічний каталог залишаються без змін.
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2.5 bg-primary-blue text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {isSavingEdit ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Збереження...</span>
                    </>
                  ) : (
                    <span>Зберегти зміни</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TASK 4: Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary-blue" />
                <h3 className="text-xl font-bold font-heading text-[#0A192F]">
                  Додати категорію
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="p-6 space-y-5">
              {/* Generated ID Badge */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Автоматично згенерований ID
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50/50 border border-blue-200 rounded-lg text-sm font-mono text-primary-blue">
                  <Lock className="w-4 h-4 text-primary-blue" />
                  <span>{newCategoryId}</span>
                  <span className="ml-auto text-[11px] text-gray-500">Унікальний ключ</span>
                </div>
              </div>

              {/* Error message */}
              {addError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{addError}</span>
                </div>
              )}

              {/* Name UA */}
              <div>
                <label className="block text-sm font-semibold text-[#0A192F] mb-1.5">
                  Назва (UA) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newNameUa}
                  onChange={(e) => setNewNameUa(e.target.value)}
                  placeholder="Наприклад: Засоби зв'язку"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                  required
                />
              </div>

              {/* Name EN */}
              <div>
                <label className="block text-sm font-semibold text-[#0A192F] mb-1.5">
                  Назва (EN)
                </label>
                <input
                  type="text"
                  value={newNameEn}
                  onChange={(e) => setNewNameEn(e.target.value)}
                  placeholder="Communication tools"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A192F] mb-1.5">
                    Порядок (sortOrder)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newSortOrder}
                    onChange={(e) => setNewSortOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">За замовчуванням: найвищий + 1</p>
                </div>

                {/* Enabled Status (Default: false) */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A192F] mb-1.5">
                    Статус
                  </label>
                  <select
                    value={newEnabled ? 'true' : 'false'}
                    onChange={(e) => setNewEnabled(e.target.value === 'true')}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                  >
                    <option value="false">Прихована / Чернетка (за замовч.)</option>
                    <option value="true">Активна</option>
                  </select>
                  <p className="text-[11px] text-gray-400 mt-1">Нові категорії за замовч. приховані</p>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-800">
                <span className="font-semibold block mb-0.5">Адмін-доступ:</span>
                Нові категорії створюються як чернетки для внутрішнього наповнення та не публікуються на веб-сайті.
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isSavingAdd}
                  className="px-5 py-2.5 bg-primary-blue text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {isSavingAdd ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Створення...</span>
                    </>
                  ) : (
                    <span>Створити категорію</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
