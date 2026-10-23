import React from 'react';
import { ProductCategoryGrid } from './ProductCategoryGrid';

/** Probes category (Щупи) — products loaded from Firestore. */
export function Featured() {
  return <ProductCategoryGrid categorySlug="probes" />;
}
