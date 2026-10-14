import React, { useEffect, useMemo, useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Building2,
  Phone,
  MapPin,
  Share2,
  Loader2,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Database,
  X,
  Clock,
  Undo2,
} from 'lucide-react';
import {
  GeneralSettingsFields,
  EMPTY_GENERAL_SETTINGS,
  GENERAL_SETTINGS_KEYS,
  getGeneralSettings,
  createInitialGeneralSettings,
  updateGeneralSettings,
} from '../services/settingsService';

type FieldKey = keyof GeneralSettingsFields;

interface FieldDef {
  key: FieldKey;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'url';
}

interface SectionDef {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: FieldDef[];
}

const SECTIONS: SectionDef[] = [
  {
    id: 'company',
    title: 'Компанія',
    description: 'Офіційна назва компанії українською та англійською.',
    icon: Building2,
    fields: [
      { key: 'companyNameUa', label: 'Назва компанії (UA)' },
      { key: 'companyNameEn', label: 'Назва компанії (EN)' },
    ],
  },
  {
    id: 'contacts',
    title: 'Контакти',
    description: 'Телефони та електронна пошта для зв’язку.',
    icon: Phone,
    fields: [
      { key: 'phonePrimary', label: 'Основний телефон', type: 'tel', placeholder: '+38 (0XX) XXX-XX-XX' },
      { key: 'phoneSecondary', label: 'Додатковий телефон', type: 'tel', placeholder: '+38 (0XX) XXX-XX-XX' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'name@example.com' },
    ],
  },
  {
    id: 'address',
    title: 'Адреса',
    description: 'Фізична адреса компанії.',
    icon: MapPin,
    fields: [
      { key: 'addressUa', label: 'Адреса (UA)' },
      { key: 'addressEn', label: 'Адреса (EN)' },
    ],
  },
  {
    id: 'social',
    title: 'Соціальні мережі',
    description: 'Повні посилання (URL). Залиште поле порожнім, якщо мережа не використовується.',
    icon: Share2,
    fields: [
      { key: 'instagram', label: 'Instagram', type: 'url', placeholder: 'https://www.instagram.com/...' },
      { key: 'facebook', label: 'Facebook', type: 'url', placeholder: 'https://www.facebook.com/...' },
      { key: 'youtube', label: 'YouTube', type: 'url', placeholder: 'https://www.youtube.com/...' },
      { key: 'telegram', label: 'Telegram', type: 'url', placeholder: 'https://t.me/...' },
    ],
  },
];

const inputClass =
  'w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#0A192F] focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-400';

function formatTimestamp(value: unknown): string | null {
  if (value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate: unknown }).toDate === 'function') {
    try {
      return (value as { toDate: () => Date }).toDate().toLocaleString('uk-UA');
    } catch {
      return null;
    }
  }
  return null;
}

export const AdminSettings = () => {
  const navigate = useNavigate();
  const userEmail = auth.currentUser?.email || '';

  // Firestore settings state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [exists, setExists] = useState<boolean | null>(null);
  const [form, setForm] = useState<GeneralSettingsFields>(EMPTY_GENERAL_SETTINGS);
  const [original, setOriginal] = useState<GeneralSettingsFields>(EMPTY_GENERAL_SETTINGS);
  const [updatedAt, setUpdatedAt] = useState<unknown>(null);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isDirty = useMemo(
    () => GENERAL_SETTINGS_KEYS.some((key) => form[key] !== original[key]),
    [form, original]
  );

  const loadSettings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getGeneralSettings();
      if (data) {
        const { updatedAt: ts, ...fields } = data;
        setForm(fields);
        setOriginal(fields);
        setUpdatedAt(ts ?? null);
        setExists(true);
      } else {
        setForm(EMPTY_GENERAL_SETTINGS);
        setOriginal(EMPTY_GENERAL_SETTINGS);
        setUpdatedAt(null);
        setExists(false);
      }
    } catch (err: unknown) {
      console.error('Помилка завантаження налаштувань:', err);
      setError(err instanceof Error ? err.message : 'Не вдалося завантажити налаштування з Firestore');
      setExists(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (key: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setForm(original);
    setError(null);
  };

  const handleCreateInitial = async () => {
    setIsCreating(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await createInitialGeneralSettings();
      await loadSettings();
      setSuccessMessage('Початкові налаштування успішно створено у settings/general.');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: unknown) {
      console.error('Помилка створення початкових налаштувань:', err);
      setError(err instanceof Error ? err.message : 'Не вдалося створити початкові налаштування');
      // Re-sync state in case the document was created elsewhere in the meantime
      await loadSettings();
    } finally {
      setIsCreating(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exists || !isDirty) return;

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await updateGeneralSettings(form);
      await loadSettings();
      setSuccessMessage('Налаштування успішно збережено.');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: unknown) {
      console.error('Помилка збереження налаштувань:', err);
      setError(err instanceof Error ? err.message : 'Не вдалося зберегти налаштування');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (err) {
      console.error('Error signing out', err);
    }
  };

  const formattedUpdatedAt = formatTimestamp(updatedAt);
  const formDisabled = isLoading || isSaving || !exists;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-heading font-bold text-[#0A192F] mb-1">Налаштування</h2>
          <p className="text-gray-500 text-sm">
            Глобальні бізнес-налаштування DAMINER у Firestore (документ{' '}
            <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">settings/general</code>)
          </p>
        </div>
        <div className="flex items-center gap-3">
          {formattedUpdatedAt && (
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              Оновлено: {formattedUpdatedAt}
            </span>
          )}
          <button
            type="button"
            onClick={loadSettings}
            disabled={isLoading || isSaving}
            title="Перезавантажити з Firestore"
            className="p-2.5 border border-gray-200 text-gray-600 hover:text-primary-blue hover:border-primary-blue rounded-md transition-colors bg-white disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-primary-blue' : ''}`} />
          </button>
        </div>
      </div>

      {/* Success Banner */}
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

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Помилка</h4>
            <p className="text-xs text-red-700">{error}</p>
          </div>
          <button type="button" onClick={() => setError(null)} className="text-red-700 hover:text-red-900 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && exists === null && (
        <div className="mb-8 bg-white rounded-xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center gap-3 text-gray-500">
          <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
          <span className="text-sm font-medium">Завантаження налаштувань з Firestore...</span>
        </div>
      )}

      {/* Missing Document — DEV ONLY initialization */}
      {!isLoading && exists === false && (
        <div className="mb-8 bg-white rounded-xl border-2 border-dashed border-indigo-200 p-8 md:p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mx-auto mb-4">
            <Database className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold font-heading text-[#0A192F] mb-2">
            Документ налаштувань відсутній
          </h3>
          <p className="text-sm text-gray-500 max-w-lg mx-auto mb-6">
            Документ <code className="font-mono text-gray-700 bg-gray-100 px-1 py-0.5 rounded">settings/general</code>{' '}
            ще не створено у Firestore.
          </p>

          {import.meta.env.DEV ? (
            <>
              <button
                type="button"
                onClick={handleCreateInitial}
                disabled={isCreating}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-blue text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Створення...</span>
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4" />
                    <span>Створити початкові налаштування</span>
                  </>
                )}
              </button>
              <div className="text-[11px] text-gray-400 mt-3">
                DEV ONLY • Використовує лише підтверджені значення • Не перезаписує існуючий документ
              </div>
            </>
          ) : (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg inline-block px-4 py-2">
              Ініціалізація доступна лише у режимі розробки.
            </p>
          )}
        </div>
      )}

      {/* Settings Form */}
      {exists && (
        <form onSubmit={handleSave} className="space-y-6 mb-10">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <section
                key={section.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="flex items-start gap-3 px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-primary-blue flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A192F]">{section.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{section.description}</p>
                  </div>
                </div>
                <div className={`p-6 grid grid-cols-1 ${section.fields.length > 1 ? 'md:grid-cols-2' : ''} gap-5`}>
                  {section.fields.map((field) => {
                    const changed = form[field.key] !== original[field.key];
                    return (
                      <div key={field.key}>
                        <label
                          htmlFor={`settings-${field.key}`}
                          className="flex items-center justify-between text-sm font-semibold text-[#0A192F] mb-1.5"
                        >
                          <span>{field.label}</span>
                          <span className="flex items-center gap-2">
                            {changed && (
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">
                                змінено
                              </span>
                            )}
                            <code className="font-mono text-[10px] font-normal text-gray-400">{field.key}</code>
                          </span>
                        </label>
                        <input
                          id={`settings-${field.key}`}
                          type={field.type || 'text'}
                          value={form[field.key]}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          disabled={formDisabled}
                          className={`${inputClass} ${changed ? 'border-amber-300 bg-amber-50/30' : ''}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* Sticky action bar */}
          <div className="sticky bottom-4 z-10">
            <div className="bg-white/95 backdrop-blur border border-gray-200 shadow-lg rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-gray-500">
                {isDirty
                  ? 'Є незбережені зміни.'
                  : 'Зміни відсутні. Публічний сайт поки не використовує ці налаштування.'}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!isDirty || isSaving}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-40"
                >
                  <Undo2 className="w-4 h-4" />
                  Скасувати зміни
                </button>
                <button
                  type="submit"
                  disabled={!isDirty || isSaving || isLoading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-blue text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Збереження...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Зберегти</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Admin account */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-xl">
        <h3 className="font-semibold text-[#0A192F] mb-4">Обліковий запис адміністратора</h3>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-[#0A192F] font-medium">
              {userEmail}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Вийти
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};
