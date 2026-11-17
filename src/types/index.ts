export type ProductCategory =
  | 'televisions'
  | 'air-conditioners'
  | 'refrigerators'
  | 'washing-machines'
  | 'microwaves'
  | 'water-dispensers';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  shortDescription: string;
  tagline: string;
  imageUrl: string;
  brands: string[];
}

export type AvailabilityStatus = 'in-stock' | 'on-demand' | 'limited-display';

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  modelNumber: string;
  category: ProductCategory;
  subcategory?: string;
  description: string;
  specifications: Record<string, string>;
  ourPrice: number;
  mrpPrice: number;
  imageUrl: string;
  gallery: string[];
  isActive: boolean;
  isFeatured: boolean;
  availability: AvailabilityStatus;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'shop_manager';

export interface UserAccount {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface BusinessSettings {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  landmark: string;
  workingHours: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  googleListingUrl?: string;
  googleCid?: string;
  kgmid?: string;
  plusCode?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  showroomInfo?: {
    establishedYear: number;
    description: string;
  };
}
