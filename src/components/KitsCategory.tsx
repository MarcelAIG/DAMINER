import React from 'react';
import { ProductCategoryGrid } from './ProductCategoryGrid';

/** Kits category (Набори) — products loaded from Firestore. */
export function KitsCategory() {
  return <ProductCategoryGrid categorySlug="kits" />;
}
