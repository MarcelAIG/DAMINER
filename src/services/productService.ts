import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { SeedProduct } from '../data/seedProducts';

export type FirestoreProduct = SeedProduct & {
  createdAt?: unknown;
  updatedAt?: unknown;
};

export interface ProductStats {
  total: number;
  published: number;
  drafts: number;
}

/**
 * Fetch all products from Firestore collection 'products'
 * sorted by sortOrder ascending.
 */
export async function getFirestoreProducts(): Promise<FirestoreProduct[]> {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products: FirestoreProduct[] = [];

  querySnapshot.forEach((docSnapshot) => {
    const data = docSnapshot.data();
    products.push({
      id: docSnapshot.id,
      ...data,
    } as FirestoreProduct);
  });

  // Sort by sortOrder ascending
  products.sort((a, b) => {
    const orderA = typeof a.sortOrder === 'number' ? a.sortOrder : 9999;
    const orderB = typeof b.sortOrder === 'number' ? b.sortOrder : 9999;
    return orderA - orderB;
  });

  return products;
}

/**
 * Calculate product counts for the dashboard
 */
export function calculateProductStats(products: FirestoreProduct[]): ProductStats {
  const total = products.length;
  const published = products.filter((p) => p.published !== false).length;
  const drafts = products.filter((p) => p.published === false).length;

  return { total, published, drafts };
}

/**
 * Canonical DAMINER categories
 */
export const DAMINER_CATEGORIES = [
  'Щупи',
  'Дзеркала',
  'Набори',
  'Сіткомети протидронові',
  'Саперні пристосування',
] as const;

export type DaminerCategory = (typeof DAMINER_CATEGORIES)[number];

export function getCategorySlug(category: string): string {
  switch (category) {
    case 'Щупи':
      return 'probes';
    case 'Дзеркала':
      return 'mirrors';
    case 'Набори':
      return 'kits';
    case 'Сіткомети протидронові':
      return 'nets';
    case 'Саперні пристосування':
    default:
      return 'tools';
  }
}

/**
 * Returns the next available sortOrder after the current highest sortOrder
 */
export async function getNextSortOrder(): Promise<number> {
  const products = await getFirestoreProducts();
  const maxSortOrder = products.reduce((max, p) => {
    return typeof p.sortOrder === 'number' && p.sortOrder > max ? p.sortOrder : max;
  }, 0);
  return maxSortOrder + 1;
}

