/**
 * Canonical public catalog categories.
 * Order MUST match `t.categories.items` / `t.categories.descriptions` in translations.ts.
 */
export const CATALOG_CATEGORY_SLUGS = ['probes', 'mirrors', 'kits', 'nets', 'tools'] as const;

export type CatalogCategorySlug = (typeof CATALOG_CATEGORY_SLUGS)[number];

/** Cover image shown on category cards (home carousel + catalog overview). */
export const CATALOG_CATEGORY_IMAGES: Record<CatalogCategorySlug, string> = {
  probes: '/ЩР-1/ChatGPT Image Aug 28, 2026, 09_53_09 PM.png',
  mirrors: '/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_13 AM (1).png',
  kits: '/ЕОД-1/ChatGPT Image Aug 29, 2026, 02_49_42 PM.png',
  nets: '/Сіткомети протидронові/net-main.png',
  tools: '/electric-cable/cable-main.png',
};

export function isCatalogCategorySlug(value: string | undefined): value is CatalogCategorySlug {
  return !!value && (CATALOG_CATEGORY_SLUGS as readonly string[]).includes(value);
}
