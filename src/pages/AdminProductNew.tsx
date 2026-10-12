import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { db, storage } from '../firebase';
import { collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { 
  DAMINER_CATEGORIES, 
  getCategorySlug, 
  getNextSortOrder 
} from '../services/productService';
import { 
  FirestoreProductSpecification, 
  FirestoreProductKitItem 
} from '../data/seedProducts';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Upload, 
  Star, 
  Loader2, 
  AlertCircle, 
  FileText, 
  AlignLeft, 
  BookOpen, 
  Sliders, 
  Layers, 
  Tag, 
  Eye, 
  GripVertical, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const AdminProductNew = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stable, auto-generated unique document ID
  const [newProductId] = useState<string>(() => doc(collection(db, 'products')).id);

  // Page submission & error states
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Основна інформація
  const [nameUa, setNameUa] = useState<string>('');
  const [nameEn, setNameEn] = useState<string>('');
  const [category, setCategory] = useState<string>('Щупи');

  // 2. Короткий опис
  const [shortDescriptionUa, setShortDescriptionUa] = useState<string>('');
  const [shortDescriptionEn, setShortDescriptionEn] = useState<string>('');

  // 3. Детальний опис
  const [descriptionUa, setDescriptionUa] = useState<string>('');
  const [descriptionEn, setDescriptionEn] = useState<string>('');

  // 4. Технічні характеристики
  const [specifications, setSpecifications] = useState<FirestoreProductSpecification[]>([]);

  // 5. Комплектація
  const [kitContents, setKitContents] = useState<FirestoreProductKitItem[]>([]);

  // 6. Ціна
  const [priceMode, setPriceMode] = useState<'request' | 'from'>('request');
  const [priceAmount, setPriceAmount] = useState<string>('');

  // 7. Публікація (Default new products to draft: published = false)
  const [published, setPublished] = useState<boolean>(false);

  // 8. Зображення
  const [images, setImages] = useState<string[]>([]);
  const [primaryImage, setPrimaryImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadCurrentFileName, setUploadCurrentFileName] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Drag and drop states for images
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // --- Specifications Handlers ---
  const handleAddSpec = () => {
    setSpecifications([
      ...specifications,
      { nameUa: '', nameEn: '', valueUa: '', valueEn: '', value: '' },
    ]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const handleSpecChange = (
    index: number,
    field: keyof FirestoreProductSpecification,
    val: string
  ) => {
    const updated = [...specifications];
    updated[index] = { ...updated[index], [field]: val };
    if (field === 'valueUa') {
      updated[index].value = val;
    }
    setSpecifications(updated);
  };

  // --- Kit Contents Handlers ---
  const handleAddKitItem = () => {
    setKitContents([
      ...kitContents,
      { itemUa: '', countUa: '', itemEn: '', countEn: '' },
    ]);
  };

  const handleRemoveKitItem = (index: number) => {
    setKitContents(kitContents.filter((_, i) => i !== index));
  };

  const handleKitChange = (
    index: number,
    field: keyof FirestoreProductKitItem,
    val: string
  ) => {
    const updated = [...kitContents];
    updated[index] = { ...updated[index], [field]: val };
    setKitContents(updated);
  };

  // --- Image Upload Handler (Firebase Storage) ---
  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validExts = ['jpg', 'jpeg', 'png', 'webp'];
    const validMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const validFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!validMimes.includes(file.type) && (!ext || !validExts.includes(ext))) {
        setUploadError(`Файл "${file.name}" має непідтримуваний формат. Дозволені формати: JPG, JPEG, PNG, WEBP.`);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      validFiles.push(file);
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);
    setUploadProgress(0);

    const newUploadedUrls: string[] = [];

    try {
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setUploadCurrentFileName(file.name);

        // Safe product-specific path: products/{newProductId}/{timestamp}_{safeName}
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const timestamp = Date.now();
        const storagePath = `products/${newProductId}/${timestamp}_${safeName}`;
        const storageRef = ref(storage, storagePath);

        await new Promise<void>((resolve, reject) => {
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const fileRatio = snapshot.totalBytes > 0 
                ? snapshot.bytesTransferred / snapshot.totalBytes 
                : 0;
              const totalPercent = Math.round(((i + fileRatio) / validFiles.length) * 100);
              setUploadProgress(totalPercent);
            },
            (err) => reject(err),
            async () => {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              newUploadedUrls.push(downloadUrl);
              resolve();
            }
          );
        });
      }

      const updatedImages = [...images, ...newUploadedUrls];
      let updatedPrimary = primaryImage;
      // First uploaded image becomes primaryImage by default
      if (!updatedPrimary && updatedImages.length > 0) {
        updatedPrimary = updatedImages[0];
        setPrimaryImage(updatedPrimary);
      }
      setImages(updatedImages);

      setUploadSuccess(`Успішно завантажено ${newUploadedUrls.length} ${newUploadedUrls.length === 1 ? 'нове фото' : 'нових фото'} у Firebase Storage!`);
      setTimeout(() => setUploadSuccess(null), 4000);
    } catch (err: unknown) {
      console.error('Помилка завантаження фото у Firebase Storage:', err);
      setUploadError(err instanceof Error ? err.message : 'Не вдалося завантажити зображення');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setUploadCurrentFileName('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Set primary image
  const handleSetPrimaryImage = (imgUrl: string) => {
    setPrimaryImage(imgUrl);
  };

  // Delete uploaded image
  const handleDeleteImage = async (indexToDelete: number, imgUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const confirmed = window.confirm('Ви впевнені, що хочете видалити це зображення?');
    if (!confirmed) return;

    try {
      // If it's a Firebase Storage URL for this new product, remove it from storage
      if (imgUrl.includes('firebasestorage.googleapis.com')) {
        try {
          const storageRef = ref(storage, imgUrl);
          await deleteObject(storageRef);
        } catch (storageErr) {
          console.warn('Не вдалося видалити файл зі сховища Storage:', storageErr);
        }
      }

      const remainingImages = images.filter((_, idx) => idx !== indexToDelete);
      setImages(remainingImages);

      // If deleted image was primary, select the first remaining
      if (primaryImage === imgUrl) {
        setPrimaryImage(remainingImages[0] || '');
      }

      setUploadSuccess('Зображення видалено');
      setTimeout(() => setUploadSuccess(null), 2500);
    } catch (err: unknown) {
      console.error('Помилка при видаленні зображення:', err);
      setUploadError(err instanceof Error ? err.message : 'Не вдалося видалити зображення');
    }
  };

  // Reorder images (drag and drop)
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reordered = [...images];
    const [movedItem] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, movedItem);

    setImages(reordered);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleMoveImage = (currentIndex: number, direction: 'left' | 'right', e: React.MouseEvent) => {
    e.stopPropagation();
    const targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const reordered = [...images];
    const temp = reordered[currentIndex];
    reordered[currentIndex] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    setImages(reordered);
  };

  // Price preview
  const getPreviewText = (): string => {
    if (priceMode === 'request') {
      return 'За запитом';
    }
    const clean = priceAmount.trim();
    if (!clean) {
      return 'Від ... грн';
    }
    if (clean.toLowerCase().includes('грн')) {
      return clean.startsWith('Від') ? clean : `Від ${clean}`;
    }
    const num = clean.replace(/\s+/g, '');
    if (!isNaN(Number(num)) && num.length > 0) {
      return `Від ${Number(num).toLocaleString('uk-UA')} грн`;
    }
    return `Від ${clean} грн`;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation 1: nameUa REQUIRED
    if (!nameUa.trim()) {
      setError('Назва товару (UA) є обов\'язковою.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Validation 2: category REQUIRED
    if (!category.trim()) {
      setError('Оберіть категорію товару.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Validation 3: require at least ONE image before product creation
    if (images.length === 0) {
      setError('Обов\'язково завантажте хоча б одне зображення товару перед створенням.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Validation 4: if priceMode is 'from', require priceAmount
    if (priceMode === 'from' && !priceAmount.trim()) {
      setError('Для режиму ціни "Від" необхідно вказати суму (priceAmount).');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Verify document ID uniqueness (safety check)
      const existingDoc = await getDoc(doc(db, 'products', newProductId));
      if (existingDoc.exists()) {
        throw new Error(`Документ з ID ${newProductId} вже існує. Будь ласка, перезавантажте сторінку.`);
      }

      // Assign sortOrder after the current highest sortOrder
      const nextSortOrder = await getNextSortOrder();

      const newProductPayload = {
        id: newProductId,
        route: `/product/${newProductId}`,
        category: category,
        categorySlug: getCategorySlug(category),
        nameUa: nameUa.trim(),
        nameEn: nameEn.trim(),
        shortDescriptionUa: shortDescriptionUa.trim(),
        shortDescriptionEn: shortDescriptionEn.trim(),
        descriptionUa: descriptionUa.trim(),
        descriptionEn: descriptionEn.trim(),
        specifications: specifications.map((s) => ({
          nameUa: s.nameUa.trim(),
          nameEn: s.nameEn.trim(),
          valueUa: s.valueUa.trim(),
          valueEn: s.valueEn.trim(),
          value: s.valueUa.trim() || s.value.trim() || '',
        })),
        kitContents: kitContents.map((k) => ({
          itemUa: k.itemUa.trim(),
          countUa: k.countUa.trim(),
          itemEn: k.itemEn.trim(),
          countEn: k.countEn.trim(),
        })),
        priceMode: priceMode,
        priceAmount: priceMode === 'from' ? (priceAmount.trim() || null) : null,
        published: published, // defaults to false (draft)
        sortOrder: nextSortOrder,
        images: images,
        primaryImage: primaryImage || (images.length > 0 ? images[0] : ''),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Save into Firestore collection "products"
      await setDoc(doc(db, 'products', newProductId), newProductPayload);

      // Redirect to /admin/products with success message
      navigate('/admin/products', {
        state: {
          successMessage: `Товар "${nameUa.trim()}" успішно створено (ID: ${newProductId}, чернетка)!`,
        },
      });
    } catch (err: unknown) {
      console.error('Помилка створення нового товару в Firestore:', err);
      setError(err instanceof Error ? err.message : 'Не вдалося створити новий товар');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      {/* Top Navigation */}
      <div className="mb-6">
        <Link 
          to="/admin/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary-blue transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад до списку товарів
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-heading font-bold text-[#0A192F]">
              Створення нового товару
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              Додавання нового виробу до каталогу DAMINER
            </p>
          </div>
        </div>
      </div>

      {/* Auto-generated ID & Route System Card */}
      <div className="mb-6 bg-blue-50/50 border border-blue-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-700">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-primary-blue shrink-0" />
          <div>
            <span className="font-semibold text-[#0A192F]">Автоматично згенерований ID товару: </span>
            <code className="bg-white px-2 py-0.5 rounded border border-blue-200 font-mono text-primary-blue font-bold">
              {newProductId}
            </code>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-500">
            Маршрут: <code className="font-mono text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200">/product/{newProductId}</code>
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-200">
            За замовчуванням: Чернетка
          </span>
        </div>
      </div>

      {/* Error notification */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Помилка валідації</h4>
            <p className="text-xs text-red-700">{error}</p>
          </div>
          <button 
            type="button"
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-800 text-xs font-medium"
          >
            ✕
          </button>
        </div>
      )}

      {/* New Product Form */}
      <form onSubmit={handleSubmit} className="space-y-8 pb-16">
        
        {/* Section 1: Основна інформація */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-primary-blue" />
            <h3 className="text-lg font-heading font-bold text-[#0A192F]">
              1. Основна інформація
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Select */}
            <div>
              <label className="block text-sm font-semibold text-[#0A192F] mb-2">
                Категорія <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                required
              >
                {DAMINER_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">Оберіть одну з 5 офіційних категорій DAMINER</p>
            </div>

            {/* Name UA */}
            <div>
              <label className="block text-sm font-semibold text-[#0A192F] mb-2">
                Назва товару (UA) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={nameUa}
                onChange={(e) => setNameUa(e.target.value)}
                placeholder="Наприклад: ЩР-1"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                required
              />
              <p className="text-xs text-gray-400 mt-1">Обов'язкова назва українською мовою</p>
            </div>

            {/* Name EN */}
            <div>
              <label className="block text-sm font-semibold text-[#0A192F] mb-2">
                Назва товару (EN)
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="ShchR-1"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1">Необов'язково (залишається порожнім, якщо немає)</p>
            </div>
          </div>
        </div>

        {/* Section 2: Короткий опис */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <AlignLeft className="w-5 h-5 text-primary-blue" />
            <h3 className="text-lg font-heading font-bold text-[#0A192F]">
              2. Короткий опис
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-[#0A192F]">
                  Короткий опис (UA)
                </label>
                <span className="text-xs text-gray-400">Для карток каталогу</span>
              </div>
              <textarea
                rows={3}
                value={shortDescriptionUa}
                onChange={(e) => setShortDescriptionUa(e.target.value)}
                placeholder="Короткий опис українською мовою..."
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-[#0A192F]">
                  Короткий опис (EN)
                </label>
                <span className="text-xs text-gray-400">Залишається порожнім, якщо немає</span>
              </div>
              <textarea
                rows={3}
                value={shortDescriptionEn}
                onChange={(e) => setShortDescriptionEn(e.target.value)}
                placeholder="Short description in English..."
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Детальний опис */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-primary-blue" />
            <h3 className="text-lg font-heading font-bold text-[#0A192F]">
              3. Детальний опис
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-[#0A192F]">
                  Повний опис товару (UA)
                </label>
                <span className="text-xs text-gray-400">Для сторінки товару</span>
              </div>
              <textarea
                rows={6}
                value={descriptionUa}
                onChange={(e) => setDescriptionUa(e.target.value)}
                placeholder="Повний детальний опис українською мовою..."
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-[#0A192F]">
                  Повний опис товару (EN)
                </label>
                <span className="text-xs text-gray-400">Залишається порожнім, якщо немає</span>
              </div>
              <textarea
                rows={6}
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                placeholder="Full detailed description in English..."
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Технічні характеристики */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-primary-blue" />
              <h3 className="text-lg font-heading font-bold text-[#0A192F]">
                4. Технічні характеристики
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-primary-blue border border-blue-100">
                {specifications.length}
              </span>
            </div>
            <button
              type="button"
              onClick={handleAddSpec}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-blue-50 text-primary-blue hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
            >
              <Plus className="w-4 h-4" />
              Додати характеристику
            </button>
          </div>

          {specifications.length === 0 ? (
            <div className="p-6 text-center text-gray-400 bg-gray-50/70 border border-dashed border-gray-200 rounded-xl text-sm">
              Характеристики поки не додано. Натисніть &quot;Додати характеристику&quot;, щоб створити рядок.
            </div>
          ) : (
            <div className="space-y-4">
              {specifications.map((spec, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-gray-50/70 border border-gray-200 rounded-xl relative group hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
                      title="Видалити характеристику"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Назва характеристики (UA)
                      </label>
                      <input
                        type="text"
                        value={spec.nameUa}
                        onChange={(e) => handleSpecChange(index, 'nameUa', e.target.value)}
                        placeholder="Наприклад: Загальна довжина"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xs text-[#0A192F] focus:ring-1 focus:ring-primary-blue focus:border-primary-blue outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Значення (UA)
                      </label>
                      <input
                        type="text"
                        value={spec.valueUa}
                        onChange={(e) => handleSpecChange(index, 'valueUa', e.target.value)}
                        placeholder="Наприклад: 1470 мм"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xs text-[#0A192F] focus:ring-1 focus:ring-primary-blue focus:border-primary-blue outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Назва характеристики (EN)
                      </label>
                      <input
                        type="text"
                        value={spec.nameEn}
                        onChange={(e) => handleSpecChange(index, 'nameEn', e.target.value)}
                        placeholder="Name in English (optional)"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xs text-[#0A192F] focus:ring-1 focus:ring-primary-blue focus:border-primary-blue outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Значення (EN)
                      </label>
                      <input
                        type="text"
                        value={spec.valueEn}
                        onChange={(e) => handleSpecChange(index, 'valueEn', e.target.value)}
                        placeholder="Value in English (optional)"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xs text-[#0A192F] focus:ring-1 focus:ring-primary-blue focus:border-primary-blue outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 5: Комплектація */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary-blue" />
              <h3 className="text-lg font-heading font-bold text-[#0A192F]">
                5. Комплектація
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-primary-blue border border-blue-100">
                {kitContents.length}
              </span>
            </div>
            <button
              type="button"
              onClick={handleAddKitItem}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-blue-50 text-primary-blue hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
            >
              <Plus className="w-4 h-4" />
              Додати позицію
            </button>
          </div>

          {kitContents.length === 0 ? (
            <div className="p-6 text-center text-gray-400 bg-gray-50/70 border border-dashed border-gray-200 rounded-xl text-sm">
              Комплектація поки не додана. Натисніть &quot;Додати позицію&quot;, щоб створити перелік складових.
            </div>
          ) : (
            <div className="space-y-4">
              {kitContents.map((kitItem, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-gray-50/70 border border-gray-200 rounded-xl relative group hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Позиція #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveKitItem(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
                      title="Видалити позицію"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Назва позиції (UA)
                      </label>
                      <input
                        type="text"
                        value={kitItem.itemUa}
                        onChange={(e) => handleKitChange(index, 'itemUa', e.target.value)}
                        placeholder="Наприклад: Мультитул сапера"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xs text-[#0A192F] focus:ring-1 focus:ring-primary-blue focus:border-primary-blue outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Кількість (UA)
                      </label>
                      <input
                        type="text"
                        value={kitItem.countUa}
                        onChange={(e) => handleKitChange(index, 'countUa', e.target.value)}
                        placeholder="Наприклад: 1 шт."
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xs text-[#0A192F] focus:ring-1 focus:ring-primary-blue focus:border-primary-blue outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Назва позиції (EN)
                      </label>
                      <input
                        type="text"
                        value={kitItem.itemEn}
                        onChange={(e) => handleKitChange(index, 'itemEn', e.target.value)}
                        placeholder="Item in English (optional)"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xs text-[#0A192F] focus:ring-1 focus:ring-primary-blue focus:border-primary-blue outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Кількість (EN)
                      </label>
                      <input
                        type="text"
                        value={kitItem.countEn}
                        onChange={(e) => handleKitChange(index, 'countEn', e.target.value)}
                        placeholder="Count in English (optional)"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xs text-[#0A192F] focus:ring-1 focus:ring-primary-blue focus:border-primary-blue outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 6: Ціна */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <Tag className="w-5 h-5 text-primary-blue" />
            <h3 className="text-lg font-heading font-bold text-[#0A192F]">
              6. Ціна
            </h3>
          </div>

          <div className="space-y-4 mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Режим ціни (priceMode)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label 
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  priceMode === 'request'
                    ? 'border-primary-blue bg-blue-50/40 ring-1 ring-primary-blue'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="priceMode"
                  value="request"
                  checked={priceMode === 'request'}
                  onChange={() => setPriceMode('request')}
                  className="mt-1 text-primary-blue focus:ring-primary-blue"
                />
                <div>
                  <div className="font-semibold text-[#0A192F] text-sm">За запитом (request)</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Вартість надається клієнту індивідуально за запитом
                  </div>
                </div>
              </label>

              <label 
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  priceMode === 'from'
                    ? 'border-primary-blue bg-blue-50/40 ring-1 ring-primary-blue'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="priceMode"
                  value="from"
                  checked={priceMode === 'from'}
                  onChange={() => setPriceMode('from')}
                  className="mt-1 text-primary-blue focus:ring-primary-blue"
                />
                <div>
                  <div className="font-semibold text-[#0A192F] text-sm">Від ціни (from)</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Відображається стартова вартість товару
                  </div>
                </div>
              </label>
            </div>
          </div>

          {priceMode === 'from' && (
            <div className="mb-6 p-5 bg-gray-50/70 border border-gray-200 rounded-xl space-y-2">
              <label htmlFor="priceAmount" className="block text-sm font-semibold text-[#0A192F]">
                Сума або значення (priceAmount) <span className="text-red-500">*</span>
              </label>
              <div className="max-w-md">
                <input
                  id="priceAmount"
                  type="text"
                  value={priceAmount}
                  onChange={(e) => setPriceAmount(e.target.value)}
                  placeholder="2500"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                  required={priceMode === 'from'}
                />
              </div>
              <p className="text-xs text-gray-500">
                Вкажіть число або суму (наприклад: <span className="font-mono text-gray-700">2500</span> або <span className="font-mono text-gray-700">2 500 грн</span>).
              </p>
            </div>
          )}

          <div className="p-4 bg-blue-50/30 border border-blue-100 rounded-xl">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Попередній перегляд відображення:
            </div>
            <div className="text-lg font-bold text-primary-blue font-heading">
              {getPreviewText()}
            </div>
          </div>
        </div>

        {/* Section 7: Публікація */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <Eye className="w-5 h-5 text-primary-blue" />
            <h3 className="text-lg font-heading font-bold text-[#0A192F]">
              7. Публікація
            </h3>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Статус товару в каталозі
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Draft option (Default for new products) */}
              <label 
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  !published
                    ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="published"
                  checked={published === false}
                  onChange={() => setPublished(false)}
                  className="mt-1 text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-amber-900 text-sm">Чернетка</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.2 rounded font-semibold uppercase">За замовчуванням</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Товар прихований з публічного каталогу для безпечного наповнення
                  </div>
                </div>
              </label>

              {/* Published option */}
              <label 
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  published
                    ? 'border-green-500 bg-green-50/40 ring-1 ring-green-500'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="published"
                  checked={published === true}
                  onChange={() => setPublished(true)}
                  className="mt-1 text-green-600 focus:ring-green-500"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-900 text-sm">Опубліковано</span>
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Товар активний і видимий у каталозі
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Section 8: Зображення (Requires at least ONE image) */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary-blue" />
                <h3 className="text-lg font-heading font-bold text-[#0A192F]">
                  8. Зображення <span className="text-red-500">*</span>
                </h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  images.length > 0 
                    ? 'bg-blue-50 text-primary-blue border-blue-100' 
                    : 'bg-red-50 text-red-600 border-red-200'
                }`}>
                  {images.length} фото {images.length === 0 ? '(потрібно мінімум 1)' : ''}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Файли зберігаються у безпечну директорію Firebase Storage: <code className="font-mono text-gray-600 bg-gray-50 px-1 py-0.5 rounded">products/{newProductId}/...</code>
              </p>
            </div>

            {/* Upload Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                onChange={handleFilesSelected}
                className="hidden"
                id="image-file-input"
                disabled={isUploading}
              />
              <label
                htmlFor="image-file-input"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                  isUploading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-blue text-white hover:bg-blue-700 active:scale-[0.98]'
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Завантаження...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Завантажити фото</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Upload Feedback */}
          {uploadError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 text-xs">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{uploadError}</div>
            </div>
          )}

          {uploadSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 text-green-800 text-xs">
              <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{uploadSuccess}</div>
            </div>
          )}

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="mb-6 p-4 bg-blue-50/60 border border-blue-200 rounded-xl">
              <div className="flex justify-between items-center text-xs text-gray-600 mb-2 font-medium">
                <span>
                  Завантаження у Firebase Storage: <strong className="text-[#0A192F]">{uploadCurrentFileName}</strong>
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary-blue h-2 rounded-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Images Grid */}
          {images.length === 0 ? (
            <div className="p-8 text-center text-gray-500 bg-gray-50/80 border-2 border-dashed border-gray-300 rounded-xl text-sm">
              <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 mb-1">Ще не завантажено жодного фото</p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
                Для створення товару обов'язково потрібне хоча б одне зображення. Перше завантажене фото автоматично стане головним.
              </p>
              <label
                htmlFor="image-file-input"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-blue text-white rounded-lg text-xs font-medium cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Вибрати файли на комп'ютері
              </label>
            </div>
          ) : (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 mb-4 gap-2">
                <p>
                  • Перетягуйте фото для зміни порядку. Клікніть на фото або зірочку для вибору як <strong>Головне</strong>.
                </p>
                <p className="text-[11px] text-gray-400">
                  Усього фото: {images.length}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((imgUrl, idx) => {
                  const isPrimary = imgUrl === primaryImage;
                  const isDragging = draggedIndex === idx;
                  const isDragOver = dragOverIndex === idx && draggedIndex !== idx;

                  return (
                    <div
                      key={idx}
                      draggable={!isUploading}
                      onDragStart={(e) => handleDragStart(e, idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDrop={(e) => handleDrop(e, idx)}
                      onDragEnd={handleDragEnd}
                      onClick={() => handleSetPrimaryImage(imgUrl)}
                      className={`relative group bg-white rounded-xl border p-2 transition-all cursor-pointer flex flex-col items-center justify-between select-none ${
                        isDragging
                          ? 'opacity-30 scale-95 border-dashed border-primary-blue'
                          : isDragOver
                          ? 'border-primary-blue ring-2 ring-primary-blue bg-blue-50/30 scale-[1.02]'
                          : isPrimary
                          ? 'border-primary-blue ring-2 ring-primary-blue shadow-md bg-blue-50/10'
                          : 'border-gray-200 hover:border-primary-blue/60 hover:shadow-sm'
                      }`}
                    >
                      {/* Top Bar: Primary badge, drag handle, trash button */}
                      <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between pointer-events-none">
                        {isPrimary ? (
                          <div className="flex items-center gap-1 bg-primary-blue text-white text-[10px] font-bold px-2 py-0.5 rounded shadow pointer-events-auto">
                            <Star className="w-3 h-3 fill-white" />
                            <span>Головне</span>
                          </div>
                        ) : (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white rounded p-1 cursor-grab active:cursor-grabbing pointer-events-auto" title="Перетягніть для зміни порядку">
                            <GripVertical className="w-3 h-3" />
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={(e) => handleDeleteImage(idx, imgUrl, e)}
                          className="bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg p-1.5 shadow-sm border border-gray-200 transition-all pointer-events-auto"
                          title="Видалити зображення"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Thumbnail Image */}
                      <div className="w-full aspect-square flex items-center justify-center overflow-hidden rounded-lg bg-gray-50/50 my-1 pt-6">
                        <img
                          src={imgUrl}
                          alt={`Фото ${idx + 1}`}
                          className="w-full h-full object-contain pointer-events-none"
                          loading="lazy"
                        />
                      </div>

                      {/* Image Footer / Navigation Arrows & Primary Action */}
                      <div className="w-full pt-1.5 border-t border-gray-100 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={(e) => handleMoveImage(idx, 'left', e)}
                            className="p-1 rounded text-gray-400 hover:text-[#0A192F] hover:bg-gray-100 disabled:opacity-20 disabled:hover:bg-transparent"
                            title="Посунути ліворуч"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === images.length - 1}
                            onClick={(e) => handleMoveImage(idx, 'right', e)}
                            className="p-1 rounded text-gray-400 hover:text-[#0A192F] hover:bg-gray-100 disabled:opacity-20 disabled:hover:bg-transparent"
                            title="Посунути праворуч"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {isPrimary ? (
                          <span className="text-[10px] font-semibold text-primary-blue">
                            Головне
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetPrimaryImage(imgUrl);
                            }}
                            className="text-[10px] text-gray-500 hover:text-primary-blue hover:underline"
                          >
                            Зробити головним
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500">
            {images.length === 0 ? (
              <span className="text-red-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Для створення товару необхідно завантажити хоча б 1 фото
              </span>
            ) : (
              <span>
                Готово до створення • Статус: <strong>{published ? 'Опубліковано' : 'Чернетка'}</strong> • Фото: <strong>{images.length}</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={saving || isUploading}
              className="px-6 py-2.5 rounded-xl bg-primary-blue text-white text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Створення товару...</span>
                </>
              ) : (
                <span>Створити товар</span>
              )}
            </button>
          </div>
        </div>

      </form>
    </AdminLayout>
  );
};
