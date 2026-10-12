import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { db, storage } from '../firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { FirestoreProduct, DAMINER_CATEGORIES, getCategorySlug } from '../services/productService';
import { 
  FirestoreProductSpecification, 
  FirestoreProductKitItem 
} from '../data/seedProducts';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Package, 
  Eye, 
  Tag, 
  FileText,
  AlignLeft,
  BookOpen,
  Sliders,
  Layers,
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  Star,
  Check,
  GripVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const AdminProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [product, setProduct] = useState<FirestoreProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Editable fields
  // Section 1: Основна інформація
  const [nameUa, setNameUa] = useState<string>('');
  const [nameEn, setNameEn] = useState<string>('');
  const [category, setCategory] = useState<string>('Щупи');

  // Section 2: Короткий опис
  const [shortDescriptionUa, setShortDescriptionUa] = useState<string>('');
  const [shortDescriptionEn, setShortDescriptionEn] = useState<string>('');

  // Section 3: Детальний опис
  const [descriptionUa, setDescriptionUa] = useState<string>('');
  const [descriptionEn, setDescriptionEn] = useState<string>('');

  // Section 4: Технічні характеристики
  const [specifications, setSpecifications] = useState<FirestoreProductSpecification[]>([]);

  // Section 5: Комплектація
  const [kitContents, setKitContents] = useState<FirestoreProductKitItem[]>([]);

  // Section 6: Ціна
  const [priceMode, setPriceMode] = useState<'request' | 'from'>('request');
  const [priceAmount, setPriceAmount] = useState<string>('');

  // Section 7: Публікація
  const [published, setPublished] = useState<boolean>(true);

  // Section 8: Зображення
  const [images, setImages] = useState<string[]>([]);
  const [primaryImage, setPrimaryImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadCurrentFileName, setUploadCurrentFileName] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Drag and drop reorder states
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Load product from Firestore
  useEffect(() => {
    if (!id) {
      setError('Не вказано ідентифікатор товару.');
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError(`Товар з ID "${id}" не знайдено у колекції Firestore "products".`);
          return;
        }

        const data = docSnap.data();
        const loadedProduct = { id: docSnap.id, ...data } as FirestoreProduct;
        setProduct(loadedProduct);

        // Load existing values without modifications or auto-translations
        setNameUa(loadedProduct.nameUa || '');
        setNameEn(loadedProduct.nameEn || '');
        setCategory(loadedProduct.category || 'Щупи');
        setShortDescriptionUa(loadedProduct.shortDescriptionUa || '');
        setShortDescriptionEn(loadedProduct.shortDescriptionEn || '');
        setDescriptionUa(loadedProduct.descriptionUa || '');
        setDescriptionEn(loadedProduct.descriptionEn || '');

        // Specifications
        if (Array.isArray(loadedProduct.specifications)) {
          setSpecifications(
            loadedProduct.specifications.map((s) => ({
              nameUa: s.nameUa || '',
              nameEn: s.nameEn || '',
              valueUa: s.valueUa || s.value || '',
              valueEn: s.valueEn || '',
              value: s.value || s.valueUa || '',
            }))
          );
        } else {
          setSpecifications([]);
        }

        // Kit contents
        if (Array.isArray(loadedProduct.kitContents)) {
          setKitContents(
            loadedProduct.kitContents.map((k) => ({
              itemUa: k.itemUa || '',
              countUa: k.countUa || '',
              itemEn: k.itemEn || '',
              countEn: k.countEn || '',
            }))
          );
        } else {
          setKitContents([]);
        }

        // Price
        setPriceMode(loadedProduct.priceMode === 'from' ? 'from' : 'request');
        setPriceAmount(loadedProduct.priceAmount ? String(loadedProduct.priceAmount) : '');

        // Publication
        setPublished(loadedProduct.published !== false);

        // Images
        const loadedImages = Array.isArray(loadedProduct.images) ? loadedProduct.images : [];
        setImages(loadedImages);
        setPrimaryImage(loadedProduct.primaryImage || loadedImages[0] || '');
      } catch (err: unknown) {
        console.error('Помилка завантаження товару з Firestore:', err);
        setError(err instanceof Error ? err.message : 'Не вдалося завантажити дані товару');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Specifications handlers
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

  // Kit contents handlers
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

  // Image Upload Handler (Firebase Storage)
  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !id) return;

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
        
        // Safe product-specific path: products/{productId}/{timestamp}_{safeName}
        // Prevents overwriting any existing files
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const timestamp = Date.now();
        const storagePath = `products/${id}/${timestamp}_${safeName}`;
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
            (err) => {
              reject(err);
            },
            async () => {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              newUploadedUrls.push(downloadUrl);
              resolve();
            }
          );
        });
      }

      // Preserve all existing images and append newly uploaded URLs
      const updatedImages = [...images, ...newUploadedUrls];
      let updatedPrimary = primaryImage;
      if (!updatedPrimary && updatedImages.length > 0) {
        updatedPrimary = updatedImages[0];
        setPrimaryImage(updatedPrimary);
      }
      setImages(updatedImages);

      // Save to Firestore product document
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        images: updatedImages,
        primaryImage: updatedPrimary,
        updatedAt: serverTimestamp(),
      });

      setUploadSuccess(`Успішно завантажено ${newUploadedUrls.length} ${newUploadedUrls.length === 1 ? 'нове зображення' : 'нових зображень'} у Firebase Storage!`);
      setTimeout(() => setUploadSuccess(null), 5000);
    } catch (err: unknown) {
      console.error('Помилка завантаження у Firebase Storage:', err);
      setUploadError(err instanceof Error ? err.message : 'Помилка при завантаженні у Firebase Storage');
    } finally {
      setIsUploading(false);
      setUploadCurrentFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Set Primary Image Handler
  const handleSetPrimaryImage = async (imgUrl: string) => {
    if (imgUrl === primaryImage) return;
    setPrimaryImage(imgUrl);
    if (!id) return;

    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        primaryImage: imgUrl,
        updatedAt: serverTimestamp(),
      });
      setUploadSuccess('Головне зображення успішно оновлено!');
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (err: unknown) {
      console.error('Помилка оновлення головного зображення:', err);
      setUploadError(err instanceof Error ? err.message : 'Не вдалося встановити головне зображення');
    }
  };

  // Delete Image Handler (Step 6)
  const handleDeleteImage = async (indexToDelete: number, imgUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // 1. Protection: never leave product with zero images accidentally
    if (images.length <= 1) {
      alert('Неможливо видалити останнє зображення товару. Товар повинен містити хоча б одне зображення.');
      return;
    }

    // 2. Require confirmation before deleting
    const confirmed = window.confirm('Ви впевнені, що хочете видалити це зображення?');
    if (!confirmed) return;

    setSaving(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      // 3. If it is a Firebase Storage uploaded image, delete the Storage file
      const isStorageUrl = 
        imgUrl.includes('firebasestorage.googleapis.com') || 
        imgUrl.includes('storage.googleapis.com');

      if (isStorageUrl) {
        try {
          const fileRef = ref(storage, imgUrl);
          await deleteObject(fileRef);
        } catch (storageErr: unknown) {
          console.warn('Не вдалося видалити файл із Storage (можливо, вже відсутній):', storageErr);
        }
      }
      // If it is an existing local/public image, DO NOT delete physical local file!
      // Only remove it from this product's Firestore images array.

      const remainingImages = images.filter((_, idx) => idx !== indexToDelete);

      // 4. If deleting the current primary image, automatically set the next remaining image as primaryImage
      let newPrimary = primaryImage;
      if (imgUrl === primaryImage) {
        newPrimary = remainingImages[0] || '';
      }

      setImages(remainingImages);
      setPrimaryImage(newPrimary);

      // 5. Update Firestore
      if (id) {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, {
          images: remainingImages,
          primaryImage: newPrimary,
          updatedAt: serverTimestamp(),
        });
      }

      setUploadSuccess('Зображення успішно видалено!');
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (err: unknown) {
      console.error('Помилка видалення зображення:', err);
      setUploadError(err instanceof Error ? err.message : 'Не вдалося видалити зображення');
    } finally {
      setSaving(false);
    }
  };

  // Drag and Drop Handlers (Step 6)
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
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

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
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

    // Save new order to Firestore (primaryImage remains unchanged)
    if (id) {
      try {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, {
          images: reordered,
          updatedAt: serverTimestamp(),
        });
        setUploadSuccess('Порядок зображень збережено!');
        setTimeout(() => setUploadSuccess(null), 2500);
      } catch (err: unknown) {
        console.error('Помилка збереження порядку зображень:', err);
        setUploadError(err instanceof Error ? err.message : 'Помилка при збереженні порядку зображень');
      }
    }
  };

  // One-click directional reorder (left/right)
  const handleMoveImage = async (currentIndex: number, direction: 'left' | 'right', e: React.MouseEvent) => {
    e.stopPropagation();
    const targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const reordered = [...images];
    const temp = reordered[currentIndex];
    reordered[currentIndex] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    setImages(reordered);

    if (id) {
      try {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, {
          images: reordered,
          updatedAt: serverTimestamp(),
        });
        setUploadSuccess('Порядок зображень збережено!');
        setTimeout(() => setUploadSuccess(null), 2500);
      } catch (err: unknown) {
        console.error('Помилка зміни порядку зображень:', err);
      }
    }
  };

  // Preview price text calculation
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    if (!nameUa.trim()) {
      setError('Назва товару (UA) є обов\'язковою.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // STRICT REQUIREMENT: update ONLY the allowed editable fields + updatedAt
      const updatePayload = {
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
        published: published,
        images: images,
        primaryImage: primaryImage,
        updatedAt: serverTimestamp(),
      };

      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, updatePayload);

      setSuccessMessage('Зміни успішно збережено в Firestore!');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update local product copy
      if (product) {
        setProduct({
          ...product,
          ...updatePayload,
        } as FirestoreProduct);
      }
    } catch (err: unknown) {
      console.error('Помилка оновлення товару в Firestore:', err);
      setError(err instanceof Error ? err.message : 'Не вдалося зберегти зміни');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
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
              Редагування товару
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              {product ? `${product.nameUa} (${product.category})` : 'Керування параметрами товару'}
            </p>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-white rounded-xl border border-gray-100 p-16 flex flex-col items-center justify-center gap-3 shadow-sm">
          <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
          <p className="text-sm font-medium text-gray-600">Завантаження даних товару з Firestore...</p>
        </div>
      )}

      {/* Error notification */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Помилка</h4>
            <p className="text-xs text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Success notification */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 text-green-800">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Успішно</h4>
            <p className="text-xs text-green-700">{successMessage}</p>
          </div>
        </div>
      )}

      {!loading && product && (
        <form onSubmit={handleSave} className="space-y-8">
          {/* Read-Only Overview Summary */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="w-16 h-16 bg-white border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-1 shrink-0 shadow-2xs">
                {primaryImage ? (
                  <img 
                    src={primaryImage} 
                    alt={nameUa} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <Package className="w-6 h-6 text-gray-300" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold uppercase px-2.5 py-0.5 rounded bg-blue-50 text-primary-blue border border-blue-100">
                    {category || product.category}
                  </span>
                  <span className="text-xs font-mono text-gray-400">ID: {product.id}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A192F]">{product.nameUa}</h3>
                {product.nameEn && (
                  <p className="text-xs text-gray-400 mt-0.5">{product.nameEn}</p>
                )}
              </div>
              <div className="text-xs text-gray-400 font-mono bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                {product.route}
              </div>
            </div>
          </div>

          {/* Section 1: Основна інформація */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-primary-blue" />
              <h3 className="text-lg font-heading font-bold text-[#0A192F]">
                1. Основна інформація
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <p className="text-xs text-gray-400 mt-1">Оберіть одну з 5 офіційних категорій</p>
              </div>

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
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A192F] mb-2">
                  Назва товару (EN)
                </label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="Назва англійською (якщо є)"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                />
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
                  rows={7}
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
                  rows={7}
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
                Характеристики відсутні для цього товару. Натисніть &quot;Додати характеристику&quot;, щоб створити новий рядок.
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
                Комплектація відсутня для цього товару. Натисніть &quot;Додати позицію&quot;, щоб створити перелік.
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

            {/* Price Mode Selection */}
            <div className="space-y-4 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Режим ціни (priceMode)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Request option */}
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

                {/* From option */}
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

            {/* Price Amount Input (only if priceMode === 'from') */}
            {priceMode === 'from' && (
              <div className="mb-6 p-5 bg-gray-50/70 border border-gray-200 rounded-xl space-y-2">
                <label htmlFor="priceAmount" className="block text-sm font-semibold text-[#0A192F]">
                  Сума або значення (priceAmount)
                </label>
                <div className="max-w-md">
                  <input
                    id="priceAmount"
                    type="text"
                    value={priceAmount}
                    onChange={(e) => setPriceAmount(e.target.value)}
                    placeholder="2500"
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Вкажіть число або суму (наприклад: <span className="font-mono text-gray-700">2500</span> або <span className="font-mono text-gray-700">2 500 грн</span>).
                </p>
              </div>
            )}

            {/* Preview Box */}
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
                {/* Published true */}
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

                {/* Published false */}
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
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Товар прихований з публічного каталогу
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Section 8: Зображення (Delete & Reorder) */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary-blue" />
                <h3 className="text-lg font-heading font-bold text-[#0A192F]">
                  8. Зображення
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-primary-blue border border-blue-100">
                  {images.length}
                </span>
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
                      <span>Завантажити нові фото</span>
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
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
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

            {/* Images Grid with Drag & Drop and Delete */}
            {images.length === 0 ? (
              <div className="p-8 text-center text-gray-400 bg-gray-50/70 border border-dashed border-gray-200 rounded-xl text-sm">
                Зображення відсутні. Натисніть &quot;Завантажити нові фото&quot; для додавання.
              </div>
            ) : (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 mb-4 gap-2">
                  <p>
                    • Перетягуйте фото для зміни порядку. Клікніть на фото для вибору як <strong>Головне</strong>.
                  </p>
                  <p className="text-[11px] text-gray-400">
                    Усього фото: {images.length} (мінімум 1 фото)
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
                        {/* Top Bar on Image: Drag Handle, Primary Badge, Trash button */}
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

                          {/* Delete Trash Button */}
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
                            alt={`Зображення ${idx + 1}`}
                            className="w-full h-full object-contain pointer-events-none"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLElement).style.opacity = '0.3';
                            }}
                          />
                        </div>

                        {/* Image Footer / Navigation Arrows & Primary Action */}
                        <div className="w-full pt-1.5 border-t border-gray-100 flex items-center justify-between text-[11px]">
                          {/* Reorder Arrows */}
                          <div className="flex items-center gap-0.5">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={(e) => handleMoveImage(idx, 'left', e)}
                              className="p-1 rounded text-gray-400 hover:text-[#0A192F] hover:bg-gray-100 disabled:opacity-20 disabled:hover:bg-transparent"
                              title="Посунути вліво"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-gray-400 font-mono text-[10px] px-1">
                              #{idx + 1}
                            </span>
                            <button
                              type="button"
                              disabled={idx === images.length - 1}
                              onClick={(e) => handleMoveImage(idx, 'right', e)}
                              className="p-1 rounded text-gray-400 hover:text-[#0A192F] hover:bg-gray-100 disabled:opacity-20 disabled:hover:bg-transparent"
                              title="Посунути вправо"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Primary status / action */}
                          <div>
                            {isPrimary ? (
                              <span className="text-primary-blue font-bold flex items-center gap-0.5 text-[10px]">
                                <Check className="w-3 h-3" /> Обрано
                              </span>
                            ) : (
                              <span className="text-gray-400 group-hover:text-primary-blue font-medium transition-colors text-[10px]">
                                Зробити головним
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Path note */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-400 gap-2">
              <span>
                Шлях у Firebase Storage: <code className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-[11px] text-gray-600">products/{id}/...</code>
              </span>
              <span>
                Видалення локальних фото видаляє їх лише з картки товару, фізичні файли сайту не змінюються.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              disabled={saving}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 text-center"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-7 py-3 bg-primary-blue text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Збереження...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Зберегти зміни</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </AdminLayout>
  );
};
