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
