export type PriceMode = 'request' | 'from';

export interface ProductPrice {
  priceMode?: PriceMode;
  priceAmount?: string;
}

export interface ProductItem extends ProductPrice {
  id: string;
  type?: string;
  model: string;
  description: string;
  price?: string;
  imageBase64: string;
  gallery?: string[];
}
