import { doc, getDoc, updateDoc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Global DAMINER business settings stored in Firestore document `settings/general`.
 * NOTE: Admin-only for now. The public website is NOT connected to this document yet.
 */
export interface GeneralSettingsFields {
  companyNameUa: string;
  companyNameEn: string;

  phonePrimary: string;
  phoneSecondary: string;

  email: string;

  addressUa: string;
  addressEn: string;

  instagram: string;
  facebook: string;
  youtube: string;
  telegram: string;
}

export interface GeneralSettings extends GeneralSettingsFields {
  updatedAt?: unknown;
}

export const SETTINGS_COLLECTION = 'settings';
export const SETTINGS_GENERAL_ID = 'general';

/** Exact list of editable settings fields (used to whitelist writes). */
export const GENERAL_SETTINGS_KEYS: (keyof GeneralSettingsFields)[] = [
  'companyNameUa',
  'companyNameEn',
  'phonePrimary',
  'phoneSecondary',
  'email',
  'addressUa',
  'addressEn',
  'instagram',
  'facebook',
  'youtube',
  'telegram',
];

export const EMPTY_GENERAL_SETTINGS: GeneralSettingsFields = {
  companyNameUa: '',
  companyNameEn: '',
  phonePrimary: '',
  phoneSecondary: '',
  email: '',
  addressUa: '',
  addressEn: '',
  instagram: '',
  facebook: '',
  youtube: '',
  telegram: '',
};

/**
 * Confirmed initial values.
 * - Facebook / Instagram: preserved exactly as currently used in the public Footer & Contact page.
 * - YouTube / Telegram: no confirmed links exist in the project → intentionally left empty.
 */
export const INITIAL_GENERAL_SETTINGS: GeneralSettingsFields = {
  companyNameUa: 'ТОВ «ДАМІНЕР»',
  companyNameEn: 'DAMINER',
  phonePrimary: '+38 (050) 381-17-23',
  phoneSecondary: '+38 (096) 855-82-14',
  email: 'daminer23@ukr.net',
  addressUa: 'м. Ніжин, Чернігівська область, вул. Геологів, 30',
  addressEn: 'Nizhyn, Chernihiv region, 30 Heolohiv Street',
  instagram: 'https://www.instagram.com/daminer_ua?igsh=YmN1ajlnMzAwaGR0&utm_source=qr',
  facebook: 'https://www.facebook.com/share/17RjFu7gEo/',
  youtube: '',
  telegram: '',
};

const generalRef = () => doc(db, SETTINGS_COLLECTION, SETTINGS_GENERAL_ID);

/** Pick only whitelisted settings fields and normalize them to trimmed strings. */
function pickSettingsFields(source: Partial<Record<string, unknown>>): GeneralSettingsFields {
  const result = { ...EMPTY_GENERAL_SETTINGS };
  for (const key of GENERAL_SETTINGS_KEYS) {
    const value = source[key];
    result[key] = typeof value === 'string' ? value.trim() : '';
  }
  return result;
}

/**
 * Load `settings/general`. Returns `null` if the document does not exist.
 */
export async function getGeneralSettings(): Promise<GeneralSettings | null> {
  const snap = await getDoc(generalRef());
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    ...pickSettingsFields(data),
    updatedAt: data.updatedAt,
  };
}

/**
 * Safely create `settings/general` with the confirmed initial values.
 * Uses a transaction so an existing document is NEVER overwritten.
 * Throws if the document already exists.
 */
export async function createInitialGeneralSettings(): Promise<void> {
  const ref = generalRef();
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (snap.exists()) {
      throw new Error('Документ settings/general вже існує. Перезапис заборонено.');
    }
    tx.set(ref, {
      ...INITIAL_GENERAL_SETTINGS,
      updatedAt: serverTimestamp(),
    });
  });
}

/**
 * Update ONLY the whitelisted settings fields + updatedAt on an existing `settings/general`.
 * `updateDoc` fails if the document does not exist, so this never creates it implicitly.
 */
export async function updateGeneralSettings(payload: GeneralSettingsFields): Promise<void> {
  await updateDoc(generalRef(), {
    ...pickSettingsFields(payload as unknown as Record<string, unknown>),
    updatedAt: serverTimestamp(),
  });
}
