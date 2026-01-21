export interface ProductItem {
  name: string;
  image: string;
  paragraphs?: string[];
  bullets?: string[];
  category: string;
  slug: string; // derived from image file name
}

export interface ProductGroup {
  category: string;
  items: ProductItem[];
}

// Helper to build a slug from an imported asset path
const makeSlug = (imagePath: string): string => {
  const file = imagePath.split('/').pop() || imagePath;
  return file.replace(/\.[^.]+$/, '');
};

// NOTE: This module is populated by ProductsPage at runtime to avoid duplicating imports here.
// We export a builder that takes the raw assets (so tree-shaking remains intact) and returns typed data with slugs.
export type RawGroup = {
  category: string;
  items: Array<{
    name: string;
    image: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
};

export const buildProductsData = (rawGroups: RawGroup[]): ProductGroup[] => {
  return rawGroups.map((g) => ({
    category: g.category,
    items: g.items.map((p) => ({
      ...p,
      category: g.category,
      slug: makeSlug(p.image),
    })),
  }));
};

export const flattenProducts = (groups: ProductGroup[]): ProductItem[] =>
  groups.flatMap((g) => g.items);


