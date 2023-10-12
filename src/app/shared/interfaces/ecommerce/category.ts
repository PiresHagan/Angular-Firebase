export interface ProductCategory {
  id: string;
  title: string;
  slug: string;
  sub_categories: ProductSubCategory[];
  is_parent: boolean;
}

export interface ProductSubCategory {
  id: string;
  title: string;
  slug: string;
}
