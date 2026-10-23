import React from 'react';
import { ProductCategoryGrid } from './ProductCategoryGrid';

/** Mirrors category (Дзеркала) — products loaded from Firestore. */
export function MirrorsCategory() {
  return <ProductCategoryGrid categorySlug="mirrors" />;
}
