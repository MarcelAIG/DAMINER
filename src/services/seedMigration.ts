import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { SEED_PRODUCTS, SeedProduct } from '../data/seedProducts';

export interface MigrationProgress {
  current: number;
  total: number;
  productName: string;
}

export interface MigrationResult {
  total: number;
  imported: number;
  skipped: number;
  errors: string[];
}

/**
 * Safe one-time migration service to seed the 32 current catalog products into Firestore.
 * - Does NOT overwrite existing documents with the same ID.
 * - Records imported, skipped, and error counts.
 */
export async function importCurrentCatalogToFirestore(
  onProgress?: (progress: MigrationProgress) => void
): Promise<MigrationResult> {
  const result: MigrationResult = {
    total: SEED_PRODUCTS.length,
    imported: 0,
    skipped: 0,
    errors: [],
  };

  for (let index = 0; index < SEED_PRODUCTS.length; index++) {
    const product: SeedProduct = SEED_PRODUCTS[index];

    if (onProgress) {
      onProgress({
        current: index + 1,
        total: SEED_PRODUCTS.length,
        productName: product.nameUa,
      });
    }

    try {
      const docRef = doc(db, 'products', product.id);
      const existingDoc = await getDoc(docRef);

      if (existingDoc.exists()) {
        // Safe: skip document if it already exists, DO NOT overwrite
        result.skipped++;
      } else {
        // Construct clean Firestore document matching exact specified schema
        const productData = {
          id: product.id,
          route: product.route,
          category: product.category,
          categorySlug: product.categorySlug,
          nameUa: product.nameUa,
          nameEn: product.nameEn,
          shortDescriptionUa: product.shortDescriptionUa,
          shortDescriptionEn: product.shortDescriptionEn,
          descriptionUa: product.descriptionUa,
          descriptionEn: product.descriptionEn,
          specifications: product.specifications,
          kitContents: product.kitContents,
          images: product.images,
          primaryImage: product.primaryImage,
          priceMode: product.priceMode,
          priceAmount: product.priceAmount,
          published: product.published,
          sortOrder: product.sortOrder,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await setDoc(docRef, productData);
        result.imported++;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      result.errors.push(`[${product.id}] ${product.nameUa}: ${errorMessage}`);
    }
  }

  return result;
}
