import productsJson from '../../public/products.json';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface FilterCriteria {
  searchTerm: string;
  priceRange: { min: number; max: number };
  categories: string[];
  tags: string[];
}

export class ProductService {
  private products: Product[] = productsJson.products;

  getAllProducts(): Product[] {
    return this.products;
  }

  getUniqueCategories(): string[] {
    return [...new Set(this.products.map(product => product.category))];
  }

  getUniqueTags(): string[] {
    return [...new Set(this.products.flatMap(product => product.tags))];
  }

  filterProducts(criteria: FilterCriteria): Product[] {
    return this.products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(criteria.searchTerm.toLowerCase());
      const matchesPrice = product.price >= criteria.priceRange.min && product.price <= criteria.priceRange.max;
      const matchesCategory = criteria.categories.length === 0 || criteria.categories.includes(product.category);
      const matchesTags = criteria.tags.length === 0 || product.tags.some(tag => criteria.tags.includes(tag));

      return matchesSearch && matchesPrice && matchesCategory && matchesTags;
    });
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => product.category === category);
  }

  getProductsByTag(tag: string): Product[] {
    return this.products.filter(product => product.tags.includes(tag));
  }
}

export const productService = new ProductService(); 