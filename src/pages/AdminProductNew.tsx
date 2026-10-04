import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Plus, Trash2 } from 'lucide-react';

interface Specification {
  nameUa: string;
  nameEn: string;
  value: string;
}

export const AdminProductNew = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [nameUa, setNameUa] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState('');
  const [shortDescriptionUa, setShortDescriptionUa] = useState('');
  const [shortDescriptionEn, setShortDescriptionEn] = useState('');
  const [descriptionUa, setDescriptionUa] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const [packageUa, setPackageUa] = useState('');
  const [packageEn, setPackageEn] = useState('');
  const [priceLabel, setPriceLabel] = useState('За запитом');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  
  const categories = [
    'Щупи',
    'Дзеркала',
    'Набори',
    'Сіткомети протидронові',
    'Саперні пристосування'
  ];

  const handleAddSpec = () => {
    setSpecifications([...specifications, { nameUa: '', nameEn: '', value: '' }]);
  };

  const handleRemoveSpec = (index: number) => {
    const newSpecs = [...specifications];
    newSpecs.splice(index, 1);
    setSpecifications(newSpecs);
  };

  const handleSpecChange = (index: number, field: keyof Specification, value: string) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!nameUa.trim()) {
      setError('Назва товару (UA) є обов\'язковою');
      return;
    }
    if (!category) {
      setError('Категорія є обов\'язковою');
      return;
    }

    setLoading(true);

    try {
      const productData = {
        nameUa,
        nameEn,
        category,
        shortDescriptionUa,
        shortDescriptionEn,
        descriptionUa,
        descriptionEn,
        specifications,
        packageUa,
        packageEn,
        priceLabel,
        status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'products'), productData);
      
      alert('Товар успішно створено');
      navigate('/admin/products');
    } catch (err: any) {
      console.error('Error saving product:', err);
      setError(err.message || 'Помилка при збереженні товару');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-[#0A192F] mb-2">Додати товар</h2>
        <p className="text-gray-500">Створення нового товару в каталозі</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1 */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h3 className="text-xl font-heading font-bold text-[#0A192F] mb-6 border-b border-gray-100 pb-4">Основна інформація</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Назва товару (UA) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={nameUa}
                onChange={(e) => setNameUa(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                placeholder="Введіть назву українською"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Назва товару (EN)</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                placeholder="Введіть назву англійською"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Категорія <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors bg-white"
              required
            >
              <option value="" disabled>Оберіть категорію</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Короткий опис (UA)</label>
              <textarea
                value={shortDescriptionUa}
                onChange={(e) => setShortDescriptionUa(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors min-h-[100px]"
                placeholder="Короткий опис українською..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Короткий опис (EN)</label>
              <textarea
                value={shortDescriptionEn}
                onChange={(e) => setShortDescriptionEn(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors min-h-[100px]"
                placeholder="Короткий опис англійською..."
              />
            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h3 className="text-xl font-heading font-bold text-[#0A192F] mb-6 border-b border-gray-100 pb-4">Характеристики</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Характеристики (UA)</label>
              <textarea
                value={descriptionUa}
                onChange={(e) => setDescriptionUa(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors min-h-[150px]"
                placeholder="Повний опис українською..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Характеристики (EN)</label>
              <textarea
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors min-h-[150px]"
                placeholder="Повний опис англійською..."
              />
            </div>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h3 className="text-xl font-heading font-bold text-[#0A192F] mb-6 border-b border-gray-100 pb-4">Технічні характеристики</h3>
          
          <div className="space-y-4 mb-6">
            {specifications.map((spec, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 items-start md:items-end bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="w-full md:flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Назва характеристики (UA)</label>
                  <input
                    type="text"
                    value={spec.nameUa}
                    onChange={(e) => handleSpecChange(index, 'nameUa', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary-blue"
                  />
                </div>
                <div className="w-full md:flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Назва характеристики (EN)</label>
                  <input
                    type="text"
                    value={spec.nameEn}
                    onChange={(e) => handleSpecChange(index, 'nameEn', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary-blue"
                  />
                </div>
                <div className="w-full md:flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Значення</label>
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary-blue"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(index)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-md transition-colors mt-2 md:mt-0"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={handleAddSpec}
            className="flex items-center gap-2 text-primary-blue font-medium text-sm hover:text-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Додати характеристику
          </button>
        </section>

        {/* SECTION 4 */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h3 className="text-xl font-heading font-bold text-[#0A192F] mb-6 border-b border-gray-100 pb-4">Комплектація</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Комплектація (UA)</label>
              <textarea
                value={packageUa}
                onChange={(e) => setPackageUa(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors min-h-[100px]"
                placeholder="Комплектація українською..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Комплектація (EN)</label>
              <textarea
                value={packageEn}
                onChange={(e) => setPackageEn(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors min-h-[100px]"
                placeholder="Комплектація англійською..."
              />
            </div>
          </div>
        </section>

        {/* SECTION 5 */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h3 className="text-xl font-heading font-bold text-[#0A192F] mb-6 border-b border-gray-100 pb-4">Статус та Ціна</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors bg-white"
              >
                <option value="published">Опубліковано</option>
                <option value="draft">Чернетка</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ціна / статус ціни</label>
              <input
                type="text"
                value={priceLabel}
                onChange={(e) => setPriceLabel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                placeholder="Наприклад: За запитом"
              />
            </div>
          </div>
        </section>

        {/* IMAGE SECTION */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 text-center">
          <h3 className="text-xl font-heading font-bold text-[#0A192F] mb-4">Зображення</h3>
          <p className="text-gray-500 bg-gray-50 p-6 rounded-md border border-dashed border-gray-300">
            Завантаження зображень буде підключено на наступному етапі.
          </p>
        </section>

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            Скасувати
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary-blue text-white rounded-md font-medium hover:bg-opacity-90 transition-colors shadow-sm disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? 'Збереження...' : 'Зберегти товар'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};
