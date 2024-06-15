export interface Id {
  _id: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface Price {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: null | number;
  livemode: boolean;
  lookup_key: null | string;
  metadata: Record<string, any>;
  nickname: string;
  product: string;
  recurring: {
    aggregate_usage: null | string;
    interval: string;
    interval_count: number;
    trial_period_days: null | number;
    usage_type: string;
  };
  tax_behavior: string;
  tiers_mode: null | string;
  transform_quantity: null | string;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export default Price;

export type User = Id & NewUser;
