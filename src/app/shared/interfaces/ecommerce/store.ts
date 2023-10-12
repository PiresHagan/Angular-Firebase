import { ImageItem, ItemLog } from './common';

export enum StoreStatusTypes {
  PENDING = 1,
  SUBMITTED,
  APPROVED,
  DECLINED,
  SUSPENDED,
}

export enum StripeStatusTypes {
  ACTIVE = "active",
};

export interface Store {
  id: string;
  slug: string;
  name: string;
  owner: any;
  ownerId: string;
  ownerType: string;
  image: ImageItem;
  banner:ImageItem;
  status: StoreStatusTypes;
  description: string;
  log: ItemLog;
  phone?: number;
  email: string;
  address?: string;
  country_code?: string;
  state?: string;
  city?: string;
  postal_code?: string;
  privacy_policy:string;
  refund_policy:string;
  delivery_policy:string;
  stripe_status: StripeStatusTypes;
}
