import { SimpleDocumentStore } from "../wiseguyProviders";

export interface Category {
  category_key: string;
  name: string;
  brand: Record<string, any>;
  line_of_business: Record<string, any>;
  sku: string;
  subscription_prefix?: string;
  finance?: Record<string, any>;
  zuora?: Record<string, any>;
}

export class CategoryStore extends SimpleDocumentStore<Category> {}
