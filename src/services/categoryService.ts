import { collection, doc, getDoc, getDocs, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface FirestoreCategory {
  id: string;
  nameUa: string;
  nameEn: string;
  enabled: boolean;
  sortOrder: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

/**
 * The 5 canonical DAMINER categories with stable IDs, official names, and default sort orders
 */
export const INITIAL_5_CATEGORIES: Omit<FirestoreCategory, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'probes',
    nameUa: 'Щупи',
    nameEn: 'Probes',
    enabled: true,
    sortOrder: 1,
  },
  {
    id: 'mirrors',
    nameUa: 'Дзеркала',
    nameEn: 'Mirrors',
    enabled: true,
    sortOrder: 2,
  },
  {
    id: 'kits',
    nameUa: 'Набори',
    nameEn: 'Kits',
    enabled: true,
    sortOrder: 3,
  },
  {
    id: 'nets',
    nameUa: 'Сіткомети протидронові',
    nameEn: 'Anti-drone net launchers',
    enabled: true,
    sortOrder: 4,
  },
  {
    id: 'tools',
    nameUa: 'Саперні пристосування',
    nameEn: 'Demining tools',
    enabled: true,
    sortOrder: 5,
  },
];

export interface CategoryImportResult {
  total: number;
  imported: number;
  skipped: number;
  errors: string[];
}

/**
 * Safe initial import of the 5 canonical categories into Firestore collection 'categories'.
 * Creates ONLY missing documents, never overwrites existing ones.
 */
export async function importInitialCategories(): Promise<CategoryImportResult> {
  const result: CategoryImportResult = {
    total: INITIAL_5_CATEGORIES.length,
    imported: 0,
    skipped: 0,
    errors: [],
  };

  for (const cat of INITIAL_5_CATEGORIES) {
    try {
      const docRef = doc(db, 'categories', cat.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        result.skipped++;
      } else {
        await setDoc(docRef, {
          id: cat.id,
          nameUa: cat.nameUa,
          nameEn: cat.nameEn,
          enabled: cat.enabled,
          sortOrder: cat.sortOrder,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        result.imported++;
      }
    } catch (err: unknown) {
      result.errors.push(
        `Помилка для категорії "${cat.nameUa}" (${cat.id}): ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  return result;
}

/**
 * Fetch all categories from Firestore collection 'categories'
 * sorted by sortOrder ascending.
 */
export async function getFirestoreCategories(): Promise<FirestoreCategory[]> {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  const categories: FirestoreCategory[] = [];

  querySnapshot.forEach((docSnapshot) => {
    const data = docSnapshot.data();
    categories.push({
      id: docSnapshot.id,
      nameUa: data.nameUa || '',
      nameEn: data.nameEn || '',
      enabled: data.enabled !== false,
      sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : 999,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  });

  // Sort by sortOrder ascending
  categories.sort((a, b) => a.sortOrder - b.sortOrder);
  return categories;
}

/**
 * Fetch the total count of categories in Firestore
 */
export async function getFirestoreCategoriesCount(): Promise<number> {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  return querySnapshot.size;
}

/**
 * Update an existing category in Firestore.
 * Category ID must NEVER change.
 */
export async function updateFirestoreCategory(
  id: string,
  payload: {
    nameUa: string;
    nameEn: string;
    enabled: boolean;
    sortOrder: number;
  }
): Promise<void> {
  const docRef = doc(db, 'categories', id);
  await updateDoc(docRef, {
    nameUa: payload.nameUa.trim(),
    nameEn: payload.nameEn.trim(),
    enabled: payload.enabled,
    sortOrder: payload.sortOrder,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Create a new category in Firestore.
 * ID is generated automatically if not provided.
 * Default enabled = false (admin-only / draft).
 * Default sortOrder = current highest + 1.
 */
export async function createFirestoreCategory(payload: {
  id?: string;
  nameUa: string;
  nameEn?: string;
  enabled?: boolean;
  sortOrder?: number;
}): Promise<string> {
  const categoryId = payload.id || doc(collection(db, 'categories')).id;

  const docRef = doc(db, 'categories', categoryId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    throw new Error(`Категорія з ID "${categoryId}" вже існує.`);
  }

  let finalSortOrder = payload.sortOrder;
  if (typeof finalSortOrder !== 'number') {
    const existing = await getFirestoreCategories();
    const maxSort = existing.reduce((max, c) => Math.max(max, c.sortOrder || 0), 0);
    finalSortOrder = maxSort + 1;
  }

  await setDoc(docRef, {
    id: categoryId,
    nameUa: payload.nameUa.trim(),
    nameEn: (payload.nameEn || '').trim(),
    enabled: payload.enabled ?? false,
    sortOrder: finalSortOrder,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return categoryId;
}
