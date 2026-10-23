import { useCallback, useEffect, useState } from 'react';
import { fetchPublishedProducts, PublicProduct } from '../services/publicProductService';

/**
 * Shared, in-memory cache so every public component on a page uses ONE Firestore
 * request and the same product data. A full page refresh always re-fetches, so
 * changes saved in /admin are visible after refreshing. Within the SPA the data
 * is re-fetched once it is older than CACHE_TTL_MS.
 */
const CACHE_TTL_MS = 60_000;

let cachedProducts: PublicProduct[] | null = null;
let cachedAt = 0;
let inFlight: Promise<PublicProduct[]> | null = null;

function loadProducts(force = false): Promise<PublicProduct[]> {
  const isFresh = cachedProducts && Date.now() - cachedAt < CACHE_TTL_MS;
  if (!force && isFresh) return Promise.resolve(cachedProducts as PublicProduct[]);
  if (inFlight) return inFlight;

  inFlight = fetchPublishedProducts()
    .then((products) => {
      cachedProducts = products;
      cachedAt = Date.now();
      return products;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}

export interface UsePublishedProductsResult {
  products: PublicProduct[];
  loading: boolean;
  error: Error | null;
  retry: () => void;
}

/**
 * @param enabled Pass false to postpone fetching (e.g. until the search box is opened).
 */
export function usePublishedProducts(enabled: boolean = true): UsePublishedProductsResult {
  const [products, setProducts] = useState<PublicProduct[]>(cachedProducts ?? []);
  const [loading, setLoading] = useState<boolean>(enabled && !cachedProducts);
  const [error, setError] = useState<Error | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    if (!cachedProducts) setLoading(true);
    setError(null);

    loadProducts(attempt > 0)
      .then((result) => {
        if (cancelled) return;
        setProducts(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        console.error('Failed to load products from Firestore:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { products, loading, error, retry };
}
