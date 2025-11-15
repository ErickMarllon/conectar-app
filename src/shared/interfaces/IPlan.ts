import type { PlanInterval } from '../enums';

export interface IPlanDetail {
  id: string;
  plan_id: string;
  price?: number;
  discount?: number;
  original_price?: number;
  billing_period?: string;
  cta_label?: string;
  included_features?: string[];
  created_at: Date;
  updated_at: Date;
}
export interface IPlanFeature {
  id: string;
  plan_id: string;
  feature_text: string;
  is_available: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IPlan {
  id: string;
  name: string;
  tier: string;
  max_users: number;
  max_products: number;
  max_services: number;
  interval: PlanInterval;
  description?: string;
  created_at: Date;
  updated_at: Date;

  details?: IPlanDetail;
  features?: IPlanFeature[];
}

export interface IPlanParams extends IPlan {
  searchTerm: string;
}
