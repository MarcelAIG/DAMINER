import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { SEED_PRODUCTS } from '../data/seedProducts';
import type {
  FirestoreProductKitItem,
  FirestoreProductSpecification,
} from '../data/seedProducts';
import type { ProductPrice } from '../types/product';
import { getCategorySlug } from './productService';

/**
 * Read-only access to the Firestore `products` collection for the PUBLIC website.
 * Nothing in this file writes to Firestore.
 */

export type CategorySlug = 'probes' | 'mirrors' | 'kits' | 'nets' | 'tools';

export interface PublicProduct {
  id: string;
  category: string;
  categorySlug: string;
  nameUa: string;
  nameEn: string;
  shortDescriptionUa: string;
  shortDescriptionEn: string;
  descriptionUa: string;
  descriptionEn: string;
  specifications: FirestoreProductSpecification[];
  kitContents: FirestoreProductKitItem[];
  /** Ordered gallery; the primary image is always first. */
  images: string[];
  primaryImage: string;
  priceMode: 'request' | 'from';
  priceAmount: string | null;
  sortOrder: number;
}

const str = (value: unknown): string => (typeof value === 'string' ? value : '');

const cleanImageList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((v): v is string => typeof v === 'string' && v.trim().length > 0)
    : [];

/**
 * Converts a raw Firestore document into a safe, fully-populated PublicProduct.
 * Images: stored Firestore URLs/paths are used when present; otherwise the
 * existing static image paths for the same product id are kept as a fallback.
 */
function normalizeProduct(id: string, data: Record<string, unknown>): PublicProduct {
  const seed = SEED_PRODUCTS.find((p) => p.id === id);

  let images = cleanImageList(data.images);
  if (images.length === 0 && seed) images = [...seed.images];

  const primaryImage = str(data.primaryImage).trim() || images[0] || seed?.primaryImage || '';
  const gallery = primaryImage
    ? [primaryImage, ...images.filter((img) => img !== primaryImage)]
    : images;

  const category = str(data.category);
  const categorySlug = str(data.categorySlug) || (category ? getCategorySlug(category) : '');

  const rawAmount = data.priceAmount;
  const priceAmount =
    rawAmount === null || rawAmount === undefined || String(rawAmount).trim() === ''
      ? null
      : String(rawAmount).trim();

  return {
    id,
    category,
    categorySlug,
    nameUa: str(data.nameUa),
    nameEn: str(data.nameEn),
    shortDescriptionUa: str(data.shortDescriptionUa),
    shortDescriptionEn: str(data.shortDescriptionEn),
    descriptionUa: str(data.descriptionUa),
    descriptionEn: str(data.descriptionEn),
    specifications: Array.isArray(data.specifications)
      ? (data.specifications as FirestoreProductSpecification[])
      : [],
    kitContents: Array.isArray(data.kitContents)
      ? (data.kitContents as FirestoreProductKitItem[])
      : [],
    images: gallery,
    primaryImage,
    priceMode: data.priceMode === 'from' ? 'from' : 'request',
    priceAmount,
    sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : 9999,
  };
}

/** Fetches all products and returns only published ones, sorted by sortOrder. */
export async function fetchPublishedProducts(): Promise<PublicProduct[]> {
  const q = query(collection(db, 'products'), where('published', '==', true));
  const snapshot = await getDocs(q);
  const products: PublicProduct[] = [];

  snapshot.forEach((docSnap) => {
    const data = docSnap.data() as Record<string, unknown>;
    products.push(normalizeProduct(docSnap.id, data));
  });

  products.sort((a, b) => a.sortOrder - b.sortOrder);
  return products;
}

/* ----------------------------- Localization ----------------------------- */

const pick = (ua: string, en: string, language: string): string =>
  language === 'ua' ? ua || en : en || ua;

export const getProductName = (p: PublicProduct, language: string) =>
  pick(p.nameUa, p.nameEn, language);

export const getProductShortDescription = (p: PublicProduct, language: string) =>
  pick(p.shortDescriptionUa, p.shortDescriptionEn, language);

export const getProductDescription = (p: PublicProduct, language: string) =>
  pick(p.descriptionUa, p.descriptionEn, language);

export const getSpecName = (s: FirestoreProductSpecification, language: string) =>
  pick(str(s.nameUa), str(s.nameEn), language);

export const getSpecValue = (s: FirestoreProductSpecification, language: string) =>
  language === 'ua'
    ? str(s.valueUa) || str(s.value) || str(s.valueEn)
    : str(s.valueEn) || str(s.valueUa) || str(s.value);

export const getKitItemName = (k: FirestoreProductKitItem, language: string) =>
  pick(str(k.itemUa), str(k.itemEn), language);

export const getKitItemCount = (k: FirestoreProductKitItem, language: string) =>
  pick(str(k.countUa), str(k.countEn), language);

/** Shape accepted by the existing price formatters (keeps "За запитом" behaviour). */
export const getProductPrice = (p: PublicProduct): ProductPrice => ({
  priceMode: p.priceMode,
  priceAmount: p.priceAmount ?? undefined,
});

/** Small uppercase category label used on cards and the product page. */
export function getCategoryLabel(categorySlug: string, t: any, language: string): string {
  switch (categorySlug) {
    case 'mirrors':
      return t.featured.mirror;
    case 'kits':
      return t.featured.kit;
    case 'nets':
      return t.featured.net || (language === 'ua' ? 'СІТКОМЕТ ПРОТИДРОНОВИЙ' : 'ANTI-DRONE NET LAUNCHER');
    case 'tools':
      return language === 'ua' ? 'САПЕРНЕ ПРИСТОСУВАННЯ' : 'SAPPER TOOL';
    case 'probes':
    default:
      return t.featured.probe;
  }
}
