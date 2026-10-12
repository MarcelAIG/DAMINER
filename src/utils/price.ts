import type { ProductPrice } from '../types/product';

/**
 * Returns the formatted price string for catalog product cards.
 * UA:
 *   request -> "За запитом" (CSS uppercase renders "ЗА ЗАПИТОМ")
 *   from    -> "Від {priceAmount}" (CSS uppercase renders "ВІД {priceAmount}")
 * EN:
 *   request -> "On request" (CSS uppercase renders "ON REQUEST")
 *   from    -> "From {priceAmount}" (CSS uppercase renders "FROM {priceAmount}")
 */
export function formatCardPrice(
  item: ProductPrice | undefined | null,
  language: string
): string {
  const isUa = language === 'ua';
  if (item?.priceMode === 'from' && item.priceAmount && item.priceAmount.trim().length > 0) {
    return isUa ? `Від ${item.priceAmount.trim()}` : `From ${item.priceAmount.trim()}`;
  }
  return isUa ? 'За запитом' : 'On request';
}

/**
 * Returns the formatted price string for individual product pages.
 * UA:
 *   request -> "Ціна за запитом" (CSS uppercase renders "ЦІНА ЗА ЗАПИТОМ")
 *   from    -> "Від {priceAmount}" (CSS uppercase renders "ВІД {priceAmount}")
 * EN:
 *   request -> "Price on request" (CSS uppercase renders "PRICE ON REQUEST")
 *   from    -> "From {priceAmount}" (CSS uppercase renders "FROM {priceAmount}")
 */
export function formatProductPrice(
  item: ProductPrice | undefined | null,
  language: string
): string {
  const isUa = language === 'ua';
  if (item?.priceMode === 'from' && item.priceAmount && item.priceAmount.trim().length > 0) {
    return isUa ? `Від ${item.priceAmount.trim()}` : `From ${item.priceAmount.trim()}`;
  }
  return isUa ? 'Ціна за запитом' : 'Price on request';
}
