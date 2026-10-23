import React from 'react';
import { ProductCategoryGrid } from './ProductCategoryGrid';

/** Anti-drone nets category (Сіткомети протидронові) — products loaded from Firestore. */
export function NetsCategory() {
  return <ProductCategoryGrid categorySlug="nets" fillEmptyColumns />;
}
