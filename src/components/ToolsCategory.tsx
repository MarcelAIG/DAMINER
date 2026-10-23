import React from 'react';
import { ProductCategoryGrid } from './ProductCategoryGrid';

/** Per-product image scaling kept from the original static grid. */
const imageScaleClass = (id: string) =>
  id === 'tool-2' ? 'scale-[1.35] group-hover:scale-[1.4]' :
  id === 'tool-3' ? 'scale-[1.3] group-hover:scale-[1.35]' :
  id === 'tool-4' ? 'scale-[1.3] group-hover:scale-[1.35]' :
  id === 'tool-5' ? 'scale-[1.3] group-hover:scale-[1.35]' :
  id === 'tool-9' ? 'scale-[0.8] group-hover:scale-[0.85]' :
  'scale-100 group-hover:scale-105';

/** Per-product title sizing kept from the original static grid. */
const titleClassName = (id: string) =>
  `font-heading font-black text-dark-navy tracking-tight transition-colors duration-300 pr-4 ${
    id === 'tool-1' ? 'text-2xl lg:text-3xl' :
    id === 'tool-9' ? 'text-lg lg:text-xl xl:text-2xl' :
    id === 'tool-19' ? 'text-2xl lg:text-3xl' :
    'text-3xl lg:text-4xl'
  }`;

/** Sapper tools category (Саперні пристосування) — products loaded from Firestore. */
export function ToolsCategory() {
  return (
    <ProductCategoryGrid
      categorySlug="tools"
      imageScaleClass={imageScaleClass}
      titleClassName={titleClassName}
      fillEmptyColumns
    />
  );
}
